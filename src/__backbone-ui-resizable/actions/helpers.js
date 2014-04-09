define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	exports.fitValueWithin = function fitValueWithin(value, min, max) {
		var res = value;

		if (_.isNumber(min)) {
			res = res > min ? res : min;
		}

		if (_.isNumber(max)) {
			res = res < max ? res : max;
		}

		return res;
	}
});
