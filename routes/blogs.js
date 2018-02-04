let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

const Blog = require('../models/blog.js')(mongoose);

router.get('/', (req, res) => {
	Blog.find({}, (error, blogs) => {
		if(!blogs) next(new Error('No blogs found :('));
		if (!error) {
			res.render('blogs', {blogs: blogs})
		} else {
			next(error);
		}
	});
});

router.get('/:id', (req, res, next) => {
	const id = req.params.id;

	Blog.findById(id, (error, blog) => {
		if (!error) {
			res.render('blog', {blog: blog})
		} else {
			next(error);
		}
	});
});

router.put('/:name', (req, res, next) => {
	const blog = new Blog({name: req.body.name, message: req.body.message});

	blog.save().then(() => {
		res.end('/');
	});
});

router.post('/update', (req, res, next) => {
	const id = req.body.id,
		message = req.body.message;

	Blog.findByIdAndUpdate(id, {message: message}, (error, blog) => {
		if (!error) {
			res.redirect('/blogs' + blog.id);
		} else {
			next(error);
		}
	});
});

router.delete('/:id', (req, res, next) => {
	const id = req.params.id;

	Blog.findById(id).remove(() => {
		res.redirect('/blogs');
	});
});

module.exports = router;