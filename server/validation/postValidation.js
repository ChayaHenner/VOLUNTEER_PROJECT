const Joi = require("joi");

exports.validPost = (_reqBody) => {
    let joiSchema = Joi.object({
        img_url: Joi.string().allow(null, ""),
        title: Joi.string().min(2).max(99).required(),
        description: Joi.string().min(2).max(99).required(),
        like_nums: Joi.number(),
        user_created: Joi.string().required(),


    })

    return joiSchema.validate(_reqBody);
}