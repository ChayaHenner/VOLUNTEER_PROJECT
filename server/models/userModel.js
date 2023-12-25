const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  tz: String,
  full_name: String,
  description: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  birth_date: Date,
  img_url: String,
  rating: Number,
  date_created: {
    type: Date, default: Date.now()
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  fields: {
    type: String,
    enum: ['children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'],
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviews',
  }],
  missions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Missions',
  }],

  role: {
    type: String, default: "user"
  },
  active: {
    type: Boolean, default: true,
  },
  blocked: {
    type: Boolean, default: false,
  },

})

exports.UserModel = mongoose.model("users", userSchema);

exports.createToken = (_id, role) => {
  let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
}
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
    fields: Joi.string().valid('Children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'),
    posts: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    reviews: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    missions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
    role: Joi.string().default("user"),
    active: Joi.boolean().default(true),
    blocked: Joi.boolean().default(false),
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