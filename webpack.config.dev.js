const common = require('./webpack.config.common.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	output: {
        publicPath: '/build/'
    },
	devServer: {
		hot: true,
		host: 'localhost',
		compress: true,
		open: true
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	watchOptions: {
  		aggregateTimeout: 300,
  		poll: 2000
	}
});