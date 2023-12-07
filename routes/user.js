const router = require('express').Router()
const User = require('../db/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_KEY

router.route('/:username').get(async (req, res) => {
    const username = req.params.username
    const user = await User.findOne({ username })
    if (user) res.json({
        message: 'Success',
        ...user._doc,
        password: 'redacted'
    })
    else res.status(401).json({ message: 'User not available' })
})

router.route('/useravailable').post(async (req, res) => {
    const { username } = req.body
    const isUserAvailable = await User.findOne({ username })

    if (!isUserAvailable) {
        res.json({ isAvailable: true })
    } else {
        res.json({ isAvailable: false })
    }
})

router.route('/register').post(async (req, res) => {
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
})

router.route('/login').post(async (req,res) => {
    const { username, password } = req.body
    const user = await User.findOne({username})

    if (!user || user.username != username) {
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
})

router.route('/update/:username').post(async (req, res) => {
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
})

module.exports = router