





// // get all
// //search and only give missions that are not taken
// router.get("/getall", async (req, res) => {
//     try {
//         let data = await MissionModel.find({})
//             .sort({ _id: -1 });

//         res.json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "there error try again later", err });
//     }
// });

// // // Calculate user age based on birth_date
// function calculateUserAge(birthDate) {
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//         age--;
//     }
//     return age;
// }



// async function getMissionsByAgeAndGender(userId, searchQuery) {
//     try {
//         const user = await UserModel.findOne({ _id: userId });

//         if (!user) {
//             return { error: 'User not found' };
//         }

//         const age = calculateUserAge(user.birth_date);

//         let baseQuery = {
//             $and: [
//                 { 'requirements.min_age': { $lte: age } },
//                 { 'requirements.max_age': { $gte: age } },
//                 {
//                     $or: [
//                         { 'requirements.gender': user.gender },
//                         { 'requirements.gender': { $exists: false } }, // Unspecified gender
//                     ],
//                 },
//             ],
//         };

//         // Include the search condition if a search query is provided
//         if (searchQuery) {
//             baseQuery.title = new RegExp(searchQuery, 'i');

//         }

//         const missions = await MissionModel.find(baseQuery).sort({ _id: -1 }).populate({
//             path: 'user_creator',
//             select: '_id full_name'
//         });

//         // for (const mission of missions) {
//         //     let user1 = await UserModel.findOne({ _id: mission.user_creator._id });
//         //     mission.user_creator = `${mission.user_creator},${user1.full_name}`;
//         // }

//         return missions;
//     } catch (error) {
//         throw error;
//     }
// }

// // GET route for missions based on age, gender, and search
// router.get("/", auth, async (req, res) => {
//     try {
//         const userId = req.tokenData._id;
//         const searchQuery = req.query.s; // Retrieve the search query from the request
//         console.log('Search Query:', searchQuery); // Log the search query for debugging

//         const missions = await getMissionsByAgeAndGender(userId, searchQuery);
//         // missions = await missions.populate({
//         //     path: 'user_creator',
//         //     select: '_id full_name'
//         // })
//         res.json(missions);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "Internal Server Error", err });
//     }
// });

// // // Function to get missions based on age and gender
// async function getMissionsByAgeAndGender(userId) {
//     try {
//         const user = await UserModel.findOne({ _id: userId })
//         // .populate('users');
//         if (!user) {
//             return { error: 'User not found' };
//         }

//         const age = calculateUserAge(user.birth_date);

//         const missions = await MissionModel.find({
//             $and: [
//                 { 'requirements.min_age': { $lte: age } },
//                 { 'requirements.max_age': { $gte: age } },
//                 {
//                     $or: [
//                         { 'requirements.gender': user.gender },
//                         { 'requirements.gender': { $exists: false } }, // Unspecified gender
//                     ],
//                 },
//             ],
//         }).sort({ _id: -1 }).populate({
//             path: 'user_creator',
//             select: '_id full_name'
//         });
//         console.log(missions);


//         // for (const mission of missions) {
//         //     let user1 = await UserModel.findOne({ _id: mission.user_creator });
//         //     console.log(mission);
//         //     mission.user_creator = `${mission.user_creator},${user1.full_name}`;
//         //     // mission = { ...mission, userName: user1.full_name }
//         //     console.log(mission);
//         // }
//         return missions
//     }
//     catch (error) {
//         throw error;
//     }
// }

// // GET route for missions based on age and gender
// router.get("/", auth, async (req, res) => {
//     try {
//         const userId = req.tokenData._id;
//         const missions = await getMissionsByAgeAndGender(userId);

//         res.json(missions);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "Internal Server Error", err });
//     }
// });

// // GET route for missions based on age, gender, date, and time range
// router.get("/byDateTime", auth, async (req, res) => {
//     try {
//         const userId = req.tokenData._id;
//         const missionsByAgeAndGender = await getMissionsByAgeAndGender(userId);

//         // Extract date and time range from request query
//         const startDate = new Date(req.query.startDate);
//         const endDate = new Date(req.query.endDate);

//         const startTime = req.query.startTime;
//         const endTime = req.query.endTime;

//         // Filter missions by date and time range
//         const filteredMissions = missionsByAgeAndGender.filter((mission) => {
//             const missionDate = new Date(mission.date);
//             const missionTime = mission.time;

//             const isDateInRange = missionDate >= startDate && missionDate <= endDate;
//             const isTimeInRange = missionTime >= startTime && missionTime <= endTime;

//             return isDateInRange && isTimeInRange;
//         });

//         res.json(filteredMissions);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "Internal Server Error", err });
//     }
// });



// //get top ten
// router.get("/topTen", async (req, res) => {
//     let perPage = req.query.perPage || 10; // Change perPage to 10
//     let page = req.query.page || 1;

//     try {
//         let data = await MissionModel.find({})
//             .limit(perPage)
//             .skip((page - 1) * perPage)
//             .sort({ _id: -1 });

//         res.json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "there error try again later", err });
//     }
// });

// // /missions/search?s=
// router.get("/search", async (req, res) => {
//     try {
//         let queryS = req.query.s;
//         // מביא את החיפוש בתור ביטוי ולא צריך את כל הביטוי עצמו לחיפוש
//         // i -> מבטל את כל מה שקשור ל CASE SENSITVE
//         let searchReg = new RegExp(queryS, "i")
//         let data = await MissionModel.find({ title: searchReg })
//             .populate({
//                 path: 'user_creator',
//                 select: '_id full_name'
//             }).limit(50)
//         res.json(data);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "there error try again later", err })
//     }
// })




// //קוד של צט גיפיטי לא עובד...
// router.get("/", auth, async (req, res) => {
//     try {
//         const userId = req.tokenData._id;
//         const searchQuery = req.query.s;

//         const missions = await getMissionsByAgeAndGender(userId, searchQuery);

//         res.json(missions);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ msg: "Internal Server Error", err });
//     }
// });

// async function getMissionsByAgeAndGender(userId, searchQuery) {
//     try {
//         const user = await UserModel.findOne({ _id: userId });
//         if (!user) {
//             return { error: 'User not found' };
//         }

//         const age = calculateUserAge(user.birth_date);

//         const baseQuery = {
//             'requirements.min_age': { $lte: age },
//             'requirements.max_age': { $gte: age },
//             $or: [
//                 { 'requirements.gender': user.gender },
//                 { 'requirements.gender': { $exists: false } },
//             ],
//             taken: false, // Exclude taken missions
//         };

//         const matchQuery = searchQuery
//             ? {
//                 $match: {
//                     ...baseQuery,
//                     'title': { $regex: searchQuery, $options: 'i' }, // Adjust 'title' to the actual field you want to search
//                 },
//             }
//             : { $match: baseQuery };

//         const missions = await MissionModel.aggregate([
//             matchQuery,
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'user_creator',
//                     foreignField: '_id',
//                     as: 'user_creator',
//                 },
//             },
//             { $unwind: '$user_creator' },
//             { $sort: { _id: -1 } },
//         ]);

//         return missions;
//     } catch (error) {
//         throw error;
//     }
// }
