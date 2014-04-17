define(function (require, exports, module) {
	'use strict';

	require('jquery-ui');

	var draggable = require('backbone-ui-draggable'),
		_ = require('lodash');

	var _update = require('./update'),
		_track = require('./track'),
		_minmax = require('./min-max');

	var positions = {
		// horizontal vertical
		n: 'left top',
		s: 'left bottom',
		w: 'left top',
		e: 'right top',

		nw: 'left top',
		ne: 'right top',
		sw: 'left bottom',
		se: 'right bottom'
	},
	axis = {
		// horizontal vertical
		n: 'y',
		s: 'y',
		w: 'x',
		e: 'x',

		nw: 'xy',
		ne: 'xy',
		sw: 'xy',
		se: 'xy'
	};


	var handle = module.exports = draggable.extend({
		initialize: function (options) {
			draggable.prototype.initialize.call(this, options);

			this.initializeResizableHandle(options);
		},

		initializeResizableHandle: function initializeResizableHandle(options) {

			// [0] get variables
			// the resizable
			this.resizable = options.resizable;

			// set direction
			this.direction = options.direction;

			// set axis.
			this.axis = axis[this.direction];

			// cache sizes
			this.thickness = options.thickness;


			// setStyles
			this.setStyles();

			// calculate ratio point
			this.ratio = options.ratio;
			this.outer = options.thickness * this.ratio;
			this.inner = options.thickness - this.outer;

			// [1] place the handle
			// set throttle for update
			this.update = _.throttle(_.bind(_update[this.direction], this), 20);

			// initialize handle position
			this.initializePosition(options);

			// [2] set correct trackers for hte handle
			this.track();

			// [3] when movements starts, calculate the min and maxes.
			this.on('movestart', this.calcMinMax);
		},

		/**
		 * Sets the styles needed for this type of direction handle.
		 *
		 * @method setStyles
		 * @private
		 */
		setStyles: function setStyles() {

			var axis = this.axis,
				styles;

			if (axis.length > 1) {
				// xy / yx
				styles = {
					zIndex: 100,
					width: this.thickness,
					height: this.thickness
				};
			} else if (axis === 'x') {
				// horizontal sliding directions
				styles = {
					zIndex: 99,
					width: this.thickness,
					height: this.resizable.model.get('width'),
				};

			} else if (axis === 'y') {
				// vertical sliding direction
				styles = {
					zIndex: 99,
					width: this.resizable.model.get('height'),
					height: this.thickness
				};
			}

			this.$el.css(styles);
		},

		/**
		 * Places the handle at its initial position,
		 * at the right place given the direction.
		 *
		 * @method initializePosition
		 */
		initializePosition: function initializePosition(options) {
			var $el = this.$el;

			$el.position({
				// horizontal vertical
				my: 'center center',
				at: positions[this.direction],
				of: this.resizable.$el
			});

			this.model.set($el.position());

			this.update();
		},

		/**
		 * Links up movement from the handle to the resizable object.
		 *
		 * @method track
		 */
		track: function track() {
			_.each(this.direction, function (d) {

				_track[d].call(this);

			}, this);


			_track.all.call(this);
		},

		/**
		 * Calculates the minimum and maximum positions for the handle
		 * taking into account settings of min and max of the resizable object.
		 *
		 * @method calcMinMax
		 *
		 */
		calcMinMax: function calcMinMax() {
			_.each(this.direction, function (d) {

				_minmax[d].call(this);

			}, this);
		},

		map: _.extend(draggable.prototype.map, {
			height: '->css:height',
			width: '->css:width',
		})
	});
});
