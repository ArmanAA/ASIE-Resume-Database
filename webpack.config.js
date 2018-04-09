var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './www/build');
var APP_DIR = path.resolve(__dirname, './src/client');

const config = {
	entry: {
		main: APP_DIR + '/index.js'
	},
	 output: {
		filename: 'bundle.js',
		path: BUILD_DIR,
	},
	mode: process.env.NODE_ENV || 'development',
	module: {
		rules: [
		{
			test: /(\.css|.scss)$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "sass-loader" // compiles Sass to CSS
			}]
		},
		{
			test: /\.(png|jpg)$/,
			loader: 'url-loader'
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: "babel-loader",
				options: {
					cacheDirectory: true,
					presets: ['react', 'es2015'], // Transpiles JSX and ES6
					plugins: ['transform-class-properties', 'transform-es2015-destructuring', 'transform-object-rest-spread']
				}
			}]
		}],
	},
	devServer: {
		historyApiFallback: true,
	}
};

module.exports = config;