define('__backbone-ui-resizable/build-handles',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');

	/**
	 * Builds a SINGLE $el for a direction handle.
	 *
	 * @method buildHandle$El
	 * @private
	 */
	function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.insertAfter(this.$el);
	}


	/**
	 * Builds multiple handles for multiple directions.
	 *
	 * @method buildHandle$Els
	 * @private
	 */
	function buildHandle$Els(directions, options) {

		if (_.isArray(directions)) {

			// array of directions
			var $directions = _.map(directions, function (direction) {
				return buildHandle$El.call(this, direction, options);
			}, this);

			return _.zipObject(directions, $directions);

		} else if (_.isObject(directions)) {

			// hash of direction: $handle/$handle-selector
			return _.mapValues(directions, function ($handle, direction) {

				$handle = _.isObject($handle) ? $handle : this.$el.find($handle);

				return ($handle.length !== 0) ? $handle : buildHandle$El.call(this, direction, options);

			}, this);

		} else if (_.isString(directions)) {

			// string of comma-separated directions
			// trim
			directions = directions.replace(' ', '');
			// split
			directions = directions.split(',');

			return buildHandle$Els.call(this, directions, options);
		}

	}

	/**
	 * Takes the $els for the handles and builds the handle object over them
	 * using this.handleBuilder builder.
	 *
	 * @method buildHandleObjects
	 * @private
	 */
	function buildHandleObjects($handles, options) {
		// $handles : {direction: $el}

		return _.mapValues($handles, function ($el, direction) {

			return this.handleBuilder(_.extend({}, options, {
				el: $el,
				direction: direction,
				resizable: this,
				thickness: _.isNumber(options.thickness) ? options.thickness : options.thickness[direction],
				ratio: _.isNumber(options.ratio) ? options.ratio : options.ratio[direction],

				canvas: this.$canvas,
			}));

		}, this);
	}

	/**
	 * The action caller.
	 *
	 * @method buildHandles
	 * @private
	 */
	module.exports = function buildHandles(options) {

		var directions = options.directions;

		// get $handle jquery objects
		var $handles = buildHandle$Els.call(this, options.directions, options);

		// get the handle objects
		this.handles = buildHandleObjects.call(this, $handles, options);
	};
});

define('__backbone-ui-resizable/handle/helpers',['require','exports','module'],function (require, exports, module) {
	

	exports.min = function min(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {

			return v1 < v2 ? v1 : v2;
		}
	};

	exports.max = function max(v1, v2) {
		if (isNaN(v1)) {
			return v2;
		} else if (isNaN(v2)) {
			return v1;
		} else {
			return v1 > v2 ? v1 : v2;
		}

	};


	exports.numberify = function numberify(v) {
		var res = parseInt(v, 10);

		if (isNaN(res)) {
			throw new Error(v + ' not number');
		} else {
			return res;
		}
	};
});

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash -o ./dist/lodash.compat.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

//     subject
//     (c) simonfan
//     subject is licensed under the MIT terms.

//     No
//     (c) simonfan
//     No is licensed under the MIT terms.

