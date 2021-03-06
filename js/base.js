"use strict";
/* global window: true */
/* eslint-env node, browser */
/* eslint-disable global-require */

(function _base(exports)
{
	const base = exports;

	exports.IS_NODE = typeof process!=="undefined" && typeof process.versions!=="undefined" && typeof process.versions.node!=="undefined";
	if(base.IS_NODE)
	{
		require("./Math");
		require("./Array");
		require("./String");
		require("./Object");
		require("./Date");
		require("./Function");
		require("./Number");
		require("./JSON");

		exports.IS_DEV = !process.argv.includes("--staging") && !process.argv.includes("--production");
		exports.IS_STAGING = !!process.argv.includes("--staging");
	}
	else
	{
		exports.IS_DEV = window.location.hostname.startsWith("dev.") || window.location.href.includes("dev=true");
	}

	exports.SECOND = 1000;
	exports.MINUTE = base.SECOND*60;
	exports.HOUR = base.MINUTE*60;
	exports.DAY = base.HOUR*24;
	exports.WEEK = base.DAY*7;
	exports.MONTH = base.DAY*30.4375;
	exports.YEAR = base.DAY*365.25;
	exports.STARTUP_TIME = Date.now();

	exports.BYTE = 1;
	exports.KB = base.BYTE*1024;
	exports.MB = base.KB*1024;
	exports.GB = base.MB*1024;
	exports.TB = base.GB*1024;
	exports.PB = base.TB*1024;

	exports.UTF8 = {encoding : "utf8"};

	exports.clone = function clone(src, skipKeys, shallow)
	{
		return (Array.isArray(src) ? src.clone(shallow) : (Object.isObject(src) ? Object.clone(src, skipKeys, shallow) : src));
	};

	// Freeze an object/array, making it immutable with an option to recurse
	exports.freeze = function freeze(o, recursive=false)
	{
		if(!Array.isArray(o) && !Object.isObject(o))
			return o;

		if(recursive)
			(Object.isObject(o) ? Object.values(o) : o).forEach(v => base.freeze(v, true));

		Object.freeze(o);

		return o;
	};

	exports.FINISH = function finish(err)
	{
		if(err)
			process.exit(console.error(err));

		process.exit(0);
	};
})(typeof window!=="undefined" ? window.base={} : exports);
