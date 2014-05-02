define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('../helpers');

	exports.deltaE = function deltaE(attempted, force) {

		if (force) {
			return attempted;
		}

		var m = this.modeld;

		var w = +m.get('width'),
			minW = +m.get('minWidth'),
			maxW = +m.get('maxWidth');

		var l = +m.get('left'),
			r = l + w,
			minR = +m.get('minRight'),
			maxR = +m.get('maxRight');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				minW - w,
				minR - r
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				maxW - w,
				maxR - r
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};


	///////////////


	exports.moveE = function moveE(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			width = +modeld.get('width'),
			delta = +this.deltaE(attemptedDelta, options.force);

		modeld.set('width', width + delta);

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'expand' : 'contract',
				handle: 'e',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-x', this, eventData)
		}

		return attemptedDelta - delta;
	};
});
