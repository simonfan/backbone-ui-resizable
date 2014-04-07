//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 */

define(function (require, exports, module) {
	'use strict';

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
			var resizableOptions = _.extend(
				// the default resizableOptions
				this.resizableOptions,
				// the instance resizableOptions
				_.pick(options, resizableOptionsProperties)
			);


			// set the options onto the model
			this.model.set(resizableOptions);

			// listen to events on the $el
			this.$el
				.resizable(this.model)
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
