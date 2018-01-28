let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

let blogsArray = [
	{
		id: 'blog1',
		name: 'Blog one',
		message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, laboriosam.'
	},
	{
		id: 'blog2',
		name: 'Blog two',
		message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, laboriosam.'
	}
];

router.get('/', function(req, res) {
	res.render('blogs', { blogs: blogsArray});
});

router.get('/:id', function(req, res, next) {
	let id = req.params.id,
		blog = blogsArray.find(el => el.id === id);

	if (blog) {
		res.render('blog', {blog: blog});
	} else {
		next();
	}
});

router.put('/:id', function(req, res, next) {
	blogsArray.push(req.body);
	res.end('/');
});

router.post('/', function(req, res, next) {
	console.log('POST BLOGS');				// What should we do here?
});

router.delete('/:id', function(req, res, next) {
	blogsArray = blogsArray.filter(el => el.id !== req.params.id);
	res.redirect('/blogs');
});

module.exports = router;