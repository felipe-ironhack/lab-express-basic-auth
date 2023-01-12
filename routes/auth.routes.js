const router = require('express').Router();

const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

const saltRounds = 12;

// Display the Signup form
router.get('/signup', (req, res) => res.render('auth/signup'));

// Process Signup info
router.post('/signup', async (req, res, next) => {
	const { username, pw } = req.body;
	try {
		const userFromDB = await User.findOne({ username });

		if (userFromDB) {
      return res.render('auth/signup', { errorMessage: 'user already exists'})
    }

    const passwordHash = await bcryptjs.hash(pw, saltRounds);
    
    const newUser = await User.create({username, password: passwordHash}) 

    req.session.currentUser = newUser.username

    res.render('auth/success')

	} catch (err) {
		console.log(`Error creating the user in the DB ${err}`);
		next(err);
	}
});


// Login Form
router.get('/login', (req, res, next) => res.render('auth/login'))

// Process the Form
router.post('/login', async (req, res, next) => {
  const { username, pw } = req.body;

  const userFromDB = await User.findOne({ username })
  
  if (!userFromDB) return res.render('auth/login', { errorMessage: 'Wrong credentials' })

  const passwordCompare = await bcryptjs.compare(pw, userFromDB.password)

  if (!passwordCompare) return res.render('auth/login', { errorMessage: 'Wrong credentials' })

  req.session.currentUser = userFromDB.username

  res.render('auth/success')

})

// Logout
router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err)
    res.redirect('/')
  })
})

module.exports = router;
