define(function (require, exports, module) {
	'use strict';

	var no = require('no');

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
			minTop: helpers.max(
				no(currentY)
					.subtract(maxTopDelta)
					.subtract(this.outer)
					.value(),
				no(resizableMinTop)
					.subtract(this.outer)
					.value()
			),

			// the maximum Y for NORTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			maxTop: helpers.min(
				no(currentY)
					.add(maxBottomDelta)
					.value(),
				no(resizableMaxTop)
					.subtract(this.outer)
					.value()
			),
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
			minBottom: helpers.max(
				no(currentY)
					.subtract(maxTopDelta)
					.add(this.thickness)
					.value(),
				no(resizableMinBottom)
					.add(this.outer)
					.value()
			),

			// the maximum Y for SOUTH handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its maximum Y position
			maxBottom: helpers.min(
				no(currentY)
					.add(maxBottomDelta)
					.add(this.thickness)
					.value(),
				no(resizableMaxBottom)
					.add(this.outer)
					.value()
			)
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
		var currentLeft = this.model.get('left');

		this.model.set({
			// the minimum X for WEST handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its minimum X boundary
			// LESS the handle portion that is out.
			minLeft: helpers.max(
				no(currentLeft)
					.subtract(maxLeftDelta)
					.subtract(this.outer)
					.value(),
				no(resizableMinLeft)
					.subtract(this.outer)
					.value()
			),

			// the maximum X for WEST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			maxLeft: helpers.min(
				no(currentLeft)
					.add(maxRightDelta)
					.subtract(this.outer)
					.value(),
				no(resizableMaxLeft)
					.subtract(this.outer)
					.value()
			)
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


		var currentLeft = this.model.get('left');

		this.model.set({
			// the minimum X for EAST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			minRight: helpers.max(
				no(currentLeft)
					.subtract(maxLeftDelta)
					.add(this.thickness)
					.value(),
				no(resizableMinRight)
					.add(this.outer)
					.value()
			),

			// the maximum X for EAST handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its maximum X boundary
			maxRight: helpers.min(
				no(currentLeft)
					.add(this.thickness)
					.add(maxRightDelta)
					.value(),
				no(resizableMaxRight)
					.add(this.outer)
					.value()
			)
		});
	};

});
