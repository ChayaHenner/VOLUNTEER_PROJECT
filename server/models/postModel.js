const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let postSchema = new mongoose.Schema({
    img_url: String,
    title: String,
    description: String,
    like_nums: Number,

})

exports.PostModel = mongoose.model("posts", postSchema);

exports.createToken = (_id, role) => {
    let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1440mins" });
    return token;
}

exports.validPost = (_reqBody) => {
    let joiSchema = Joi.object({
        img_url: Joi.string().min(2).max(99).allow(null, ""),
        title: Joi.string().min(2).max(99).required(),
        description: Joi.string().min(2).max(99).required(),
        like_nums: Joi.number()


    })

    return joiSchema.validate(_reqBody);
}

exports.validLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required()
    })

    return joiSchema.validate(_reqBody);
}