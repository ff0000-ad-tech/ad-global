/* -- GLOBAL UTILITIES --------------------------------------------
 *
 *		These methods are tightly coupled to FAT index:
 *			- window.environments
 *			- window.adParams
 *
 */
export function getDeployProfile(id) {
	// console.log('ad-global > getDeployProfile()')
	for (var i = 0; i < environments.length; i++) {
		if (environments[i].id === id) return environments[i]
	}
	return false
}

export function getQueryParams() {
	// console.log('ad-global > getQueryParams()')
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

export function matchProtocolTo(_url) {
	// console.log('ad-global > matchProtocolTo()')
	var noProtocol = _url.search(/^\/\//) > -1
	if (_url.search(/^http/) > -1 || noProtocol) {
		var _secure = window.location.href.search(/^https/) > -1 || (window.adParams && adParams.forceHttps)
		var _httpProtocol = _secure ? 'https://' : 'http://'
		if (noProtocol) {
			_url = _url.replace(/^\/\//, _httpProtocol)
		}
		if (_url.search(/.*edgecastcdn/) > -1) {
			var _edgecastContext = _secure ? 'ne1.' + _url.match(/w(a|p)c/i)[0] + '.' : _url.match(/w(a|p)c\.[a-z0-9]*\./i)[0]
			_url = _httpProtocol + _edgecastContext + 'edgecastcdn' + _url.replace(/.*edgecastcdn/, '')
		} else if (_url.search(/.*paramount\.com/) > -1) {
			var _paramountContext = _secure ? 'paramountdlds-a.akamaihd.net' : 'downloads.paramount.com'
			_url = _httpProtocol + _paramountContext + _url.replace(/.*paramount\.com/, '')
		} else if (_url.search(/espn\.go\.com/) > -1 || _url.search(/secure\.espncdn\.com/) > -1) {
			_url = 'https://secure.espncdn.com' + _url.replace(/^.*\.com/, '')
		} else {
			_url = _url.replace(/^https?\:\/\//i, _httpProtocol)
		}
	}
	return _url
}

// check version against
export function isVersionOrNewer(version) {
	// console.log('ad-global > isVersionOrNewer()')
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

export function fbaDataToBlobs(dataRaw) {
	// console.log("_addFbaSubLoads()", loader)

	// Conversion between uint8s and uint32s.
	let uint8 = new Uint8Array(4)
	let uint32 = new Uint32Array(uint8.buffer)

	// start after = signature(8 bytes) + IHDR(25 bytes) + fbAc(16 bytes total, but only 11: size,type,content-1 )
	let idx = 44

	const chunkTotal = new Uint8Array(dataRaw, idx, 1)[0]
	//console.log( 'number of images as chunks:', chunkTotal )

	// skip over rest of fbAc chunk: count value byte + CRC 4 bytes
	idx += 5

	const blobs = []
	for (let i = 0; i < chunkTotal; i++) {
		// size, type, content, crc
		// get the size of next chunk as on UintArray
		let sizeOfChunk = new Uint8Array(dataRaw, idx, 4)

		// Read the length of the current chunk, which is stored as a Uint32.
		// this one has to be a loop, as values get assigned to uint8, that changes buffer of uint32
		// also, the values must be set reversed, henced the count down loop
		let up = 4
		for (var k = 0; k < 4; k++) {
			//console.log( k, up, sizeOfChunk[k] )
			uint8[--up] = sizeOfChunk[k]
		}

		// all chunk data NOT including the type
		let length = uint32[0]

		idx += 7

		// Get the chunk type in ASCII, only last character really matters
		let type = String.fromCharCode.apply(String, new Uint8Array(dataRaw, idx++, 1))

		// console.log('\ttype:', type, '\tlength:', length)
		let fileNameLengthArray = new Uint8Array(dataRaw, idx + 3, 1)
		let fileNameLength = fileNameLengthArray[0] || 0 // default to zero incase array fails? maybe unnecessary

		let nameBuffer = new Uint8Array(dataRaw, idx + 4, fileNameLength)
		let fileName = String.fromCharCode.apply(String, nameBuffer)

		// first add to the file name length 4 bytes: file name length byte count
		fileNameLength += 4

		// offset the array start and length by the file name length
		let chunkData = new Uint8Array(dataRaw, idx + fileNameLength, length - fileNameLength)
		// NOTE: ArrayBuffer.slice() does not exist in IE10, so have to do it manually inline
		//var chunkData = new Uint8Array(chunk.buffer.slice(4))

		// skip over the content AND skip over the CRC value by incrementing by 4 bytes
		idx += length + 4

		let fileNameSplit = fileName.split('.')
		const assetName = fileNameSplit[0]
		const fileType = fileNameSplit[1]
		//var blobFileType = '';// 'application/octet-stream';
		let blobFileType
		if (type === 'f') {
			blobFileType = 'application/' + (fileNameSplit[1] === 'ttf' ? 'x-font-ttf' : `font-${fileNameSplit[1]}`)
		} else {
			blobFileType = 'image/' + (fileNameSplit[1] == 'svg' ? 'svg+xml' : fileNameSplit[1])
		}
		let blob = new Blob([chunkData], { type: blobFileType })
		let url = URL.createObjectURL(blob)
		// url will be ~ blob:32c3c7af-ef04-414f-a073-685602fe8a28
		blobs.push({ path: assetName, src: url, fileType })
	}
	return blobs
}
