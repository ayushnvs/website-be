const router = require('express').Router()
const register = require('../controller/registerController')
const auth = require('../controller/authController')

router.route('/useravailable').post(auth.isUsernameAvailable)
router.route('/register').post(register.registerNewUser)
router.route('/login').post(auth.handleLogin)

module.exports = router