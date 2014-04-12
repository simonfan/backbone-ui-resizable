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
				_.pick(options, ['directions', 'clss', 'ratio', 'thickness']),
				this.handleOptions
			);

			buildHandles.call(this, handleOptions);
		},

		handleBuilder: handleBuilder,

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

});
