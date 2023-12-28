const express = require("express");
const { auth } = require("../middlewares/auth");
const { ReviewModel } = require("../models/reviewModel");
const { UserModel } = require('../models/userModel');
const { validReview } = require("../validation/reviewValidation")
const router = express.Router();

//get all
router.get("/", async (req, res) => {
    try {
        let data = await ReviewModel.find({})
            .sort({ _id: -1 });

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err });
    }
});


router.post('/:idVol', async (req, res) => {
    try {
        const userToReviewId = req.params.idVol;
        const { user_creator, title, description, rating } = req.body;

        // Find the user to review by ID
        const userToReview = await UserModel.findById(userToReviewId);

        if (!userToReview) {
            return res.status(404).json({ error: 'User to review not found' });
        }

        // Create a new review
        const newReview = new ReviewModel({
            user_creator,
            title,
            description,
            rating,
        });

        // Save the review to the database
        await newReview.save();

        // Add the review to the user's reviews array
        userToReview.reviews.push(newReview._id);

        // Calculate the new average rating
        const existingRating = userToReview.rating || 0; // Handle the case when there's no existing rating
        const totalRating = existingRating * userToReview.reviews.length;
        const newTotalRating = totalRating + rating;
        const newAverageRating = newTotalRating / (userToReview.reviews.length + 1);

        // Update the user's rating
        userToReview.rating = newAverageRating;

        // Update the user in the database
        await UserModel.findByIdAndUpdate(userToReviewId, userToReview);

        res.json({ success: true, review: newReview });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/user/:userId', async (req, res) => {

    try {
        const user_creater = req.params.userId;
        console.log(user_creater);

        // Find the user by ID and populate the reviews array
        const user = await UserModel.findById(user_creater)
        console.log(user);
        if (user.reviews.length > 0) {
            await user.populate('reviews')
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ reviews: user.reviews });
    } catch (error) {
        console.error('Error in /reviews/user/:userId route:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;