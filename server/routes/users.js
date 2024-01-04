const express = require("express");
const bcrypt = require("bcrypt");

const { validLogin, validUser,validUserEdit } = require("../validation/userValidation")
const { validReport } = require("../validation/reportValidation")
const { createToken } = require("../helpers/userHelper");
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel } = require("../models/userModel")
const { ReportModel } = require("../models/reportModel")
const { ReviewModel } = require("../models/reviewModel");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Users work" })
})
router.get("/myInfo", auth, async (req, res) => {
  try {
    console.log(req.tokenData._id);
    let userInfo = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
    if (userInfo.posts.length > 0) {
      await userInfo.populate('posts')
    }
    if (userInfo.missions.length > 0) {
      await userInfo.populate({
        path: 'missions',
        populate: {
          path: 'user_creator',
          select: '_id full_name',
        },
      });
    }
    if (userInfo.reviews.length > 0) {
      await userInfo.populate({
        path: 'reviews',
        populate: {
          path: 'user_creater',
          select: '_id full_name img_url',
        },
      });
    }


    res.json(userInfo);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})
// router.get("/infoById/:id", async (req, res) => {
//   try {
//     // console.log(req.tokenData._id);
//     let id = req.params.id;
//     let userInfo = await UserModel.findOne({ _id: id }, { password: 0 });
//     if (userInfo.posts.length > 0) {
//       await userInfo.populate('posts')
//     }
//     if (userInfo.missions.length > 0) {
//       await userInfo.populate('missions')
//     }
//     if (userInfo.reviews.length > 0) {
//       await userInfo.populate('reviews')
//     }


//     res.json(userInfo);
//   }
//   catch (err) {
//     console.log(err)
//     res.status(500).json({ msg: "err", err })
//   }
// })
// router.get("/infoById/:id", async (req, res) => {
//   try {
//     let id = req.params.id;

//     // Use findOne to find the user by ID
//     let userInfo = await UserModel.findOne({ _id: id }, { password: 0 });

//     // Use populate to get the details of the user_creater in reviews
//     await userInfo.populate('reviews'); // Assuming 'reviews' is the path in the UserModel

//     res.json(userInfo);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: "err", err });
//   }
// });

router.get("/infoById/:id", async (req, res) => {
  try {
    let userId = req.params.id;

    // Use findOne to find the user by ID
    let userInfo = await UserModel.findOne({ _id: userId }, { password: 0 });

    // Use populate to get the details of the user_creater in reviews
    await userInfo.populate({
      path: 'reviews',
      populate: {
        path: 'user_creater',
        select: '_id full_name img_url',
      },
    });
    if (userInfo.posts.length > 0) {
      await userInfo.populate('posts')
    }
    if (userInfo.missions.length > 0) {
      await userInfo.populate({
        path: 'missions',
        populate: {
          path: 'user_creator',
          select: '_id full_name',
        },
      });
    }
    res.json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});


router.get("/usersList", authAdmin, async (req, res) => {
  try {
    let data = await UserModel.find({}, { password: 0 });
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.post("/", async (req, res) => {
  console.log(req.body);
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();
    let token = createToken(user._id, user.role);
    user.password = "******";
    // user.token = token;
    console.log(user);
    if (user.posts.length > 0) {
      await user.populate('posts')
    }
    if (user.missions.length > 0) {
      await user.populate('missions')
    }
    if (user.reviews.length > 0) {
      await user.populate('reviews')
    }

    res.status(201).json({ user, token });
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

    }
    console.log(err);
    res.status(500).json({ msg: "err", err })
  }
})

router.post("/login", async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ msg: "email is worng ", code: 1 })
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
      return res.status(401).json({ msg: "Password is worng ", code: 2 });
    }
    if (user.blocked) {
      return res.status(401).json({ msg: "User is blocked ", code: 3 })
    }
    if (!user.active) {
      return res.status(401).json({ msg: "User is not active ", code: 4 })
    }
    // if (user.posts.length > 0) {
    //   await user.populate('posts')
    // }
    // if (user.missions.length > 0) {
    //   await user.populate('missions')
    // }
    // if (user.reviews.length > 0) {
    //   await user.populate('reviews')
    // }

    let token = createToken(user._id, user.role);
    res.json({ user, token });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.put("/delete/:editId", auth, async (req, res) => {

  try {
    let editId = req.params.editId;
    let data;
    console.log(req.tokenData.role);
    if (req.tokenData.role === "admin") {

      data = await UserModel.updateOne({ _id: editId }, { $set: { active: false } });
    } else {
      data = await UserModel.updateOne({ _id: editId, user_id: req.tokenData._id }, { $set: { active: false } });
    }
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "there error try again later", err })
  }
})
router.put("/:editId", auth, async (req, res) => {
  let validBody = validUserEdit(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let editId = req.params.editId;
    let data;
    console.log(req.body);
    // אל תצפין את הסיסמה במהלך העדכון
    // user.password = await bcrypt.hash(user.password, 10);

    if (req.tokenData.role == "admin") {
      data = await UserModel.updateOne({ _id: editId },
         { $set:
         { full_name: req.body.full_name,
          description:req.body.description,
           email: req.body.email,
           phone:req.body.phone,
           address:req.body.address,
           birth_date:req.body.birth_date,
           gender:req.body.gender,
           fields:req.body.fields
          }
         });
    } else {
      console.log(req.tokenData._id);
      data = await UserModel.updateOne({ _id: editId, user_id: req.tokenData._id },
        { $set:
          { full_name: req.body.full_name,
           description:req.body.description,
            email: req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            birth_date:req.body.birth_date,
            gender:req.body.gender,
            fields:req.body.fields
           }
          }
         );
    }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "there error try again later", err });
  }
});

router.post("/report/:id", auth, async (req, res) => {
  // console.log(req.tokenData);
  // console.log(req.tokenData.role);
  let reportBody = {
    id_reporter: req.tokenData._id,
    id_reportee: req.params.id,
    Message: req.body.Message
  }
  let validBody = validReport(reportBody);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let report = new ReportModel(reportBody);
    await report.save();
    res.status(201).json(report);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err })
  }
})
router.put("/block/:Id", authAdmin, async (req, res) => {
  try {
    let editId = req.params.Id;
    console.log(editId);

    // עדכון בטבלת היוזרים
    let data = await UserModel.updateOne({ _id: editId }, { $set: { blocked: true } });
    console.log(data);
    // בדיקה האם העדכון בטבלת היוזרים הצליח
    if (data.modifiedCount > 0) {
      // מחיקת הדיווח המתאים מטבלת הדיווחים
      await ReportModel.deleteOne({ id_reportee: editId });
      console.log("blocked");
      res.json({ msg: "User blocked successfully, and corresponding report deleted." });
    } else {
      res.status(500).json({ msg: "User blocking failed." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "There was an error, try again later.", err });
  }
});
router.put("/role/:id/:role", authAdmin, async (req, res) => {
  try {
    let editId = req.params.id;
    let role = req.params.role
    console.log(editId);

    let data = await UserModel.updateOne({ _id: editId }, { $set: { role: role } });
    console.log(data);
    res.status(500).json({});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err })
  }
})


module.exports = router;