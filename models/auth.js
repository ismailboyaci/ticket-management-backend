const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isSuperAdmin: {
        type: Boolean
    },
    profileImg: {
        type: String
    }
});

module.exports = mongoose.model("Auth", AuthSchema);