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
	 * @method aExpandToLeft
	 * @param attemptedDelta {+Number}
	 * @param options {Obejct}
	 *     options will be passed straight to handle.moveToLeft,
	 *     which will pass options on to event data
	 */
	exports.aExpandToLeft = function aExpandToLeft(attemptedDelta, options) {

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
	 * @method aExpandToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.aExpandToRight = function aExpandToRight(attemptedDelta, options) {

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
	exports.aExpandToTop = function aExpandToTop(attemptedDelta, options) {

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
	exports.aExpandToBottom = function aExpandToBottom(attemptedDelta, options) {

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
	 * @method aContractToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.aContractToRight = function aContractToRight(attemptedDelta, options) {

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
	 * @method aContractToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.aContractToLeft = function aContractToLeft(attemptedDelta, options) {

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
	exports.aContractToBottom = function aContractToBottom(attemptedDelta, options) {

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
	exports.aContractToTop = function aContractToTop(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.s;

		handle.calcMinMax();
		return handle.moveToTop(attemptedDelta, options);
	};
});
