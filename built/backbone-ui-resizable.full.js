define('__backbone-ui-resizable/handle/helpers',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

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
		var res = parseFloat(v);

		if (isNaN(res)) {
			throw new Error(v + ' not number');
		} else {
			return res;
		}
	};

	exports.numberifyProperties = function numberifyProperties(props, obj) {
		var res = {};

		_.each(props, function (p) {
			res[p] = parseFloat(obj[p]);
		});

		return res;
	};


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var isNumber = /^-?\d*(\.\d+)?$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
	};
});

define('__backbone-ui-resizable/handle/update-position',['require','exports','module','./helpers','no'],function (require, exports, module) {
	

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

define('__backbone-ui-resizable/handle/min-max',['require','exports','module','no','./helpers'],function (require, exports, module) {
	

	var no = require('no');

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
		var resizableMinTop = resizableModel.get('minTop') || 0,

			resizableMaxTop = resizableModel.get('maxTop');


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for NORTH handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its minimum Y position
			minTop: helpers.max(
				no(currentY)
					.subtract(maxTopDelta)
					.subtract(this.outer)
					.value(),
				no(resizableMinTop)
					.subtract(this.outer)
					.value()
			),

			// the maximum Y for NORTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			maxTop: helpers.min(
				no(currentY)
					.add(maxBottomDelta)
					.value(),
				no(resizableMaxTop)
					.subtract(this.outer)
					.value()
			),
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


		var resizableMinBottom = resizableModel.get('minBottom'),
			// the maximum Y set on resizableModel
			resizableMaxBottom = resizableModel.get('maxBottom');


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for SOUTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			minBottom: helpers.max(
				no(currentY)
					.subtract(maxTopDelta)
					.add(this.thickness)
					.value(),
				no(resizableMinBottom)
					.add(this.outer)
					.value()
			),

			// the maximum Y for SOUTH handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its maximum Y position
			maxBottom: helpers.min(
				no(currentY)
					.add(maxBottomDelta)
					.add(this.thickness)
					.value(),
				no(resizableMaxBottom)
					.add(this.outer)
					.value()
			)
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
		var resizableMinLeft = resizableModel.get('minLeft') || 0,

			resizableMaxLeft = resizableModel.get('maxLeft');

			// the current X position of the handle
		var currentLeft = this.model.get('left');

		this.model.set({
			// the minimum X for WEST handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its minimum X boundary
			// LESS the handle portion that is out.
			minLeft: helpers.max(
				no(currentLeft)
					.subtract(maxLeftDelta)
					.subtract(this.outer)
					.value(),
				no(resizableMinLeft)
					.subtract(this.outer)
					.value()
			),

			// the maximum X for WEST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			maxLeft: helpers.min(
				no(currentLeft)
					.add(maxRightDelta)
					.subtract(this.outer)
					.value(),
				no(resizableMaxLeft)
					.subtract(this.outer)
					.value()
			)
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

		var resizableMinRight = resizableModel.get('minRight'),
			// the maximum X set on resizableModel
			resizableMaxRight = resizableModel.get('maxRight');


		var currentLeft = this.model.get('left');

		this.model.set({
			// the minimum X for EAST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			minRight: helpers.max(
				no(currentLeft)
					.subtract(maxLeftDelta)
					.add(this.thickness)
					.value(),
				no(resizableMinRight)
					.add(this.outer)
					.value()
			),

			// the maximum X for EAST handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its maximum X boundary
			maxRight: helpers.min(
				no(currentLeft)
					.add(this.thickness)
					.add(maxRightDelta)
					.value(),
				no(resizableMaxRight)
					.add(this.outer)
					.value()
			)
		});
	};

});

