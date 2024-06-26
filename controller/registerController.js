const User = require('../db/userModel')
const Profile = require('../db/profileModel')
const bcrypt = require('bcrypt')
const { genAccessToken, genRefreshToken } = require('./tokenController')

const registerNewUser = async (req, res) => {
    const { name, email, username, password } = req.body
    const saltRounds = 10
    const isUserAvailable = await User.findOne({ username })

    if (!isUserAvailable) {
        bcrypt.hash(password, saltRounds).then((hash) => {
            const user = new User({ name, email, username, password: hash })
            const profile = new Profile({ name, email, username })
            user.save()
                .then(async () => {
                    const refreshToken = genRefreshToken(user.username)
                    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2 * 60 * 60 * 1000 })
                    res.json({
                        message: 'Registration Successful',
                        token: genAccessToken(user.username)
                    })
                    user.refreshToken = refreshToken
                    await user.save()
                    await profile.save()
                })
                .catch(err => res.status(400).json('Error: ' + err))
        })
    } else {
        res.status(400).json({ error: 'username not available' })
    }
}

module.exports = {
    registerNewUser
}