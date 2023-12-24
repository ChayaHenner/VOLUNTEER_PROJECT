const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let reviewSchema = new mongoose.Schema({
    user_creater: String,
    title: String,
    description: String,
    rating: Number,

})

exports.ReviewModel = mongoose.model("reviews", reviewSchema);

exports.createToken = (_id, role) => {
    let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1440mins" });
    return token;
}

exports.validReview = (_reqBody) => {
    let joiSchema = Joi.object({
        user_creater: Joi.string().min(2).max(99).allow(null, ""),
        title: Joi.string().min(2).max(99).required(),
        description: Joi.string().min(2).max(99).required(),
        rating: Joi.number()


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