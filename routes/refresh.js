const router = require('express').Router()
const { handleRefreshToken } = require('./../controller/tokenController')

router.route('/').get(handleRefreshToken)

module.exports = router