define('__backbone-ui-resizable/handle/enable-disable',['require','exports','module'],function (require, exports, module) {
	

	exports.disableHandle = function disableHandle() {

		this.disableDraggable();
		this.$el
			.addClass(this.resizable.handleOptions.clss + '-disabled')
			.removeClass(this.resizable.handleOptions.clss + '-enabled');

		return this;
	};

	exports.enableHandle = function enableHandle(direction, options) {

		this.enableDraggable();
		this.$el
			.addClass(this.resizable.handleOptions.clss + '-enabled')
			.removeClass(this.resizable.handleOptions.clss + '-disabled');

		return this;
	};
});

define('__backbone-ui-resizable/handle/index',['require','exports','module','jquery-ui','backbone-ui-draggable','lodash','./update-position','./track','./min-max','./enable-disable'],function (require, exports, module) {
	

	require('jquery-ui');

	var draggable = require('backbone-ui-draggable'),
		_ = require('lodash');

	var _updatePosition = require('./update-position'),
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
			this.initializePosition(options);

			// [3] set correct trackers for hte handle
			this.track();

			// [4] when movements starts, calculate the min and maxes.
			this.on('movestart', this.calcMinMax);

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

			var pos = $el.position();

			this.model.set({
				top: parseFloat(pos.top),
				left: parseFloat(pos.left)
			});

			this.updatePosition();
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

	// proto
	handle.proto(require('./enable-disable'));
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

define('__backbone-ui-resizable/animations',['require','exports','module'],function (require, exports, module) {
	

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
	 *     options will be passed straight to handle.animateToLeft,
	 *     which will pass options on to event data
	 */
	exports.aExpandToLeft = function aExpandToLeft(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		var handle = this.handles.w;

		handle.calcMinMax();
		return handle.animateToLeft(attemptedDelta, options);
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
		return handle.animateToRight(attemptedDelta, options);
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
		return handle.animateToTop(attemptedDelta, options);
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
		return handle.animateToBottom(attemptedDelta, options);
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
		return handle.animateToRight(attemptedDelta, options);
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
		return handle.animateToLeft(attemptedDelta, options);
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
		return handle.animateToBottom(attemptedDelta, options);
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
		return handle.animateToTop(attemptedDelta, options);
	};
});

define('__backbone-ui-resizable/enable-disable',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Sets up the enabling and disabling system.
	 *
	 * @method _initializeResizableEnableDisable
	 * @private
	 */
	exports._initializeResizableEnableDisable = function initializeResizableEnableDisable() {


		// listen to enable and disable option changes
		this.listenTo(model, 'change:resizable-status', function (model) {

			if (this.resizableEnabled()) {
				// is enabled

				// [1] enable handles
				_.each(this.handles, function (handleObj, direction) {
					handleObj.enableHandle();
				}, this);

				// [2] set classes
				this.$el
					.removeClass(this.resizableClass + '-disabled')
					.addClass(this.resizableClass + '-enabled');
			} else {
				// is disabled

				// [1] disable handles
				_.each(this.handles, function (handleObj, direction) {
					handleObj.disableHandle();
				}, this);

				// [2] set classes
				this.$el
					.removeClass(this.resizableClass + '-enabled')
					.addClass(this.resizableClass + '-disabled');
			}

		});


	};

	/**
	 * Returns whether the resizable capabilities are enabled.
	 *
	 * @method resizableEnabled
	 */
	exports.resizableEnabled = function resizableEnabled() {
		return this.model.get('resizable-status') === 'enabled';
	};

	/**
	 * Sets the resizable-status to 'disabled'
	 *
	 * @method disableResizable
	 */
	exports.disableResizable = function disableResizable() {

		this.model.set('resizable-status', 'disabled');

		return this;
	};

	/**
	 * Sets the resizable-status to 'enabled'
	 *
	 * @method enableResizable
	 */
	exports.enableResizable = function enableResizable(options) {

		this.model.set('resizable-status', 'enabled');
		return this;
	};

	/**
	 * Disables a single handle
	 *
	 * @method disableHandle
	 */
	exports.disableHandle = function disableHandle(direction) {
		var handleObj = this.handles[direction];

		if (handleObj) {
			handleObj.disableHandle();
		}

		return this;
	};

	/**
	 * Enables a single handle
	 *
	 * @method disableHandle
	 */
	exports.enableHandle = function enableHandle(direction, options) {
		var handleObj = this.handles[direction];

		if (handleObj) {
			handleObj.enableHandle();
		} else {
			this.handles[direction] = this.buildHandle(direction, options);
		}

		return this;
	};
});

define('__backbone-ui-resizable/build-handle',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');




	/**
	 * Builds a SINGLE $el for a direction handle.
	 *
	 * @method buildHandle$El
	 * @private
	 */
	exports.buildHandle$El = function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.insertAfter(this.$el);
	}


	/**
	 * Builds a single handle and returns it.
	 * Takes care of creating the $el, if necessary.
	 *
	 * @method buildHandle
	 * @param direction {String}
	 * @param options {Object}
	 */
	exports.buildHandle = function buildHandle(direction, options) {

		options = options || {};

		_.defaults(options, this.handleOptions);

		var ratio = options.ratio,
			thickness = options.thickness;

		var builderOptions = _.extend({}, options, {
			el: this.buildHandle$El(direction, options),
			resizable: this,
			direction: direction,


			// ratio and thickness may be set for each
			// isolated handle.
			ratio: _.isObject(ratio) ? ratio[direction] : ratio,
			thickness: _.isObject(thickness) ? thickness[direction] : thickness
		});

		// [4] build the handle object
		var handleObj = this.handleBuilder(builderOptions);

		return handleObj;
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

define('backbone-ui-resizable',['require','exports','module','lowercase-backbone','backbone-ui-draggable','jquery','lodash','./__backbone-ui-resizable/handle/index','./__backbone-ui-resizable/handle/helpers','./__backbone-ui-resizable/actions','./__backbone-ui-resizable/animations','./__backbone-ui-resizable/enable-disable','./__backbone-ui-resizable/build-handle'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		draggable = require('backbone-ui-draggable'),
		$ = require('jquery'),
		_ = require('lodash');


	// internal
	var handleBuilder = require('./__backbone-ui-resizable/handle/index'),
		helpers = require('./__backbone-ui-resizable/handle/helpers');


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

			// disable the draggable
			if (!options.enableDraggable) {
				this.disableDraggable();
			}

			var data = _.extend({
				minWidth: 2 * this.handleOptions.thickness,
				minHeight: 2 * this.handleOptions.thickness,

				width: this.$el.width(),
				height: this.$el.height(),

			}, this.$el.position(), options);

			// set initial position
			this.model.set(data);



			/////////////
			// HANDLES //
			this.handleOptions = _.extend(this.handleOptions, _.pick(options, ['clss', 'ratio', 'thickness']));

			// get the options for the handle
			var directions = options.handles || this.handles;
			directions = _.isArray(directions) ? directions : directions.split(',');

			// build all handles
			// and overwrite defautl handles prop.
			this.handles = {};
			_.each(directions, function (direction) {

				// build the handle
				this.handles[direction] = this.buildHandle(direction, this.handleOptions);

			}, this);




		},

		/**
		 * The builder that returns a handle object instance.
		 *
		 * @property handleBuilder
		 * @type Function
		 */
		handleBuilder: handleBuilder,

		handles: 'n,s,w,e,nw,ne,sw,se',

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
			clss: 'handle',
			ratio: 0.2,
			thickness: 30,
		},

		stringifiers: {
			height: helpers.stringifyPositionalValue,
			minHeight: helpers.stringifyPositionalValue,
			maxHeight: helpers.stringifyPositionalValue,

			width: helpers.stringifyPositionalValue,
			minWidth: helpers.stringifyPositionalValue,
			maxWidth: helpers.stringifyPositionalValue,

			left: helpers.stringifyPositionalValue,
			top: helpers.stringifyPositionalValue
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
	resizable.proto(require('./__backbone-ui-resizable/animations'));
	resizable.proto(require('./__backbone-ui-resizable/enable-disable'));
	resizable.proto(require('./__backbone-ui-resizable/build-handle'));

});

