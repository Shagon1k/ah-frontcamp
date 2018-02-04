module.exports = (mongoose) => {
	return mongoose.model('Blog',
		{
			name: {type: String, unique: true, required: [true, 'Need blog name']},
		 	message: String
		 });
}