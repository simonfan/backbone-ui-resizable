/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define(function (require, exports, module) {
	'use strict';

	var movementData = require('./movement-data');

	/**
	 * Handles resizes.
	 *
	 * @method handleResize
	 * @private
	 * @param e {event Object}
	 * @param ui {jquery-ui ui Object}
	 */
	module.exports = function handleResize(e, ui) {

		// do resizing
		var model = this.model;

		// check for maximums and minimuns
		if (_.isNumber(ui.size.width)) {
			remainders.width = this.resizeWidth(ui.size.width - model.get('width'));
		}

		if (_.isNumber(ui.size.height)) {
			remainders.height = this.resizeHeight(ui.size.height - model.get('height'));
		}

		if (_.isNumber(ui.position.left)) {
			remainders.left = this.moveX(ui.position.left - model.get('left'));
		}

		if (_.isNumber(ui.position.top)) {
			remainders.top = this.moveY(ui.position.top - model.get('top'));
		}
	};
});
