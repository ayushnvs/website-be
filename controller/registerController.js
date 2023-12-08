const User = require('../db/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY

const registerNewUser = async (req, res) => {
    const { name, email, username, password } = req.body
    const saltRounds = 10
    const isUserAvailable = await User.findOne({ username })

    if (!isUserAvailable) {
        bcrypt.hash(password, saltRounds).then((hash) => {
            const user = new User({ name, email, username, password: hash })
            user.save()
                .then(() => {
                    jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (error, token) => {
                        if (token) {
                            res.status(201).json({
                                message: 'Registration Successful',
                                ...user._doc,
                                password: 'redacted',
                                token
                            })
                        } else {
                            res.json({ error: 'Something went wrong. Please refresh and try again.' })
                        }
                    })
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