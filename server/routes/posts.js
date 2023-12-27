const { PostModel } = require("../models/postModel")
const { UserModel } = require("../models/userModel")
const express = require("express");
const { validPost } = require("../validation/postValidation")
const { auth, authAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/",auth, async (req, res) => {
let userID=req.tokenData._id
console.log(userID);
try {
    const user = await UserModel.findById(userID)
    console.log(user);
    if (user.posts.length > 0) {
        await user.populate('posts')
    }

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ posts: user.posts });
} catch (error) {
    console.error(`Error in /posts/user/${userID} route`, error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
}
})

router.post("/",auth, async (req, res) => {
    let post =req.body;
    // post.user_created = req.tokenData._id
    post={
        user_created:req.tokenData._id,
        ...post
    }
    postValid = validPost(post);
    if (postValid.error) {
        return res.status(400).json(postValid.error.details);
    }
    try {
        const post1 = new PostModel(post);
        await post1.save();
        res.json(post1);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
  });

router.get("/:id", async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    res.json(post);
});

router.delete("/:id", auth, async (req, res) => {
    let id = req.params.id;
    let post;
    try{

        if (req.tokenData.role == "admin") {
            post = await PostModel.findByIdAndDelete(id);
        }
        else {
            console.log(req.tokenData._id);
            data = await PostModel.findByIdAndDelete({ _id: id, user_id: req.tokenData._id }, post)
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err }) 
    }
    res.json(post);
});

module.exports = router;