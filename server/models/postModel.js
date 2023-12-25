const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    img_url: String,
    title: String,
    description: String,
    like_nums: Number,

})

exports.PostModel = mongoose.model("posts", postSchema);

