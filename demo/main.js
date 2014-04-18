define(['backbone-ui-resizable', 'jquery', 'model-dock'],
function (resizable            ,  $      ,  modelDock  ) {




	var squareBuilder = resizable.extend({
	//	handles: 'w,e',

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
		//	width: '50%',

			minHeight: 200,
			height: 200,
			maxHeight: 400,

			minWidth: 200,
			width: 400,
			maxWidth: 700,

			minX: 200,
			left: 250,
			maxX: 800,

			minY: 150,
			top: 150,
			maxY: 750
		})
	});


	var controlBuilder = modelDock.extend({

		initialize: function initialize(options) {
			modelDock.prototype.initialize.call(this, options);

			this.listenTo(square, 'resize', function (square, eventData) {

				this.model.set(eventData);

			}, this);
		},

		events: {
			'click button': 'doStuff'
		},

		doStuff: function doStuff(e) {
			var $t = $(e.target),
				action = $t.data('action');


			var remainder = square[action](20, { agent: 'button' });

			if (remainder) {
				alert('you\'ve reached the limit. Not possible to ' + action + ' another ' + remainder);
			}
		},

		map: {
			action: '[data-attribute="action"]',
			axis: '[data-attribute="axis"]',
			delta: '[data-attribute="delta"]',
			agent: '[data-attribute="agent"]'
		},
	});

	window.control = controlBuilder({
		el: $('#control')
	})
});
