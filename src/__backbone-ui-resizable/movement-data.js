/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define(function (require, exports, module) {
	'use strict';

	var subject = require('subject'),
		_ = require('lodash');


	var opposites = {
		left: 'right',
		right: 'left',
		top: 'bottom',
		bottom: 'top'
	};

	var movement = module.exports = subject(function movementData(current, previous) {
		this.current = current || {};
		this.previous = previous || {};
	});

	movement.proto({
		/**
		 * Get metadata from the movement
		 */
		data: function data() {
				// movement axis
			var axis = this.axis(),
				// movement action
				action = this.action(axis),
				// movement handle
				handle = this.handle(axis),
				// movement direction
				direction = this.direction(handle, action);

			return {
				axis: axis,
				action: action,
				handle: handle,
				direction: direction,
			};
		},

		/**
		 * Returns the difference between the current value and the last value
		 */
		delta: function movementDelta(attribute) {
			var prev = this.previous[attribute] || 0,
				curr = this.current[attribute] || 0;

			return curr - prev;
		},

		/**
		 * Infers movement axis
		 */
		axis: function movementAxis() {
			return this.delta('width') !== 0 ? 'x' : this.delta('height') !== 0 ? 'y' : false;
		},

		/**
		 * Infers the last action taken on this object: contract or expand
		 * on a given axis
		 */
		action: function movementAction(axis) {
			axis = axis || this.axis();

				// the dimension to be checked on
			var dimension = axis === 'x' ? 'width' : 'height',
				// the delta
				delta = this.delta(dimension);

			return delta > 0 ? 'expand' : delta < 0 ? 'contract' : false;
		},

		/**
		 * Infers the handle that was moved by examining the attributes.
		 */
		handle: function movementHandle(axis) {
			axis = axis || this.axis();

			if (axis === 'x') {
				return this.delta('left') !== 0 ? 'left' : 'right';
			} else {
				return this.delta('top') !== 0 ? 'top' : 'bottom';
			}
		},

		/**
		 * Infers the direction of the movement of a single handle
		 */
		direction: function direction(handle, action) {
			handle = handle || this.handle();
			action = action || this.action();

			return action === 'expand' ? handle : opposites[handle];
		},
	});

});
