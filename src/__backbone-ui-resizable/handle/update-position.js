define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers'),
		no = require('no');

	function positionN() {
		this.model.set('top', -1 * this.outer);
	}

	function positionS() {

		var top = no(this.resizable.model.get('height')).subtract(this.inner);

		this.model.set('top', top.value());
	}

	function positionW() {
		this.model.set('left', -1 * this.outer);
	}

	function positionE() {

		var left = no(this.resizable.model.get('width')).subtract(this.inner);

		this.model.set('left', left.value());
	}

	function sizeX() {
		this.model.set('width', no(this.resizable.model.get('width')).add(2 * this.outer).value());
	}

	function sizeY() {
		this.model.set('height', no(this.resizable.model.get('height')).add(2 * this.outer).value());
	}




	exports.n = function updateN() {
		positionN.call(this);
		positionW.call(this);
		sizeX.call(this);
	};

	exports.s = function updateS() {
		positionS.call(this);
		positionW.call(this);
		sizeX.call(this);
	};

	exports.w = function updateW() {
		positionW.call(this);
		positionN.call(this);
		sizeY.call(this);
	};

	exports.e = function updateE() {
		positionE.call(this);
		positionN.call(this);
		sizeY.call(this);
	};

	exports.nw = function updateNW() {
		positionN.call(this);
		positionW.call(this);
	};

	exports.ne = function updateNE() {
		positionN.call(this);
		positionE.call(this);
	};

	exports.sw = function updateSW() {
		positionS.call(this);
		positionW.call(this);
	};

	exports.se = function updateSE() {
		positionS.call(this);
		positionE.call(this);
	};

});
