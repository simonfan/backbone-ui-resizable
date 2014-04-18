define('__backbone-ui-resizable/build-handles',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');

	/**
	 * Builds a SINGLE $el for a direction handle.
	 *
	 * @method buildHandle$El
	 * @private
	 */
	function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.insertAfter(this.$el);
	}


	/**
	 * Builds multiple handles for multiple directions.
	 *
	 * @method buildHandle$Els
	 * @private
	 */
	function buildHandle$Els(directions, options) {

		if (_.isArray(directions)) {

			// array of directions
			var $directions = _.map(directions, function (direction) {
				return buildHandle$El.call(this, direction, options);
			}, this);

			return _.zipObject(directions, $directions);

		} else if (_.isObject(directions)) {

			// hash of direction: $handle/$handle-selector
			return _.mapValues(directions, function ($handle, direction) {

				$handle = _.isObject($handle) ? $handle : this.$el.find($handle);

				return ($handle.length !== 0) ? $handle : buildHandle$El.call(this, direction, options);

			}, this);

		} else if (_.isString(directions)) {

			// string of comma-separated directions
			// trim
			directions = directions.replace(' ', '');
			// split
			directions = directions.split(',');

			return buildHandle$Els.call(this, directions, options);
		}

	}

	/**
	 * Takes the $els for the handles and builds the handle object over them
	 * using this.handleBuilder builder.
	 *
	 * @method buildHandleObjects
	 * @private
	 */
	function buildHandleObjects($handles, options) {
		// $handles : {direction: $el}

		return _.mapValues($handles, function ($el, direction) {

			return this.handleBuilder(_.extend({}, options, {
				el: $el,
				direction: direction,
				resizable: this,
				thickness: _.isNumber(options.thickness) ? options.thickness : options.thickness[direction],
				ratio: _.isNumber(options.ratio) ? options.ratio : options.ratio[direction],

				canvas: this.$canvas,
			}));

		}, this);
	}

	/**
	 * The action caller.
	 *
	 * @method buildHandles
	 * @private
	 */
	module.exports = function buildHandles(options) {

		var directions = options.directions;

		// get $handle jquery objects
		var $handles = buildHandle$Els.call(this, options.directions, options);

		// get the handle objects
		this.handles = buildHandleObjects.call(this, $handles, options);
	};
});

define('__backbone-ui-resizable/handle/helpers',['require','exports','module'],function (require, exports, module) {
	

	exports.min = function min(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {

			return v1 < v2 ? v1 : v2;
		}
	};

	exports.max = function max(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {
			return v1 > v2 ? v1 : v2;
		}

	};


	exports.numberify = function numberify(v) {
		var res = parseInt(v, 10);

		if (isNaN(res)) {
			throw new Error(v + ' not number');
		} else {
			return res;
		}
	};
});

define('__backbone-ui-resizable/handle/update',['require','exports','module','./helpers','no'],function (require, exports, module) {
	

	var helpers = require('./helpers'),
		no = require('no');

	function positionN(offset) {
		var top = no(this.resizable.model.get('top')).add(offset);

		this.model.set('top', top.value());
	}

	function positionS(offset) {

		var top = no(this.resizable.model.get('top'));

		top.add(this.resizable.model.get('height'))
			.add(offset);

		this.model.set('top', top.value());
	}

	function positionW(offset) {
		var left = no(this.resizable.model.get('left'));

		this.model.set('left', left.add(offset).value());
	}

	function positionE(offset) {

		var left = no(this.resizable.model.get('left'));

		left.add(this.resizable.model.get('width'))
			.add(offset);

		this.model.set('left', left.value());
	}

	function sizeX() {
		this.model.set('width', no(this.resizable.model.get('width')).value());
	}

	function sizeY() {
		this.model.set('height', no(this.resizable.model.get('height')).value());
	}




	exports.n = function updateN() {
		positionN.call(this, -1 * this.outer);
		positionW.call(this, 0);
		sizeX.call(this);
	};

	exports.s = function updateS() {
		positionS.call(this, -1 * this.inner);
		positionW.call(this, 0);
		sizeX.call(this);
	};

	exports.w = function updateW() {
		positionW.call(this, -1 * this.outer);
		positionN.call(this, 0);
		sizeY.call(this);
	};

	exports.e = function updateE() {
		positionE.call(this, -1 * this.inner);
		positionN.call(this, 0);
		sizeY.call(this);
	};

	exports.nw = function updateNW() {
		positionN.call(this, -1 * this.outer);
		positionW.call(this, -1 * this.outer);
	};

	exports.ne = function updateNE() {
		positionN.call(this, -1 * this.outer);
		positionE.call(this, -1 * this.inner);
	};

	exports.sw = function updateSW() {
		positionS.call(this, -1 * this.inner);
		positionW.call(this, -1 * this.outer);
	};

	exports.se = function updateSE() {
		positionS.call(this, -1 * this.inner);
		positionE.call(this, -1 * this.inner);
	};

});

