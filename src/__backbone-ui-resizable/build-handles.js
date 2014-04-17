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
	function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.insertAfter(this.$el);
	}


	/**
	 * Builds multiple handles for multiple directions.
	 *
	 * @method buildHandle$Els
	 * @private
	 */
	function buildHandle$Els(directions, options) {

		if (_.isArray(directions)) {

			// array of directions
			var $directions = _.map(directions, function (direction) {
				return buildHandle$El.call(this, direction, options);
			}, this);

			return _.zipObject(directions, $directions);

		} else if (_.isObject(directions)) {

			// hash of direction: $handle/$handle-selector
			return _.mapValues(directions, function ($handle, direction) {

				$handle = _.isObject($handle) ? $handle : this.$el.find($handle);

				return ($handle.length !== 0) ? $handle : buildHandle$El.call(this, direction, options);

			}, this);

		} else if (_.isString(directions)) {

			// string of comma-separated directions
			// trim
			directions = directions.replace(' ', '');
			// split
			directions = directions.split(',');

			return buildHandle$Els.call(this, directions, options);
		}

	}

	/**
	 * Takes the $els for the handles and builds the handle object over them
	 * using this.handleBuilder builder.
	 *
	 * @method buildHandleObjects
	 * @private
	 */
	function buildHandleObjects($handles, options) {
		// $handles : {direction: $el}

		return _.mapValues($handles, function ($el, direction) {

			return this.handleBuilder(_.extend({}, options, {
				el: $el,
				direction: direction,
				resizable: this,
				thickness: _.isNumber(options.thickness) ? options.thickness : options.thickness[direction],
				ratio: _.isNumber(options.ratio) ? options.ratio : options.ratio[direction],

				canvas: this.$canvas,
			}));

		}, this);
	}

	/**
	 * The action caller.
	 *
	 * @method buildHandles
	 * @private
	 */
	module.exports = function buildHandles(options) {

		var directions = options.directions;

		// get $handle jquery objects
		var $handles = buildHandle$Els.call(this, options.directions, options);

		// get the handle objects
		this.handles = buildHandleObjects.call(this, $handles, options);
	};
});
