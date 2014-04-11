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
		});
	});
});
