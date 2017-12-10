const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

 module.exports = {
    entry: './app',
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.json/,
                use: ['json-loader', 'json-number-attr-remove']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    resolveLoader: {
        alias: {
            'json-number-attr-remove': path.join(__dirname, './utils/json-number-attr-remove-loader.js') 
        }
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
 }