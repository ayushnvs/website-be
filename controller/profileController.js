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
    const { username, socialMedia } = req.body
    const profile = Profile.findOne({ username })
    if (socialMedia) {
        profile.socialMedia = socialMedia
    }
    await profile.save()
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