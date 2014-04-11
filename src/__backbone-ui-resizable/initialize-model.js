define(function (require, exports, module) {
	'use strict';


	var helpers = require('./helpers');

	function updateMaxWidth($el, model) {

		var left = model.get('left'),
			right = left + model.get('width'),
			minX = model.get('minX'),
			maxX = model.get('maxX'),
			maxWidth = model.get('maxWidth');

		var minXBasedMaxWidth = right - minX,
			maxXBasedMaxWidth = maxX - left;

		console.log([minXBasedMaxWidth, maxXBasedMaxWidth, maxWidth]);

		// the least among the maxWidthes
		var realMaxWidth = helpers.min([minXBasedMaxWidth, maxXBasedMaxWidth, maxWidth]);

		model.set('realMaxWidth', realMaxWidth);

		$el.resizable('option', 'maxWidth', realMaxWidth);
	}


	function updateMaxHeight($el, model) {
		var top = model.get('top'),
			bottom = top + model.get('height'),
			minY = model.get('minY'),
			maxY = model.get('maxY'),
			maxHeight = model.get('maxHeight');

		var minYBasedMaxHeight = bottom - minY,
			maxYBasedMaxHeight = maxY - top;

		// the least among the maxHeights
		var realMaxHeight = helpers.min([minYBasedMaxHeight, maxYBasedMaxHeight, maxHeight]);

		model.set('realMaxHeight', realMaxHeight);

		$el.resizable('option', 'maxHeight', realMaxHeight);
	}


	module.exports = function initializeModel(options) {



		var model = this.model,
			$el = this.$el;

		// set the options onto the model
		model.set(this.resizableOptions);

		// set
		// width, height, left, top
		// start values (in px)
		model.set({
			width: this.$el.width(),
			height: this.$el.height(),
			top: this.$el.position().top,
			left: this.$el.position().left,
		});

		this.listenTo(model, 'change', function (model) {

			this.$el.resizable('option', model.toJSON());

		}, this);

/*
		this.listenTo(
			model,
			'change:left change:width change:maxWidth change:minX change:maxX',
			_.partial(updateMaxWidth, $el)
		);

		this.listenTo(
			model,
			'change:top change:height change:maxHeight change:minY change:maxY',
			_.partial(updateMaxHeight, $el)
		);
		updateMaxWidth($el, model);
		updateMaxHeight($el, model);
*/

	};
});
