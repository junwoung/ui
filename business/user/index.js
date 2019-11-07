let router = require('express').Router()
let ctrl = require('./controller')

router.get('/list', ctrl.getList)

module.exports = router