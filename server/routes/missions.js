const express = require("express");
const { auth } = require("../middlewares/auth");
const { MissionModel } = require("../models/missionModel")
const { UserModel } = require("../models/userModel")
const { validMission } = require("../validation/missionValidation")
const router = express.Router();
// get all
router.get("/getall", async (req, res) => {
    try {
        let data = await MissionModel.find({})
            .sort({ _id: -1 });

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err });
    }
});


// Function to get missions based on age and gender
async function getMissionsByAgeAndGender(userId) {
    try {
        const user = await UserModel.findOne({ _id: userId })
        // .populate('users');
        if (!user) {
            return { error: 'User not found' };
        }

        const age = calculateUserAge(user.birth_date);

        const missions = await MissionModel.find({
            $and: [
                { 'requirements.min_age': { $lte: age } },
                { 'requirements.max_age': { $gte: age } },
                {
                    $or: [
                        { 'requirements.gender': user.gender },
                        { 'requirements.gender': { $exists: false } }, // Unspecified gender
                    ],
                },
            ],
        }).sort({ _id: -1 });
        console.log(missions);


        for (const mission of missions) {
            let user1 = await UserModel.findOne({ _id: mission.user_creator });
            console.log(mission);
            mission.user_creator = `${mission.user_creator},${user1.full_name}`;
            // mission = { ...mission, userName: user1.full_name }
            console.log(mission);
        }
        return missions
    }
    catch (error) {
        throw error;
    }
}

// Calculate user age based on birth_date
function calculateUserAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// GET route for missions based on age and gender
router.get("/", auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;
        const missions = await getMissionsByAgeAndGender(userId);

        res.json(missions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error", err });
    }
});

// GET route for missions based on age, gender, date, and time range
router.get("/byDateTime", auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;
        const missionsByAgeAndGender = await getMissionsByAgeAndGender(userId);

        // Extract date and time range from request query
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);

        const startTime = req.query.startTime;
        const endTime = req.query.endTime;

        // Filter missions by date and time range
        const filteredMissions = missionsByAgeAndGender.filter((mission) => {
            const missionDate = new Date(mission.date);
            const missionTime = mission.time;

            const isDateInRange = missionDate >= startDate && missionDate <= endDate;
            const isTimeInRange = missionTime >= startTime && missionTime <= endTime;

            return isDateInRange && isTimeInRange;
        });

        res.json(filteredMissions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error", err });
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
        let mission = new MissionModel(req.body);
        // add the user_id of the user that add the mission
        mission.user_creator = req.tokenData._id;
        await mission.save();
        res.status(201).json(mission);
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

router.put('/addInterested/:missionId', auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;
        const missionId = req.params.missionId;

        // Find the mission by ID
        const mission = await MissionModel.findById(missionId);

        if (!mission) {
            return res.status(404).json({ error: 'Mission not found' });
        }

        // Check if the user is already interested in the mission
        if (mission.interested.includes(userId)) {
            return res.status(400).json({ error: 'User is already interested in this mission' });
        }

        // Add the user ID to the mission's interested array
        mission.interested.push(userId);

        // Update the mission in the database
        await mission.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error in /mission/addInterested route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// PUT /mission/taken?idMission=<missionId>&idUser=<userId>
router.put('/taken', async (req, res) => {
    try {
        console.log("hi");
        const missionId = req.query.idMission;
        const userId = req.query.idUser;

        console.log('Received request to mark mission as taken. Mission ID:', missionId, 'User ID:', userId);

        // Find the mission by ID
        const mission = await MissionModel.findById(missionId).lean();

        if (!mission) {
            console.log('Mission not found');
            return res.status(404).json({ error: 'Mission not found' });
        }

        // Mark the mission as taken
        mission.taken = true;

        // Update the mission in the database
        await MissionModel.findByIdAndUpdate(missionId, mission);

        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the mission ID to the user's missions array
        user.missions.push(missionId);

        // Update the user in the database
        await UserModel.findByIdAndUpdate(userId, user);

        console.log('Mission marked as taken. User missions updated.');

        res.json({ success: true });
    } catch (error) {
        console.error('Error in /mission/taken route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;