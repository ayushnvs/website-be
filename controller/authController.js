const User = require('../db/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY

const isUsernameAvailable = async (req, res) => {
    const { username } = req.body
    const isUserAvailable = await User.findOne({ username })

    if (!isUserAvailable) {
        res.json({ isAvailable: true })
    } else {
        res.json({ isAvailable: false })
    }
}

const handleLogin = async (req,res) => {
    const { username, password } = req.body
    const user = await User.findOne({username})

    if (!user) {
        res.status(401).json({ error: 'Invalid username or password' })
    } else {
        bcrypt.compare(password, user.password).then(result => {
            if (result) {
                jwt.sign({user}, jwtKey, {expiresIn: '2h'}, (error, token) => {
                    // console.log('user', JSON.stringify(user))
                    if (token) {
                        res.json({
                            ...user._doc, 
                            message:'Login Successful', 
                            password: 'redacted',
                            token
                        })
                    }
                    else {
                        res.json({error: 'Something went wrong. Please refresh and try again.'})
                    }
                })
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