define('__backbone-ui-resizable/handle/track',['require','exports','module','lodash','./helpers'],function (require, exports, module) {

	

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
		this.listenTo(resizable.model, 'change', this.update);
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

define('__backbone-ui-resizable/handle/min-max',['require','exports','module','./helpers'],function (require, exports, module) {
	

	var helpers = require('./helpers');

	// Y
	exports.n = function nMinMax() {

		var resizableModel = this.resizable.model;

		var height = resizableModel.get('height'),
			minHeight = resizableModel.get('minHeight'),
			maxHeight = resizableModel.get('maxHeight');

			// the highest possible delta towards the top
		var maxTopDelta = maxHeight - height,
			// the highest possible delta towards the bottom
			maxBottomDelta = height - minHeight;


			// the minimum Y set on resizableModel
		var resizableMinY = resizableModel.get('minY') || 0;


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for NORTH handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its minimum Y position
			minY: helpers.max(currentY - maxTopDelta, resizableMinY) - this.outer,

			// the maximum Y for NORTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			maxY: currentY + this.thickness + maxBottomDelta
		});
	};

	exports.s = function sMinMax() {

		var resizableModel = this.resizable.model;

		var height = resizableModel.get('height'),
			minHeight = resizableModel.get('minHeight'),
			maxHeight = resizableModel.get('maxHeight');

			// the highest possible delta towards the top
		var maxTopDelta = height - minHeight,
			// the highest possible delta towards the bottom
			maxBottomDelta = maxHeight - height;


			// the maximum Y set on resizableModel
		var resizableMaxY = resizableModel.get('maxY') || 0;


		var currentY = this.model.get('top'),
			currentBottomY = currentY + this.thickness;

		this.model.set({
			// the minimum Y for SOUTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			minY: currentY - maxTopDelta,

			// the maximum Y for SOUTH handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its maximum Y position
			maxY: helpers.min(currentBottomY + maxBottomDelta, resizableMaxY + this.outer)
		});
	};






	// X
	exports.w = function wMinMax() {

		var resizableModel = this.resizable.model;

		var width = resizableModel.get('width'),
			minWidth = resizableModel.get('minWidth'),
			maxWidth = resizableModel.get('maxWidth');

			// the highest possible delta towards the left
		var maxLeftDelta = maxWidth - width,
			// the highest possible delta towards the right
			maxRightDelta = width - minWidth;


			// the minimum X set on resizableModel
		var resizableMinX = resizableModel.get('minX') || 0;

			// the current X position of the handle
		var currentX = this.model.get('left');

		this.model.set({
			// the minimum X for WEST handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its minimum X boundary
			// LESS the handle portion that is out.
			minX: helpers.max(currentX - maxLeftDelta, resizableMinX) - this.outer,

			// the maximum X for WEST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			maxX: currentX + this.thickness + maxRightDelta
		});
	};




	exports.e = function eMinMax() {

		var resizableModel = this.resizable.model;

		var width = resizableModel.get('width'),
			minWidth = resizableModel.get('minWidth'),
			maxWidth = resizableModel.get('maxWidth');

			// the highest possible delta towards the left
		var maxLeftDelta = width - minWidth,
			// the highest possible delta towards the right
			maxRightDelta = maxWidth - width;


			// the maximum X set on resizableModel
		var resizableMaxX = resizableModel.get('maxX');


		var currentX = this.model.get('left'),
			currentRightX = currentX + this.thickness;

		this.model.set({
			// the minimum X for EAST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			minX: currentX - maxLeftDelta,

			// the maximum X for EAST handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its maximum X boundary
			maxX: helpers.min(currentRightX + maxRightDelta, resizableMaxX + this.outer)
		});
	};

});

