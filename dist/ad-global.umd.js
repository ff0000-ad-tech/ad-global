!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.adGlobal=r():e.adGlobal=r()}("undefined"!=typeof self?self:this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=0)}([function(e,r,t){"use strict";function n(e){for(var r=0;r<environments.length;r++)if(environments[r].id===e)return environments[r];return!1}function o(){var e={},r=window.location.href.split("?");if(r.length>1){var t=r[1].split("&");for(var n in t){var o=t[n].split("=");2==o.length&&(e[o[0]]=decodeURIComponent(o[1]))}}return e}function a(e){var r=e.search(/^\/\//)>-1;if(e.search(/^http/)>-1||r){var t=window.location.href.search(/^https/)>-1||adParams.forceHttps,n=t?"https://":"http://";if(r&&(e=e.replace(/^\/\//,n)),e.search(/.*edgecastcdn/)>-1){e=n+(t?"ne1."+e.match(/w(a|p)c/i)[0]+".":e.match(/w(a|p)c\.[a-z0-9]*\./i)[0])+"edgecastcdn"+e.replace(/.*edgecastcdn/,"")}else if(e.search(/.*paramount\.com/)>-1){var o=t?"paramountdlds-a.akamaihd.net":"downloads.paramount.com";e=n+o+e.replace(/.*paramount\.com/,"")}else e=e.search(/espn\.go\.com/)>-1||e.search(/secure\.espncdn\.com/)>-1?"https://secure.espncdn.com"+e.replace(/^.*\.com/,""):e.replace(/^https?\:\/\//i,n)}return e}function c(e){const r=e.split(".").map(function(e){return parseInt(e)});if(adParams.version.major>r[0])return!0;if(adParams.version.major===r[0]){if(adParams.version.minor>r[1])return!0;if(adParams.version.minor>r[1]&&adParams.version.patch>=r[2])return!0}return!1}Object.defineProperty(r,"__esModule",{value:!0}),r.getDeployProfile=n,r.getQueryParams=o,r.matchProtocolTo=a,r.isVersionOrNewer=c}])});