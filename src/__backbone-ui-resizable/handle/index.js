define(function (require, exports, module) {
	'use strict';

	var baseHandle = require('./base');

	function nY(delta, options) {
		var remainder = this.resizable.moveN(delta, options);

		return delta - remainder;
	}

	function sY(delta, options) {
		var remainder = this.resizable.moveS(delta, options);

		return delta - remainder;
	}

	function wX(delta, options) {
		var remainder = this.resizable.moveW(delta, options);

		return delta - remainder;
	}

	function eX(delta, options) {
		var remainder = this.resizable.moveE(delta, options);

		return delta - remainder;
	}


	var n = { beforeMoveY: nY },
		s = { beforeMoveY: sY },
		w = { beforeMoveX: wX },
		e = { beforeMoveX: eX };



	exports.n = baseHandle.extend(n);

	exports.s = baseHandle.extend(s);

	exports.w = baseHandle.extend(w);

	exports.e = baseHandle.extend(e);

	exports.nw = baseHandle.extend(n).extend(w);

	exports.ne = baseHandle.extend(n).extend(e);

	exports.sw = baseHandle.extend(s).extend(w);

	exports.se = baseHandle.extend(s).extend(e);
});
