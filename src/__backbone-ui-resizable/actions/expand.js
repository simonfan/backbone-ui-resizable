define(function (require, exports, module) {
	'use strict';

	/**
	 * Expands the view by moving the left handle
	 * towards the left direction while maintaing
	 * the right handle at a fixed position.
	 *   --------
	 *   |<-    |
	 *   |<-    |
	 *   |<-    |
	 *   --------
	 *
	 * @method expandToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToLeft = function expandToLeft(attemptedDelta, silent) {
		var remainder = this.resizeWidth(attemptedDelta, silent);

		// delta >= 0
		var delta = attemptedDelta - remainder;

		// move the thing to the left.
		this.moveX(-1 * delta);

		return remainder;
	};

	/**
	 * Expands the view by moving the right handle
	 * towards the right direction while maintaing
	 * the left handle at a fixed position.
	 *   --------
	 *   |    ->|
	 *   |    ->|
	 *   |    ->|
	 *   --------
	 *
	 * @method expandToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToRight = function expandToRight(attemptedDelta, silent) {
		return this.resizeWidth(attemptedDelta, silent);
	};

	/**
	 * Expands the view by moving the top handle
	 * towards the top direction while maintaing
	 * the bottom handle at a fixed position.
	 *   --------
	 *   |^^^^^^|
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method expandToTop
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToTop = function expandToTop(attemptedDelta, silent) {
		var remainder = this.resizeHeight(attemptedDelta, silent);

		// delta >= 0
		var delta = attemptedDelta - remainder;

		// move the thing to top
		this.moveY(-1 * delta);

		return remainder;
	};

	/**
	 * Expands the view by moving the bottom handle
	 * towards the bottom direction while maintaing
	 * the top handle at a fixed position.
	 *   --------
	 *   |      |
	 *   |      |
	 *   |vvvvvv|
	 *   --------
	 *
	 * @method expandToBottom
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToBottom = function expandToBottom(attemptedDelta, silent) {
		return this.resizeWidth(attemptedDelta, silent);
	};

});
