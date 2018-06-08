(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["adGlobal"] = factory();
	else
		root["adGlobal"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ad_global_js__ = __webpack_require__(1);
['getDeployProfile', 'getQueryParams', 'matchProtocolTo', 'isVersionOrNewer'].forEach(function (method) {
	console.log('for each entry:', method);
	window[method] = __WEBPACK_IMPORTED_MODULE_0__src_ad_global_js__[method];
});
console.log('!!!!!! post:', window);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getDeployProfile"] = getDeployProfile;
/* harmony export (immutable) */ __webpack_exports__["getQueryParams"] = getQueryParams;
/* harmony export (immutable) */ __webpack_exports__["matchProtocolTo"] = matchProtocolTo;
/* harmony export (immutable) */ __webpack_exports__["isVersionOrNewer"] = isVersionOrNewer;
/* -- GLOBAL UTILITIES --------------------------------------------
	*
	*		These methods are tightly coupled to FAT index:
	*			- window.environments
	*			- window.adParams		
	*
	*/
function getDeployProfile(id) {
	for (var i = 0; i < environments.length; i++) {
		if (environments[i].id === id) return environments[i];
	}
	return false;
}

function getQueryParams() {
	var queryParams = {};
	var query = window.location.href.split('?');
	if (query.length > 1) {
		var params = query[1].split('&');
		for (var i in params) {
			var keyValue = params[i].split('=');
			if (keyValue.length == 2) queryParams[keyValue[0]] = decodeURIComponent(keyValue[1]);
		}
	}
	return queryParams;
}

function matchProtocolTo(_url) {
	var noProtocol = _url.search(/^\/\//) > -1;
	if (_url.search(/^http/) > -1 || noProtocol) {
		var _secure = window.location.href.search(/^https/) > -1 || adParams.forceHttps;
		var _httpProtocol = _secure ? 'https://' : 'http://';
		if (noProtocol) {
			_url = _url.replace(/^\/\//, _httpProtocol);
		}
		if (_url.search(/.*edgecastcdn/) > -1) {
			var _edgecastContext = _secure ? 'ne1.' + _url.match(/w(a|p)c/i)[0] + '.' : _url.match(/w(a|p)c\.[a-z0-9]*\./i)[0];
			_url = _httpProtocol + _edgecastContext + 'edgecastcdn' + _url.replace(/.*edgecastcdn/, '');
		} else if (_url.search(/.*paramount\.com/) > -1) {
			var _paramountContext = _secure ? 'paramountdlds-a.akamaihd.net' : 'downloads.paramount.com';
			_url = _httpProtocol + _paramountContext + _url.replace(/.*paramount\.com/, '');
		} else if (_url.search(/espn\.go\.com/) > -1 || _url.search(/secure\.espncdn\.com/) > -1) {
			_url = 'https://secure.espncdn.com' + _url.replace(/^.*\.com/, '');
		} else {
			_url = _url.replace(/^https?\:\/\//i, _httpProtocol);
		}
	}
	return _url;
}

// check version against
function isVersionOrNewer(version) {
	const semver = version.split('.').map(function (v) {
		return parseInt(v);
	});
	if (adParams.version.major > semver[0]) {
		return true;
	} else if (adParams.version.major === semver[0]) {
		if (adParams.version.minor > semver[1]) {
			return true;
		} else if (adParams.version.minor > semver[1]) {
			if (adParams.version.patch >= semver[2]) {
				return true;
			}
		}
	}
	return false;
}

/***/ })
/******/ ]);
});