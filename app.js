let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let util = require('util');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/frontcamp');

//Application initizlize
let app = express();
let router = express.Router();

//Logger initialize
let logger = require('./logger.js');
app.use((req, res, next) => {
	logger.info(`Url: ${req.url}, method: ${req.method}`);
	next();
});

//Views Engine
app.set('views', './views/');
app.set('view engine', 'pug');

//Static folder settings
app.use(express.static(path.join(__dirname, 'public')));

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Express Session
app.use(session({
    secret: 'ololo',
    saveUninitialized: true,
    resave: true
}));

//Passport initizlise
app.use(passport.initialize());
app.use(passport.session());

//Global Vars
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

//Index page render
app.get('/', (req, res, next) => {
	res.render('index');
});

app.use('/blogs', require('./routes/blogs'));
app.use('/users', require('./routes/users'))

//Time page
app.get('/time', (req, res) => {
	res.send((new Date()).toLocaleTimeString());
});

//Default page render if no matches
app.use((req, res, next) => {
	res.render('default', { title: '404 error', errorMessage: 'No such page! :(' });
	next();
});

//Error handling middleware
app.use((error, req, res, next) => {
	console.error(error);
	res.status(error.status || 500);
	res.render('error', {
		title: 'Error :(',
		message: error.message,
		error: error
	});
});

//Start listen to application
app.listen(1337, () => {
 	console.log('Example app listening on port 1337!');
});