let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

//Register form
router.get('/register', (req, res) => {
	res.render('users/register');
});

//Login form
router.get('/login', (req, res) => {
	res.render('users/login');
});

//Passport strategy
passport.use(new LocalStrategy((username, password, done) => {
	User.getUserByUsername(username, (error, user) => {
		if (error) {
			throw error;
		}
		if (!user) {
			return done(null, false, {message: 'Unknown User'});
		}

		User.checkPassword(password, user.password, (error, isMatch) => {
			if (error) {
				throw error;
			}
			if (isMatch) {
				return done(null, user);
			} else {
				return done(null, false, {message: 'Invalid password'});
			}
		});
	});
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.getUserById(id, (error, user) => {
		done(error, user);
	})
});

//Register new user
router.post('/register', (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;

	if (!username || !password) {
		next(new Error('All required fields havent been filled'));
	}
	if (password !== password2) {
		next(new Error('Passwords dont match'));
	}

	User.getUserByUsername(username, (error, user) => {
		if (user) {
			next(new Error('User already exists'));
		} else {
			let newUser = new User({
				username: username,
				password: password,
				email: email
			});

			User.createUser(newUser, (error, user) => {
				if (error) {
					next(error);
				}
				else {
					console.log(`New user ${username} has been created!`);
				}
			})
			res.redirect('/users/login');
		}
	});
});

////Login existing user
router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login'}));

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
})


module.exports = router;