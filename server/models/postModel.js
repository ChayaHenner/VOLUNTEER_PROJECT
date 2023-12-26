const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    img_url: String,
    title: String,
    description: String,
    like_nums: Number,
    user_created: String,
})

exports.PostModel = mongoose.model("posts", postSchema);

