define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaE = function deltaE(attempted, force) {

		if (force) {
			return attempted;
		}

		var m = this.modeld;

		var w = m.get('width'),
			minW = m.get('minWidth'),
			maxW = m.get('maxWidth');

		var r = no(m.get('left')).add(w).value(),
			minR = m.get('minRight'),
			maxR = m.get('maxRight');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				no(minW).subtract(w).value(),
				no(minR).subtract(r).value()
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				no(maxW).subtract(w).value(),
				no(maxR).subtract(r).value()
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveE = function moveE(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			delta = this.deltaE(attemptedDelta, options.force);

		modeld.set('width', no(modeld.get('width')).add(delta).value());

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