(function(){function n(n,t,e){for(var r=(e||0)-1,o=n?n.length:0;++r<o;)if(n[r]===t)return r;return-1}function t(t,e){var r=typeof e;if(t=t.cache,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var o="number"==r?e:m+e;return t=(t=t[r])&&t[o],"object"==r?t&&n(t,e)>-1?0:-1:t?0:-1}function e(n){var t=this.cache,e=typeof n;if("boolean"==e||null==n)t[n]=!0;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,o=t[e]||(t[e]={});"object"==e?(o[r]||(o[r]=[])).push(n):o[r]=!0}}function r(n){return n.charCodeAt(0)}function o(n,t){for(var e=n.criteria,r=t.criteria,o=-1,u=e.length;++o<u;){var a=e[o],i=r[o];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(i>a||"undefined"==typeof i)return-1}}return n.index-t.index}function u(n){var t=-1,r=n.length,o=n[0],u=n[r/2|0],a=n[r-1];if(o&&"object"==typeof o&&u&&"object"==typeof u&&a&&"object"==typeof a)return!1;var i=l();i["false"]=i["null"]=i["true"]=i.undefined=!1;var c=l();for(c.array=n,c.cache=i,c.push=e;++t<r;)c.push(n[t]);return c}function a(n){return"\\"+Z[n]}function i(){return v.pop()||[]}function l(){return y.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function c(n){return"function"!=typeof n.toString&&"string"==typeof(n+"")}function f(n){n.length=0,v.length<w&&v.push(n)}function s(n){var t=n.cache;t&&s(t),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,y.length<w&&y.push(n)}function p(n,t,e){t||(t=0),"undefined"==typeof e&&(e=n?n.length:0);for(var r=-1,o=e-t||0,u=Array(0>o?0:o);++r<o;)u[r]=n[t+r];return u}function g(e){function v(n){return n&&"object"==typeof n&&!fo(n)&&Wr.call(n,"__wrapped__")?n:new y(n)}function y(n,t){this.__chain__=!!t,this.__wrapped__=n}function w(n){function t(){if(r){var n=p(r);Mr.apply(n,arguments)}if(this instanceof t){var u=tt(e.prototype),a=e.apply(u,n||arguments);return Ft(a)?a:u}return e.apply(o,n||arguments)}var e=n[0],r=n[2],o=n[4];return co(t,n),t}function Z(n,t,e,r,o){if(e){var u=e(n);if("undefined"!=typeof u)return u}var a=Ft(n);if(!a)return n;var l=Dr.call(n);if(!G[l]||!io.nodeClass&&c(n))return n;var s=uo[l];switch(l){case B:case q:return new s(+n);case M:case V:return new s(n);case U:return u=s(n.source,E.exec(n)),u.lastIndex=n.lastIndex,u}var g=fo(n);if(t){var h=!r;r||(r=i()),o||(o=i());for(var v=r.length;v--;)if(r[v]==n)return o[v];u=g?s(n.length):{}}else u=g?p(n):xo({},n);return g&&(Wr.call(n,"index")&&(u.index=n.index),Wr.call(n,"input")&&(u.input=n.input)),t?(r.push(n),o.push(u),(g?wo:Co)(n,function(n,a){u[a]=Z(n,t,e,r,o)}),h&&(f(r),f(o)),u):u}function tt(n){return Ft(n)?Qr(n):{}}function et(n,t,e){if("function"!=typeof n)return or;if("undefined"==typeof t||!("prototype"in n))return n;var r=n.__bindData__;if("undefined"==typeof r&&(io.funcNames&&(r=!n.name),r=r||!io.funcDecomp,!r)){var o=qr.call(n);io.funcNames||(r=!S.test(o)),r||(r=L.test(o),co(n,r))}if(r===!1||r!==!0&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)};case 4:return function(e,r,o,u){return n.call(t,e,r,o,u)}}return qe(n,t)}function rt(n){function t(){var n=l?a:this;if(o){var h=p(o);Mr.apply(h,arguments)}if((u||f)&&(h||(h=p(arguments)),u&&Mr.apply(h,u),f&&h.length<i))return r|=16,rt([e,s?r:-4&r,h,null,a,i]);if(h||(h=arguments),c&&(e=n[g]),this instanceof t){n=tt(e.prototype);var v=e.apply(n,h);return Ft(v)?v:n}return e.apply(n,h)}var e=n[0],r=n[1],o=n[2],u=n[3],a=n[4],i=n[5],l=1&r,c=2&r,f=4&r,s=8&r,g=e;return co(t,n),t}function ot(e,r){var o=-1,a=vt(),i=e?e.length:0,l=i>=_&&a===n,c=[];if(l){var f=u(r);f?(a=t,r=f):l=!1}for(;++o<i;){var p=e[o];a(r,p)<0&&c.push(p)}return l&&s(r),c}function at(n,t,e,r){for(var o=(r||0)-1,u=n?n.length:0,a=[];++o<u;){var i=n[o];if(i&&"object"==typeof i&&"number"==typeof i.length&&(fo(i)||mt(i))){t||(i=at(i,t,e));var l=-1,c=i.length,f=a.length;for(a.length+=c;++l<c;)a[f++]=i[l]}else e||a.push(i)}return a}function it(n,t,e,r,o,u){if(e){var a=e(n,t);if("undefined"!=typeof a)return!!a}if(n===t)return 0!==n||1/n==1/t;var l=typeof n,s=typeof t;if(!(n!==n||n&&Y[l]||t&&Y[s]))return!1;if(null==n||null==t)return n===t;var p=Dr.call(n),g=Dr.call(t);if(p==$&&(p=K),g==$&&(g=K),p!=g)return!1;switch(p){case B:case q:return+n==+t;case M:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case U:case V:return n==Sr(t)}var h=p==z;if(!h){var v=Wr.call(n,"__wrapped__"),y=Wr.call(t,"__wrapped__");if(v||y)return it(v?n.__wrapped__:n,y?t.__wrapped__:t,e,r,o,u);if(p!=K||!io.nodeClass&&(c(n)||c(t)))return!1;var b=!io.argsObject&&mt(n)?Pr:n.constructor,d=!io.argsObject&&mt(t)?Pr:t.constructor;if(b!=d&&!(Dt(b)&&b instanceof b&&Dt(d)&&d instanceof d)&&"constructor"in n&&"constructor"in t)return!1}var m=!o;o||(o=i()),u||(u=i());for(var _=o.length;_--;)if(o[_]==n)return u[_]==t;var w=0;if(a=!0,o.push(n),u.push(t),h){if(_=n.length,w=t.length,a=w==_,a||r)for(;w--;){var x=_,j=t[w];if(r)for(;x--&&!(a=it(n[x],j,e,r,o,u)););else if(!(a=it(n[w],j,e,r,o,u)))break}}else ko(t,function(t,i,l){return Wr.call(l,i)?(w++,a=Wr.call(n,i)&&it(n[i],t,e,r,o,u)):void 0}),a&&!r&&ko(n,function(n,t,e){return Wr.call(e,t)?a=--w>-1:void 0});return o.pop(),u.pop(),m&&(f(o),f(u)),a}function lt(n,t,e,r,o){(fo(t)?re:Co)(t,function(t,u){var a,i,l=t,c=n[u];if(t&&((i=fo(t))||Oo(t))){for(var f=r.length;f--;)if(a=r[f]==t){c=o[f];break}if(!a){var s;e&&(l=e(c,t),(s="undefined"!=typeof l)&&(c=l)),s||(c=i?fo(c)?c:[]:Oo(c)?c:{}),r.push(t),o.push(c),s||lt(c,t,e,r,o)}}else e&&(l=e(c,t),"undefined"==typeof l&&(l=t)),"undefined"!=typeof l&&(c=l);n[u]=c})}function ct(n,t){return n+Br(oo()*(t-n+1))}function ft(e,r,o){var a=-1,l=vt(),c=e?e.length:0,p=[],g=!r&&c>=_&&l===n,h=o||g?i():p;if(g){var v=u(h);l=t,h=v}for(;++a<c;){var y=e[a],b=o?o(y,a,e):y;(r?!a||h[h.length-1]!==b:l(h,b)<0)&&((o||g)&&h.push(b),p.push(y))}return g?(f(h.array),s(h)):o&&f(h),p}function st(n){return function(t,e,r){var o={};if(e=v.createCallback(e,r,3),fo(t))for(var u=-1,a=t.length;++u<a;){var i=t[u];n(o,i,e(i,u,t),t)}else wo(t,function(t,r,u){n(o,t,e(t,r,u),u)});return o}}function pt(n,t,e,r,o,u){var a=1&t,i=2&t,l=4&t,c=16&t,f=32&t;if(!i&&!Dt(n))throw new Ar;c&&!e.length&&(t&=-17,c=e=!1),f&&!r.length&&(t&=-33,f=r=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=o),!a&&1&s[1]&&(t|=8),!l||4&s[1]||(s[5]=u),c&&Mr.apply(s[2]||(s[2]=[]),e),f&&Gr.apply(s[3]||(s[3]=[]),r),s[1]|=t,pt.apply(null,s);var g=1==t||17===t?w:rt;return g([n,t,e,r,o,u])}function gt(){X.shadowedProps=D,X.array=X.bottom=X.loop=X.top="",X.init="iterable",X.useHas=!0;for(var n,t=0;n=arguments[t];t++)for(var e in n)X[e]=n[e];var r=X.args;X.firstArg=/^[^,]+/.exec(r)[0];var o=kr("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString","return function("+r+") {\n"+lo(X)+"\n}");return o(et,H,Nr,Wr,d,mt,fo,Ht,X.keys,Lr,Y,ao,V,Rr,Dr)}function ht(n){return yo[n]}function vt(){var t=(t=v.indexOf)===ke?n:t;return t}function yt(n){return"function"==typeof n&&Fr.test(n)}function bt(n){var t,e;return!n||Dr.call(n)!=K||(t=n.constructor,Dt(t)&&!(t instanceof t))||!io.argsClass&&mt(n)||!io.nodeClass&&c(n)?!1:io.ownLast?(ko(n,function(n,t,r){return e=Wr.call(r,t),!1}),e!==!1):(ko(n,function(n,t){e=t}),"undefined"==typeof e||Wr.call(n,e))}function dt(n){return bo[n]}function mt(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Dr.call(n)==$||!1}function _t(n,t,e,r){return"boolean"!=typeof t&&null!=t&&(r=e,e=t,t=!1),Z(n,t,"function"==typeof e&&et(e,r,1))}function wt(n,t,e){return Z(n,!0,"function"==typeof t&&et(t,e,1))}function xt(n,t){var e=tt(n);return t?xo(e,t):e}function jt(n,t,e){var r;return t=v.createCallback(t,e,3),Co(n,function(n,e,o){return t(n,e,o)?(r=e,!1):void 0}),r}function kt(n,t,e){var r;return t=v.createCallback(t,e,3),Ot(n,function(n,e,o){return t(n,e,o)?(r=e,!1):void 0}),r}function Ct(n,t,e){var r=[];ko(n,function(n,t){r.push(t,n)});var o=r.length;for(t=et(t,e,3);o--&&t(r[o--],r[o],n)!==!1;);return n}function Ot(n,t,e){var r=po(n),o=r.length;for(t=et(t,e,3);o--;){var u=r[o];if(t(n[u],u,n)===!1)break}return n}function Pt(n){var t=[];return ko(n,function(n,e){Dt(n)&&t.push(e)}),t.sort()}function Et(n,t){return n?Wr.call(n,t):!1}function St(n){for(var t=-1,e=po(n),r=e.length,o={};++t<r;){var u=e[t];o[n[u]]=u}return o}function At(n){return n===!0||n===!1||n&&"object"==typeof n&&Dr.call(n)==B||!1}function It(n){return n&&"object"==typeof n&&Dr.call(n)==q||!1}function Nt(n){return n&&1===n.nodeType||!1}function Lt(n){var t=!0;if(!n)return t;var e=Dr.call(n),r=n.length;return e==z||e==V||(io.argsClass?e==$:mt(n))||e==K&&"number"==typeof r&&Dt(n.splice)?!r:(Co(n,function(){return t=!1}),t)}function Rt(n,t,e,r){return it(n,t,"function"==typeof e&&et(e,r,2))}function Tt(n){return Yr(n)&&!Zr(parseFloat(n))}function Dt(n){return"function"==typeof n}function Ft(n){return!(!n||!Y[typeof n])}function $t(n){return Bt(n)&&n!=+n}function zt(n){return null===n}function Bt(n){return"number"==typeof n||n&&"object"==typeof n&&Dr.call(n)==M||!1}function qt(n){return n&&Y[typeof n]&&Dr.call(n)==U||!1}function Ht(n){return"string"==typeof n||n&&"object"==typeof n&&Dr.call(n)==V||!1}function Wt(n){return"undefined"==typeof n}function Mt(n,t,e){var r={};return t=v.createCallback(t,e,3),Co(n,function(n,e,o){r[e]=t(n,e,o)}),r}function Kt(n){var t=arguments,e=2;if(!Ft(n))return n;if("number"!=typeof t[2]&&(e=t.length),e>3&&"function"==typeof t[e-2])var r=et(t[--e-1],t[e--],2);else e>2&&"function"==typeof t[e-1]&&(r=t[--e]);for(var o=p(arguments,1,e),u=-1,a=i(),l=i();++u<e;)lt(n,o[u],r,a,l);return f(a),f(l),n}function Ut(n,t,e){var r={};if("function"!=typeof t){var o=[];ko(n,function(n,t){o.push(t)}),o=ot(o,at(arguments,!0,!1,1));for(var u=-1,a=o.length;++u<a;){var i=o[u];r[i]=n[i]}}else t=v.createCallback(t,e,3),ko(n,function(n,e,o){t(n,e,o)||(r[e]=n)});return r}function Vt(n){for(var t=-1,e=po(n),r=e.length,o=_r(r);++t<r;){var u=e[t];o[t]=[u,n[u]]}return o}function Gt(n,t,e){var r={};if("function"!=typeof t)for(var o=-1,u=at(arguments,!0,!1,1),a=Ft(n)?u.length:0;++o<a;){var i=u[o];i in n&&(r[i]=n[i])}else t=v.createCallback(t,e,3),ko(n,function(n,e,o){t(n,e,o)&&(r[e]=n)});return r}function Jt(n,t,e,r){var o=fo(n);if(null==e)if(o)e=[];else{var u=n&&n.constructor,a=u&&u.prototype;e=tt(a)}return t&&(t=v.createCallback(t,r,4),(o?wo:Co)(n,function(n,r,o){return t(e,n,r,o)})),e}function Qt(n){for(var t=-1,e=po(n),r=e.length,o=_r(r);++t<r;)o[t]=n[e[t]];return o}function Xt(n){var t=arguments,e=-1,r=at(t,!0,!1,1),o=t[2]&&t[2][t[1]]===n?1:r.length,u=_r(o);for(io.unindexedChars&&Ht(n)&&(n=n.split(""));++e<o;)u[e]=n[r[e]];return u}function Yt(n,t,e){var r=-1,o=vt(),u=n?n.length:0,a=!1;return e=(0>e?to(0,u+e):e)||0,fo(n)?a=o(n,t,e)>-1:"number"==typeof u?a=(Ht(n)?n.indexOf(t,e):o(n,t,e))>-1:wo(n,function(n){return++r>=e?!(a=n===t):void 0}),a}function Zt(n,t,e){var r=!0;if(t=v.createCallback(t,e,3),fo(n))for(var o=-1,u=n.length;++o<u&&(r=!!t(n[o],o,n)););else wo(n,function(n,e,o){return r=!!t(n,e,o)});return r}function ne(n,t,e){var r=[];if(t=v.createCallback(t,e,3),fo(n))for(var o=-1,u=n.length;++o<u;){var a=n[o];t(a,o,n)&&r.push(a)}else wo(n,function(n,e,o){t(n,e,o)&&r.push(n)});return r}function te(n,t,e){if(t=v.createCallback(t,e,3),!fo(n)){var r;return wo(n,function(n,e,o){return t(n,e,o)?(r=n,!1):void 0}),r}for(var o=-1,u=n.length;++o<u;){var a=n[o];if(t(a,o,n))return a}}function ee(n,t,e){var r;return t=v.createCallback(t,e,3),oe(n,function(n,e,o){return t(n,e,o)?(r=n,!1):void 0}),r}function re(n,t,e){if(t&&"undefined"==typeof e&&fo(n))for(var r=-1,o=n.length;++r<o&&t(n[r],r,n)!==!1;);else wo(n,t,e);return n}function oe(n,t,e){var r=n,o=n?n.length:0;if(t=t&&"undefined"==typeof e?t:et(t,e,3),fo(n))for(;o--&&t(n[o],o,n)!==!1;);else{if("number"!=typeof o){var u=po(n);o=u.length}else io.unindexedChars&&Ht(n)&&(r=n.split(""));wo(n,function(n,e,a){return e=u?u[--o]:--o,t(r[e],e,a)})}return n}function ue(n,t){var e=p(arguments,2),r=-1,o="function"==typeof t,u=n?n.length:0,a=_r("number"==typeof u?u:0);return re(n,function(n){a[++r]=(o?t:n[t]).apply(n,e)}),a}function ae(n,t,e){var r=-1,o=n?n.length:0,u=_r("number"==typeof o?o:0);if(t=v.createCallback(t,e,3),fo(n))for(;++r<o;)u[r]=t(n[r],r,n);else wo(n,function(n,e,o){u[++r]=t(n,e,o)});return u}function ie(n,t,e){var o=-1/0,u=o;if("function"!=typeof t&&e&&e[t]===n&&(t=null),null==t&&fo(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];l>u&&(u=l)}else t=null==t&&Ht(n)?r:v.createCallback(t,e,3),wo(n,function(n,e,r){var a=t(n,e,r);a>o&&(o=a,u=n)});return u}function le(n,t,e){var o=1/0,u=o;if("function"!=typeof t&&e&&e[t]===n&&(t=null),null==t&&fo(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];u>l&&(u=l)}else t=null==t&&Ht(n)?r:v.createCallback(t,e,3),wo(n,function(n,e,r){var a=t(n,e,r);o>a&&(o=a,u=n)});return u}function ce(n,t,e,r){var o=arguments.length<3;if(t=v.createCallback(t,r,4),fo(n)){var u=-1,a=n.length;for(o&&(e=n[++u]);++u<a;)e=t(e,n[u],u,n)}else wo(n,function(n,r,u){e=o?(o=!1,n):t(e,n,r,u)});return e}function fe(n,t,e,r){var o=arguments.length<3;return t=v.createCallback(t,r,4),oe(n,function(n,r,u){e=o?(o=!1,n):t(e,n,r,u)}),e}function se(n,t,e){return t=v.createCallback(t,e,3),ne(n,function(n,e,r){return!t(n,e,r)})}function pe(n,t,e){if(n&&"number"!=typeof n.length?n=Qt(n):io.unindexedChars&&Ht(n)&&(n=n.split("")),null==t||e)return n?n[ct(0,n.length-1)]:h;var r=ge(n);return r.length=eo(to(0,t),r.length),r}function ge(n){var t=-1,e=n?n.length:0,r=_r("number"==typeof e?e:0);return re(n,function(n){var e=ct(0,++t);r[t]=r[e],r[e]=n}),r}function he(n){var t=n?n.length:0;return"number"==typeof t?t:po(n).length}function ve(n,t,e){var r;if(t=v.createCallback(t,e,3),fo(n))for(var o=-1,u=n.length;++o<u&&!(r=t(n[o],o,n)););else wo(n,function(n,e,o){return!(r=t(n,e,o))});return!!r}function ye(n,t,e){var r=-1,u=fo(t),a=n?n.length:0,c=_r("number"==typeof a?a:0);for(u||(t=v.createCallback(t,e,3)),re(n,function(n,e,o){var a=c[++r]=l();u?a.criteria=ae(t,function(t){return n[t]}):(a.criteria=i())[0]=t(n,e,o),a.index=r,a.value=n}),a=c.length,c.sort(o);a--;){var p=c[a];c[a]=p.value,u||f(p.criteria),s(p)}return c}function be(n){return n&&"number"==typeof n.length?io.unindexedChars&&Ht(n)?n.split(""):p(n):Qt(n)}function de(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var o=n[t];o&&r.push(o)}return r}function me(n){return ot(n,at(arguments,!0,!0,1))}function _e(n,t,e){var r=-1,o=n?n.length:0;for(t=v.createCallback(t,e,3);++r<o;)if(t(n[r],r,n))return r;return-1}function we(n,t,e){var r=n?n.length:0;for(t=v.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1}function xe(n,t,e){var r=0,o=n?n.length:0;if("number"!=typeof t&&null!=t){var u=-1;for(t=v.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else if(r=t,null==r||e)return n?n[0]:h;return p(n,0,eo(to(0,r),o))}function je(n,t,e,r){return"boolean"!=typeof t&&null!=t&&(r=e,e="function"!=typeof t&&r&&r[t]===n?null:t,t=!1),null!=e&&(n=ae(n,e,r)),at(n,t)}function ke(t,e,r){if("number"==typeof r){var o=t?t.length:0;r=0>r?to(0,o+r):r||0}else if(r){var u=Le(t,e);return t[u]===e?u:-1}return n(t,e,r)}function Ce(n,t,e){var r=0,o=n?n.length:0;if("number"!=typeof t&&null!=t){var u=o;for(t=v.createCallback(t,e,3);u--&&t(n[u],u,n);)r++}else r=null==t||e?1:t||r;return p(n,0,eo(to(0,o-r),o))}function Oe(){for(var e=[],r=-1,o=arguments.length,a=i(),l=vt(),c=l===n,p=i();++r<o;){var g=arguments[r];(fo(g)||mt(g))&&(e.push(g),a.push(c&&g.length>=_&&u(r?e[r]:p)))}var h=e[0],v=-1,y=h?h.length:0,b=[];n:for(;++v<y;){var d=a[0];if(g=h[v],(d?t(d,g):l(p,g))<0){for(r=o,(d||p).push(g);--r;)if(d=a[r],(d?t(d,g):l(e[r],g))<0)continue n;b.push(g)}}for(;o--;)d=a[o],d&&s(d);return f(a),f(p),b}function Pe(n,t,e){var r=0,o=n?n.length:0;if("number"!=typeof t&&null!=t){var u=o;for(t=v.createCallback(t,e,3);u--&&t(n[u],u,n);)r++}else if(r=t,null==r||e)return n?n[o-1]:h;return p(n,to(0,o-r))}function Ee(n,t,e){var r=n?n.length:0;for("number"==typeof e&&(r=(0>e?to(0,r+e):eo(e,r-1))+1);r--;)if(n[r]===t)return r;return-1}function Se(n){for(var t=arguments,e=0,r=t.length,o=n?n.length:0;++e<r;)for(var u=-1,a=t[e];++u<o;)n[u]===a&&(Vr.call(n,u--,1),o--);return n}function Ae(n,t,e){n=+n||0,e="number"==typeof e?e:+e||1,null==t&&(t=n,n=0);for(var r=-1,o=to(0,$r((t-n)/(e||1))),u=_r(o);++r<o;)u[r]=n,n+=e;return u}function Ie(n,t,e){var r=-1,o=n?n.length:0,u=[];for(t=v.createCallback(t,e,3);++r<o;){var a=n[r];t(a,r,n)&&(u.push(a),Vr.call(n,r--,1),o--)}return u}function Ne(n,t,e){if("number"!=typeof t&&null!=t){var r=0,o=-1,u=n?n.length:0;for(t=v.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else r=null==t||e?1:to(0,t);return p(n,r)}function Le(n,t,e,r){var o=0,u=n?n.length:o;for(e=e?v.createCallback(e,r,1):or,t=e(t);u>o;){var a=o+u>>>1;e(n[a])<t?o=a+1:u=a}return o}function Re(){return ft(at(arguments,!0,!0))}function Te(n,t,e,r){return"boolean"!=typeof t&&null!=t&&(r=e,e="function"!=typeof t&&r&&r[t]===n?null:t,t=!1),null!=e&&(e=v.createCallback(e,r,3)),ft(n,t,e)}function De(n){return ot(n,p(arguments,1))}function Fe(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(fo(e)||mt(e))var r=r?ft(ot(r,e).concat(ot(e,r))):e}return r||[]}function $e(){for(var n=arguments.length>1?arguments:arguments[0],t=-1,e=n?ie(Ao(n,"length")):0,r=_r(0>e?0:e);++t<e;)r[t]=Ao(n,t);return r}function ze(n,t){var e=-1,r=n?n.length:0,o={};for(t||!r||fo(n[0])||(t=[]);++e<r;){var u=n[e];t?o[u]=t[e]:u&&(o[u[0]]=u[1])}return o}function Be(n,t){if(!Dt(t))throw new Ar;return function(){return--n<1?t.apply(this,arguments):void 0}}function qe(n,t){return arguments.length>2?pt(n,17,p(arguments,2),null,t):pt(n,1,null,null,t)}function He(n){for(var t=arguments.length>1?at(arguments,!0,!1,1):Pt(n),e=-1,r=t.length;++e<r;){var o=t[e];n[o]=pt(n[o],1,null,null,n)}return n}function We(n,t){return arguments.length>2?pt(t,19,p(arguments,2),null,n):pt(t,3,null,null,n)}function Me(){for(var n=arguments,t=n.length;t--;)if(!Dt(n[t]))throw new Ar;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}}function Ke(n,t){return t="number"==typeof t?t:+t||n.length,pt(n,4,null,null,null,t)}function Ue(n,t,e){var r,o,u,a,i,l,c,f=0,s=!1,p=!0;if(!Dt(n))throw new Ar;if(t=to(0,t)||0,e===!0){var g=!0;p=!1}else Ft(e)&&(g=e.leading,s="maxWait"in e&&(to(t,e.maxWait)||0),p="trailing"in e?e.trailing:p);var v=function(){var e=t-(No()-a);if(0>=e){o&&zr(o);var s=c;o=l=c=h,s&&(f=No(),u=n.apply(i,r),l||o||(r=i=null))}else l=Ur(v,e)},y=function(){l&&zr(l),o=l=c=h,(p||s!==t)&&(f=No(),u=n.apply(i,r),l||o||(r=i=null))};return function(){if(r=arguments,a=No(),i=this,c=p&&(l||!g),s===!1)var e=g&&!l;else{o||g||(f=a);var h=s-(a-f),b=0>=h;b?(o&&(o=zr(o)),f=a,u=n.apply(i,r)):o||(o=Ur(y,h))}return b&&l?l=zr(l):l||t===s||(l=Ur(v,t)),e&&(b=!0,u=n.apply(i,r)),!b||l||o||(r=i=null),u}}function Ve(n){if(!Dt(n))throw new Ar;var t=p(arguments,1);return Ur(function(){n.apply(h,t)},1)}function Ge(n,t){if(!Dt(n))throw new Ar;var e=p(arguments,2);return Ur(function(){n.apply(h,e)},t)}function Je(n,t){if(!Dt(n))throw new Ar;var e=function(){var r=e.cache,o=t?t.apply(this,arguments):m+arguments[0];return Wr.call(r,o)?r[o]:r[o]=n.apply(this,arguments)};return e.cache={},e}function Qe(n){var t,e;if(!Dt(n))throw new Ar;return function(){return t?e:(t=!0,e=n.apply(this,arguments),n=null,e)}}function Xe(n){return pt(n,16,p(arguments,1))}function Ye(n){return pt(n,32,null,p(arguments,1))}function Ze(n,t,e){var r=!0,o=!0;if(!Dt(n))throw new Ar;return e===!1?r=!1:Ft(e)&&(r="leading"in e?e.leading:r,o="trailing"in e?e.trailing:o),J.leading=r,J.maxWait=t,J.trailing=o,Ue(n,t,J)}function nr(n,t){return pt(t,16,[n])}function tr(n){return function(){return n}}function er(n,t,e){var r=typeof n;if(null==n||"function"==r)return et(n,t,e);if("object"!=r)return lr(n);var o=po(n),u=o[0],a=n[u];return 1!=o.length||a!==a||Ft(a)?function(t){for(var e=o.length,r=!1;e--&&(r=it(t[o[e]],n[o[e]],null,!0)););return r}:function(n){var t=n[u];return a===t&&(0!==a||1/a==1/t)}}function rr(n){return null==n?"":Sr(n).replace(_o,ht)}function or(n){return n}function ur(n,t,e){var r=!0,o=t&&Pt(t);t&&(e||o.length)||(null==e&&(e=t),u=y,t=n,n=v,o=Pt(t)),e===!1?r=!1:Ft(e)&&"chain"in e&&(r=e.chain);var u=n,a=Dt(u);re(o,function(e){var o=n[e]=t[e];a&&(u.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,a=[e];Mr.apply(a,arguments);var i=o.apply(n,a);if(r||t){if(e===i&&Ft(i))return this;i=new u(i),i.__chain__=t}return i})})}function ar(){return e._=Tr,this}function ir(){}function lr(n){return function(t){return t[n]}}function cr(n,t,e){var r=null==n,o=null==t;if(null==e&&("boolean"==typeof n&&o?(e=n,n=1):o||"boolean"!=typeof t||(e=t,o=!0)),r&&o&&(t=1),n=+n||0,o?(t=n,n=0):t=+t||0,e||n%1||t%1){var u=oo();return eo(n+u*(t-n+parseFloat("1e-"+((u+"").length-1))),t)}return ct(n,t)}function fr(n,t){if(n){var e=n[t];return Dt(e)?n[t]():e}}function sr(n,t,e){var r=v.templateSettings;n=Sr(n||""),e=jo({},e,r);var o,u=jo({},e.imports,r.imports),i=po(u),l=Qt(u),c=0,f=e.interpolate||N,s="__p += '",p=Er((e.escape||N).source+"|"+f.source+"|"+(f===A?P:N).source+"|"+(e.evaluate||N).source+"|$","g");n.replace(p,function(t,e,r,u,i,l){return r||(r=u),s+=n.slice(c,l).replace(R,a),e&&(s+="' +\n__e("+e+") +\n'"),i&&(o=!0,s+="';\n"+i+";\n__p += '"),r&&(s+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),c=l+t.length,t}),s+="';\n";var g=e.variable,y=g;y||(g="obj",s="with ("+g+") {\n"+s+"\n}\n"),s=(o?s.replace(j,""):s).replace(C,"$1").replace(O,"$1;"),s="function("+g+") {\n"+(y?"":g+" || ("+g+" = {});\n")+"var __t, __p = '', __e = _.escape"+(o?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+s+"return __p\n}";var b="\n/*\n//# sourceURL="+(e.sourceURL||"/lodash/template/source["+F++ +"]")+"\n*/";try{var d=kr(i,"return "+s+b).apply(h,l)}catch(m){throw m.source=s,m}return t?d(t):(d.source=s,d)}function pr(n,t,e){n=(n=+n)>-1?n:0;var r=-1,o=_r(n);for(t=et(t,e,1);++r<n;)o[r]=t(r);return o}function gr(n){return null==n?"":Sr(n).replace(mo,dt)}function hr(n){var t=++b;return Sr(null==n?"":n)+t}function vr(n){return n=new y(n),n.__chain__=!0,n}function yr(n,t){return t(n),n}function br(){return this.__chain__=!0,this}function dr(){return Sr(this.__wrapped__)}function mr(){return this.__wrapped__}e=e?ut.defaults(nt.Object(),e,ut.pick(nt,T)):nt;var _r=e.Array,wr=e.Boolean,xr=e.Date,jr=e.Error,kr=e.Function,Cr=e.Math,Or=e.Number,Pr=e.Object,Er=e.RegExp,Sr=e.String,Ar=e.TypeError,Ir=[],Nr=jr.prototype,Lr=Pr.prototype,Rr=Sr.prototype,Tr=e._,Dr=Lr.toString,Fr=Er("^"+Sr(Dr).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),$r=Cr.ceil,zr=e.clearTimeout,Br=Cr.floor,qr=kr.prototype.toString,Hr=yt(Hr=Pr.getPrototypeOf)&&Hr,Wr=Lr.hasOwnProperty,Mr=Ir.push,Kr=Lr.propertyIsEnumerable,Ur=e.setTimeout,Vr=Ir.splice,Gr=Ir.unshift,Jr=function(){try{var n={},t=yt(t=Pr.defineProperty)&&t,e=t(n,n,n)&&t}catch(r){}return e}(),Qr=yt(Qr=Pr.create)&&Qr,Xr=yt(Xr=_r.isArray)&&Xr,Yr=e.isFinite,Zr=e.isNaN,no=yt(no=Pr.keys)&&no,to=Cr.max,eo=Cr.min,ro=e.parseInt,oo=Cr.random,uo={};uo[z]=_r,uo[B]=wr,uo[q]=xr,uo[W]=kr,uo[K]=Pr,uo[M]=Or,uo[U]=Er,uo[V]=Sr;var ao={};ao[z]=ao[q]=ao[M]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},ao[B]=ao[V]={constructor:!0,toString:!0,valueOf:!0},ao[H]=ao[W]=ao[U]={constructor:!0,toString:!0},ao[K]={constructor:!0},function(){for(var n=D.length;n--;){var t=D[n];for(var e in ao)Wr.call(ao,e)&&!Wr.call(ao[e],t)&&(ao[e][t]=!1)}}(),y.prototype=v.prototype;var io=v.support={};!function(){var n=function(){this.x=1},t={0:1,length:1},r=[];n.prototype={valueOf:1,y:1};for(var o in new n)r.push(o);for(o in arguments);io.argsClass=Dr.call(arguments)==$,io.argsObject=arguments.constructor==Pr&&!(arguments instanceof _r),io.enumErrorProps=Kr.call(Nr,"message")||Kr.call(Nr,"name"),io.enumPrototypes=Kr.call(n,"prototype"),io.funcDecomp=!yt(e.WinRTError)&&L.test(g),io.funcNames="string"==typeof kr.name,io.nonEnumArgs=0!=o,io.nonEnumShadows=!/valueOf/.test(r),io.ownLast="x"!=r[0],io.spliceObjects=(Ir.splice.call(t,0,1),!t[0]),io.unindexedChars="x"[0]+Pr("x")[0]!="xx";try{io.nodeClass=!(Dr.call(document)==K&&!({toString:0}+""))}catch(u){io.nodeClass=!0}}(1),v.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:A,variable:"",imports:{_:v}};var lo=function(n){var t="var index, iterable = "+n.firstArg+", result = "+n.init+";\nif (!iterable) return result;\n"+n.top+";";n.array?(t+="\nvar length = iterable.length; index = -1;\nif ("+n.array+") {  ",io.unindexedChars&&(t+="\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),t+="\n  while (++index < length) {\n    "+n.loop+";\n  }\n}\nelse {  "):io.nonEnumArgs&&(t+="\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      "+n.loop+";\n    }\n  } else {  "),io.enumPrototypes&&(t+="\n  var skipProto = typeof iterable == 'function';\n  "),io.enumErrorProps&&(t+="\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");var e=[];if(io.enumPrototypes&&e.push('!(skipProto && index == "prototype")'),io.enumErrorProps&&e.push('!(skipErrorProps && (index == "message" || index == "name"))'),n.useHas&&n.keys)t+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",e.length&&(t+="    if ("+e.join(" && ")+") {\n  "),t+=n.loop+";    ",e.length&&(t+="\n    }"),t+="\n  }  ";else if(t+="\n  for (index in iterable) {\n",n.useHas&&e.push("hasOwnProperty.call(iterable, index)"),e.length&&(t+="    if ("+e.join(" && ")+") {\n  "),t+=n.loop+";    ",e.length&&(t+="\n    }"),t+="\n  }    ",io.nonEnumShadows){for(t+="\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ",k=0;7>k;k++)t+="\n    index = '"+n.shadowedProps[k]+"';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))",n.useHas||(t+=" || (!nonEnum[index] && iterable[index] !== objectProto[index])"),t+=") {\n      "+n.loop+";\n    }      ";t+="\n  }    "}return(n.array||io.nonEnumArgs)&&(t+="\n}"),t+=n.bottom+";\nreturn result"};Qr||(tt=function(){function n(){}return function(t){if(Ft(t)){n.prototype=t;var r=new n;n.prototype=null}return r||e.Object()}}());var co=Jr?function(n,t){Q.value=t,Jr(n,"__bindData__",Q)}:ir;io.argsClass||(mt=function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Wr.call(n,"callee")&&!Kr.call(n,"callee")||!1});var fo=Xr||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Dr.call(n)==z||!1},so=gt({args:"object",init:"[]",top:"if (!(objectTypes[typeof object])) return result",loop:"result.push(index)"}),po=no?function(n){return Ft(n)?io.enumPrototypes&&"function"==typeof n||io.nonEnumArgs&&n.length&&mt(n)?so(n):no(n):[]}:so,go={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:"typeof length == 'number'",keys:po,loop:"if (callback(iterable[index], index, collection) === false) return result"},ho={args:"object, source, guard",top:"var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",keys:po,loop:"if (typeof result[index] == 'undefined') result[index] = iterable[index]",bottom:"  }\n}"},vo={top:"if (!objectTypes[typeof iterable]) return result;\n"+go.top,array:!1},yo={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bo=St(yo),mo=Er("("+po(bo).join("|")+")","g"),_o=Er("["+po(yo).join("")+"]","g"),wo=gt(go),xo=gt(ho,{top:ho.top.replace(";",";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),loop:"result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}),jo=gt(ho),ko=gt(go,vo,{useHas:!1}),Co=gt(go,vo);Dt(/x/)&&(Dt=function(n){return"function"==typeof n&&Dr.call(n)==W});var Oo=Hr?function(n){if(!n||Dr.call(n)!=K||!io.argsClass&&mt(n))return!1;var t=n.valueOf,e=yt(t)&&(e=Hr(t))&&Hr(e);return e?n==e||Hr(n)==e:bt(n)}:bt,Po=st(function(n,t,e){Wr.call(n,e)?n[e]++:n[e]=1}),Eo=st(function(n,t,e){(Wr.call(n,e)?n[e]:n[e]=[]).push(t)}),So=st(function(n,t,e){n[e]=t}),Ao=ae,Io=ne,No=yt(No=xr.now)&&No||function(){return(new xr).getTime()},Lo=8==ro(x+"08")?ro:function(n,t){return ro(Ht(n)?n.replace(I,""):n,t||0)};return v.after=Be,v.assign=xo,v.at=Xt,v.bind=qe,v.bindAll=He,v.bindKey=We,v.chain=vr,v.compact=de,v.compose=Me,v.constant=tr,v.countBy=Po,v.create=xt,v.createCallback=er,v.curry=Ke,v.debounce=Ue,v.defaults=jo,v.defer=Ve,v.delay=Ge,v.difference=me,v.filter=ne,v.flatten=je,v.forEach=re,v.forEachRight=oe,v.forIn=ko,v.forInRight=Ct,v.forOwn=Co,v.forOwnRight=Ot,v.functions=Pt,v.groupBy=Eo,v.indexBy=So,v.initial=Ce,v.intersection=Oe,v.invert=St,v.invoke=ue,v.keys=po,v.map=ae,v.mapValues=Mt,v.max=ie,v.memoize=Je,v.merge=Kt,v.min=le,v.omit=Ut,v.once=Qe,v.pairs=Vt,v.partial=Xe,v.partialRight=Ye,v.pick=Gt,v.pluck=Ao,v.property=lr,v.pull=Se,v.range=Ae,v.reject=se,v.remove=Ie,v.rest=Ne,v.shuffle=ge,v.sortBy=ye,v.tap=yr,v.throttle=Ze,v.times=pr,v.toArray=be,v.transform=Jt,v.union=Re,v.uniq=Te,v.values=Qt,v.where=Io,v.without=De,v.wrap=nr,v.xor=Fe,v.zip=$e,v.zipObject=ze,v.collect=ae,v.drop=Ne,v.each=re,v.eachRight=oe,v.extend=xo,v.methods=Pt,v.object=ze,v.select=ne,v.tail=Ne,v.unique=Te,v.unzip=$e,ur(v),v.clone=_t,v.cloneDeep=wt,v.contains=Yt,v.escape=rr,v.every=Zt,v.find=te,v.findIndex=_e,v.findKey=jt,v.findLast=ee,v.findLastIndex=we,v.findLastKey=kt,v.has=Et,v.identity=or,v.indexOf=ke,v.isArguments=mt,v.isArray=fo,v.isBoolean=At,v.isDate=It,v.isElement=Nt,v.isEmpty=Lt,v.isEqual=Rt,v.isFinite=Tt,v.isFunction=Dt,v.isNaN=$t,v.isNull=zt,v.isNumber=Bt,v.isObject=Ft,v.isPlainObject=Oo,v.isRegExp=qt,v.isString=Ht,v.isUndefined=Wt,v.lastIndexOf=Ee,v.mixin=ur,v.noConflict=ar,v.noop=ir,v.now=No,v.parseInt=Lo,v.random=cr,v.reduce=ce,v.reduceRight=fe,v.result=fr,v.runInContext=g,v.size=he,v.some=ve,v.sortedIndex=Le,v.template=sr,v.unescape=gr,v.uniqueId=hr,v.all=Zt,v.any=ve,v.detect=te,v.findWhere=te,v.foldl=ce,v.foldr=fe,v.include=Yt,v.inject=ce,ur(function(){var n={};return Co(v,function(t,e){v.prototype[e]||(n[e]=t)}),n}(),!1),v.first=xe,v.last=Pe,v.sample=pe,v.take=xe,v.head=xe,Co(v,function(n,t){var e="sample"!==t;v.prototype[t]||(v.prototype[t]=function(t,r){var o=this.__chain__,u=n(this.__wrapped__,t,r);return o||null!=t&&(!r||e&&"function"==typeof t)?new y(u,o):u})}),v.VERSION="2.4.1",v.prototype.chain=br,v.prototype.toString=dr,v.prototype.value=mr,v.prototype.valueOf=mr,wo(["join","pop","shift"],function(n){var t=Ir[n];v.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);return n?new y(e,n):e}}),wo(["push","reverse","sort","unshift"],function(n){var t=Ir[n];v.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),wo(["concat","slice","splice"],function(n){var t=Ir[n];v.prototype[n]=function(){return new y(t.apply(this.__wrapped__,arguments),this.__chain__)}}),io.spliceObjects||wo(["pop","shift","splice"],function(n){var t=Ir[n],e="splice"==n;v.prototype[n]=function(){var n=this.__chain__,r=this.__wrapped__,o=t.apply(r,arguments);return 0===r.length&&delete r[0],n||e?new y(o,n):o}}),v}var h,v=[],y=[],b=0,d={},m=+new Date+"",_=75,w=40,x=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",j=/\b__p \+= '';/g,C=/\b(__p \+=) '' \+/g,O=/(__e\(.*?\)|\b__t\)) \+\n'';/g,P=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,E=/\w*$/,S=/^\s*function[ \n\r\t]+\w/,A=/<%=([\s\S]+?)%>/g,I=RegExp("^["+x+"]*0+(?=.$)"),N=/($^)/,L=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,T=["Array","Boolean","Date","Error","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],D=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],F=0,$="[object Arguments]",z="[object Array]",B="[object Boolean]",q="[object Date]",H="[object Error]",W="[object Function]",M="[object Number]",K="[object Object]",U="[object RegExp]",V="[object String]",G={};
G[W]=!1,G[$]=G[z]=G[B]=G[q]=G[M]=G[K]=G[U]=G[V]=!0;var J={leading:!1,maxWait:0,trailing:!1},Q={configurable:!1,enumerable:!1,value:null,writable:!1},X={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},Y={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Z={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},nt=Y[typeof window]&&window||this,tt=Y[typeof exports]&&exports&&!exports.nodeType&&exports,et=Y[typeof module]&&module&&!module.nodeType&&module,rt=et&&et.exports===tt&&tt,ot=Y[typeof global]&&global;!ot||ot.global!==ot&&ot.window!==ot||(nt=ot);var ut=g();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(nt._=ut,define("lodash",[],function(){return ut})):tt&&et?rt?(et.exports=ut)._=ut:tt._=ut:nt._=ut}).call(this),define("subject",["lodash"],function(n){var t={initialize:function(){}},e=function(){};return e.prototype=t,e.proto=function(t,e){return n.isObject(t)?n.assign(this.prototype,t):this.prototype[t]=e,this},e.protoMerge=function(t,e){if(n.isString(t)){var r=this.prototype[t],o=n.assign({},r,e);this.proto(t,o)}else n.each(t,n.bind(function(n,t){this.protoMerge(t,n)},this))},e.extend=function(t,e,r){var o,u;n.isFunction(t)?(o=n.assign({},e,{initialize:t}),u=r):n.isObject(t)&&(o=t||{},u=r);var a,i=this;return a=function(){var n=Object.create(a.prototype);return n.initialize.apply(n,arguments),n},n.assign(a,i,u),a.prototype=Object.create(i.prototype),a.prototype.constructor=a,a.proto(o),a.__super__=i.prototype,a},e.extend.bind(e)}),define("no",["require","exports","module","subject"],function(n,t,e){function r(n){return!isNaN(n)}var o=n("subject"),u=e.exports=o({initialize:function(n){this.number=this.evaluate(n)},validate:function(n){return"number"==typeof n&&r(n)},coerce:function(n){return parseInt(n,10)},evaluate:function(n){if(this.validate(n))return n;var t=this.coerce(n);if(this.validate(t))return t;throw new Error(n+" is not valid and cannot be validly coerced.")},add:function(n){return n=this.evaluate(n),this.number=this.number+n,this},subtract:function(n){return n=this.evaluate(n),this.number=this.number-n,this},multiply:function(n){return n=this.evaluate(n),this.number=this.number*n,this},divide:function(n){return n=this.evaluate(n),this.number=this.number/n,this},value:function(){return this.number}});return u});
define('__backbone-ui-resizable/handle/update',['require','exports','module','./helpers','no'],function (require, exports, module) {
	

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

define('__backbone-ui-resizable/handle/track',['require','exports','module','./helpers'],function (require, exports, module) {

	

	var h = require('./helpers');

	/**
	 * All handles should track these events.
	 *
	 * @method all
	 */
	exports.all = function trackAll() {
		// move together
		this.listenTo(this.resizable.model, 'change', this.update);
	};

	/**
	 * North-related handles should track these movements:
	 * - move-y
	 *
	 * @method n
	 */
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

	/**
	 * South-related handles should track these movements:
	 * - move-y
	 *
	 * @method s
	 */
	exports.s = function trackS() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-y', function (handle, delta) {

			var height = h.numberify(resizableModel.get('height')) + h.numberify(delta);

			resizableModel.set('height', height);
		});
	};

	/**
	 * West-related handles should track these movements:
	 * - move-x
	 *
	 * @method w
	 */
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

	/**
	 * East-related handles should track these movements:
	 * - move-x
	 *
	 * @method e
	 */
	exports.e = function trackE() {
		var resizableModel = this.resizable.model;

		this.resizable.listenTo(this, 'move-x', function (handle, delta) {
			var width = h.numberify(resizableModel.get('width')) + h.numberify(delta);

			resizableModel.set('width', width);
		});
	};
});

