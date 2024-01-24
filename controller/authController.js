const User = require('../db/userModel')
const bcrypt = require('bcrypt')
const { genAccessToken, genRefreshToken } = require('./tokenController')

const isUsernameAvailable = async (req, res) => {
    const { username } = req.body
    const isUserAvailable = await User.findOne({ username })

    if (!isUserAvailable) {
        res.json({ isAvailable: true })
    } else {
        res.json({ isAvailable: false })
    }
}

const handleLogin = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
        res.status(401).json({ error: 'Invalid username or password' })
    } else {
        bcrypt.compare(password, user.password).then(async result => {
            if (result) {
                const refreshToken = genRefreshToken(user.username)
                res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 2 * 60 * 60 * 1000 })
                res.json({
                    message: 'Login Successful',
                    token: genAccessToken(user.username)
                })
                user.refreshToken = refreshToken
                await user.save()
                
            } else {
                res.status(401).json({ error: 'Invalid username or password' })
            }
        })
    }
}

module.exports = {
    handleLogin,
    isUsernameAvailable
}