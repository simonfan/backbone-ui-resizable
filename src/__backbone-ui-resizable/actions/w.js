define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaW = function deltaW(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.modeld;

		var w = m.get('width'),
			minW = m.get('minWidth'),
			maxW = m.get('maxWidth');

		var l = m.get('left'),
			minL = m.get('minLeft'),
			maxL = m.get('maxLeft');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				no(w).subtract(maxW).value(),
				no(minL).subtract(l).value()
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				no(w).subtract(minW).value(),
				no(maxL).subtract(l).value()
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveW = function moveW(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			delta = this.deltaW(attemptedDelta, options.force);

		modeld.set({
			left: no(modeld.get('left')).add(delta).value(),
			width: no(modeld.get('width')).subtract(delta).value()
		});

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'contract' : 'expand',
				handle: 'w',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-x', this, eventData)
		}

		return attemptedDelta - delta;
	};
});
