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



	exports.fitValueWithin = function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
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

	function positionN() {
		this.model.set('top', -1 * this.outer);
	}

	function positionS() {

		var top = no(this.resizable.model.get('height')).subtract(this.inner);

		this.model.set('top', top.value());
	}

	function positionW() {
		this.model.set('left', -1 * this.outer);
	}

	function positionE() {

		var left = no(this.resizable.model.get('width')).subtract(this.inner);

		this.model.set('left', left.value());
	}

	function sizeX() {
		this.model.set('width', no(this.resizable.model.get('width')).add(2 * this.outer).value());
	}

	function sizeY() {
		this.model.set('height', no(this.resizable.model.get('height')).add(2 * this.outer).value());
	}




	exports.n = function updateN() {
		positionN.call(this);
		positionW.call(this);
		sizeX.call(this);
	};

	exports.s = function updateS() {
		positionS.call(this);
		positionW.call(this);
		sizeX.call(this);
	};

	exports.w = function updateW() {
		positionW.call(this);
		positionN.call(this);
		sizeY.call(this);
	};

	exports.e = function updateE() {
		positionE.call(this);
		positionN.call(this);
		sizeY.call(this);
	};

	exports.nw = function updateNW() {
		positionN.call(this);
		positionW.call(this);
	};

	exports.ne = function updateNE() {
		positionN.call(this);
		positionE.call(this);
	};

	exports.sw = function updateSW() {
		positionS.call(this);
		positionW.call(this);
	};

	exports.se = function updateSE() {
		positionS.call(this);
		positionE.call(this);
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

define('__backbone-ui-resizable/handle/base',['require','exports','module','jquery-ui','backbone-ui-draggable','lodash','./update-position','./enable-disable'],function (require, exports, module) {
	

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
			this.updatePosition = _.bind(_updatePosition[this.direction], this);


			// [2] setStyles
			// [2.0] general styles
			this.setStyles();

			// [2.1] place the handle
			// initialize handle position
			this.updatePosition();

			// [5] enable!
			this.enableHandle();


			this.resizable.listenTo(this, 'movestart', function () {
				this.trigger('resizestart', this);
			});

			// UPDATE handle positions whenever the movement stops!
			// ONLY WHEN MOVEMENT STOPS
			this.resizable.listenTo(this, 'movestop', function () {
				this.trigger('resizestop', this);

				_.each(this.handles, function (handle) {
					handle.updatePosition();
				});
			});
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

define('__backbone-ui-resizable/handle/index',['require','exports','module','./base'],function (require, exports, module) {
	

	var baseHandle = require('./base');

	function nY(delta, options) {
		var remainder = this.resizable.moveN(delta, options);


		// ALWAYS RETURN 0, as the handle is
		// positioned relative to the resizable object,
		// and thus it must not modify its own position
		return 0;
	}

	function sY(delta, options) {
		var remainder = this.resizable.moveS(delta, options);

		// IF there is a remainder,
		// return the difference, so that the handle
		// cannot move beyond the resizable's boundaries
		return delta - remainder;
	}

	function wX(delta, options) {
		var remainder = this.resizable.moveW(delta, options);

		// ALWAYS RETURN 0, as the handle is
		// positioned relative to the resizable object,
		// and thus it must not modify its own position
		return 0;
	}

	function eX(delta, options) {
		var remainder = this.resizable.moveE(delta, options);

		// IF there is a remainder,
		// return the difference, so that the handle
		// cannot move beyond the resizable's boundaries
		return delta - remainder;
	}


	var n = { beforeMoveY: nY },
		s = { beforeMoveY: sY },
		w = { beforeMoveX: wX },
		e = { beforeMoveX: eX };



	exports.n = baseHandle.extend(n);

	exports.s = baseHandle.extend(s);

	exports.w = baseHandle.extend(w);

	exports.e = baseHandle.extend(e);

	exports.nw = baseHandle.extend(n).extend(w);

	exports.ne = baseHandle.extend(n).extend(e);

	exports.sw = baseHandle.extend(s).extend(w);

	exports.se = baseHandle.extend(s).extend(e);
});

define('__backbone-ui-resizable/helpers',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');


	function notNaN(v) {
		return !isNaN(v);
	}

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



	exports.fitValueWithin = function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
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

define('__backbone-ui-resizable/actions/e',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaE = function deltaE(attempted, force) {

		if (force) {
			return attempted;
		}

		var m = this.model;

		var w = m.get('width'),
			minW = m.get('minWidth'),
			maxW = m.get('maxWidth');

		var r = no(m.get('left')).add(w).value(),
			minR = m.get('minRight'),
			maxR = m.get('maxRight');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				no(minW).subtract(w).value(),
				no(minR).subtract(r).value()
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				no(maxW).subtract(w).value(),
				no(maxR).subtract(r).value()
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveE = function moveE(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			delta = this.deltaE(attemptedDelta, options.force);

		model.set('width', no(model.get('width')).add(delta).value());

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'expand' : 'contract',
				handle: 'e',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-x', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/w',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaW = function deltaW(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.model;

		var w = m.get('width'),
			minW = m.get('minWidth'),
			maxW = m.get('maxWidth');

		var l = m.get('left'),
			minL = m.get('minLeft'),
			maxL = m.get('maxLeft');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				no(w).subtract(maxW).value(),
				no(minL).subtract(l).value()
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				no(w).subtract(minW).value(),
				no(maxL).subtract(l).value()
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveW = function moveW(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			delta = this.deltaW(attemptedDelta, options.force);

		model.set({
			left: no(model.get('left')).add(delta).value(),
			width: no(model.get('width')).subtract(delta).value()
		});

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'contract' : 'expand',
				handle: 'w',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-x', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/s',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaS = function deltaS(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.model;

		var h = m.get('height'),
			minH = m.get('minHeight'),
			maxH = m.get('maxHeight');

		var b = no(m.get('top')).add(h).value(),
			minB = m.get('minBottom'),
			maxB = m.get('maxBottom');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				no(minH).subtract(h).value(),
				no(minB).subtract(b).value()
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				no(maxH).subtract(h).value(),
				no(maxB).subtract(b).value()
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveS = function moveS(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			delta = this.deltaS(attemptedDelta, options.force);

		model.set('height', no(model.get('height')).add(delta).value());

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'y',
				delta: delta,
				action: delta > 0 ? 'expand' : 'contract',
				handle: 's',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-y', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/n',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaN = function deltaN(attempted, force) {


		if (force) {
			return attempted;
		}


		var m = this.model;

		var h = m.get('height'),
			minH = m.get('minHeight'),
			maxH = m.get('maxHeight');

		var t = m.get('top'),
			minT = m.get('minTop'),
			maxT = m.get('maxTop');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				no(h).subtract(maxH).value(),
				no(minT).subtract(t).value()
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				no(h).subtract(minH).value(),
				no(maxT).subtract(t).value()
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveN = function moveN(attemptedDelta, options) {
		options = options || {};

		var model = this.model,
			delta = this.deltaN(attemptedDelta, options.force);

		model.set({
			top: model.get('top') + delta,
			height: no(model.get('height')).subtract(delta).value()
		});

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'contract' : 'expand',
				handle: 'n',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-y', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/index',['require','exports','module'],function (require, exports, module) {
	

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

		return Math.abs(this.moveW(-1 * attemptedDelta, options));
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

		return Math.abs(this.moveE(attemptedDelta, options));
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

		return Math.abs(this.moveN(-1 * attemptedDelta, options));
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

		return Math.abs(this.moveS(attemptedDelta, options));
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

		return Math.abs(this.moveW(attemptedDelta, options));
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

		return Math.abs(this.moveE(-1 * attemptedDelta, options));
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

		return Math.abs(this.moveN(attemptedDelta, options));
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

		return Math.abs(this.moveS(-1 * attemptedDelta, options));
	};
});

define('__backbone-ui-resizable/animations',['require','exports','module'],function (require, exports, module) {
	

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

define('__backbone-ui-resizable/enable-disable',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Sets up the enabling and disabling system.
	 *
	 * @method _initializeResizableEnableDisable
	 * @private
	 */
	exports._initializeResizableEnableDisable = function initializeResizableEnableDisable() {


		// listen to enable and disable option changes
		this.listenTo(this.model, 'change:resizableStatus', function (model) {

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
		return this.model.get('resizableStatus') === 'enabled';
	};

	/**
	 * Sets the resizableStatus to 'disabled'
	 *
	 * @method disableResizable
	 */
	exports.disableResizable = function disableResizable() {

		this.model.set('resizableStatus', 'disabled');

		return this;
	};

	/**
	 * Sets the resizableStatus to 'enabled'
	 *
	 * @method enableResizable
	 */
	exports.enableResizable = function enableResizable(options) {

		this.model.set('resizableStatus', 'enabled');
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

		return $handle.appendTo(this.$el);
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
		var handleObj = this.handleBuilder[direction](builderOptions);


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

define('backbone-ui-resizable',['require','exports','module','lowercase-backbone','backbone-ui-draggable','jquery','lodash','./__backbone-ui-resizable/handle/index','./__backbone-ui-resizable/handle/helpers','./__backbone-ui-resizable/actions/e','./__backbone-ui-resizable/actions/w','./__backbone-ui-resizable/actions/s','./__backbone-ui-resizable/actions/n','./__backbone-ui-resizable/actions/index','./__backbone-ui-resizable/animations','./__backbone-ui-resizable/enable-disable','./__backbone-ui-resizable/build-handle'],function (require, exports, module) {
	

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



			// set enabling system
			this._initializeResizableEnableDisable();
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
	resizable
		.proto(require('./__backbone-ui-resizable/actions/e'))
		.proto(require('./__backbone-ui-resizable/actions/w'))
		.proto(require('./__backbone-ui-resizable/actions/s'))
		.proto(require('./__backbone-ui-resizable/actions/n'))
		.proto(require('./__backbone-ui-resizable/actions/index'));


	resizable
		.proto(require('./__backbone-ui-resizable/animations'));

	resizable.proto(require('./__backbone-ui-resizable/enable-disable'));
	resizable.proto(require('./__backbone-ui-resizable/build-handle'));

});

