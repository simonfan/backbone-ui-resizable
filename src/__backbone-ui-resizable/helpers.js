define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	function notNaN(v) {
		return !isNaN(v);
	}

	exports.min = function min(values) {
		return _(values).filter(notNaN).min().value();
	};

	exports.max = function max(values) {
		return _(values).filter(notNaN).max().value();
	};

	exports.fitValueWithin = function fitValueWithin(value, min, max) {
		var res = value;

		// min
		res = exports.max([res, min]);

		// max
		res = exports.min([res, max]);


		return res;
	}
});
