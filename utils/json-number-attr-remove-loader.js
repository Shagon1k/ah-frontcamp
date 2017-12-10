module.exports = function(source) {
	let jsonObj = JSON.parse(source);

	Object.keys(jsonObj).forEach( key => {
		if (!isNaN(key)) {
			delete jsonObj[key]; 
		}
	});

	console.log(jsonObj);

	return jsonObj;
};