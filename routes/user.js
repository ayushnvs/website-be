const router = require('express').Router()
const register = require('../controller/registerController')
const auth = require('../controller/authController')
const { getAUserData, updateUser } = require('./../controller/userController')


router.route('/:username').get(getAUserData)
router.route('/useravailable').post(auth.isUsernameAvailable)
router.route('/register').post(register.registerNewUser)
router.route('/login').post(auth.handleLogin)

router.route('/update/:username').post(updateUser)

module.exports = router