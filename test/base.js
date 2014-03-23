(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'backbone-ui-resizable',
		// dependencies for the test
		deps = [mod, 'should', 'jquery'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(resizable, should, $) {
	'use strict';

	describe('resizable base', function () {
		beforeEach(function () {

		});

		it('is fine (:', function () {

			function addPx(v) {
				return v + 'px';
			}


			var squareBuilder = resizable.extend({
				docks: {
					css: {

						stringifiers: {
							height: addPx,
							width: addPx,
							left: addPx,
							top: addPx
						},

						map: {
							'height': ['->css:height', '[data-attribute="height"]'],
							'width': ['->css:width', '[data-attribute="width"]'],
							'left': ['->css:left', '[data-attribute="left"]'],
							'top': ['->css:top', '[data-attribute="top"]'],

							'bottom': '[data-attribute="bottom"]',
							'right': '[data-attribute="right"]',

						}
					},

					movement: {
						map: {
							direction: '[data-attribute="direction"]',
							axis: '[data-attribute="axis"]',
							handle: '[data-attribute="handle"]',
							action: '[data-attribute="action"]',
						}
					}
				},

				handleResize: function (movement, data, ui) {
					this.docks.movement.set(movement.data());
				}
			})

			var square = squareBuilder({ el: $('#resizable') });
		});
	});
});
