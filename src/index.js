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

			// if no model is passed, create a model before initializing
			// model view
			if (!this.model) {
				this.model = backbone.model();
			}

			this.initializeModelView(options);

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


			// set initial data
			var data = _.extend({
				minWidth: 2 * this.handleOptions.thickness,
				minHeight: 2 * this.handleOptions.thickness,

				width: this.$el.width(),
				height: this.$el.height(),

			}, this.$el.position(), options);

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

	resizable
		.proto(require('./__backbone-ui-resizable/enable-disable'))
		.proto(require('./__backbone-ui-resizable/build-handle'));

});
