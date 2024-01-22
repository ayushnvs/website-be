const router = require('express').Router()
const Dictionary = require('../controller/dictController')

router.route('/add').post(Dictionary.handleAdd)
router.route('/update').post(Dictionary.handleUpdate)
router.route('/delete').post(Dictionary.handleDelete)

module.exports = router