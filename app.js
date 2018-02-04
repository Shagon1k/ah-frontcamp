let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let util = require('util');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/frontcamp');

let app = express();
let router = express.Router();

let logger = require('./logger.js');

app.set('views', './views/');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    logger.info(`Url: ${req.url}, method: ${req.method}`);
 	next();
});

app.get('/', (req, res, next) => {
 	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/blogs', require('./routes/blogs'));

app.get('/time', (req, res) => {
	res.send((new Date()).toLocaleTimeString());
});

app.use((req, res, next) => {
	res.render('default', { title: '404 error', errorMessage: 'No such page! :(' });
	next();
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(error.status || 500);
	res.render('error', {
		title: 'Error :(',
		message: error.message,
		error: error
	});
});

app.listen(1337, () => {
 	console.log('Example app listening on port 1337!');
});