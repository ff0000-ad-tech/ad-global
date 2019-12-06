!function(){"use strict";var r=Object.freeze({__proto__:null,getDeployProfile:function(r){for(var a=0;a<environments.length;a++)if(environments[a].id===r)return environments[a];return!1},getQueryParams:function(){var r={},a=window.location.href.split("?");if(a.length>1){var e=a[1].split("&");for(var n in e){var t=e[n].split("=");2==t.length&&(r[t[0]]=decodeURIComponent(t[1]))}}return r},matchProtocolTo:function(r){var a=r.search(/^\/\//)>-1;if(r.search(/^http/)>-1||a){var e=window.location.href.search(/^https/)>-1||window.adParams&&adParams.forceHttps,n=e?"https://":"http://";if(a&&(r=r.replace(/^\/\//,n)),r.search(/.*edgecastcdn/)>-1){var t=e?"ne1."+r.match(/w(a|p)c/i)[0]+".":r.match(/w(a|p)c\.[a-z0-9]*\./i)[0];r=n+t+"edgecastcdn"+r.replace(/.*edgecastcdn/,"")}else if(r.search(/.*paramount\.com/)>-1){r=n+(e?"paramountdlds-a.akamaihd.net":"downloads.paramount.com")+r.replace(/.*paramount\.com/,"")}else r=r.search(/espn\.go\.com/)>-1||r.search(/secure\.espncdn\.com/)>-1?"https://secure.espncdn.com"+r.replace(/^.*\.com/,""):r.replace(/^https?\:\/\//i,n)}return r},isVersionOrNewer:function(r){var a=r.split(".").map((function(r){return parseInt(r)}));if(adParams.version.major>a[0])return!0;if(adParams.version.major===a[0]){if(adParams.version.minor>a[1])return!0;if(adParams.version.minor>a[1]&&adParams.version.patch>=a[2])return!0}return!1},fbaDataToBlobs:function(r){var a=new Uint8Array(4),e=new Uint32Array(a.buffer),n=44,t=new Uint8Array(r,n,1)[0];n+=5;for(var o=[],i=0;i<t;i++){for(var c=new Uint8Array(r,n,4),s=4,p=0;p<4;p++)a[--s]=c[p];var f=e[0];n+=7;var m=String.fromCharCode.apply(String,new Uint8Array(r,n++,1)),l=new Uint8Array(r,n+3,1)[0]||0,d=new Uint8Array(r,n+4,l),v=String.fromCharCode.apply(String,d);l+=4;var u=new Uint8Array(r,n+l,f-l);n+=f+4;var h=v.split("."),w=h[0],g=h[1],y=void 0;y="f"===m?"application/"+("ttf"===h[1]?"x-font-ttf":"font-".concat(h[1])):"image/"+("svg"==h[1]?"svg+xml":h[1]);var U=new Blob([u],{type:y}),P=URL.createObjectURL(U);o.push({path:w,src:P,fileType:g})}return o}});Object.keys(r).forEach((function(a){var e=r[a];window[a]=e}))}();
