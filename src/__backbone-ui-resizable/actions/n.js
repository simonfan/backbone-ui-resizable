define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('../helpers');

	exports.deltaN = function deltaN(attempted, force) {


		if (force) {
			return attempted;
		}


		var m = this.modeld;

		var h = +m.get('height'),
			minH = +m.get('minHeight'),
			maxH = +m.get('maxHeight');

		var t = +m.get('top'),
			minT = +m.get('minTop'),
			maxT = +m.get('maxTop');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				h - maxH,
				minT - t
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				h - minH,
				maxT - t
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};


	///////////////


	exports.moveN = function moveN(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			top = +modeld.get('top'),
			height = +modeld.get('height'),
			delta = +this.deltaN(attemptedDelta, options.force);

		modeld.set({
			top: top + delta,
			height: height - delta
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
