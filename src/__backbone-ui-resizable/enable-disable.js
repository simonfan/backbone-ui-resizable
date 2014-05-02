define(function (require, exports, module) {
	'use strict';

	/**
	 * Sets up the enabling and disabling system.
	 *
	 * @method _initializeResizableEnableDisable
	 * @private
	 */
	exports._initializeResizableEnableDisable = function initializeResizableEnableDisable() {


		// listen to enable and disable option changes
		this.listenTo(this.modeld, 'change:resizableStatus', function (model) {

			if (this.resizableEnabled()) {
				// is enabled

				// [1] enable handles
				_.each(this.handles, function (handleObj, direction) {
					handleObj.enableHandle();
				}, this);

				// [2] set classes
				this.$el
					.removeClass(this.resizableClass + '-disabled')
					.addClass(this.resizableClass + '-enabled');
			} else {
				// is disabled

				// [1] disable handles
				_.each(this.handles, function (handleObj, direction) {
					handleObj.disableHandle();
				}, this);

				// [2] set classes
				this.$el
					.removeClass(this.resizableClass + '-enabled')
					.addClass(this.resizableClass + '-disabled');
			}

		});


	};

	/**
	 * Returns whether the resizable capabilities are enabled.
	 *
	 * @method resizableEnabled
	 */
	exports.resizableEnabled = function resizableEnabled() {
		return this.modeld.get('resizableStatus') === 'enabled';
	};

	/**
	 * Sets the resizableStatus to 'disabled'
	 *
	 * @method disableResizable
	 */
	exports.disableResizable = function disableResizable() {

		this.modeld.set('resizableStatus', 'disabled');

		return this;
	};

	/**
	 * Sets the resizableStatus to 'enabled'
	 *
	 * @method enableResizable
	 */
	exports.enableResizable = function enableResizable(options) {

		this.modeld.set('resizableStatus', 'enabled');
		return this;
	};

	/**
	 * Disables a single handle
	 *
	 * @method disableHandle
	 */
	exports.disableHandle = function disableHandle(direction) {
		var handleObj = this.handles[direction];

		if (handleObj) {
			handleObj.disableHandle();
		}

		return this;
	};

	/**
	 * Enables a single handle
	 *
	 * @method disableHandle
	 */
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
