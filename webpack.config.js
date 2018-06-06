const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelOptions = {
	presets: [
		[
			'env',
			{
				loose: true
			}
		]
	],
	plugins: ['transform-class-properties']
}

module.exports = {
	entry: path.resolve(__dirname, 'index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'ad-global.min.js',
		library: 'getDeployProfile',
		libraryTarget: 'var'
	},
	module: {
		rules: [
			{
				test: require.resolve(__dirname, 'index.js'),
				use: 'imports-loader?this=>window'
			},
			{
				test: require.resolve(__dirname, 'globals.js'),
				use: 'exports-loader?getDeployProfile'
			}
		]
	},
	plugins: [
		// 	new UglifyJsPlugin({
		// 		uglifyOptions: {
		// 			drop_console: true,
		// 			mangle: false
		// 		}
		// 	})
		new HtmlWebpackPlugin()
	]
}
