define(function (require, exports, module) {

	var h = require('./helpers');


	exports.all = function trackAll() {
		// move together
		this.listenTo(this.resizable.model, 'change', this.update);
	};


	exports.n = function trackN() {

		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {

			delta = h.numberify(delta);

			var height = h.numberify(resizableModel.get('height')),
				top = h.numberify(resizableModel.get('top'));

			resizableModel.set({
				height: height - delta,
				top: top + delta
			});

		}, this);
	};

	exports.s = function trackS() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {

			var height = h.numberify(resizableModel.get('height')) + h.numberify(delta);

			resizableModel.set('height', height);
		});
	};

	exports.w = function trackW() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {

			delta = h.numberify(delta);

			var width = h.numberify(resizableModel.get('width')),
				left = h.numberify(resizableModel.get('left'));

			resizableModel.set({
				width: width - delta,
				left: left + delta
			});
		});
	};

	exports.e = function trackE() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {
			var width = h.numberify(resizableModel.get('width')) + h.numberify(delta);

			resizableModel.set('width', width);
		});
	};
});
