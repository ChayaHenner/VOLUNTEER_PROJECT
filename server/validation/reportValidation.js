const Joi = require("joi");

exports.validReport = (_reqBody) => {
    const joiSchema = Joi.object({
            id_reporter: Joi.string().required(),
            id_reportee: Joi.string().required(),
            Message: Joi.string().required(),
          });
    return joiSchema.validate(_reqBody);
};
