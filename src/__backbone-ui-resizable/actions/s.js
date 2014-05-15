define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('../helpers');

	exports.deltaS = function deltaS(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.model;

		var h = +m.get('height'),
			minH = +m.get('minHeight'),
			maxH = +m.get('maxHeight');

		var t = +m.get('top'),
			b = t + h,
			minB = +m.get('minBottom'),
			maxB = +m.get('maxBottom');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				minH - h,
				minB - b
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				maxH - h,
				maxB - b
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveS = function moveS(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			height = +model.get('height'),
			delta = +this.deltaS(attemptedDelta, options.force);

		model.set('height', height + delta);

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
