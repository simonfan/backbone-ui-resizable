define(function (require, exports, module) {
	'use strict';

	exports.disableResizable = function disableResizable() {
		_.each(this.handles, function (handleObj, direction) {
			handleObj.disableHandle();
		}, this);


		this.$el
			.addClass(this.resizableClass + '-disabled')
			.removeClass(this.resizableClass + '-enabled');

		return this;
	};

	exports.enableResizable = function enableResizable(options) {

		_.each(this.handles, function (handleObj, direction) {
			handleObj.enableHandle();
		}, this);


		this.$el
			.addClass(this.resizableClass + '-enabled')
			.removeClass(this.resizableClass + '-disabled');

		return this;
	};

	exports.disableHandle = function disableHandle(direction) {
		var handleObj = this.handles[direction];

		if (handleObj) {
			handleObj.disableHandle();
		}

		return this;
	};

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
