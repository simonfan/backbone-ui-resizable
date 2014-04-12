define(function (require, exports, module) {

	var draggable = require('backbone-ui-draggable');

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

		setStyles: function setStyles() {

			var axis = this.axis;

			if (axis.length > 1) {
				// xy / yx
				var styles = {
					zIndex: 100,
					width: this.thickness,
					height: this.thickness
				};
			} else if (axis === 'x') {
				// horizontal sliding directions
				var styles = {
					zIndex: 99,
					width: this.thickness,
					height: this.resizable.model.get('width'),
				}

			} else if (axis === 'y') {
				// vertical sliding direction
				var styles = {
					zIndex: 99,
					width: this.resizable.model.get('height'),
					height: this.thickness
				}
			}

			this.$el.css(styles);
		},

		calcCenter: function calcCenter(centerRatio) {

			this.center = {
				x: this.$el.width() * centerRatio,
				y: this.$el.height() * centerRatio
			};
		},

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

		track: function track() {
			_.each(this.direction, function (d) {

				_track[d].call(this);

			}, this);


			_track.all.call(this);
		},

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