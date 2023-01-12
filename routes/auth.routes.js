const router = require('express').Router()

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

module.exports = router