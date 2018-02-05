let mongoose = require('mongoose');

let BlogSchema = mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Need blog name']
	},
	message: {
		type: String
	}
});

let Blog = module.exports = mongoose.model('Blog', BlogSchema);