define('__backbone-ui-resizable/handle/index',['require','exports','module','jquery-ui','backbone-ui-draggable','lodash','./update','./track','./min-max'],function (require, exports, module) {
	

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

define('__backbone-ui-resizable/actions',['require','exports','module'],function (require, exports, module) {
	

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

//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 */

define('backbone-ui-resizable',['require','exports','module','lowercase-backbone','backbone-ui-draggable','jquery','lodash','./__backbone-ui-resizable/build-handles','./__backbone-ui-resizable/handle/index','./__backbone-ui-resizable/actions'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		draggable = require('backbone-ui-draggable'),
		$ = require('jquery'),
		_ = require('lodash');


	// internal
	var buildHandles = require('./__backbone-ui-resizable/build-handles'),
		handleBuilder = require('./__backbone-ui-resizable/handle/index');


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var number = /^[0-9]+$/;
	function stringifyPositionalValue(v) {
		// [1] check if it is a number
		return number.test(v) ? v + 'px' : v;
	}

	// private //
	/////////////


	var resizable = module.exports = draggable.extend({

		/**
		 * Initialization script.
		 *
		 * @method initialize
		 */
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.call(this, options);

			this.initializeModelDock(options);

			this.initializeUIDraggable(options);

			this.initializeUIResizable(options);
		},

		/**
		 * Holds initialization logic exclusive to resizable-dock.
		 *
		 * @method initializeUIResizable
		 * @param options {Object}
		 */
		initializeUIResizable: function resizableDock(options) {

			// canvas
			this.$canvas = options.canvas || this.canvas || $(window);

			var data = _.extend({
				minWidth: 2 * this.handleOptions.thickness,
				minHeight: 2 * this.handleOptions.thickness,

				width: this.$el.width(),
				height: this.$el.height(),

			}, this.$el.position(), options);

			// set initial position
			this.model.set(data);

			// get the options for the handle
			var handleOptions = _.defaults(
				_.pick(options, ['directions', 'clss', 'ratio', 'thickness']),
				this.handleOptions
			);

			// build all handles
			buildHandles.call(this, handleOptions);
		},

		/**
		 * The builder that returns a handle object instance.
		 *
		 * @property handleBuilder
		 * @type Function
		 */
		handleBuilder: handleBuilder,

		/**
		 * Options to be passed to handleBuilder
		 *
		 * @property handleOptions
		 * @type Object
		 *     @property directions {String|Array|Object}
		 *         String: string of comma separated directions
		 *         Array: array of directions
		 *         Object: hash keyed by directions and valued by handle-selectors or $handles
		 *     @property clss {String}
		 *     @property ratio {Float}
		 *         The portion of the handle thickness that should
		 *         be left outside the resizable object.
		 *     @property thickness {Int}
		 *         The thickness of the handle in pixels.
		 */
		handleOptions: {
			directions: 'n,s,w,e,nw,ne,sw,se',
			clss: 'handle',
			ratio: 0.2,
			thickness: 30,
		},

		stringifiers: {
			height: stringifyPositionalValue,
			minHeight: stringifyPositionalValue,
			maxHeight: stringifyPositionalValue,

			width: stringifyPositionalValue,
			minWidth: stringifyPositionalValue,
			maxWidth: stringifyPositionalValue,

			left: stringifyPositionalValue,
			top: stringifyPositionalValue
		},

		map: {
			top: '->css:top',
			left: '->css:left',

			width: '->css:width',
			minWidth: '->css:min-width',
			maxWidth: '->css:max-width',

			height: '->css:height',
			minHeight: '->css:min-height',
			maxHeight: '->css:max-height',
		},
	});

	// define proto
	resizable.proto(require('./__backbone-ui-resizable/actions'));

});

