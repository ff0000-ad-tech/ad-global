import * as adGlobal from './src/ad-global.js'
;['getDeployProfile', 'getQueryParams', 'matchProtocolTo', 'isVersionOrNewer'].forEach(function(method) {
	console.log('for each entry:', method)
	window[method] = adGlobal[method]
})
console.log('!!!!!! post:', window)