define('__backbone-ui-resizable/handle/min-max',['require','exports','module','./helpers'],function (require, exports, module) {
	

	var helpers = require('./helpers');

	// Y
	exports.n = function nMinMax() {

		var resizableModel = this.resizable.model;

		var height = resizableModel.get('height'),
			minHeight = resizableModel.get('minHeight'),
			maxHeight = resizableModel.get('maxHeight');

			// the highest possible delta towards the top
		var maxTopDelta = maxHeight - height,
			// the highest possible delta towards the bottom
			maxBottomDelta = height - minHeight;


			// the minimum Y set on resizableModel
		var resizableMinY = resizableModel.get('minY') || 0;


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for NORTH handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its minimum Y position
			minY: helpers.max(currentY - maxTopDelta, resizableMinY) - this.outer,

			// the maximum Y for NORTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			maxY: currentY + this.thickness + maxBottomDelta
		});
	};

	exports.s = function sMinMax() {

		var resizableModel = this.resizable.model;

		var height = resizableModel.get('height'),
			minHeight = resizableModel.get('minHeight'),
			maxHeight = resizableModel.get('maxHeight');

			// the highest possible delta towards the top
		var maxTopDelta = height - minHeight,
			// the highest possible delta towards the bottom
			maxBottomDelta = maxHeight - height;


			// the maximum Y set on resizableModel
		var resizableMaxY = resizableModel.get('maxY') || 0;


		var currentY = this.model.get('top');

		this.model.set({
			// the minimum Y for SOUTH handles is
			// simply the position at which the resizable object
			// reaches its minimum height
			minY: currentY - maxTopDelta,

			// the maximum Y for SOUTH handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum height
			// 2- position at which the resizable object reaches its maximum Y position
			maxY: helpers.min(currentY + maxBottomDelta, resizableMaxY) + this.thickness
		});
	};






	// X
	exports.w = function wMinMax() {

		var resizableModel = this.resizable.model;

		var width = resizableModel.get('width'),
			minWidth = resizableModel.get('minWidth'),
			maxWidth = resizableModel.get('maxWidth');

			// the highest possible delta towards the left
		var maxLeftDelta = maxWidth - width,
			// the highest possible delta towards the right
			maxRightDelta = width - minWidth;


			// the minimum X set on resizableModel
		var resizableMinX = resizableModel.get('minX') || 0;

			// the current X position of the handle
		var currentX = this.model.get('left');

		this.model.set({
			// the minimum X for WEST handles is the
			// maximum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its minimum X boundary
			// LESS the handle portion that is out.
			minX: helpers.max(currentX - maxLeftDelta, resizableMinX) - this.outer,

			// the maximum X for WEST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			maxX: currentX + this.thickness + maxRightDelta
		});
	};




	exports.e = function eMinMax() {

		var resizableModel = this.resizable.model;

		var width = resizableModel.get('width'),
			minWidth = resizableModel.get('minWidth'),
			maxWidth = resizableModel.get('maxWidth');

			// the highest possible delta towards the left
		var maxLeftDelta = width - minWidth,
			// the highest possible delta towards the right
			maxRightDelta = maxWidth - width;


			// the maximum X set on resizableModel
		var resizableMaxX = resizableModel.get('maxX');


		var currentX = this.model.get('left');

		this.model.set({
			// the minimum X for EAST handles is
			// simply the position at which the resizable object
			// reaches its minimum width
			minX: currentX - maxLeftDelta,

			// the maximum X for EAST handles is the
			// minimum value among the
			// 1- position at which the resizable object reaches its maximum width
			// 2- position at which the resizable object reaches its maximum X boundary
			maxX: helpers.min(currentX + maxRightDelta, resizableMaxX) + this.thickness
		});
	};

});

