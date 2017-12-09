const common = require('./webpack.config.common.js');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	devServer: {
		inline: true,
		host: 'localhost',
		compress: true,
		open: true
	},
	watchOptions: {
  		aggregateTimeout: 300,
  		poll: 2000
	}
});