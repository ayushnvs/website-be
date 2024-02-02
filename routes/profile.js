const router = require('express').Router()
const profile = require('./../controller/profileController')

router.route('/').post(profile.getProfileInfo)
router.route('/update/:username').post(profile.updateProfile)
router.route('/create').post(profile.createProfile)

module.exports = router