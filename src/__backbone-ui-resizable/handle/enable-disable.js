define(function (require, exports, module) {
	'use strict';

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
