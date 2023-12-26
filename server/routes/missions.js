const express = require("express");
const { auth } = require("../middlewares/auth");
const { MissionModel } = require("../models/missionModel")
const { UserModel } = require("../models/userModel")
const { validMission } = require("../validation/missionValidation")
const router = express.Router();
//get all
router.get("/", async (req, res) => {
    try {
        let data = await MissionModel.find({})
            .sort({ _id: -1 });

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err });
    }
});

//get top ten
router.get("/topTen", async (req, res) => {
    let perPage = req.query.perPage || 10; // Change perPage to 10
    let page = req.query.page || 1;

    try {
        let data = await MissionModel.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ _id: -1 });

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err });
    }
});

// /missions/search?s=
router.get("/search", async (req, res) => {
    try {
        let queryS = req.query.s;
        // מביא את החיפוש בתור ביטוי ולא צריך את כל הביטוי עצמו לחיפוש
        // i -> מבטל את כל מה שקשור ל CASE SENSITVE
        let searchReg = new RegExp(queryS, "i")
        let data = await MissionModel.find({ title: searchReg })
            .limit(50)
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

router.get("/createdByMe", auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;

        const missionsCreatedByUser = await MissionModel.find({ user_creator: userId }).sort({ _id: -1 });

        res.json(missionsCreatedByUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err });
    }
});

router.post("/", auth, async (req, res) => {
    let validBody = validMission(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let toy = new MissionModel(req.body);
        // add the user_id of the user that add the toy
        toy.user_id = req.tokenData._id;
        await toy.save();
        res.status(201).json(toy);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

// האדמין יוכל לערוך את כל הרשומות ויוזרים יוכלו לערוך רק את של עצמם
router.put("/:id", auth, async (req, res) => {
    let validBody = validMission(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {
        let editId = req.params.editId;
        let data;
        if (req.tokenData.role == "admin") {
            data = await MissionModel.updateOne({ _id: editId }, req.body)
        }
        else {
            data = await MissionModel.updateOne({ _id: editId, user_id: req.tokenData._id }, req.body)
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


// האדמין יוכל למחוק את כל הרשומות ויוזרים יוכלו למחוק רק את של עצמם

router.delete("/:delId", auth, async (req, res) => {
    try {
        let delId = req.params.delId;
        let data;
        // אם אדמין יכול למחוק כל רשומה אם לא בודק שהמשתמש
        // הרשומה היוזר איי די שווה לאיי די של המשתמש
        if (req.tokenData.role == "admin") {
            data = await MissionModel.deleteOne({ _id: delId })
        }
        else {
            data = await MissionModel.deleteOne({ _id: delId, user_id: req.tokenData._id })
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})


const notPassedDate = (mission) => {
    const currentDate = new Date();
    const missionDate = new Date(mission.date);
    return currentDate < missionDate;
};

// GET /missions/my
router.get('/my', async (req, res) => {
    try {
        // Fetch missions whose date has not passed
        const missions = await MissionModel.find({ taken: false }).lean();

        // Filter missions based on the date
        const filteredMissions = missions.filter(notPassedDate);

        res.json(filteredMissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/interested/:missionId', async (req, res) => {
    try {
        const missionId = req.params.missionId;

        // Find the mission by ID
        const mission = await MissionModel.findById(missionId).lean();

        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        // Get the array of interested people
        const interestedCandidates = mission.interested;

        res.json({ interestedCandidates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT /mission/taken?idMission=<missionId>&idUser=<userId>


module.exports = router;