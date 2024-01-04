const Joi = require("joi");

exports.validUser = (_reqBody) => {
    const joiSchema = Joi.object({
        tz: Joi.string().allow(null, ""),
        full_name: Joi.string().min(2).max(99).required(),
        description: Joi.string().allow(null, ""),
        email: Joi.string().min(2).max(99).email().required(),
        password: Joi.string().min(3).max(99).required(),
        phone: Joi.string().min(8).max(99).required(),
        address: Joi.string().allow(null, ""),
        birth_date: Joi.date().required(),
        img_url: Joi.string().allow(null, ""),
        rating: Joi.number(),
        gender: Joi.string().valid('male', 'female'),
        fields: Joi.array().items(Joi.valid('children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology')),
        posts: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        reviews: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        missions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        role: Joi.string().default("user"),
        active: Joi.boolean().default(true),
        blocked: Joi.boolean().default(false),
    });

    return joiSchema.validate(_reqBody);
};

exports.validUserEdit = (_reqBody) => {
    const joiSchema = Joi.object({
        tz: Joi.string().allow(null, ""),
        full_name: Joi.string().min(2).max(99).required(),
        description: Joi.string().allow(null, ""),
        email: Joi.string().min(2).max(99).email().required(),
        phone: Joi.string().min(8).max(99).required(),
        address: Joi.string().allow(null, ""),
        birth_date: Joi.date().required(),
        rating: Joi.number(),
        gender: Joi.string().valid('male', 'female'),
        fields: Joi.array().items(Joi.valid('children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology')),
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