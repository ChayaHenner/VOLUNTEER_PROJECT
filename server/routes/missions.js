const express = require("express");
const { auth } = require("../middlewares/auth");
const { MissionModel } = require("../models/missionModel")
const { UserModel } = require("../models/userModel")
const { validMission } = require("../validation/missionValidation")
const router = express.Router();
// get all
//search and only give missions that are not taken
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

// // Calculate user age based on birth_date
function calculateUserAge(birthDate) {
    const today = new Date();
    console.log("calculate user age");

    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

// GET route for missions based on age, gender, and search
async function getMissionsByAgeAndGender(userId) {
    try {
        const user = await UserModel.findOne({ _id: userId })
        if (!user) {
            return { error: 'User not found' };
        }

        const age = calculateUserAge(user.birth_date);
        const currentDate = new Date();

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
                { taken: false }, // Exclude taken missions
                { date: { $gte: currentDate } },
                { 'user_creator': { $ne: userId } }, // User ID is not equal to the creator's ID
            ],
        }).sort({ _id: -1 }).populate({
            path: 'user_creator',
            select: '_id full_name'
        });
        
        console.log(missions);


        return missions
    }
    catch (error) {
        throw error;
    }
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
        let queryS = req.query.s;
        let searchReg = new RegExp(queryS, "i")

        // Filter missions by date and time range
        const filteredMissions = missionsByAgeAndGender.filter((mission) => {
            const missionDate = new Date(mission.date);
            const missionTime = mission.time;

            const isDateInRange = missionDate >= startDate && missionDate <= endDate;
            const isTimeInRange = missionTime >= startTime && missionTime <= endTime;

            return isDateInRange && isTimeInRange;
        });


        const matchingMissionsFromDB = await MissionModel.find({
            $and: [
                {
                    _id: { $in: filteredMissions }, // Filter by mission IDs from getMissionsByAgeAndGender
                },
                {
                    $or: [
                        { title: searchReg },
                        { description: searchReg },
                        { address: searchReg },
                    ],
                },
            ],
        }).populate({
            path: 'user_creator',
            select: '_id full_name img_url',
        }).limit(50);

        res.json(matchingMissionsFromDB);












        // res.json(filteredMissions);
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
router.get("/search", auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;
        let queryS = req.query.s;
        let searchReg = new RegExp(queryS, "i")
        const missions = await getMissionsByAgeAndGender(userId);
        const missionIdsFromAgeAndGender = missions.map((mission) => mission._id);
        const matchingMissionsFromDB = await MissionModel.find({
            $and: [
                {
                    _id: { $in: missionIdsFromAgeAndGender }, // Filter by mission IDs from getMissionsByAgeAndGender
                },
                {
                    $or: [
                        { title: searchReg },
                        { description: searchReg },
                        { address: searchReg },
                    ],
                },
            ],
        }).populate({
            path: 'user_creator',
            select: '_id full_name img_url',
        }).limit(50);

        res.json(matchingMissionsFromDB);


    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
    }
})

router.get("/createdByMe", auth, async (req, res) => {
    try {
        const userId = req.tokenData._id;

        const missionsCreatedByUser = await MissionModel.find({ user_creator: userId }).sort({ _id: -1 }).populate({
            path: 'interested',
            select: '_id full_name img_url'
        });
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

// DELETE route to delete a mission
router.delete("/:delId", auth, async (req, res) => {
    try {
        const delId = req.params.delId;
        const userId = req.tokenData._id;

        // Find the mission by ID and ensure the user is the creator
        const mission = await MissionModel.findOne({ _id: delId, user_creator: userId });
        if (req.tokenData.role == "admin") {
            data = await MissionModel.deleteOne({ _id: delId })
        }
        if (!mission) {
            return res.status(404).json({ error: 'Mission not found or you are not the creator' });
        }

        // Delete the mission
        await MissionModel.deleteOne({ _id: delId });

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error', err });
    }
});

// PUT route to edit a mission
router.put("/:editId", auth, async (req, res) => {
    try {
        const editId = req.params.editId;
        const userId = req.tokenData._id;
        const isAdmin = req.tokenData.role === "admin";

        // Find the mission by ID
        const mission = await MissionModel.findById(editId);

        // Check if the user is the creator or an admin
        if (!mission || (!isAdmin && mission.user_creator.toString() !== userId)) {
            return res.status(404).json({ error: 'Mission not found or you are not authorized to edit' });
        }

        // Update the mission
        await MissionModel.updateOne({ _id: editId }, req.body);

        // Fetch the updated mission data
        const updatedMission = await MissionModel.findById(editId);

        res.json(updatedMission);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error', err });
    }
});




router.patch('/taken', async (req, res) => {
    try {
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
        await UserModel.findByIdAndUpdate(userId, { $push: { missions: missionId } });

        console.log('Mission marked as taken. User missions updated.');

        res.json({ success: true });

    } catch (error) {
        console.error('Error in /mission/taken route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;