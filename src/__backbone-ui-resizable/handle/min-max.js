define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers');

	// Y
	exports.n = function nMinMax() {

		var resizableModel = this.resizable.model;

		var height = resizableModel.get('height'),
			minHeight = resizableModel.get('minHeight'),
			maxHeight = resizableModel.get('maxHeight');

			// the highest possible delta towards the top
		var maxTopDelta = maxHeight - height,
			// the highest possible delta towards the bottom
			maxBottomDelta = height - minHeight;


			// the minimum Y set on resizableModel
		var resizableMinTop = resizableModel.get('minTop') || 0,

			resizableMaxTop = resizableModel.get('maxTop');


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for NORTH handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its minimum Y position
			minTop: helpers.max(currentY - maxTopDelta, resizableMinTop) - this.outer,

			// the maximum Y for NORTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			maxTop: helpers.min(currentY + maxBottomDelta, resizableMaxTop) - this.outer,
		});
	};

	exports.s = function sMinMax() {

		var resizableModel = this.resizable.model;

		var height = resizableModel.get('height'),
			minHeight = resizableModel.get('minHeight'),
			maxHeight = resizableModel.get('maxHeight');

			// the highest possible delta towards the top
		var maxTopDelta = height - minHeight,
			// the highest possible delta towards the bottom
			maxBottomDelta = maxHeight - height;


		var resizableMinBottom = resizableModel.get('minBottom'),
			// the maximum Y set on resizableModel
			resizableMaxBottom = resizableModel.get('maxBottom');


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for SOUTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			minTop: helpers.max(currentY - maxTopDelta, resizableMinBottom + this.outer),

			// the maximum Y for SOUTH handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its maximum Y position
			maxTop: helpers.min(currentY + maxBottomDelta, resizableMaxBottom - this.inner)
		});
	};






	// X
	exports.w = function wMinMax() {

		var resizableModel = this.resizable.model;

		var width = resizableModel.get('width'),
			minWidth = resizableModel.get('minWidth'),
			maxWidth = resizableModel.get('maxWidth');

			// the highest possible delta towards the left
		var maxLeftDelta = maxWidth - width,
			// the highest possible delta towards the right
			maxRightDelta = width - minWidth;


			// the minimum X set on resizableModel
		var resizableMinLeft = resizableModel.get('minLeft') || 0,

			resizableMaxLeft = resizableModel.get('maxLeft');

			// the current X position of the handle
		var currentX = this.model.get('left');

		this.model.set({
			// the minimum X for WEST handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its minimum X boundary
			// LESS the handle portion that is out.
			minLeft: helpers.max(currentX - maxLeftDelta, resizableMinLeft) - this.outer,

			// the maximum X for WEST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			maxLeft: helpers.min(currentX + maxRightDelta, resizableMaxLeft) - this.outer
		});
	};




	exports.e = function eMinMax() {

		var resizableModel = this.resizable.model;

		var width = resizableModel.get('width'),
			minWidth = resizableModel.get('minWidth'),
			maxWidth = resizableModel.get('maxWidth');

			// the highest possible delta towards the left
		var maxLeftDelta = width - minWidth,
			// the highest possible delta towards the right
			maxRightDelta = maxWidth - width;

		var resizableMinRight = resizableModel.get('minRight'),
			// the maximum X set on resizableModel
			resizableMaxRight = resizableModel.get('maxRight');


		var currentX = this.model.get('left');

		this.model.set({
			// the minimum X for EAST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			minLeft: helpers.max(currentX - maxLeftDelta, resizableMinRight + this.outer),

			// the maximum X for EAST handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its maximum X boundary
			maxLeft: helpers.min(currentX + maxRightDelta, resizableMaxRight - this.inner)
		});
	};

});
