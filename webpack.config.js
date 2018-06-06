const path = require('path')
const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IndexPlugin = require('@ff0000-ad-tech/wp-plugin-index')
const log = require('@ff0000-ad-tech/debug').debug('webpack.config.js')

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

module.exports = env => {
	return {
		entry: path.resolve(__dirname, 'src/ad-global.js'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'ad-global.umd.js',
			library: 'adGlobal',
			libraryTarget: 'umd'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								plugins: babelOptions.plugins
							}
						}
					]
				}
			]
		},
		plugins: [
			new UglifyJsPlugin({
				uglifyOptions: {
					drop_console: true
				}
			}),
			new HtmlWebpackPlugin(),
			new IndexPlugin(null, {
				source: {
					path: `./tmpl/ad-global.js`
				},
				inject: {
					'ad-global': './dist/ad-global.umd.js'
				},
				output: {
					path: `./dist/ad-global.inline.js`
				}
			})
		]
	}
}
