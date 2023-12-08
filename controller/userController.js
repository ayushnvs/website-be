const User = require('../db/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY

const getAUserData = async (req, res) => {
    const username = req.params.username
    const user = await User.findOne({ username })
    if (user) res.json({
        message: 'Success',
        ...user._doc,
        password: 'redacted'
    })
    else res.status(401).json({ message: 'User not available' })
}

const updateUser = async (req, res) => {
    const { profileImg } = req.body
    if (!profileImg || !profileImg.length) {
        res.status(401).json({error: 'Empty file'})
        return
    }
    User.findOne({ username: req.params.username }).then(usr => {
        usr.profileImg = profileImg

        usr.save()
            .then(() => res.json('Account Updated!'))
            .catch(err => res.status(400).json({error: err}))
    })
}

module.exports = {
    getAUserData,
    updateUser
}