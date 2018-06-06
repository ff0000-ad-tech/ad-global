const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin

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
		libraryTarget: 'umd'
	}
	// copy UglifySettings
	// plugins: [
	// 	new UglifyJsPlugin({
	// 		uglifyOptions: {
	// 			drop_console: true,
	// 			mangle: false
	// 		}
	// 	})
	// ],
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.js$/,
	// 			use: [
	// 				{
	// 					loader: 'babel-loader',
	// 					options: {
	// 						plugins: babelOptions.plugins
	// 					}
	// 				}
	// 			]
	// 		}
	// 	]
	// }
}
