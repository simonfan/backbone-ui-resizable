define(function (require, exports, module) {

	'use strict';

	var h = require('./helpers');

	/**
	 * All handles should track these events.
	 *
	 * @method all
	 */
	exports.all = function trackAll() {
		// move together
		this.listenTo(this.resizable.model, 'change', this.update);
	};

	/**
	 * North-related handles should track these movements:
	 * - move-y
	 *
	 * @method n
	 */
	exports.n = function trackN() {

		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {

			delta = h.numberify(delta);

			var height = h.numberify(resizableModel.get('height')),
				top = h.numberify(resizableModel.get('top'));

			resizableModel.set({
				height: height - delta,
				top: top + delta
			});

		}, this);
	};

	/**
	 * South-related handles should track these movements:
	 * - move-y
	 *
	 * @method s
	 */
	exports.s = function trackS() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {

			var height = h.numberify(resizableModel.get('height')) + h.numberify(delta);

			resizableModel.set('height', height);
		});
	};

	/**
	 * West-related handles should track these movements:
	 * - move-x
	 *
	 * @method w
	 */
	exports.w = function trackW() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {

			delta = h.numberify(delta);

			var width = h.numberify(resizableModel.get('width')),
				left = h.numberify(resizableModel.get('left'));

			resizableModel.set({
				width: width - delta,
				left: left + delta
			});
		});
	};

	/**
	 * East-related handles should track these movements:
	 * - move-x
	 *
	 * @method e
	 */
	exports.e = function trackE() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {
			var width = h.numberify(resizableModel.get('width')) + h.numberify(delta);

			resizableModel.set('width', width);
		});
	};
});
