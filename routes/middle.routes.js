const isLoggedIn = require('../middleware/isLoggedIn')

const router = require('express').Router()

router.get('/main', (req, res, next) => res.render('middle/main'))

router.get('/private', isLoggedIn, (req, res, next) => res.render('middle/private'))


module.exports = router