const router = require('express').Router()
const { getAUserData, updateUser } = require('../controller/userController')

router.route('/:username').get(getAUserData)
router.route('/update/:username').post(updateUser)

module.exports = router