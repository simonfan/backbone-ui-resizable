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

		var data = {
			// set position
			top: ui.position.top,
			left: ui.position.left,

			bottom: ui.position.top + ui.size.height,
			right: ui.position.left + ui.size.width,

			// set dimensions
			width: ui.size.width,
			height: ui.size.height,
		};

		this.set(data);

		/**
		 * get data about the movement
		 */
		var current = this.model.attributes,
			previous = this.model.previousAttributes(),

			// build the movement-data object
			movement = movementData(current, previous);

		// trigger 'resize' event on the model.
		this.trigger('resize', this, e, ui, movement);

		// call the custom handleResize method.
		this.handleResize(e, ui, movement);
	};
});
