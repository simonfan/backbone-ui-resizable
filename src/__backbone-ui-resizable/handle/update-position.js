define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers'),
		no = require('no');

	function positionN() {
		this.modeld.set('top', -1 * this.outer);
	}

	function positionS() {

		var top = no(this.resizable.modeld.get('height')).subtract(this.inner);

		this.modeld.set('top', top.value());
	}

	function positionW() {
		this.modeld.set('left', -1 * this.outer);
	}

	function positionE() {

		var left = no(this.resizable.modeld.get('width')).subtract(this.inner);

		this.modeld.set('left', left.value());
	}

	function sizeX() {
		this.modeld.set('width', no(this.resizable.modeld.get('width')).add(2 * this.outer).value());
	}

	function sizeY() {
		this.modeld.set('height', no(this.resizable.modeld.get('height')).add(2 * this.outer).value());
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
