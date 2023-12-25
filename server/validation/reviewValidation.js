const Joi = require("joi");

exports.validReview = (_reqBody) => {
    let joiSchema = Joi.object({
        user_creater: Joi.string().min(2).max(99).allow(null, ""),
        title: Joi.string().min(2).max(99).required(),
        description: Joi.string().min(2).max(99).required(),
        rating: Joi.number()


    })

    return joiSchema.validate(_reqBody);
}