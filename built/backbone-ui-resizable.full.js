/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define('__backbone-ui-resizable/movement-data',['require','exports','module','subject','lodash'],function (require, exports, module) {
	

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
				// delta
				delta = axis === 'x' ? this.delta('width') : this.delta('height'),
				// movement action
				action = this.action(axis),
				// movement handle
				handle = this.handle(axis),
				// movement direction
				direction = this.direction(handle, action);

			return {
				axis: axis,
				delta: delta,
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

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define('__backbone-ui-resizable/handle-resize',['require','exports','module','./movement-data'],function (require, exports, module) {
	

	var movementData = require('./movement-data');

	/**
	 * Handles resizes.
	 *
	 * @method handleResize
	 * @private
	 * @param e {event Object}
	 * @param ui {jquery-ui ui Object}
	 */
	module.exports = function handleResize(e, ui) {

		var data = {
			// set position
			top: ui.position.top,
			left: ui.position.left,

			bottom: ui.position.top + ui.size.height,
			right: ui.position.left + ui.size.width,

			// set dimensions
			width: ui.size.width,
			height: ui.size.height,
		};

		var model = this.model;

		this.model.set(data);

		/**
		 * get data about the movement
		 */
		var current = model.attributes,
			previous = model.previousAttributes(),

			// build the movement-data object
			movement = movementData(current, previous);

		// trigger 'resize' event on the model.
		this.trigger('resize', this, movement);
		model.trigger('resize', model, movement);

		// call the custom handleResize method.
		this.handleResize(e, ui, movement);
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

define('backbone-ui-resizable',['require','exports','module','jquery-ui-resizable','lowercase-backbone','model-dock','lodash','./__backbone-ui-resizable/handle-resize'],function (require, exports, module) {
	

	// require jquery ui resizable
	require('jquery-ui-resizable');

	var backbone = require('lowercase-backbone'),
		modelDock = require('model-dock'),
		_ = require('lodash');

	// event handlers
	var _handleResize = require('./__backbone-ui-resizable/handle-resize');

	var resizable = module.exports = modelDock.extend({

		/**
		 * Initialization script.
		 *
		 * @method initialize
		 */
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelDock.apply(this, arguments);

			this.initializeResizableDock.apply(this, arguments);
		},

		/**
		 * Holds initialization logic exclusive to resizable-dock.
		 *
		 * @method initializeResizableDock
		 * @param options {Object}
		 */
		initializeResizableDock: function resizableDock(options) {

			// bind event handling methods
			_.bindAll(this, 'handleResize', 'handleResizeStart', 'handleResizeStop');

			this.resizableOptions = _.assign(this.resizableOptions, options.resizableOptions);

			this.$el
				.resizable(this.resizableOptions)
				.on('resize', _.bind(_handleResize, this))
				.on('resizestart', this.handleResizeStart)
				.on('resizestop', this.handleResizeStop);
		}
	});


	var number = /^[0-9]+$/;

	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	function stringifyPositionalValue(v) {
		// [1] check if it is a number
		return number.test(v) ? v + 'px' : v;
	}


	// methods
	resizable.proto({

		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		stringifiers: {
			height: stringifyPositionalValue,
			width: stringifyPositionalValue,
			left: stringifyPositionalValue,
			top: stringifyPositionalValue
		},

		map: {
			'top': '->css:top',
			'left': '->css:left',
			'width': '->css:width',
			'height': '->css:height',
		},

		/**
		 * No-op.
		 *
		 * @method handleResize
		 */
		handleResize: function (e, ui, data) {},
		handleResizeStart: function (e, ui) {},
		handleResizeStop: function (e, ui) {},
	});
});

