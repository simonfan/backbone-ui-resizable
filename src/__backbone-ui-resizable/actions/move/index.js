define(function (require, exports, module) {
	'use strict';

	var helpers = require('../../helpers');

	exports.moveX = function moveX(attemptedDelta) {

		var model = this.model,
			leftBefore = model.get('left'),
			// convert the attemptedDelta into attemptedLeft
			attemptedLeft = leftBefore + attemptedDelta;

			// get the allowed left
		var left = helpers.fitValueWithin(attemptedLeft, model.get('minX'), model.get('maxX') - model.get('width'));

		model.set('left', left);

		// return remainder
		return attemptedLeft - left;
	};

	exports.moveY = function moveY(attemptedDelta) {
		var model = this.model,
			topBefore = model.get('top'),
			// convert the attemptedDelta into attemptedLeft
			attemptedTop = topBefore + attemptedDelta;

			// get the allowed top
		var top = helpers.fitValueWithin(attemptedTop, model.get('minY'), model.get('maxY') - model.get('height'));

		model.set('top', top);

		// return remainder
		return attemptedTop - top;
	};




	/**
	 * Moves the whole view to the left.
	 *   <<<<<<<<
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method moveToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.moveToLeft = function moveToLeft(attemptedDelta) {
		return this.moveX(-1 * attemptedDelta);
	};


	/**
	 * Moves the whole view to the right.
	 *   >>>>>>>>
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method moveToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.moveToRight = function moveToRight(attemptedDelta) {
		return this.moveX(attemptedDelta);
	};

	exports.moveToTop = function moveToTop(attemptedDelta) {
		return this.moveY(-1 * attemptedDelta);
	};

	exports.moveToBottom = function moveToBottom(attemptedDelta) {
		return this.moveY(attemptedDelta);
	};


	// extend exports
});
