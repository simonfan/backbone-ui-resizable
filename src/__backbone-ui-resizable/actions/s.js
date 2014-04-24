define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaS = function deltaS(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.model;

		var h = m.get('height'),
			minH = m.get('minHeight'),
			maxH = m.get('maxHeight');

		var b = no(m.get('top')).add(h).value(),
			minB = m.get('minBottom'),
			maxB = m.get('maxBottom');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				no(minH).subtract(h).value(),
				no(minB).subtract(b).value()
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				no(maxH).subtract(h).value(),
				no(maxB).subtract(b).value()
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveS = function moveS(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			delta = this.deltaS(attemptedDelta, options.force);

		model.set('height', no(model.get('height')).add(delta).value());

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'y',
				delta: delta,
				action: delta > 0 ? 'expand' : 'contract',
				handle: 's',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-y', this, eventData)
		}

		return attemptedDelta - delta;
	};
});
