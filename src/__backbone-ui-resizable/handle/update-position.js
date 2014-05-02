define(function (require, exports, module) {
	'use strict';

	var helpers = require('./helpers');

	function positionN() {
		this.modeld.set('top', -1 * this.outer);
	}

	function positionS() {

		var height = +this.resizable.modeld.get('height');

		this.modeld.set('top', height - this.inner);
	}

	function positionW() {
		this.modeld.set('left', -1 * this.outer);
	}

	function positionE() {

		var width = +this.resizable.modeld.get('width');

		this.modeld.set('left', width - this.inner);
	}

	function sizeX() {
		var width = +this.resizable.modeld.get('width');

		this.modeld.set('width', width + (2 * this.outer));
	}

	function sizeY() {
		var height = + this.resizable.modeld.get('height');
		this.modeld.set('height', height + (2 * this.outer));
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
