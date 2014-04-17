define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers'),
		no = require('no');

	function positionN(offset) {
		var top = no(this.resizable.model.get('top')).add(offset);

		this.model.set('top', top.value());
	}

	function positionS(offset) {

		var top = no(this.resizable.model.get('top'));

		top.add(this.resizable.model.get('height'))
			.add(offset);

		this.model.set('top', top.value());
	}

	function positionW(offset) {
		var left = no(this.resizable.model.get('left'));

		this.model.set('left', left.add(offset).value());
	}

	function positionE(offset) {

		var left = no(this.resizable.model.get('left'));

		left.add(this.resizable.model.get('width'))
			.add(offset);

		this.model.set('left', left.value());
	}

	function sizeX() {
		this.model.set('width', no(this.resizable.model.get('width')).value());
	}

	function sizeY() {
		this.model.set('height', no(this.resizable.model.get('height')).value());
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
