const router = require('express').Router()
const { handleLogout } = require('./../controller/logoutController')

router.route('/').get(handleLogout)

module.exports = router