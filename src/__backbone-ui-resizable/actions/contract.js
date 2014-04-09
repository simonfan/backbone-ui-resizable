define(function (require, exports, module) {
	'use strict';

	/**
	 * Contracts the view by moving the left handle
	 * towards the right direction while maintaining
	 * the right handle at a fixed position.
	 *   --------
	 * ->|      |
	 * ->|      |
	 * ->|      |
	 *   --------
	 *
	 * @method contractToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToRight = function contractToRight(attemptedDelta, silent) {

		var remainder = this.resizeWidth(-1 * attemptedDelta, silent);
		remainder = -1 * remainder;

		// delta is always >= 0
		var delta = attemptedDelta - remainder;

		// move
		this.moveX(delta);

		return remainder;
	};

	/**
	 * Contracts the view by moving the right handle
	 * towards the left direction while maintaing the
	 * left handle at a fixed position.
	 *   --------
	 *   |      |<-
	 *   |      |<-
	 *   |      |<-
	 *   --------
	 *
	 * @method contractToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToLeft = function contractToLeft(attemptedDelta, silent) {

		return -1 * this.resizeWidth(-1 * attemptedDelta, silent);
	};


	/**
	 * Contracts the view by moving the top handle
	 * towards the bottom direction while maintaining
	 * the bottom handle at a fixed position.
	 *
	 *    vvvvvv
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method contractToBottom
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToBottom = function contractToBottom(attemptedDelta, silent) {

		var remainder = this.resizeHeight(-1 * attemptedDelta, silent);
		remainder = -1 * remainder;

		// delta >= 0
		var delta = attemptedDelta - remainder;
		this.moveY(delta);

		return remainder;
	};

	/**
	 * Contracts the view by moving the bottom handle
	 * towards the top direction while maintaing the
	 * top handle at a fixed position.
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *    ^^^^^^
	 *
	 * @method contractToTop
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToTop = function contractToTop(attemptedDelta, silent) {
		var remainder = this.resizeHeight(-1 * attemptedDelta, silent);

		return -1 * remainder;
	};
});
