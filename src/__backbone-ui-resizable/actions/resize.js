/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var helpers = require('./helpers');

	/**
	 * Handles resizes.
	 *
	 * @method resize
	 * @private
	 * @param e {event Object}
	 * @param ui {jquery-ui ui Object}
	 */
	exports.resize = function resize(data) {

		var remainders = {},
			model = this.model;

		// check for maximums and minimuns
		if (_.isNumber(data.width)) {
			remainders.width = this.resizeWidth(data.width - model.get('width'));
		}

		if (_.isNumber(data.height)) {
			remainders.height = this.resizeHeight(data.height - model.get('height'));
		}

		if (_.isNumber(data.left)) {
			remainders.left = this.moveX(data.left - model.get('left'));
		}

		if (_.isNumber(data.top)) {
			remainders.top = this.moveY(data.top - model.get('top'));
		}

		return remainders;
	};


	exports.resizeWidth = function resizeWidth(attemptedDelta, silent) {

		var model = this.model,
			// calculate the new width
			attemptedWidth = model.get('width') + attemptedDelta,

			resultingWidth = helpers.fitValueWithin(attemptedWidth, model.get('minWidth'), model.get('maxWidth'));

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
});
