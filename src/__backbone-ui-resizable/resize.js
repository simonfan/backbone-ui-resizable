/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash');

	var movementData = require('./movement-data');


	function getAllowedValue(value, min, max) {
		var res = value;

		if (_.isNumber(min)) {
			res = res > min ? res : min;
		}

		if (_.isNumber(max)) {
			res = res < max ? res : max;
		}

		return res;
	}

	/**
	 * Handles resizes.
	 *
	 * @method resize
	 * @private
	 * @param e {event Object}
	 * @param ui {jquery-ui ui Object}
	 */
	module.exports = function resize(data) {

		var model = this.model;

		// check for maximums and minimuns
		if (_.isNumber(data.width)) {

			var minWidth = model.get('minWidth'),
				maxWidth = model.get('maxWidth');

			data.width = getAllowedValue(data.width, minWidth, maxWidth);
		}

		if (_.isNumber(data.height)) {

			var minHeight = model.get('minHeight'),
				maxHeight = model.get('maxHeight');

			data.height = getAllowedValue(data.height, minHeight, maxHeight);
		}

		// set
		model.set(data);

		/**
		 * get data about the movement
		 */
		var current = model.toJSON(),
			previous = model.previousAttributes(),

			// build the movement-data object
			movement = movementData(current, previous);

		// trigger 'resize' event on the model.
		this.trigger('resize', this, movement);
		model.trigger('resize', model, movement);

		return this;
	};
});
