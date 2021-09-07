/* -- GLOBAL UTILITIES --------------------------------------------
 *
 *		These methods are added to the window scope in ad index.
 *
 */
export function getQueryParams() {
	var queryParams = {}
	var query = window.location.href.split('?')
	if (query.length > 1) {
		var params = query[1].split('&')
		for (var i in params) {
			var keyValue = params[i].split('=')
			if (keyValue.length == 2) queryParams[keyValue[0]] = decodeURIComponent(keyValue[1])
		}
	}
	return queryParams
}

// check version against
export function isVersionOrNewer(version) {
	const semver = version.split('.').map(function(v) {
		return parseInt(v)
	})
	if (adParams.version.major > semver[0]) {
		return true
	} else if (adParams.version.major === semver[0]) {
		if (adParams.version.minor > semver[1]) {
			return true
		} else if (adParams.version.minor > semver[1]) {
			if (adParams.version.patch >= semver[2]) {
				return true
			}
		}
	}
	return false
}
