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

define('__backbone-ui-resizable/resize',['require','exports','module','lodash','./movement-data'],function (require, exports, module) {
	

	var _ = require('lodash');

	var movementData = require('./movement-data');


	function getAllowedValue(value, min, max) {
		var res = value;

		if (_.isNumber(min)) {
			res = res > min ? res : min;
		}

		if (_.isNumber(max)) {
			res = res < max ? res : max;
		}

		return res;
	}

	/**
	 * Handles resizes.
	 *
	 * @method resize
	 * @private
	 * @param e {event Object}
	 * @param ui {jquery-ui ui Object}
	 */
	module.exports = function resize(data) {

		var model = this.model;

		// check for maximums and minimuns
		if (_.isNumber(data.width)) {

			var minWidth = model.get('minWidth'),
				maxWidth = model.get('maxWidth');

			data.width = getAllowedValue(data.width, minWidth, maxWidth);
		}

		if (_.isNumber(data.height)) {

			var minHeight = model.get('minHeight'),
				maxHeight = model.get('maxHeight');

			data.height = getAllowedValue(data.height, minHeight, maxHeight);
		}

		// set
		model.set(data);

		/**
		 * get data about the movement
		 */
		var current = model.toJSON(),
			previous = model.previousAttributes(),

			// build the movement-data object
			movement = movementData(current, previous);

		// trigger 'resize' event on the model.
		this.trigger('resize', this, movement);
		model.trigger('resize', model, movement);

		return this;
	};
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

		// do resizing
		this.resize(data);
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

define('backbone-ui-resizable',['require','exports','module','jquery-ui-resizable','lowercase-backbone','model-dock','lodash','./__backbone-ui-resizable/resize','./__backbone-ui-resizable/handle-resize'],function (require, exports, module) {
	

	// require jquery ui resizable
	require('jquery-ui-resizable');

	var backbone = require('lowercase-backbone'),
		modelDock = require('model-dock'),
		_ = require('lodash');

	/////////////
	// private //
	var resizableOptionsProperties = [
		'alsoResize', 'animate', 'animateDuration', 'animateEasing',
		'aspectRatio', 'autoHide', 'cancel', 'containment', 'delay',
		'disabled', 'distance', 'ghost', 'grid', 'handles', 'helper',
		'maxHeight', 'maxWidth', 'minHeight', 'minWidth',
	];

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


	var resizable = module.exports = modelDock.extend({

		/**
		 * Initialization script.
		 *
		 * @method initialize
		 */
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelDock.apply(this, arguments);

			this.initializeUIResizable.apply(this, arguments);
		},

		/**
		 * Holds initialization logic exclusive to resizable-dock.
		 *
		 * @method initializeUIResizable
		 * @param options {Object}
		 */
		initializeUIResizable: function resizableDock(options) {

			// bind event handling methods
			_.bindAll(this,
				'handleElResize',
				'handleElResizeStart',
				'handleElResizeStop',
				'rebuildResizableEl');

			// pick the resizableOptions from the main options object.
			var resizableOptions = _.defaults(
				// the instance resizableOptions
				_.pick(options, resizableOptionsProperties),
				// the default resizableOptions
				this.resizableOptions
			);

			// set the options onto the model
			this.model.set(resizableOptions);

			// listen to events on the $el
			this.$el
				.resizable(this.model.toJSON())
				.on('resize', this.handleElResize)
				.on('resizestart', this.handleElResizeStart)
				.on('resizestop', this.handleElResizeStop);

			// listen to change:[attribute] events on model
			// in order to rebuild the resizable object when resizableOptions change
			_.each(this.rebuildOnChange, function (attribute) {
				this.listenTo(this.model, 'change:' + attribute, this.rebuildResizableEl)
			}, this);
		},

		/**
		 * Destroys (if present) the previous resizable plugin
		 * and reinvokes the resizable jquery method.
		 *
		 * @method rebuildResizableEl
		 * @param options
		 */
		rebuildResizableEl: function rebuildResizableEl() {
			this.$el
				.resizable('destroy')
				.resizable(this.model.attributes);
		},

		/**
		 * Does the object resizing.
		 *
		 * @method resize
		 * @param data {Object}
		 */
		resize: require('./__backbone-ui-resizable/resize'),

		/**
		 * $el resize event handlers
		 */
		handleElResize: require('./__backbone-ui-resizable/handle-resize'),
		handleElResizeStart: function (e, ui) {
			this.trigger('resizestart', this);
		},
		handleElResizeStop: function (e, ui) {
			this.trigger('resizestop', this);
		},

		/**
		 * Default options to be passed to the $resizable builder
		 *
		 * @property resizableOptions
		 * @type Object
		 */
		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		/**
		 * When any of the attributes listed here is changed,
		 * the resizable object will be rebuilt.
		 *
		 * @property rebuildOnChange
		 * @type Array
		 */
		rebuildOnChange: ['handles', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth'],

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

