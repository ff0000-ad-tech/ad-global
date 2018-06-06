/*-- Red.Inject.ad-global.start --*/
/*-- Red.Inject.ad-global.end --*/
;['getDeployProfile', 'getQueryParams', 'matchProtocolTo', 'isVersionOrNewer'].forEach(method => {
	window[method] = adGlobal[method]
})
