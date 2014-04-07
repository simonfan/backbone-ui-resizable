(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'backbone-ui-resizable',
		// dependencies for the test
		deps = [mod, 'should', 'jquery', 'backbone'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(resizable, should, $, Backbone) {
	'use strict';

	describe('resizable base', function () {
		beforeEach(function () {

		});

		it('is fine (:', function () {

			function addPx(v) {
				return v + 'px';
			}


			var squareBuilder = resizable.extend({
				map: {
					'height': ['->css:height', '[data-attribute="height"]'],
					'width': ['->css:width', '[data-attribute="width"]'],
					'left': ['->css:left', '[data-attribute="left"]'],
					'top': ['->css:top', '[data-attribute="top"]'],

					'bottom': '[data-attribute="bottom"]',
					'right': '[data-attribute="right"]',

					'direction': '[data-attribute="direction"]',
					'axis': '[data-attribute="axis"]',
					'action': '[data-attribute="action"]',
					'handle': '[data-attribute="handle"]',
				},

				handleResize: function handleResize(e, ui, movement) {
					this.set(movement.data());
				}
			})

			var square = squareBuilder({
				el: $('#resizable'),
				model: new Backbone.Model({
					width: '50%',
					height: 200
				})
			});
		});
	});
});
