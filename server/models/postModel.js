const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    img_url: String,
    title: String,
    description: String,
    like_num:{type: Number, default: 0},
    like_user: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "users",
    },
    user_created: String,
})

exports.PostModel = mongoose.model("posts", postSchema);

