const Profile = require('./../db/profileModel')

const getProfileInfo = async (req, res) => {
    const { username } = req.body
    const profile = await Profile.findOne({ username })
    if (profile) res.json({
        message: 'Success',
        ...profile._doc
    })
    else res.status(401).json({ message: 'Profile data not available' })
}

const updateProfile = async (req, res) => {
    const username = req.params.username
    const { name, email, profileImg, phone, address, socialMedia } = req.body
    const profile = await Profile.findOne({ username })
    if (profile) {
        if (name) profile.name = name
        if (email) profile.email = email
        if (profileImg) profile.profileImg = profileImg
        if (phone) profile.phone = phone
        if (address) profile.address = address
        if (socialMedia) profile.socialMedia = socialMedia
        profile.save()
            .then(() => res.sendStatus(200))
    }
    else res.sendStatus(401)
}

const createProfile = async (req, res) => {
    console.log("Creating profile")
    const { username, name, email, socialMedia } = req.body
    const profile = new Profile({ username, name, email, socialMedia })
    profile.save()
        .then(() => res.sendStatus(200))
}

module.exports = {
    getProfileInfo,
    updateProfile,
    createProfile
}