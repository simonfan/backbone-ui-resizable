define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	exports.min = function min(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {

			return v1 < v2 ? v1 : v2;
		}
	};

	exports.max = function max(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {
			return v1 > v2 ? v1 : v2;
		}

	};


	exports.numberify = function numberify(v) {
		var res = parseFloat(v);

		if (isNaN(res)) {
			throw new Error(v + ' not number');
		} else {
			return res;
		}
	};

	exports.numberifyProperties = function numberifyProperties(props, obj) {
		var res = {};

		_.each(props, function (p) {
			res[p] = parseFloat(obj[p]);
		});

		return res;
	};


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var isNumber = /^-?\d*(\.\d+)?$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
	};
});
