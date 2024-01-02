const Joi = require("joi");

exports.validPost = (_reqBody) => {
    let joiSchema = Joi.object({
        img_url: Joi.string().allow(null, ""),
        title: Joi.string().min(1).max(99),
        description: Joi.string().min(1).max(99),
        like_nums: Joi.number(),
        user_created: Joi.string().required(),


    })

    return joiSchema.validate(_reqBody);
}