define('__backbone-ui-resizable/handle/index',['require','exports','module','jquery-ui','backbone-ui-draggable','lodash','./update','./track','./min-max'],function (require, exports, module) {
	

	require('jquery-ui');

	var draggable = require('backbone-ui-draggable'),
		_ = require('lodash');

	var _update = require('./update'),
		_track = require('./track'),
		_minmax = require('./min-max');

	var positions = {
		// horizontal vertical
		n: 'left top',
		s: 'left bottom',
		w: 'left top',
		e: 'right top',

		nw: 'left top',
		ne: 'right top',
		sw: 'left bottom',
		se: 'right bottom'
	},
	axis = {
		// horizontal vertical
		n: 'y',
		s: 'y',
		w: 'x',
		e: 'x',

		nw: 'xy',
		ne: 'xy',
		sw: 'xy',
		se: 'xy'
	};


	var handle = module.exports = draggable.extend({
		initialize: function (options) {
			draggable.prototype.initialize.call(this, options);

			this.initializeResizableHandle(options);
		},

		initializeResizableHandle: function initializeResizableHandle(options) {

			// [0] get variables
			// the resizable
			this.resizable = options.resizable;

			// set direction
			this.direction = options.direction;

			// set axis.
			this.axis = axis[this.direction];

			// cache sizes
			this.thickness = options.thickness;


			// setStyles
			this.setStyles();

			// calculate ratio point
			this.ratio = options.ratio;
			this.outer = options.thickness * this.ratio;
			this.inner = options.thickness - this.outer;

			// [1] place the handle
			// set throttle for update
			this.update = _.throttle(_.bind(_update[this.direction], this), 20);

			// initialize handle position
			this.initializePosition(options);

			// [2] set correct trackers for hte handle
			this.track();

			// [3] when movements starts, calculate the min and maxes.
			this.on('movestart', this.calcMinMax);
		},

		/**
		 * Sets the styles needed for this type of direction handle.
		 *
		 * @method setStyles
		 * @private
		 */
		setStyles: function setStyles() {

			var axis = this.axis,
				styles;

			if (axis.length > 1) {
				// xy / yx
				styles = {
					zIndex: 100,
					width: this.thickness,
					height: this.thickness
				};
			} else if (axis === 'x') {
				// horizontal sliding directions
				styles = {
					zIndex: 99,
					width: this.thickness,
					height: this.resizable.model.get('width'),
				};

			} else if (axis === 'y') {
				// vertical sliding direction
				styles = {
					zIndex: 99,
					width: this.resizable.model.get('height'),
					height: this.thickness
				};
			}

			this.$el.css(styles);
		},

		/**
		 * Places the handle at its initial position,
		 * at the right place given the direction.
		 *
		 * @method initializePosition
		 */
		initializePosition: function initializePosition(options) {
			var $el = this.$el;

			$el.position({
				// horizontal vertical
				my: 'center center',
				at: positions[this.direction],
				of: this.resizable.$el
			});

			this.model.set($el.position());

			this.update();
		},

		/**
		 * Links up movement from the handle to the resizable object.
		 *
		 * @method track
		 */
		track: function track() {
			_.each(this.direction, function (d) {

				_track[d].call(this);

			}, this);


			_track.all.call(this);
		},

		/**
		 * Calculates the minimum and maximum positions for the handle
		 * taking into account settings of min and max of the resizable object.
		 *
		 * @method calcMinMax
		 *
		 */
		calcMinMax: function calcMinMax() {
			_.each(this.direction, function (d) {

				_minmax[d].call(this);

			}, this);
		},

		map: _.extend(draggable.prototype.map, {
			height: '->css:height',
			width: '->css:width',
		})
	});
});

