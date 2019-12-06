import path from 'path'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

export default {
	input: path.resolve(__dirname, 'dist-entry.js'),
	output: {
		file: path.resolve(__dirname, 'dist/ad-global.inline.js'),
		format: 'iife'
	},
	plugins: [
		terser({
			compress: {
				drop_console: true
			}
		}),
		babel({
			presets: ['@babel/preset-env']
		})
	]
}
