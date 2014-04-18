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
	 * @param options {Obejct}
	 *     options will be passed straight to handle.moveToLeft,
	 *     which will pass options on to event data
	 */
	exports.expandToLeft = function expandToLeft(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.w;

		handle.calcMinMax();
		return handle.moveToLeft(attemptedDelta, options);
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
	exports.expandToRight = function expandToRight(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.e;

		handle.calcMinMax();
		return handle.moveToRight(attemptedDelta, options);
	};

	/**
	 *
	 *  -------
	 *  |^^^^^|
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.expandToTop = function expandToTop(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.n;

		handle.calcMinMax();
		return handle.moveToTop(attemptedDelta, options);
	};

	/**
	 *
	 *  -------
	 *  |     |
	 *  |     |
	 *  |vvvvv|
	 *  -------
	 *
	 */
	exports.expandToBottom = function expandToBottom(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.s;

		handle.calcMinMax();
		return handle.moveToBottom(attemptedDelta, options);
	};


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
	exports.contractToRight = function contractToRight(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.w;

		handle.calcMinMax();
		return handle.moveToRight(attemptedDelta, options);
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
	exports.contractToLeft = function contractToLeft(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.e;

		handle.calcMinMax();
		return handle.moveToLeft(attemptedDelta, options);
	};

	/**
	 *   vvvvv
	 *  -------
	 *  |     |
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.contractToBottom = function contractToBottom(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.n;

		handle.calcMinMax();
		return handle.moveToBottom(attemptedDelta, options);
	};

	/**
	 *
	 *  -------
	 *  |     |
	 *  |     |
	 *  |     |
	 *  -------
	 *   ^^^^^
	 *
	 */
	exports.contractToTop = function contractToTop(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.s;

		handle.calcMinMax();
		return handle.moveToTop(attemptedDelta, options);
	};
});
