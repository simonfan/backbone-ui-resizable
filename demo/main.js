define(['backbone-ui-resizable', 'jquery', 'model-dock', './resizable-model.js', './limits.js'],
function (resizable            ,  $      ,  modelDock  ,  resizableModel       ,  limits      ) {




	var squareBuilder = resizable.extend({

		initialize: function initialize(options) {
			resizable.prototype.initialize.call(this, options);

			this.on('resize move', function rightAndBottom() {

				var model = this.model;

				var right = model.get('left') + model.get('width'),
					bottom = model.get('top') + model.get('height');

				model.set({
					right: right,
					bottom: bottom
				})

			}, this);
		},

		map: {
			'height': ['->css:height', '[data-attribute="height"]'],
			'width': ['->css:width', '[data-attribute="width"]'],
			'left': ['->css:left', '[data-attribute="left"]'],
			'top': ['->css:top', '[data-attribute="top"]'],

			minWidth: '[data-attribute="min-width"]',
			maxWidth: '[data-attribute="max-width"]',

			minHeight: '[data-attribute="min-height"]',
			maxHeight: '[data-attribute="max-height"]',

			'bottom': '[data-attribute="bottom"]',
			'right': '[data-attribute="right"]',

			minLeft: '[data-attribute="min-left"]',
			maxLeft: '[data-attribute="max-left"]',
			minRight: '[data-attribute="min-right"]',
			maxRight: '[data-attribute="max-right"]',

			minTop: '[data-attribute="min-top"]',
			maxTop: '[data-attribute="max-top"]',
			minBottom: '[data-attribute="min-bottom"]',
			maxBottom: '[data-attribute="max-bottom"]',

			'draggableStatus': '[data-attribute="draggableStatus"]',
			'resizableStatus': '[data-attribute="resizableStatus"]'
		},
	})

	window.square = squareBuilder({
		el: $('#resizable'),
		model: resizableModel
	});


	var controlBuilder = modelDock.extend({

		initialize: function initialize(options) {
			modelDock.prototype.initialize.call(this, options);

			this.listenTo(square, 'resize', function (square, eventData) {

//				console.log(eventData);

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
			agent: '[data-attribute="agent"]',
			handle: '[data-attribute="handle"]'
		},
	});

	window.control = controlBuilder({
		el: $('#control')
	})
});
