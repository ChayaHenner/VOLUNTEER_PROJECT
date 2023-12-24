const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret")

let missionSchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    user_creator: String,
    interested: [],
    requirements: {
        min_age: {
            type: Number,
            required: true,
        },
        max_age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: true,
        },
    },
    fields: {
        type: String,
        enum: ['Children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'],
    },
    taken: {
        type: Boolean, default: false,
    },

})

exports.MIssionModel = mongoose.model("missions", missionSchema);

exports.createToken = (_id, role) => {
    let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1440mins" });
    return token;
}

exports.validMission = (_reqBody) => {
    const joiSchema = Joi.object({
        title: Joi.string().min(2).max(99).required(),
        description: Joi.string().allow(null, ""),
        address: Joi.string().allow(null, ""),
        date: Joi.date().required(),
        time: Joi.string().required(),
        user_creator: Joi.string().min(2).max(99),
        requirements: Joi.object({
            min_age: Joi.number().required(),
            max_age: Joi.number().required(),
            gender: Joi.string().valid('male', 'female').required(),
        }).required(),
        fields: Joi.string().valid('Children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'),
        taken: Joi.boolean().default(false),
    });

    return joiSchema.validate(_reqBody);
};

exports.validLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required()
    })

    return joiSchema.validate(_reqBody);
}