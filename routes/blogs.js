let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

const Blog = require('../models/Blog');

//All blogs page
router.get('/', ensureAuthenticated, (req, res) => {
	Blog.find({}, (error, blogs) => {
		if(!blogs) next(new Error('No blogs found :('));
		if (!error) {
			res.render('blogs/blogs', {blogs: blogs})
		} else {
			next(error);
		}
	});
});

//Particular blog page
router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	Blog.findById(id, (error, blog) => {
		if (!error) {
			res.render('blogs/blog', {blog: blog})
		} else {
			next(error);
		}
	});
});

//Add new blog
router.put('/:name', (req, res, next) => {
	const blog = new Blog({name: req.body.name, message: req.body.message});

	blog.save().then(() => {
		res.end('/');
	});
});

//Update existing blog's message
router.post('/update', (req, res, next) => {
	const id = req.body.id;
	const message = req.body.message;

	Blog.findByIdAndUpdate(id, {message: message}, (error, blog) => {
		if (!error) {
			res.redirect('/blogs' + blog.id);
		} else {
			next(error);
		}
	});
});

//Delete existing blog
router.delete('/:id', (req, res, next) => {
	const id = req.params.id;

	Blog.findById(id).remove(() => {
		res.redirect('/blogs');
	});
});

//Ensure whether user is logged in before response
function ensureAuthenticated(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;