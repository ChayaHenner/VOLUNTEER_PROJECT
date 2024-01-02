const mongoose = require("mongoose");

let reviewSchema = new mongoose.Schema({
    user_creater: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the UserModel
    },
    title: String,
    description: String,
    rating: Number,
});

exports.ReviewModel = mongoose.model("reviews", reviewSchema);
