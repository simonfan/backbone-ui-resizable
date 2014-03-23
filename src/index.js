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

	var dockable = require('dockable-view'),
		_ = require('lodash');

	// event handlers
	var handleResize = require('./__backbone-ui-resizable/handle-resize');

	var resizable = module.exports = dockable.extend(function resizableDock(options) {
		dockable.prototype.initialize.apply(this, arguments);

		// bind event handling methods
		_.bindAll(this, 'handleResize', 'handleResizeStart', 'handleResizeStop');

		this.resizableOptions = _.assign(this.resizableOptions, options.resizableOptions);

		this.$el
			.resizable(this.resizableOptions)
			.on('resize', _.bind(handleResize, this))
			.on('resizestart', this.handleResizeStart)
			.on('resizestop', this.handleResizeStop);
	});



	function addPx(v) {
		return v + 'px';
	}


	// methods
	resizable.proto({

		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		docks: {

			css: {
				property: false,
				type: 'model',

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
				}
			},
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
