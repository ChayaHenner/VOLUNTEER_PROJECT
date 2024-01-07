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
  img_url: String,
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
