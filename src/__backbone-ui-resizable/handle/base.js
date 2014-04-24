define(function (require, exports, module) {
	'use strict';

	require('jquery-ui');

	var draggable = require('backbone-ui-draggable'),
		_ = require('lodash');

	var _updatePosition = require('./update-position');

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

			// calculate ratio point
			this.ratio = options.ratio;
			this.outer = options.thickness * this.ratio;
			this.inner = options.thickness - this.outer;


			// [1] set the updatePosition method
			this.updatePosition = _.throttle(_.bind(_updatePosition[this.direction], this), 20);


			// [2] setStyles
			// [2.0] general styles
			this.setStyles();

			// [2.1] place the handle
			// initialize handle position
			this.updatePosition();


			// move handles together
			this.listenTo(this.resizable.model, 'change', this.updatePosition);
				// [4] when movements starts, calculate the min and maxes.
			//	this.on('movestart', this.calcMinMax);

			// [5] enable!
			this.enableHandle();
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

		map: _.extend(draggable.prototype.map, {
			height: '->css:height',
			width: '->css:width',
		})
	});

	// proto
	handle.proto(require('./enable-disable'));
});
