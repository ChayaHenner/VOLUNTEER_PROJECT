const mongoose = require("mongoose");

let missionSchema = new mongoose.Schema({
    title: String,
    description: String,
    address: String,
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    user_creator: String,
    interested: [],
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
            required: true,
        },
    },
    fields: {
        type: String,
        enum: ['Children', 'kitchen', 'driving', 'elderly', 'cleanup', 'studies', 'medical', 'technology'],
    },
    taken: {
        type: Boolean, default: false,
    },

})

exports.MissionModel = mongoose.model("missions", missionSchema);

