define(['backbone-ui-resizable'], function (resizable) {




	var squareBuilder = resizable.extend({
		map: {
			'height': ['->css:height', '[data-attribute="height"]'],
			'width': ['->css:width', '[data-attribute="width"]'],
			'left': ['->css:left', '[data-attribute="left"]'],
			'top': ['->css:top', '[data-attribute="top"]'],

			minWidth: '[data-attribute="min-width"]',
			maxWidth: '[data-attribute="max-width"]',
			realMaxWidth: '[data-attribute="real-max-width"]',

			minHeight: '[data-attribute="min-height"]',
			maxHeight: '[data-attribute="max-height"]',
			realMaxHeight: '[data-attribute="real-max-height"]',

			'bottom': '[data-attribute="bottom"]',
			'right': '[data-attribute="right"]',

			minX: '[data-attribute="min-x"]',
			maxX: '[data-attribute="max-x"]',
			minY: '[data-attribute="min-y"]',
			maxY: '[data-attribute="max-y"]',
		},

		handleResize: function handleResize(e, ui, movement) {
			this.set(movement.data());
		}
	})

	window.square = squareBuilder({
		el: $('#resizable'),
		model: new Backbone.Model({
			top: 40,
			left: 50,

			width: '50%',
			height: 200,

			maxWidth: 700,
			maxHeight: 300,

			maxX: 800,
			maxY: 400
		})
	});
});
