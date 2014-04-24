define(function (require, exports, module) {
	'use strict';

	var $ = require('jquery'),
		_ = require('lodash');


	/**
	 * Builds a SINGLE $el for a direction handle.
	 *
	 * @method buildHandle$El
	 * @private
	 */
	exports.buildHandle$El = function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.appendTo(this.$el);
	}


	/**
	 * Builds a single handle and returns it.
	 * Takes care of creating the $el, if necessary.
	 *
	 * @method buildHandle
	 * @param direction {String}
	 * @param options {Object}
	 */
	exports.buildHandle = function buildHandle(direction, options) {

		options = options || {};

		_.defaults(options, this.handleOptions);

		var ratio = options.ratio,
			thickness = options.thickness;

		var builderOptions = _.extend({}, options, {
			el: this.buildHandle$El(direction, options),
			resizable: this,
			direction: direction,


			// ratio and thickness may be set for each
			// isolated handle.
			ratio: _.isObject(ratio) ? ratio[direction] : ratio,
			thickness: _.isObject(thickness) ? thickness[direction] : thickness
		});

		// [4] build the handle object
		var handleObj = this.handleBuilder[direction](builderOptions);


		return handleObj;
	};
});
