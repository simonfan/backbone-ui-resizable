/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('../../helpers');

	exports.resizeWidth = function resizeWidth(attemptedDelta, silent) {

		var model = this.model,
			// calculate the new width
			attemptedWidth = model.get('width') + attemptedDelta,

			resultingWidth = helpers.fitValueWithin(attemptedWidth, model.get('minWidth'), model.get('maxWidth'));

		// set
		model.set('width', resultingWidth);

		var previous = model.previous('width') || 0,
			delta = resultingWidth - previous;

		if (delta && !silent) {
			// only trigger events when there is an actual delta
			// and the silent option is set to false (or unset)

			var data = {
				axis: 'x',
				delta: delta,
				action: delta > 0 ? 'expansion' : 'contraction',
			};

			this.trigger('resize', this, data)
				.trigger('resize-width', this, data);
		}

		// return remainder of operation
		return attemptedWidth - resultingWidth;
	};

	exports.resizeHeight = function resizeHeight(attemptedDelta) {
		var model = this.model,
			// calculate the attempted height
			attemptedHeight = model.get('height') + attemptedDelta,
			resultingHeight = helpers.fitValueWithin(attemptedHeight, model.get('minHeight'), model.get('maxHeight'));

		// set
		model.set('height', resultingHeight);

		var previous = model.previous('height') || 0,
			delta = resultingHeight - previous;

		if (delta) {
			// only trigger events when there is an actual delta.

			var data = {
				axis: 'y',
				delta: delta,
				action: delta > 0 ? 'expansion' : 'contraction'
			};

			this.trigger('resize', this, data)
				.trigger('resize-height', this, data);
		}

		// return remainder of operation
		return attemptedHeight - resultingHeight;
	};


	// extend exports
	_.assign(exports, require('./contract'));
	_.assign(exports, require('./expand'));
});
