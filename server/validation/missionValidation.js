const Joi = require("joi");

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
            gender: Joi.string().valid('male', 'female')
        }).required(),
        fields: Joi.array().items(Joi.valid('children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology')),
        taken: Joi.boolean().default(false),
    });

    return joiSchema.validate(_reqBody);
};
