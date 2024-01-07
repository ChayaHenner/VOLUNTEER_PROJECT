const mongoose = require("mongoose");

let missionSchema = new mongoose.Schema({
    title: String,
    description: String,
    address: {
        name: {
          type: String,
        },
        mapLink: {
          type: String,
        },
      },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    user_creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    interested: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    requirements: {
        min_age: {
            type: Number,
            required: true,
        },
        max_age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
            required: false,
        },
    },
    fields: {
        type: [String],
        enum: ['children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'],
    },
    taken: {
        type: Boolean, default: false,
    },

})

exports.MissionModel = mongoose.model("missions", missionSchema);