define('__backbone-ui-resizable/actions',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Expands the view by moving the left handle
	 * towards the left direction while maintaing
	 * the right handle at a fixed position.
	 *   --------
	 *   |<-    |
	 *   |<-    |
	 *   |<-    |
	 *   --------
	 *
	 * @method expandToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToLeft = function expandToLeft(attemptedDelta) {
		var handle = this.handles.w;

		handle.calcMinMax();
		return handle.moveToLeft(attemptedDelta);
	};

	/**
	 * Expands the view by moving the right handle
	 * towards the right direction while maintaing
	 * the left handle at a fixed position.
	 *   --------
	 *   |    ->|
	 *   |    ->|
	 *   |    ->|
	 *   --------
	 *
	 * @method expandToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToRight = function expandToRight(attemptedDelta) {
		var handle = this.handles.e;

		handle.calcMinMax();
		return handle.moveToRight(attemptedDelta);
	};

	/**
	 *
	 *  -------
	 *  |^^^^^|
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.expandToTop = function expandToTop(attemptedDelta) {
		var handle = this.handles.n;

		handle.calcMinMax();
		return handle.moveToTop(attemptedDelta);
	};

	/**
	 *
	 *  -------
	 *  |     |
	 *  |     |
	 *  |vvvvv|
	 *  -------
	 *
	 */
	exports.expandToBottom = function expandToBottom(attemptedDelta) {
		var handle = this.handles.s;

		handle.calcMinMax();
		return handle.moveToBottom(attemptedDelta);
	};


	/**
	 * Contracts the view by moving the left handle
	 * towards the right direction while maintaining
	 * the right handle at a fixed position.
	 *   --------
	 * ->|      |
	 * ->|      |
	 * ->|      |
	 *   --------
	 *
	 * @method contractToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToRight = function contractToRight(attemptedDelta) {
		var handle = this.handles.w;

		handle.calcMinMax();
		return handle.moveToRight(attemptedDelta);
	};

	/**
	 * Contracts the view by moving the right handle
	 * towards the left direction while maintaing the
	 * left handle at a fixed position.
	 *   --------
	 *   |      |<-
	 *   |      |<-
	 *   |      |<-
	 *   --------
	 *
	 * @method contractToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToLeft = function contractToLeft(attemptedDelta) {
		var handle = this.handles.e;

		handle.calcMinMax();
		return handle.moveToLeft(attemptedDelta);
	};

	/**
	 *   vvvvv
	 *  -------
	 *  |     |
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.contractToBottom = function contractToBottom(attemptedDelta) {
		var handle = this.handles.n;

		handle.calcMinMax();
		return handle.moveToBottom(attemptedDelta);
	};

	/**
	 *
	 *  -------
	 *  |     |
	 *  |     |
	 *  |     |
	 *  -------
	 *   ^^^^^
	 *
	 */
	exports.contractToTop = function contractToTop(attemptedDelta) {
		var handle = this.handles.s;

		handle.calcMinMax();
		return handle.moveToTop(attemptedDelta);
	};
});

