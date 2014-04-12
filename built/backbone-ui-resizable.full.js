//     BackboneUiDraggable
//     (c) simonfan
//     BackboneUiDraggable is licensed under the MIT terms.

define("__backbone-ui-draggable/move",["require","exports","module"],function(t,e){function i(t,e,i){return isNaN(e)||(t=t>e?t:e),isNaN(i)||(t=i>t?t:i),t}function o(t){return parseInt(t,10)}e.moveX=function(t,e){if(t){if(-1===this.axis.indexOf("x"))return t;var s=this.model,n=parseInt(s.get("left"),10),r=n+t,a=o(s.get("minX")),u=o(s.get("maxX"))-o(this.$el.width()),l=i(r,a,u);s.set("left",o(l)),s.set(this.valueAttribute,this.toValue(s));var h=s.get("left")-n;return e||this.trigger("move",this,{axis:"x",delta:h}).trigger("move-x",this,h),t-h}return 0},e.moveY=function(t,e){if(t){if(-1===this.axis.indexOf("y"))return t;var s=this.model,n=parseInt(s.get("top"),10),r=n+t,a=o(s.get("minY")),u=o(s.get("maxY"))-o(this.$el.height()),l=i(r,a,u);s.set("top",o(l)),s.set(this.valueAttribute,this.toValue(s));var h=s.get("top")-n;return e||this.trigger("move",this,{axis:"y",delta:h}).trigger("move-y",this,h),t-h}return 0},e.moveToLeft=function(t,e){return this.moveX(-1*t,e)},e.moveToRight=function(t,e){return this.moveX(t,e)},e.moveToTop=function(t,e){return this.moveY(-1*t,e)},e.moveToBottom=function(t,e){return this.moveY(t,e)}}),define("backbone-ui-draggable",["require","exports","module","lowercase-backbone","model-dock","lodash","jquery","./__backbone-ui-draggable/move"],function(t,e,i){function o(t){return l.test(t)?t+"px":t}function s(t){return parseInt(t)}var n=t("lowercase-backbone"),r=t("model-dock"),a=t("lodash"),u=t("jquery"),l=/^[0-9\-]+$/,h=i.exports=r.extend({initialize:function(t){n.view.prototype.initialize.call(this,t),this.initializeModelDock(t),this.initializeUIDraggable(t)},initializeUIDraggable:function(t){a.bindAll(this,"mousedown","mousemove","mouseup"),this.$window=u(window),this.$canvas=t.canvas||this.canvas||this.$el.parent();var e=this.$el.position(),i=u.extend({status:"stopped",top:s(e.top),left:s(e.left)},t),o=this.model;o.set(i);var n=this.valueAttribute;if(this.listenTo(o,"change:"+n,function(t){var e=this.toPosition(t.get(n));t.set({top:s(e.top),left:s(e.left)})},this),o.get(n)){var e=this.toPosition(o.get(n));o.set({top:s(e.top),left:s(e.left)})}else o.set(n,this.toValue(o))},events:{mousedown:"mousedown"},mousedown:function(t){if(this.$el.is(t.target)&&1===t.which){this.model.set("status","dragging"),this.lastPosition={x:t.pageX,y:t.pageY};var e=this.$el.offset();return this.handlePosition={x:t.pageX-e.left,y:t.pageY-e.top},this.$window.on("mousemove",this.mousemove).on("mouseup",this.mouseup),this.trigger("movestart",this),!1}},mousemove:function(t){var e=this.lastPosition,i=t.pageX,o=t.pageY,s=i-e.x,n=o-e.y,r=this.$el.offset(),a=this.handlePosition.x+r.left,u=this.handlePosition.y+r.top;return(s>0&&i>a||0>s&&a>i)&&this.moveX(s),(n>0&&o>u||0>n&&u>o)&&this.moveY(n),e.x=i,e.y=o,!1},mouseup:function(){this.$window.off("mousemove",this.mousemove),delete this.lastPosition,this.model.set("status","stopped"),this.trigger("movestop",this)},axis:"xy",valueAttribute:"value",setValue:function(t){return this.model.set(this.valueAttribute,t),this},toValue:function(t){return"At "+t.get("top")+" x "+t.get("left")},toPosition:function(t){var e=t.split("x");return{top:e[0].replace(/[^0-9\-]/g,""),left:e[1].replace(/[^0-9\-]/g,"")}},map:{left:"->css:left",top:"->css:top"},stringifiers:{left:o,top:o}});h.proto(t("./__backbone-ui-draggable/move"))});
define('__backbone-ui-resizable/build-handles',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');

	function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.insertAfter(this.$el);
	}

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

	function buildHandleObjects($handles, options) {
		// $handles : {direction: $el}

		return _.mapValues($handles, function ($el, direction) {

			return this.handleBuilder(_.extend({}, options, {
				el: $el,
				direction: direction,
				resizable: this,
				thickness: _.isNumber(options.thickness) ? options.thickness : options.thickness[direction],
				hook: _.isNumber(options.hook) ? options.hook : options.hook[direction],

				canvas: resizable.$canvas,
			}));

		}, this);
	}


	module.exports = function buildHandles(options) {

		var directions = options.directions;

		// get $handle jquery objects
		var $handles = buildHandle$Els.call(this, options.directions, options);

		// get the handle objects
		this.handles = buildHandleObjects.call(this, $handles, options);
	};
});

