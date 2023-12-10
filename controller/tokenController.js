const jwt = require('jsonwebtoken')
const User = require('../db/userModel')
require('dotenv').config()

const genAccessToken = (username) => {
    return jwt.sign(
        { username: username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30s' }
    )
}

const genRefreshToken = (username) => {
    return jwt.sign(
        { username: username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '2h' }
    )
}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ refreshToken })
    if (!foundUser) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log('Working',decoded)
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken = genAccessToken(decoded.username)
            console.log(accessToken)
            res.json({ token: accessToken })
        }
    )
}

module.exports = { genAccessToken, genRefreshToken, handleRefreshToken }