//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 */

define('backbone-ui-resizable',['require','exports','module','lowercase-backbone','backbone-ui-draggable','jquery','lodash','./__backbone-ui-resizable/build-handles','./__backbone-ui-resizable/handle/index','./__backbone-ui-resizable/actions'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		draggable = require('backbone-ui-draggable'),
		$ = require('jquery'),
		_ = require('lodash');


	// internal
	var buildHandles = require('./__backbone-ui-resizable/build-handles'),
		handleBuilder = require('./__backbone-ui-resizable/handle/index');


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var number = /^[0-9]+$/;
	function stringifyPositionalValue(v) {
		// [1] check if it is a number
		return number.test(v) ? v + 'px' : v;
	}

	// private //
	/////////////


	var resizable = module.exports = draggable.extend({

		/**
		 * Initialization script.
		 *
		 * @method initialize
		 */
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.call(this, options);

			this.initializeModelDock(options);

			this.initializeUIDraggable(options);

			this.initializeUIResizable(options);
		},

		/**
		 * Holds initialization logic exclusive to resizable-dock.
		 *
		 * @method initializeUIResizable
		 * @param options {Object}
		 */
		initializeUIResizable: function resizableDock(options) {

			// canvas
			this.$canvas = options.canvas || this.canvas || $(window);

			var data = _.extend({
				minWidth: 2 * this.handleOptions.thickness,
				minHeight: 2 * this.handleOptions.thickness,

				width: this.$el.width(),
				height: this.$el.height(),

			}, this.$el.position(), options);

			// set initial position
			this.model.set(data);

			// get the options for the handle
			var handleOptions = _.defaults(
				_.pick(options, ['directions', 'clss', 'ratio', 'thickness']),
				this.handleOptions
			);

			// build all handles
			buildHandles.call(this, handleOptions);
		},

		/**
		 * The builder that returns a handle object instance.
		 *
		 * @property handleBuilder
		 * @type Function
		 */
		handleBuilder: handleBuilder,

		/**
		 * Options to be passed to handleBuilder
		 *
		 * @property handleOptions
		 * @type Object
		 *     @property directions {String|Array|Object}
		 *         String: string of comma separated directions
		 *         Array: array of directions
		 *         Object: hash keyed by directions and valued by handle-selectors or $handles
		 *     @property clss {String}
		 *     @property ratio {Float}
		 *         The portion of the handle thickness that should
		 *         be left outside the resizable object.
		 *     @property thickness {Int}
		 *         The thickness of the handle in pixels.
		 */
		handleOptions: {
			directions: 'n,s,w,e,nw,ne,sw,se',
			clss: 'handle',
			ratio: 0.2,
			thickness: 30,
		},

		stringifiers: {
			height: stringifyPositionalValue,
			minHeight: stringifyPositionalValue,
			maxHeight: stringifyPositionalValue,

			width: stringifyPositionalValue,
			minWidth: stringifyPositionalValue,
			maxWidth: stringifyPositionalValue,

			left: stringifyPositionalValue,
			top: stringifyPositionalValue
		},

		map: {
			top: '->css:top',
			left: '->css:left',

			width: '->css:width',
			minWidth: '->css:min-width',
			maxWidth: '->css:max-width',

			height: '->css:height',
			minHeight: '->css:min-height',
			maxHeight: '->css:max-height',
		},
	});

	// define proto
	resizable.proto(require('./__backbone-ui-resizable/actions'));

});

