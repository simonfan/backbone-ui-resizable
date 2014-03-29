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


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method addPx
	 * @private
	 */
	function addPx(v) {
		return v + 'px';
	}


	// methods
	resizable.proto({

		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		stringifiers: {
			height: addPx,
			width: addPx,
			left: addPx,
			top: addPx
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
