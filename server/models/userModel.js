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
    enum: ['Children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'],
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





