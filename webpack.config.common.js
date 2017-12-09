const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

 module.exports = {
    entry: './app',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('./build/style.css')
    ]
 }