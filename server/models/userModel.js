const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  tz: String,
  full_name: String,
  description: String,
  email: {
    type: String,
    unique: true, // Ensures uniqueness for email field
  },
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
    type: [String],
    enum: ['children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'],
  },

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'reviews',
  }],
  missions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'missions',
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
