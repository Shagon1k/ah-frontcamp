let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let util = require('util');

let app = express();
let router = express.Router();

app.set('views', './views/');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
	console.log(req.url);
	console.log(req.method);
 	console.log('Time:', (new Date()).toLocaleTimeString());
 	next();
})

app.get('/', function (req, res, next) {
 	res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/blogs', require('./routes/blogs'));

app.get('/time', function(req, res) {
	res.send((new Date()).toLocaleTimeString());
});

app.use(function(req, res, next) {
	res.render('default', { title: '404 error', errorMessage: 'No such page! :(' });
	next();
})

app.listen(1488, function () {
 	console.log('Example app listening on port 1488!');
});