const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  tz: {
    type: String,
    unique: true, // Ensures uniqueness for email field
  },
  full_name: String,
  description: String,
  email: {
    type: String,
    unique: true, // Ensures uniqueness for email field
  },
  password: String,
  phone: String,
  address: {
    name: {
      type: String,
    },
    mapLink: {
      type: String,
    },
  },
  birth_date: Date,
  img_url: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/volunteer-project-3a891.appspot.com/o/image_1704634461855?alt=media&token=9fb973a3-6414-4663-9339-67f8004e5828"
  },
  rating: {
    type: Number, default: 0
  },
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
    ref: 'posts',
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
