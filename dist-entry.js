import * as adGlobal from './src/ad-global.js'
Object.keys(adGlobal).forEach(function(key) {
	var method = adGlobal[key]
	window[key] = method
})
