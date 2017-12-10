module.exports = function({ types: t }) {
	return {
		visitor: {
			CallExpression: function (path) {
				let callee = path.get('callee');
			  	if (callee.isMemberExpression()) {
			  		if ((callee.node.object.name === 'console') && 
			  			(callee.node.property.name === 'log')) {
			  			path.remove();
			  		}
			  	}
			}
		}
	};
}