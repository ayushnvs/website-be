const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profileImg: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    socialMedia: {
        type: Map,
        of: String
    },
    position: {
        type: String,
    }
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile