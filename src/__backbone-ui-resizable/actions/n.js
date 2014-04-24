define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaN = function deltaN(attempted, force) {


		if (force) {
			return attempted;
		}


		var m = this.model;

		var h = m.get('height'),
			minH = m.get('minHeight'),
			maxH = m.get('maxHeight');

		var t = m.get('top'),
			minT = m.get('minTop'),
			maxT = m.get('maxTop');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				no(h).subtract(maxH).value(),
				no(minT).subtract(t).value()
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				no(h).subtract(minH).value(),
				no(maxT).subtract(t).value()
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveN = function moveN(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			delta = this.deltaN(attemptedDelta, options.force);

		model.set({
			top: model.get('top') + delta,
			height: no(model.get('height')).subtract(delta).value()
		});

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'contract' : 'expand',
				handle: 'n',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-y', this, eventData)
		}

		return attemptedDelta - delta;
	};
});
