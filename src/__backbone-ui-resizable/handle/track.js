define(function (require, exports, module) {

	'use strict';

	var _ = require('lodash');

	var h = require('./helpers');

	/**
	 * All handles should track these events.
	 *
	 * @method all
	 */
	exports.all = function trackAll() {
		var resizable = this.resizable

		// resizestart, resizestop
		resizable.listenTo(this, 'movestart', function () {
			this.trigger('resizestart', resizable);
		});

		resizable.listenTo(this, 'movestop', function () {
			this.trigger('resizestop', resizable);
		})

		// move handles together
		this.listenTo(resizable.model, 'change', this.updatePosition);
	};

	/**
	 * North-related handles should track these movements:
	 * - move-y
	 *
	 * @method n
	 */
	exports.n = function trackN() {


		var resizable = this.resizable,
			direction = this.direction;

		resizable.listenTo(this, 'move-y', function (handleObj, edata) {

			// 'this' refers to the resizable object.
			var model = this.model;

			var delta = h.numberify(edata.delta),
				height = h.numberify(model.get('height')),
				top = h.numberify(model.get('top'));

			model.set({
				height: height - delta,
				top: top + delta
			});

			// trigger events
			if (!edata.silent) {

				var action = delta > 0 ? 'contract' : 'expand';

				edata = _.assign({
					action: action,
					handle: direction
				}, edata);

				this.trigger('resize', this, edata)
					.trigger('resize-y', this, edata)
					// action events
					.trigger(action, this, edata)
					.trigger(action + 'y', this, edata);
			}

		}, resizable);
	};

	/**
	 * South-related handles should track these movements:
	 * - move-y
	 *
	 * @method s
	 */
	exports.s = function trackS() {
		var resizable = this.resizable,
			direction = this.direction;

		resizable.listenTo(this, 'move-y', function (handleObj, edata) {
			// 'this' refers to the resizable object.

			var model = this.model;

			var height = h.numberify(model.get('height')) + h.numberify(edata.delta);

			model.set('height', height);

			// trigger events
			if (!edata.silent) {

				var action = edata.delta > 0 ? 'expand' : 'contract';

				edata = _.assign({
					action: action,
					handle: direction
				}, edata);

				this.trigger('resize', this, edata)
					.trigger('resize-y', this, edata)
					// action events
					.trigger(action, this, edata)
					.trigger(action + 'y', this, edata);
			}

		}, resizable);
	};

	/**
	 * West-related handles should track these movements:
	 * - move-x
	 *
	 * @method w
	 */
	exports.w = function trackW() {
		var resizable = this.resizable,
			direction = this.direction;

		resizable.listenTo(this, 'move-x', function (handleObj, edata) {
			// 'this' refers to the resizable object.
			var model = this.model;

			var delta = h.numberify(edata.delta);

			var width = h.numberify(model.get('width')),
				left = h.numberify(model.get('left'));

			model.set({
				width: width - delta,
				left: left + delta
			});

			// trigger events
			if (!edata.silent) {

				var action = delta > 0 ? 'contract' : 'expand';

				edata = _.assign({
					action: action,
					handle: direction
				}, edata);

				this.trigger('resize', this, edata)
					.trigger('resize-x', this, edata)
					// action events
					.trigger(action, this, edata)
					.trigger(action + 'x', this, edata);
			}

		}, resizable);
	};

	/**
	 * East-related handles should track these movements:
	 * - move-x
	 *
	 * @method e
	 */
	exports.e = function trackE() {
		var resizable = this.resizable,
			direction = this.direction;

		resizable.listenTo(this, 'move-x', function (handleObj, edata) {
			// 'this' refers to the resizable object.

			var model = this.model;

			var width = h.numberify(model.get('width')) + h.numberify(edata.delta);

			model.set('width', width);


			// trigger events
			// we are sure delta is not 0, as that was dealt with at the
			// draggable object
			if (!edata.silent) {

				var action = edata.delta > 0 ? 'expand' : 'contract';

				edata = _.assign({
					action: action,
					handle: direction
				}, edata);

				this.trigger('resize', this, edata)
					.trigger('resize-x', this, edata)
					// action events
					.trigger(action, this, edata)
					.trigger(action + 'x', this, edata);
			}

		}, resizable);
	};
});
