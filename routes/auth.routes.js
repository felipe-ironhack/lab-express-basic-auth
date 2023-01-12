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

    console.log(newUser)
    res.render('auth/success')
	} catch (err) {
		console.log(`Error creating the user in the DB ${err}`);
		next(err);
	}
});

module.exports = router;
