const mongoose = require("mongoose");

let reviewSchema = new mongoose.Schema({
    user_creater: String,
    title: String,
    description: String,
    rating: Number,

})

exports.ReviewModel = mongoose.model("reviews", reviewSchema);

