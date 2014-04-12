define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers');

	function positionN(offset) {
		this.model.set('top',
			helpers.numberify(this.resizable.model.get('top')) +
			helpers.numberify(offset));
	}

	function positionS(offset) {
		this.model.set('top',
			helpers.numberify(this.resizable.model.get('top')) +
			helpers.numberify(this.resizable.model.get('height')) +
			helpers.numberify(offset));
	}

	function positionW(offset) {
		this.model.set('left',
			helpers.numberify(this.resizable.model.get('left')) +
			helpers.numberify(offset));
	}

	function positionE(offset) {
		this.model.set('left',
			helpers.numberify(this.resizable.model.get('left')) +
			helpers.numberify(this.resizable.model.get('width')) +
			helpers.numberify(offset));
	}

	function sizeX() {
		this.model.set('width', helpers.numberify(this.resizable.model.get('width')));
	}

	function sizeY() {
		this.model.set('height', helpers.numberify(this.resizable.model.get('height')));
	}




	exports.n = function updateN() {
		positionN.call(this, -1 * this.outer);
		positionW.call(this, 0);
		sizeX.call(this);
	};

	exports.s = function updateS() {
		positionS.call(this, -1 * this.inner);
		positionW.call(this, 0);
		sizeX.call(this);
	};

	exports.w = function updateW() {
		positionW.call(this, -1 * this.outer);
		positionN.call(this, 0);
		sizeY.call(this);
	};

	exports.e = function updateE() {
		positionE.call(this, -1 * this.inner);
		positionN.call(this, 0);
		sizeY.call(this);
	};

	exports.nw = function updateNW() {
		positionN.call(this, -1 * this.outer);
		positionW.call(this, -1 * this.outer);
	};

	exports.ne = function updateNE() {
		positionN.call(this, -1 * this.outer);
		positionE.call(this, -1 * this.inner);
	};

	exports.sw = function updateSW() {
		positionS.call(this, -1 * this.inner);
		positionW.call(this, -1 * this.outer);
	};

	exports.se = function updateSE() {
		positionS.call(this, -1 * this.inner);
		positionE.call(this, -1 * this.inner);
	};

});