define('__backbone-ui-resizable/handle/update',['require','exports','module'],function (require, exports, module) {

	function positionN(offset) {
		this.model.set('top', parseInt(this.resizable.model.get('top'), 10) + parseInt(offset, 10));
	};

	function positionS(offset) {
		this.model.set('top', parseInt(this.resizable.model.get('top'), 10) + this.resizable.model.get('height') + parseInt(offset, 10));
	};

	function positionW(offset) {
		this.model.set('left', parseInt(this.resizable.model.get('left'), 10) + parseInt(offset, 10));
	};

	function positionE(offset) {
		this.model.set('left', parseInt(this.resizable.model.get('left'), 10) + this.resizable.model.get('width') + parseInt(offset, 10));
	};

	function sizeX() {
		this.model.set('width', this.resizable.model.get('width'));
	};

	function sizeY() {
		this.model.set('height', this.resizable.model.get('height'));
	};




	exports.n = function updateN() {

		console.log('resizable')
		console.log(this.resizable.model.attributes);

		console.log('model');
		console.log(this.model.attributes);

		positionN.call(this, -this.hook);
		positionW.call(this, 0);
		sizeX.call(this);
	};

	exports.s = function updateS() {
		positionS.call(this, - this.thickness + this.hook);
		positionW.call(this, 0);
		sizeX.call(this);
	};

	exports.w = function updateW() {
		positionW.call(this, -this.hook);
		positionN.call(this, 0);
		sizeY.call(this);
	};

	exports.e = function updateE() {
		positionE.call(this, - this.thickness + this.hook);
		positionN.call(this, 0);
		sizeY.call(this);
	};

	exports.nw = function updateNW() {
		positionN.call(this, -this.hook);
		positionW.call(this, -this.hook);
	};

	exports.ne = function updateNE() {
		positionN.call(this, -this.hook);
		positionE.call(this, - this.thickness + this.hook);
	};

	exports.sw = function updateSW() {
		positionS.call(this, - this.thickness + this.hook);
		positionW.call(this, -this.hook);
	};

	exports.se = function updateSE() {
		positionS.call(this, - this.thickness + this.hook);
		positionE.call(this, - this.thickness + this.hook);
	};

});

define('__backbone-ui-resizable/handle/track',['require','exports','module'],function (require, exports, module) {


	exports.all = function trackAll() {
		// move together
		this.listenTo(this.resizable.model, 'change', this.update);
	};


	exports.n = function trackN() {

		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {

			var height = resizableModel.get('height'),
				top = resizableModel.get('top');

			resizableModel.set({
				height: height - delta,
				top: top + delta
			});

		}, this);
	};

	exports.s = function trackS() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {
			resizableModel.set('height', resizableModel.get('height') + delta)
		});
	};

	exports.w = function trackW() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {
			var width = resizableModel.get('width'),
				left = resizableModel.get('left');

			resizableModel.set({
				width: width - delta,
				left: left + delta
			});
		});
	};

	exports.e = function trackE() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {
			resizableModel.set('width', resizableModel.get('width') + delta);
		});
	};
});

define('__backbone-ui-resizable/handle/helpers',['require','exports','module'],function (require, exports, module) {

	exports.min = function min(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1
		} else {

			return v1 < v2 ? v1 : v2;
		}
	};

	exports.max = function max(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1
		} else {
			return v1 > v2 ? v1 : v2;
		}

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
			minY: helpers.max(currentY - maxTopDelta, resizableMinY),

			// the maximum Y for NORTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			maxY: currentY + maxBottomDelta
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


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for SOUTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			minY: currentY - maxTopDelta,

			// the maximum Y for SOUTH handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its maximum Y position
			maxY: helpers.min(currentY + maxBottomDelta, resizableMaxY)
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
			minX: helpers.max(currentX - maxLeftDelta, resizableMinX),

			// the maximum X for WEST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			maxX: currentX + maxRightDelta
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


		var currentX = this.model.get('left');

		this.model.set({
			// the minimum X for EAST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			minX: currentX - maxLeftDelta,

			// the maximum X for EAST handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its maximum X boundary
			maxX: helpers.min(currentX + maxRightDelta, resizableMaxX)
		});
	};

});

define('__backbone-ui-resizable/handle/index',['require','exports','module','backbone-ui-draggable','./update','./track','./min-max'],function (require, exports, module) {

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

			// calculate hook point
			this.hook = this.thickness * options.hook;

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

//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 */

define('backbone-ui-resizable',['require','exports','module','jquery-ui-resizable','lowercase-backbone','backbone-ui-draggable','lodash','./__backbone-ui-resizable/build-handles','./__backbone-ui-resizable/handle/index'],function (require, exports, module) {
	

	// require jquery ui resizable
	require('jquery-ui-resizable');

	var backbone = require('lowercase-backbone'),
		draggable = require('backbone-ui-draggable'),
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

			// bind event handling methods
	/*		_.bindAll(this,
				'handleElResize',
				'handleElResizeStart',
				'handleElResizeStop',
				'rebuildResizableEl');
		*/

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





			var handleOptions = _.defaults(
				_.pick(options, ['directions', 'clss', 'hook', 'thickness']),
				this.handleOptions
			);

			buildHandles.call(this, handleOptions);
		},

		handleBuilder: handleBuilder,

		handleOptions: {
			directions: 'n,s,w,e,nw,ne,sw,se',
			clss: 'handle',
			hook: 0.2,
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

});

