module.exports = function({ types: t }) {
	return {
	  visitor: {
	    MemberExpression: function (path) {
	    	if (path.node.object && path.node.object.type === "MemberExpression" && path.node.object.property.name === "dataset") {
	    		let name = 'data-' + dasherize(path.node.property.name),
	    				argument = new t.stringLiteral(name);
	    		//Check whether we set data or get it. If parent has "right" sibling, then its set.
	    		if (path.parent.right) {
	    			let newValue = 	new t.stringLiteral(path.parent.right.value),
	    				call = new t.CallExpression(path.node.object, [argument, newValue]);
	    			path.node.object.property.name = 'setAttribute';
	    			path.parentPath.replaceWith(call);
	    		} else {
	    			let call = new t.CallExpression(path.node.object, [argument]);
	    			path.node.object.property.name = 'getAttribute';
	    			path.replaceWith(call);
	    		}
	    		
	    	}
	    }
	  }
	};

	function dasherize(str) {
		return str.replace(/[A-Z]/g, function(char, index) {
			return (index !== 0 ? '-' : '') + char.toLowerCase();
		});
	}
}