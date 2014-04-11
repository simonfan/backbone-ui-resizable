/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define(function (require, exports, module) {
	'use strict';

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
		var model = this.model,
			width = model.get('width'),
			height = model.get('height'),
			left = model.get('left'),
			top = model.get('top');

		// check for maximums and minimuns
		if (ui.size.width !== width) {
			// silent to false.
			this.resizeWidth(ui.size.width - width, false);
		}

		if (ui.size.height !== height) {
			// silent to false
			this.resizeHeight(ui.size.height - height, false);
		}

		if (ui.position.left !== left) {

			//console.log()

			// silent to false
			this.moveX(ui.position.left - left, false);
		}

		if (ui.position.top !== top) {
			// silent to false
			this.moveY(ui.position.top - top, false);
		}
	};
});
