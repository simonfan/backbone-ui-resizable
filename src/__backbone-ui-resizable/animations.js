define(function (require, exports, module) {
	'use strict';

	/**
	 *
	 *
	 * @private
	 * @param options
	 *
	 */
	function createAnimation(_options) {

		return function (attemptedDelta, options) {

			// [0] set up options
			options = options || {};

			// [1] delta should be in accordance to the positionDeltaMultiplier
			attemptedDelta = _options.positionDeltaMultiplier * attemptedDelta;


			// [1.2] delta > 0 = contraction
			//       delta < 0 = expansion
			var delta = this[_options.delta](attemptedDelta, options.force);


			// [4] get current position
			var start = parseFloat(this.model.get(_options.dimension));


			// [5] build animation object
			//     delta > 0 = contraction
			//     delta < 0 = expansion
			var animation = {};
			animation[_options.dimension] = start + _options.dimensionDeltaMultiplier * Math.abs(delta);



			// [6] set new step function
			var originalStep = options.step;
			options.step = _.bind(function (now, tween) {

				var lastDelta = Math.abs(now - start);

				// 'this' refers to the resizable object
				this[_options.move](_options.positionDeltaMultiplier * lastDelta, { force: true });

				// change start
				start = now;


				if (originalStep) {
					return originalStep.apply(this.$el, arguments);
				}

			}, this);

			// [7] GO!
			this.$el.animate(animation, options);

			// return remainder
			return attemptedDelta - delta;
		}
	}


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
	 * @method aExpandToW
	 * @param attemptedDelta {+Number}
	 * @param options {Obejct}
	 *     options will be passed straight to handle.animateToLeft,
	 *     which will pass options on to event data
	 */
	exports.aExpandToW = createAnimation({
		delta: 'deltaW',
		move: 'moveW',
		dimension: 'width',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: 1,
	});



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
	 * @method aContractToE
	 * @param attemptedDelta {+Number}
	 */
	exports.aContractToE = createAnimation({
		delta: 'deltaW',
		move: 'moveW',
		dimension: 'width',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: -1
	});

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
	 * @method aExpandToE
	 * @param attemptedDelta {+Number}
	 */
	exports.aExpandToE = createAnimation({
		delta: 'deltaE',
		move: 'moveE',
		dimension: 'width',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: 1,
	});

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
	 * @method aContractToW
	 * @param attemptedDelta {+Number}
	 */
	exports.aContractToW = createAnimation({
		delta: 'deltaE',
		move: 'moveE',
		dimension: 'width',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: -1
	})

	/**
	 *
	 *  -------
	 *  |^^^^^|
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.aExpandToN = createAnimation({
		delta: 'deltaN',
		move: 'moveN',
		dimension: 'height',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: 1,
	});



	/**
	 *   vvvvv
	 *  -------
	 *  |     |
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.aContractToS = createAnimation({
		delta: 'deltaN',
		move: 'moveN',
		dimension: 'height',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: -1,
	});

	/**
	 *
	 *  -------
	 *  |     |
	 *  |     |
	 *  |vvvvv|
	 *  -------
	 *
	 */
	exports.aExpandToS = createAnimation({
		delta: 'deltaS',
		move: 'moveS',
		dimension: 'height',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: 1,
	});

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
	exports.aContractToN = createAnimation({
		delta: 'deltaS',
		move: 'moveS',
		dimension: 'height',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: -1,
	})
});
