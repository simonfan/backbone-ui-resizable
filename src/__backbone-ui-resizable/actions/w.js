define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaW = function deltaW(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.model;

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

		var model = this.model,
			delta = this.deltaW(attemptedDelta, options.force);

		model.set({
			left: no(model.get('left')).add(delta).value(),
			width: no(model.get('width')).subtract(delta).value()
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
