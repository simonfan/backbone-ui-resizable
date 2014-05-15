define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('../helpers');

	exports.deltaW = function deltaW(attempted, force) {



		if (force) {
			return attempted;
		}


		var m    = this.model;

		var w    = +m.get('width'),
			minW = +m.get('minWidth'),
			maxW = +m.get('maxWidth');

		var l    = +m.get('left'),
			minL = +m.get('minLeft'),
			maxL = +m.get('maxLeft');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				w - maxW,
				minL - l
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				w - minW,
				maxL - l
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveW = function moveW(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			left   = +model.get('left'),
			width  = +model.get('width'),
			delta  = +this.deltaW(attemptedDelta, options.force);

		model.set({
			left: left + delta,
			width: width - delta
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
