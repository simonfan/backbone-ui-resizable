define('__backbone-ui-resizable/handle/helpers',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

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
		var res = parseFloat(v);

		if (isNaN(res)) {
			throw new Error(v + ' not number');
		} else {
			return res;
		}
	};

	exports.numberifyProperties = function numberifyProperties(props, obj) {
		var res = {};

		_.each(props, function (p) {
			res[p] = parseFloat(obj[p]);
		});

		return res;
	};



	exports.fitValueWithin = function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
	};


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var isNumber = /^-?\d*(\.\d+)?$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
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

(function(){function n(n,t,e){for(var r=(e||0)-1,u=n?n.length:0;++r<u;)if(n[r]===t)return r;return-1}function t(t,e){var r=typeof e;if(t=t.cache,"boolean"==r||null==e)return t[e]?0:-1;"number"!=r&&"string"!=r&&(r="object");var u="number"==r?e:m+e;return t=(t=t[r])&&t[u],"object"==r?t&&n(t,e)>-1?0:-1:t?0:-1}function e(n){var t=this.cache,e=typeof n;if("boolean"==e||null==n)t[n]=!0;else{"number"!=e&&"string"!=e&&(e="object");var r="number"==e?n:m+n,u=t[e]||(t[e]={});"object"==e?(u[r]||(u[r]=[])).push(n):u[r]=!0}}function r(n){return n.charCodeAt(0)}function u(n,t){for(var e=n.criteria,r=t.criteria,u=-1,o=e.length;++u<o;){var a=e[u],i=r[u];if(a!==i){if(a>i||"undefined"==typeof a)return 1;if(i>a||"undefined"==typeof i)return-1}}return n.index-t.index}function o(n){var t=-1,r=n.length,u=n[0],o=n[r/2|0],a=n[r-1];if(u&&"object"==typeof u&&o&&"object"==typeof o&&a&&"object"==typeof a)return!1;var i=l();i["false"]=i["null"]=i["true"]=i.undefined=!1;var c=l();for(c.array=n,c.cache=i,c.push=e;++t<r;)c.push(n[t]);return c}function a(n){return"\\"+Z[n]}function i(){return v.pop()||[]}function l(){return y.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,"null":!1,number:null,object:null,push:null,string:null,"true":!1,undefined:!1,value:null}}function c(n){return"function"!=typeof n.toString&&"string"==typeof(n+"")}function f(n){n.length=0,v.length<w&&v.push(n)}function s(n){var t=n.cache;t&&s(t),n.array=n.cache=n.criteria=n.object=n.number=n.string=n.value=null,y.length<w&&y.push(n)}function p(n,t,e){t||(t=0),"undefined"==typeof e&&(e=n?n.length:0);for(var r=-1,u=e-t||0,o=Array(0>u?0:u);++r<u;)o[r]=n[t+r];return o}function h(e){function v(n){return n&&"object"==typeof n&&!fu(n)&&Wr.call(n,"__wrapped__")?n:new y(n)}function y(n,t){this.__chain__=!!t,this.__wrapped__=n}function w(n){function t(){if(r){var n=p(r);Mr.apply(n,arguments)}if(this instanceof t){var o=tt(e.prototype),a=e.apply(o,n||arguments);return Ft(a)?a:o}return e.apply(u,n||arguments)}var e=n[0],r=n[2],u=n[4];return cu(t,n),t}function Z(n,t,e,r,u){if(e){var o=e(n);if("undefined"!=typeof o)return o}var a=Ft(n);if(!a)return n;var l=Dr.call(n);if(!G[l]||!iu.nodeClass&&c(n))return n;var s=ou[l];switch(l){case B:case q:return new s(+n);case M:case V:return new s(n);case U:return o=s(n.source,E.exec(n)),o.lastIndex=n.lastIndex,o}var h=fu(n);if(t){var g=!r;r||(r=i()),u||(u=i());for(var v=r.length;v--;)if(r[v]==n)return u[v];o=h?s(n.length):{}}else o=h?p(n):wu({},n);return h&&(Wr.call(n,"index")&&(o.index=n.index),Wr.call(n,"input")&&(o.input=n.input)),t?(r.push(n),u.push(o),(h?_u:ku)(n,function(n,a){o[a]=Z(n,t,e,r,u)}),g&&(f(r),f(u)),o):o}function tt(n){return Ft(n)?Qr(n):{}}function et(n,t,e){if("function"!=typeof n)return ur;if("undefined"==typeof t||!("prototype"in n))return n;var r=n.__bindData__;if("undefined"==typeof r&&(iu.funcNames&&(r=!n.name),r=r||!iu.funcDecomp,!r)){var u=qr.call(n);iu.funcNames||(r=!S.test(u)),r||(r=N.test(u),cu(n,r))}if(r===!1||r!==!0&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,u){return n.call(t,e,r,u)};case 4:return function(e,r,u,o){return n.call(t,e,r,u,o)}}return qe(n,t)}function rt(n){function t(){var n=l?a:this;if(u){var g=p(u);Mr.apply(g,arguments)}if((o||f)&&(g||(g=p(arguments)),o&&Mr.apply(g,o),f&&g.length<i))return r|=16,rt([e,s?r:-4&r,g,null,a,i]);if(g||(g=arguments),c&&(e=n[h]),this instanceof t){n=tt(e.prototype);var v=e.apply(n,g);return Ft(v)?v:n}return e.apply(n,g)}var e=n[0],r=n[1],u=n[2],o=n[3],a=n[4],i=n[5],l=1&r,c=2&r,f=4&r,s=8&r,h=e;return cu(t,n),t}function ut(e,r){var u=-1,a=vt(),i=e?e.length:0,l=i>=_&&a===n,c=[];if(l){var f=o(r);f?(a=t,r=f):l=!1}for(;++u<i;){var p=e[u];a(r,p)<0&&c.push(p)}return l&&s(r),c}function at(n,t,e,r){for(var u=(r||0)-1,o=n?n.length:0,a=[];++u<o;){var i=n[u];if(i&&"object"==typeof i&&"number"==typeof i.length&&(fu(i)||mt(i))){t||(i=at(i,t,e));var l=-1,c=i.length,f=a.length;for(a.length+=c;++l<c;)a[f++]=i[l]}else e||a.push(i)}return a}function it(n,t,e,r,u,o){if(e){var a=e(n,t);if("undefined"!=typeof a)return!!a}if(n===t)return 0!==n||1/n==1/t;var l=typeof n,s=typeof t;if(!(n!==n||n&&Y[l]||t&&Y[s]))return!1;if(null==n||null==t)return n===t;var p=Dr.call(n),h=Dr.call(t);if(p==$&&(p=K),h==$&&(h=K),p!=h)return!1;switch(p){case B:case q:return+n==+t;case M:return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case U:case V:return n==Sr(t)}var g=p==z;if(!g){var v=Wr.call(n,"__wrapped__"),y=Wr.call(t,"__wrapped__");if(v||y)return it(v?n.__wrapped__:n,y?t.__wrapped__:t,e,r,u,o);if(p!=K||!iu.nodeClass&&(c(n)||c(t)))return!1;var b=!iu.argsObject&&mt(n)?Pr:n.constructor,d=!iu.argsObject&&mt(t)?Pr:t.constructor;if(b!=d&&!(Dt(b)&&b instanceof b&&Dt(d)&&d instanceof d)&&"constructor"in n&&"constructor"in t)return!1}var m=!u;u||(u=i()),o||(o=i());for(var _=u.length;_--;)if(u[_]==n)return o[_]==t;var w=0;if(a=!0,u.push(n),o.push(t),g){if(_=n.length,w=t.length,a=w==_,a||r)for(;w--;){var x=_,j=t[w];if(r)for(;x--&&!(a=it(n[x],j,e,r,u,o)););else if(!(a=it(n[w],j,e,r,u,o)))break}}else ju(t,function(t,i,l){return Wr.call(l,i)?(w++,a=Wr.call(n,i)&&it(n[i],t,e,r,u,o)):void 0}),a&&!r&&ju(n,function(n,t,e){return Wr.call(e,t)?a=--w>-1:void 0});return u.pop(),o.pop(),m&&(f(u),f(o)),a}function lt(n,t,e,r,u){(fu(t)?re:ku)(t,function(t,o){var a,i,l=t,c=n[o];if(t&&((i=fu(t))||Cu(t))){for(var f=r.length;f--;)if(a=r[f]==t){c=u[f];break}if(!a){var s;e&&(l=e(c,t),(s="undefined"!=typeof l)&&(c=l)),s||(c=i?fu(c)?c:[]:Cu(c)?c:{}),r.push(t),u.push(c),s||lt(c,t,e,r,u)}}else e&&(l=e(c,t),"undefined"==typeof l&&(l=t)),"undefined"!=typeof l&&(c=l);n[o]=c})}function ct(n,t){return n+Br(uu()*(t-n+1))}function ft(e,r,u){var a=-1,l=vt(),c=e?e.length:0,p=[],h=!r&&c>=_&&l===n,g=u||h?i():p;if(h){var v=o(g);l=t,g=v}for(;++a<c;){var y=e[a],b=u?u(y,a,e):y;(r?!a||g[g.length-1]!==b:l(g,b)<0)&&((u||h)&&g.push(b),p.push(y))}return h?(f(g.array),s(g)):u&&f(g),p}function st(n){return function(t,e,r){var u={};if(e=v.createCallback(e,r,3),fu(t))for(var o=-1,a=t.length;++o<a;){var i=t[o];n(u,i,e(i,o,t),t)}else _u(t,function(t,r,o){n(u,t,e(t,r,o),o)});return u}}function pt(n,t,e,r,u,o){var a=1&t,i=2&t,l=4&t,c=16&t,f=32&t;if(!i&&!Dt(n))throw new Ar;c&&!e.length&&(t&=-17,c=e=!1),f&&!r.length&&(t&=-33,f=r=!1);var s=n&&n.__bindData__;if(s&&s!==!0)return s=p(s),s[2]&&(s[2]=p(s[2])),s[3]&&(s[3]=p(s[3])),!a||1&s[1]||(s[4]=u),!a&&1&s[1]&&(t|=8),!l||4&s[1]||(s[5]=o),c&&Mr.apply(s[2]||(s[2]=[]),e),f&&Gr.apply(s[3]||(s[3]=[]),r),s[1]|=t,pt.apply(null,s);var h=1==t||17===t?w:rt;return h([n,t,e,r,u,o])}function ht(){X.shadowedProps=D,X.array=X.bottom=X.loop=X.top="",X.init="iterable",X.useHas=!0;for(var n,t=0;n=arguments[t];t++)for(var e in n)X[e]=n[e];var r=X.args;X.firstArg=/^[^,]+/.exec(r)[0];var u=kr("baseCreateCallback, errorClass, errorProto, hasOwnProperty, indicatorObject, isArguments, isArray, isString, keys, objectProto, objectTypes, nonEnumProps, stringClass, stringProto, toString","return function("+r+") {\n"+lu(X)+"\n}");return u(et,H,Lr,Wr,d,mt,fu,Ht,X.keys,Nr,Y,au,V,Rr,Dr)}function gt(n){return yu[n]}function vt(){var t=(t=v.indexOf)===ke?n:t;return t}function yt(n){return"function"==typeof n&&Fr.test(n)}function bt(n){var t,e;return!n||Dr.call(n)!=K||(t=n.constructor,Dt(t)&&!(t instanceof t))||!iu.argsClass&&mt(n)||!iu.nodeClass&&c(n)?!1:iu.ownLast?(ju(n,function(n,t,r){return e=Wr.call(r,t),!1}),e!==!1):(ju(n,function(n,t){e=t}),"undefined"==typeof e||Wr.call(n,e))}function dt(n){return bu[n]}function mt(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Dr.call(n)==$||!1}function _t(n,t,e,r){return"boolean"!=typeof t&&null!=t&&(r=e,e=t,t=!1),Z(n,t,"function"==typeof e&&et(e,r,1))}function wt(n,t,e){return Z(n,!0,"function"==typeof t&&et(t,e,1))}function xt(n,t){var e=tt(n);return t?wu(e,t):e}function jt(n,t,e){var r;return t=v.createCallback(t,e,3),ku(n,function(n,e,u){return t(n,e,u)?(r=e,!1):void 0}),r}function kt(n,t,e){var r;return t=v.createCallback(t,e,3),Ot(n,function(n,e,u){return t(n,e,u)?(r=e,!1):void 0}),r}function Ct(n,t,e){var r=[];ju(n,function(n,t){r.push(t,n)});var u=r.length;for(t=et(t,e,3);u--&&t(r[u--],r[u],n)!==!1;);return n}function Ot(n,t,e){var r=pu(n),u=r.length;for(t=et(t,e,3);u--;){var o=r[u];if(t(n[o],o,n)===!1)break}return n}function Pt(n){var t=[];return ju(n,function(n,e){Dt(n)&&t.push(e)}),t.sort()}function Et(n,t){return n?Wr.call(n,t):!1}function St(n){for(var t=-1,e=pu(n),r=e.length,u={};++t<r;){var o=e[t];u[n[o]]=o}return u}function At(n){return n===!0||n===!1||n&&"object"==typeof n&&Dr.call(n)==B||!1}function It(n){return n&&"object"==typeof n&&Dr.call(n)==q||!1}function Lt(n){return n&&1===n.nodeType||!1}function Nt(n){var t=!0;if(!n)return t;var e=Dr.call(n),r=n.length;return e==z||e==V||(iu.argsClass?e==$:mt(n))||e==K&&"number"==typeof r&&Dt(n.splice)?!r:(ku(n,function(){return t=!1}),t)}function Rt(n,t,e,r){return it(n,t,"function"==typeof e&&et(e,r,2))}function Tt(n){return Yr(n)&&!Zr(parseFloat(n))}function Dt(n){return"function"==typeof n}function Ft(n){return!(!n||!Y[typeof n])}function $t(n){return Bt(n)&&n!=+n}function zt(n){return null===n}function Bt(n){return"number"==typeof n||n&&"object"==typeof n&&Dr.call(n)==M||!1}function qt(n){return n&&Y[typeof n]&&Dr.call(n)==U||!1}function Ht(n){return"string"==typeof n||n&&"object"==typeof n&&Dr.call(n)==V||!1}function Wt(n){return"undefined"==typeof n}function Mt(n,t,e){var r={};return t=v.createCallback(t,e,3),ku(n,function(n,e,u){r[e]=t(n,e,u)}),r}function Kt(n){var t=arguments,e=2;if(!Ft(n))return n;if("number"!=typeof t[2]&&(e=t.length),e>3&&"function"==typeof t[e-2])var r=et(t[--e-1],t[e--],2);else e>2&&"function"==typeof t[e-1]&&(r=t[--e]);for(var u=p(arguments,1,e),o=-1,a=i(),l=i();++o<e;)lt(n,u[o],r,a,l);return f(a),f(l),n}function Ut(n,t,e){var r={};if("function"!=typeof t){var u=[];ju(n,function(n,t){u.push(t)}),u=ut(u,at(arguments,!0,!1,1));for(var o=-1,a=u.length;++o<a;){var i=u[o];r[i]=n[i]}}else t=v.createCallback(t,e,3),ju(n,function(n,e,u){t(n,e,u)||(r[e]=n)});return r}function Vt(n){for(var t=-1,e=pu(n),r=e.length,u=_r(r);++t<r;){var o=e[t];u[t]=[o,n[o]]}return u}function Gt(n,t,e){var r={};if("function"!=typeof t)for(var u=-1,o=at(arguments,!0,!1,1),a=Ft(n)?o.length:0;++u<a;){var i=o[u];i in n&&(r[i]=n[i])}else t=v.createCallback(t,e,3),ju(n,function(n,e,u){t(n,e,u)&&(r[e]=n)});return r}function Jt(n,t,e,r){var u=fu(n);if(null==e)if(u)e=[];else{var o=n&&n.constructor,a=o&&o.prototype;e=tt(a)}return t&&(t=v.createCallback(t,r,4),(u?_u:ku)(n,function(n,r,u){return t(e,n,r,u)})),e}function Qt(n){for(var t=-1,e=pu(n),r=e.length,u=_r(r);++t<r;)u[t]=n[e[t]];return u}function Xt(n){var t=arguments,e=-1,r=at(t,!0,!1,1),u=t[2]&&t[2][t[1]]===n?1:r.length,o=_r(u);for(iu.unindexedChars&&Ht(n)&&(n=n.split(""));++e<u;)o[e]=n[r[e]];return o}function Yt(n,t,e){var r=-1,u=vt(),o=n?n.length:0,a=!1;return e=(0>e?tu(0,o+e):e)||0,fu(n)?a=u(n,t,e)>-1:"number"==typeof o?a=(Ht(n)?n.indexOf(t,e):u(n,t,e))>-1:_u(n,function(n){return++r>=e?!(a=n===t):void 0}),a}function Zt(n,t,e){var r=!0;if(t=v.createCallback(t,e,3),fu(n))for(var u=-1,o=n.length;++u<o&&(r=!!t(n[u],u,n)););else _u(n,function(n,e,u){return r=!!t(n,e,u)});return r}function ne(n,t,e){var r=[];if(t=v.createCallback(t,e,3),fu(n))for(var u=-1,o=n.length;++u<o;){var a=n[u];t(a,u,n)&&r.push(a)}else _u(n,function(n,e,u){t(n,e,u)&&r.push(n)});return r}function te(n,t,e){if(t=v.createCallback(t,e,3),!fu(n)){var r;return _u(n,function(n,e,u){return t(n,e,u)?(r=n,!1):void 0}),r}for(var u=-1,o=n.length;++u<o;){var a=n[u];if(t(a,u,n))return a}}function ee(n,t,e){var r;return t=v.createCallback(t,e,3),ue(n,function(n,e,u){return t(n,e,u)?(r=n,!1):void 0}),r}function re(n,t,e){if(t&&"undefined"==typeof e&&fu(n))for(var r=-1,u=n.length;++r<u&&t(n[r],r,n)!==!1;);else _u(n,t,e);return n}function ue(n,t,e){var r=n,u=n?n.length:0;if(t=t&&"undefined"==typeof e?t:et(t,e,3),fu(n))for(;u--&&t(n[u],u,n)!==!1;);else{if("number"!=typeof u){var o=pu(n);u=o.length}else iu.unindexedChars&&Ht(n)&&(r=n.split(""));_u(n,function(n,e,a){return e=o?o[--u]:--u,t(r[e],e,a)})}return n}function oe(n,t){var e=p(arguments,2),r=-1,u="function"==typeof t,o=n?n.length:0,a=_r("number"==typeof o?o:0);return re(n,function(n){a[++r]=(u?t:n[t]).apply(n,e)}),a}function ae(n,t,e){var r=-1,u=n?n.length:0,o=_r("number"==typeof u?u:0);if(t=v.createCallback(t,e,3),fu(n))for(;++r<u;)o[r]=t(n[r],r,n);else _u(n,function(n,e,u){o[++r]=t(n,e,u)});return o}function ie(n,t,e){var u=-1/0,o=u;if("function"!=typeof t&&e&&e[t]===n&&(t=null),null==t&&fu(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];l>o&&(o=l)}else t=null==t&&Ht(n)?r:v.createCallback(t,e,3),_u(n,function(n,e,r){var a=t(n,e,r);a>u&&(u=a,o=n)});return o}function le(n,t,e){var u=1/0,o=u;if("function"!=typeof t&&e&&e[t]===n&&(t=null),null==t&&fu(n))for(var a=-1,i=n.length;++a<i;){var l=n[a];o>l&&(o=l)}else t=null==t&&Ht(n)?r:v.createCallback(t,e,3),_u(n,function(n,e,r){var a=t(n,e,r);u>a&&(u=a,o=n)});return o}function ce(n,t,e,r){var u=arguments.length<3;if(t=v.createCallback(t,r,4),fu(n)){var o=-1,a=n.length;for(u&&(e=n[++o]);++o<a;)e=t(e,n[o],o,n)}else _u(n,function(n,r,o){e=u?(u=!1,n):t(e,n,r,o)});return e}function fe(n,t,e,r){var u=arguments.length<3;return t=v.createCallback(t,r,4),ue(n,function(n,r,o){e=u?(u=!1,n):t(e,n,r,o)}),e}function se(n,t,e){return t=v.createCallback(t,e,3),ne(n,function(n,e,r){return!t(n,e,r)})}function pe(n,t,e){if(n&&"number"!=typeof n.length?n=Qt(n):iu.unindexedChars&&Ht(n)&&(n=n.split("")),null==t||e)return n?n[ct(0,n.length-1)]:g;var r=he(n);return r.length=eu(tu(0,t),r.length),r}function he(n){var t=-1,e=n?n.length:0,r=_r("number"==typeof e?e:0);return re(n,function(n){var e=ct(0,++t);r[t]=r[e],r[e]=n}),r}function ge(n){var t=n?n.length:0;return"number"==typeof t?t:pu(n).length}function ve(n,t,e){var r;if(t=v.createCallback(t,e,3),fu(n))for(var u=-1,o=n.length;++u<o&&!(r=t(n[u],u,n)););else _u(n,function(n,e,u){return!(r=t(n,e,u))});return!!r}function ye(n,t,e){var r=-1,o=fu(t),a=n?n.length:0,c=_r("number"==typeof a?a:0);for(o||(t=v.createCallback(t,e,3)),re(n,function(n,e,u){var a=c[++r]=l();o?a.criteria=ae(t,function(t){return n[t]}):(a.criteria=i())[0]=t(n,e,u),a.index=r,a.value=n}),a=c.length,c.sort(u);a--;){var p=c[a];c[a]=p.value,o||f(p.criteria),s(p)}return c}function be(n){return n&&"number"==typeof n.length?iu.unindexedChars&&Ht(n)?n.split(""):p(n):Qt(n)}function de(n){for(var t=-1,e=n?n.length:0,r=[];++t<e;){var u=n[t];u&&r.push(u)}return r}function me(n){return ut(n,at(arguments,!0,!0,1))}function _e(n,t,e){var r=-1,u=n?n.length:0;for(t=v.createCallback(t,e,3);++r<u;)if(t(n[r],r,n))return r;return-1}function we(n,t,e){var r=n?n.length:0;for(t=v.createCallback(t,e,3);r--;)if(t(n[r],r,n))return r;return-1}function xe(n,t,e){var r=0,u=n?n.length:0;if("number"!=typeof t&&null!=t){var o=-1;for(t=v.createCallback(t,e,3);++o<u&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[0]:g;return p(n,0,eu(tu(0,r),u))}function je(n,t,e,r){return"boolean"!=typeof t&&null!=t&&(r=e,e="function"!=typeof t&&r&&r[t]===n?null:t,t=!1),null!=e&&(n=ae(n,e,r)),at(n,t)}function ke(t,e,r){if("number"==typeof r){var u=t?t.length:0;r=0>r?tu(0,u+r):r||0}else if(r){var o=Ne(t,e);return t[o]===e?o:-1}return n(t,e,r)}function Ce(n,t,e){var r=0,u=n?n.length:0;if("number"!=typeof t&&null!=t){var o=u;for(t=v.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else r=null==t||e?1:t||r;return p(n,0,eu(tu(0,u-r),u))}function Oe(){for(var e=[],r=-1,u=arguments.length,a=i(),l=vt(),c=l===n,p=i();++r<u;){var h=arguments[r];(fu(h)||mt(h))&&(e.push(h),a.push(c&&h.length>=_&&o(r?e[r]:p)))}var g=e[0],v=-1,y=g?g.length:0,b=[];n:for(;++v<y;){var d=a[0];if(h=g[v],(d?t(d,h):l(p,h))<0){for(r=u,(d||p).push(h);--r;)if(d=a[r],(d?t(d,h):l(e[r],h))<0)continue n;b.push(h)}}for(;u--;)d=a[u],d&&s(d);return f(a),f(p),b}function Pe(n,t,e){var r=0,u=n?n.length:0;if("number"!=typeof t&&null!=t){var o=u;for(t=v.createCallback(t,e,3);o--&&t(n[o],o,n);)r++}else if(r=t,null==r||e)return n?n[u-1]:g;return p(n,tu(0,u-r))}function Ee(n,t,e){var r=n?n.length:0;for("number"==typeof e&&(r=(0>e?tu(0,r+e):eu(e,r-1))+1);r--;)if(n[r]===t)return r;return-1}function Se(n){for(var t=arguments,e=0,r=t.length,u=n?n.length:0;++e<r;)for(var o=-1,a=t[e];++o<u;)n[o]===a&&(Vr.call(n,o--,1),u--);return n}function Ae(n,t,e){n=+n||0,e="number"==typeof e?e:+e||1,null==t&&(t=n,n=0);for(var r=-1,u=tu(0,$r((t-n)/(e||1))),o=_r(u);++r<u;)o[r]=n,n+=e;return o}function Ie(n,t,e){var r=-1,u=n?n.length:0,o=[];for(t=v.createCallback(t,e,3);++r<u;){var a=n[r];t(a,r,n)&&(o.push(a),Vr.call(n,r--,1),u--)}return o}function Le(n,t,e){if("number"!=typeof t&&null!=t){var r=0,u=-1,o=n?n.length:0;for(t=v.createCallback(t,e,3);++u<o&&t(n[u],u,n);)r++}else r=null==t||e?1:tu(0,t);return p(n,r)}function Ne(n,t,e,r){var u=0,o=n?n.length:u;for(e=e?v.createCallback(e,r,1):ur,t=e(t);o>u;){var a=u+o>>>1;e(n[a])<t?u=a+1:o=a}return u}function Re(){return ft(at(arguments,!0,!0))}function Te(n,t,e,r){return"boolean"!=typeof t&&null!=t&&(r=e,e="function"!=typeof t&&r&&r[t]===n?null:t,t=!1),null!=e&&(e=v.createCallback(e,r,3)),ft(n,t,e)}function De(n){return ut(n,p(arguments,1))}function Fe(){for(var n=-1,t=arguments.length;++n<t;){var e=arguments[n];if(fu(e)||mt(e))var r=r?ft(ut(r,e).concat(ut(e,r))):e}return r||[]}function $e(){for(var n=arguments.length>1?arguments:arguments[0],t=-1,e=n?ie(Su(n,"length")):0,r=_r(0>e?0:e);++t<e;)r[t]=Su(n,t);return r}function ze(n,t){var e=-1,r=n?n.length:0,u={};for(t||!r||fu(n[0])||(t=[]);++e<r;){var o=n[e];t?u[o]=t[e]:o&&(u[o[0]]=o[1])}return u}function Be(n,t){if(!Dt(t))throw new Ar;return function(){return--n<1?t.apply(this,arguments):void 0}}function qe(n,t){return arguments.length>2?pt(n,17,p(arguments,2),null,t):pt(n,1,null,null,t)}function He(n){for(var t=arguments.length>1?at(arguments,!0,!1,1):Pt(n),e=-1,r=t.length;++e<r;){var u=t[e];n[u]=pt(n[u],1,null,null,n)}return n}function We(n,t){return arguments.length>2?pt(t,19,p(arguments,2),null,n):pt(t,3,null,null,n)}function Me(){for(var n=arguments,t=n.length;t--;)if(!Dt(n[t]))throw new Ar;return function(){for(var t=arguments,e=n.length;e--;)t=[n[e].apply(this,t)];return t[0]}}function Ke(n,t){return t="number"==typeof t?t:+t||n.length,pt(n,4,null,null,null,t)}function Ue(n,t,e){var r,u,o,a,i,l,c,f=0,s=!1,p=!0;if(!Dt(n))throw new Ar;if(t=tu(0,t)||0,e===!0){var h=!0;p=!1}else Ft(e)&&(h=e.leading,s="maxWait"in e&&(tu(t,e.maxWait)||0),p="trailing"in e?e.trailing:p);var v=function(){var e=t-(Iu()-a);if(0>=e){u&&zr(u);var s=c;u=l=c=g,s&&(f=Iu(),o=n.apply(i,r),l||u||(r=i=null))}else l=Ur(v,e)},y=function(){l&&zr(l),u=l=c=g,(p||s!==t)&&(f=Iu(),o=n.apply(i,r),l||u||(r=i=null))};return function(){if(r=arguments,a=Iu(),i=this,c=p&&(l||!h),s===!1)var e=h&&!l;else{u||h||(f=a);var g=s-(a-f),b=0>=g;b?(u&&(u=zr(u)),f=a,o=n.apply(i,r)):u||(u=Ur(y,g))}return b&&l?l=zr(l):l||t===s||(l=Ur(v,t)),e&&(b=!0,o=n.apply(i,r)),!b||l||u||(r=i=null),o}}function Ve(n){if(!Dt(n))throw new Ar;var t=p(arguments,1);return Ur(function(){n.apply(g,t)},1)}function Ge(n,t){if(!Dt(n))throw new Ar;var e=p(arguments,2);return Ur(function(){n.apply(g,e)},t)}function Je(n,t){if(!Dt(n))throw new Ar;var e=function(){var r=e.cache,u=t?t.apply(this,arguments):m+arguments[0];return Wr.call(r,u)?r[u]:r[u]=n.apply(this,arguments)};return e.cache={},e}function Qe(n){var t,e;if(!Dt(n))throw new Ar;return function(){return t?e:(t=!0,e=n.apply(this,arguments),n=null,e)}}function Xe(n){return pt(n,16,p(arguments,1))}function Ye(n){return pt(n,32,null,p(arguments,1))}function Ze(n,t,e){var r=!0,u=!0;if(!Dt(n))throw new Ar;return e===!1?r=!1:Ft(e)&&(r="leading"in e?e.leading:r,u="trailing"in e?e.trailing:u),J.leading=r,J.maxWait=t,J.trailing=u,Ue(n,t,J)}function nr(n,t){return pt(t,16,[n])}function tr(n){return function(){return n}}function er(n,t,e){var r=typeof n;if(null==n||"function"==r)return et(n,t,e);if("object"!=r)return lr(n);var u=pu(n),o=u[0],a=n[o];return 1!=u.length||a!==a||Ft(a)?function(t){for(var e=u.length,r=!1;e--&&(r=it(t[u[e]],n[u[e]],null,!0)););return r}:function(n){var t=n[o];return a===t&&(0!==a||1/a==1/t)}}function rr(n){return null==n?"":Sr(n).replace(mu,gt)}function ur(n){return n}function or(n,t,e){var r=!0,u=t&&Pt(t);t&&(e||u.length)||(null==e&&(e=t),o=y,t=n,n=v,u=Pt(t)),e===!1?r=!1:Ft(e)&&"chain"in e&&(r=e.chain);var o=n,a=Dt(o);re(u,function(e){var u=n[e]=t[e];a&&(o.prototype[e]=function(){var t=this.__chain__,e=this.__wrapped__,a=[e];Mr.apply(a,arguments);var i=u.apply(n,a);if(r||t){if(e===i&&Ft(i))return this;i=new o(i),i.__chain__=t}return i})})}function ar(){return e._=Tr,this}function ir(){}function lr(n){return function(t){return t[n]}}function cr(n,t,e){var r=null==n,u=null==t;if(null==e&&("boolean"==typeof n&&u?(e=n,n=1):u||"boolean"!=typeof t||(e=t,u=!0)),r&&u&&(t=1),n=+n||0,u?(t=n,n=0):t=+t||0,e||n%1||t%1){var o=uu();return eu(n+o*(t-n+parseFloat("1e-"+((o+"").length-1))),t)}return ct(n,t)}function fr(n,t){if(n){var e=n[t];return Dt(e)?n[t]():e}}function sr(n,t,e){var r=v.templateSettings;n=Sr(n||""),e=xu({},e,r);var u,o=xu({},e.imports,r.imports),i=pu(o),l=Qt(o),c=0,f=e.interpolate||L,s="__p += '",p=Er((e.escape||L).source+"|"+f.source+"|"+(f===A?P:L).source+"|"+(e.evaluate||L).source+"|$","g");n.replace(p,function(t,e,r,o,i,l){return r||(r=o),s+=n.slice(c,l).replace(R,a),e&&(s+="' +\n__e("+e+") +\n'"),i&&(u=!0,s+="';\n"+i+";\n__p += '"),r&&(s+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),c=l+t.length,t}),s+="';\n";var h=e.variable,y=h;y||(h="obj",s="with ("+h+") {\n"+s+"\n}\n"),s=(u?s.replace(j,""):s).replace(C,"$1").replace(O,"$1;"),s="function("+h+") {\n"+(y?"":h+" || ("+h+" = {});\n")+"var __t, __p = '', __e = _.escape"+(u?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+s+"return __p\n}";var b="\n/*\n//# sourceURL="+(e.sourceURL||"/lodash/template/source["+F++ +"]")+"\n*/";try{var d=kr(i,"return "+s+b).apply(g,l)}catch(m){throw m.source=s,m}return t?d(t):(d.source=s,d)}function pr(n,t,e){n=(n=+n)>-1?n:0;var r=-1,u=_r(n);for(t=et(t,e,1);++r<n;)u[r]=t(r);return u}function hr(n){return null==n?"":Sr(n).replace(du,dt)}function gr(n){var t=++b;return Sr(null==n?"":n)+t}function vr(n){return n=new y(n),n.__chain__=!0,n}function yr(n,t){return t(n),n}function br(){return this.__chain__=!0,this}function dr(){return Sr(this.__wrapped__)}function mr(){return this.__wrapped__}e=e?ot.defaults(nt.Object(),e,ot.pick(nt,T)):nt;var _r=e.Array,wr=e.Boolean,xr=e.Date,jr=e.Error,kr=e.Function,Cr=e.Math,Or=e.Number,Pr=e.Object,Er=e.RegExp,Sr=e.String,Ar=e.TypeError,Ir=[],Lr=jr.prototype,Nr=Pr.prototype,Rr=Sr.prototype,Tr=e._,Dr=Nr.toString,Fr=Er("^"+Sr(Dr).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),$r=Cr.ceil,zr=e.clearTimeout,Br=Cr.floor,qr=kr.prototype.toString,Hr=yt(Hr=Pr.getPrototypeOf)&&Hr,Wr=Nr.hasOwnProperty,Mr=Ir.push,Kr=Nr.propertyIsEnumerable,Ur=e.setTimeout,Vr=Ir.splice,Gr=Ir.unshift,Jr=function(){try{var n={},t=yt(t=Pr.defineProperty)&&t,e=t(n,n,n)&&t}catch(r){}return e}(),Qr=yt(Qr=Pr.create)&&Qr,Xr=yt(Xr=_r.isArray)&&Xr,Yr=e.isFinite,Zr=e.isNaN,nu=yt(nu=Pr.keys)&&nu,tu=Cr.max,eu=Cr.min,ru=e.parseInt,uu=Cr.random,ou={};ou[z]=_r,ou[B]=wr,ou[q]=xr,ou[W]=kr,ou[K]=Pr,ou[M]=Or,ou[U]=Er,ou[V]=Sr;var au={};au[z]=au[q]=au[M]={constructor:!0,toLocaleString:!0,toString:!0,valueOf:!0},au[B]=au[V]={constructor:!0,toString:!0,valueOf:!0},au[H]=au[W]=au[U]={constructor:!0,toString:!0},au[K]={constructor:!0},function(){for(var n=D.length;n--;){var t=D[n];for(var e in au)Wr.call(au,e)&&!Wr.call(au[e],t)&&(au[e][t]=!1)}}(),y.prototype=v.prototype;var iu=v.support={};!function(){var n=function(){this.x=1},t={0:1,length:1},r=[];n.prototype={valueOf:1,y:1};for(var u in new n)r.push(u);for(u in arguments);iu.argsClass=Dr.call(arguments)==$,iu.argsObject=arguments.constructor==Pr&&!(arguments instanceof _r),iu.enumErrorProps=Kr.call(Lr,"message")||Kr.call(Lr,"name"),iu.enumPrototypes=Kr.call(n,"prototype"),iu.funcDecomp=!yt(e.WinRTError)&&N.test(h),iu.funcNames="string"==typeof kr.name,iu.nonEnumArgs=0!=u,iu.nonEnumShadows=!/valueOf/.test(r),iu.ownLast="x"!=r[0],iu.spliceObjects=(Ir.splice.call(t,0,1),!t[0]),iu.unindexedChars="x"[0]+Pr("x")[0]!="xx";try{iu.nodeClass=!(Dr.call(document)==K&&!({toString:0}+""))}catch(o){iu.nodeClass=!0}}(1),v.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:A,variable:"",imports:{_:v}};var lu=function(n){var t="var index, iterable = "+n.firstArg+", result = "+n.init+";\nif (!iterable) return result;\n"+n.top+";";n.array?(t+="\nvar length = iterable.length; index = -1;\nif ("+n.array+") {  ",iu.unindexedChars&&(t+="\n  if (isString(iterable)) {\n    iterable = iterable.split('')\n  }  "),t+="\n  while (++index < length) {\n    "+n.loop+";\n  }\n}\nelse {  "):iu.nonEnumArgs&&(t+="\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += '';\n      "+n.loop+";\n    }\n  } else {  "),iu.enumPrototypes&&(t+="\n  var skipProto = typeof iterable == 'function';\n  "),iu.enumErrorProps&&(t+="\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ");var e=[];if(iu.enumPrototypes&&e.push('!(skipProto && index == "prototype")'),iu.enumErrorProps&&e.push('!(skipErrorProps && (index == "message" || index == "name"))'),n.useHas&&n.keys)t+="\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n",e.length&&(t+="    if ("+e.join(" && ")+") {\n  "),t+=n.loop+";    ",e.length&&(t+="\n    }"),t+="\n  }  ";else if(t+="\n  for (index in iterable) {\n",n.useHas&&e.push("hasOwnProperty.call(iterable, index)"),e.length&&(t+="    if ("+e.join(" && ")+") {\n  "),t+=n.loop+";    ",e.length&&(t+="\n    }"),t+="\n  }    ",iu.nonEnumShadows){for(t+="\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ",k=0;7>k;k++)t+="\n    index = '"+n.shadowedProps[k]+"';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))",n.useHas||(t+=" || (!nonEnum[index] && iterable[index] !== objectProto[index])"),t+=") {\n      "+n.loop+";\n    }      ";t+="\n  }    "}return(n.array||iu.nonEnumArgs)&&(t+="\n}"),t+=n.bottom+";\nreturn result"};Qr||(tt=function(){function n(){}return function(t){if(Ft(t)){n.prototype=t;var r=new n;n.prototype=null}return r||e.Object()}}());var cu=Jr?function(n,t){Q.value=t,Jr(n,"__bindData__",Q)}:ir;iu.argsClass||(mt=function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Wr.call(n,"callee")&&!Kr.call(n,"callee")||!1});var fu=Xr||function(n){return n&&"object"==typeof n&&"number"==typeof n.length&&Dr.call(n)==z||!1},su=ht({args:"object",init:"[]",top:"if (!(objectTypes[typeof object])) return result",loop:"result.push(index)"}),pu=nu?function(n){return Ft(n)?iu.enumPrototypes&&"function"==typeof n||iu.nonEnumArgs&&n.length&&mt(n)?su(n):nu(n):[]}:su,hu={args:"collection, callback, thisArg",top:"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",array:"typeof length == 'number'",keys:pu,loop:"if (callback(iterable[index], index, collection) === false) return result"},gu={args:"object, source, guard",top:"var args = arguments,\n    argsIndex = 0,\n    argsLength = typeof guard == 'number' ? 2 : args.length;\nwhile (++argsIndex < argsLength) {\n  iterable = args[argsIndex];\n  if (iterable && objectTypes[typeof iterable]) {",keys:pu,loop:"if (typeof result[index] == 'undefined') result[index] = iterable[index]",bottom:"  }\n}"},vu={top:"if (!objectTypes[typeof iterable]) return result;\n"+hu.top,array:!1},yu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bu=St(yu),du=Er("("+pu(bu).join("|")+")","g"),mu=Er("["+pu(yu).join("")+"]","g"),_u=ht(hu),wu=ht(gu,{top:gu.top.replace(";",";\nif (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n  callback = args[--argsLength];\n}"),loop:"result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]"}),xu=ht(gu),ju=ht(hu,vu,{useHas:!1}),ku=ht(hu,vu);Dt(/x/)&&(Dt=function(n){return"function"==typeof n&&Dr.call(n)==W});var Cu=Hr?function(n){if(!n||Dr.call(n)!=K||!iu.argsClass&&mt(n))return!1;var t=n.valueOf,e=yt(t)&&(e=Hr(t))&&Hr(e);return e?n==e||Hr(n)==e:bt(n)}:bt,Ou=st(function(n,t,e){Wr.call(n,e)?n[e]++:n[e]=1}),Pu=st(function(n,t,e){(Wr.call(n,e)?n[e]:n[e]=[]).push(t)}),Eu=st(function(n,t,e){n[e]=t}),Su=ae,Au=ne,Iu=yt(Iu=xr.now)&&Iu||function(){return(new xr).getTime()},Lu=8==ru(x+"08")?ru:function(n,t){return ru(Ht(n)?n.replace(I,""):n,t||0)};return v.after=Be,v.assign=wu,v.at=Xt,v.bind=qe,v.bindAll=He,v.bindKey=We,v.chain=vr,v.compact=de,v.compose=Me,v.constant=tr,v.countBy=Ou,v.create=xt,v.createCallback=er,v.curry=Ke,v.debounce=Ue,v.defaults=xu,v.defer=Ve,v.delay=Ge,v.difference=me,v.filter=ne,v.flatten=je,v.forEach=re,v.forEachRight=ue,v.forIn=ju,v.forInRight=Ct,v.forOwn=ku,v.forOwnRight=Ot,v.functions=Pt,v.groupBy=Pu,v.indexBy=Eu,v.initial=Ce,v.intersection=Oe,v.invert=St,v.invoke=oe,v.keys=pu,v.map=ae,v.mapValues=Mt,v.max=ie,v.memoize=Je,v.merge=Kt,v.min=le,v.omit=Ut,v.once=Qe,v.pairs=Vt,v.partial=Xe,v.partialRight=Ye,v.pick=Gt,v.pluck=Su,v.property=lr,v.pull=Se,v.range=Ae,v.reject=se,v.remove=Ie,v.rest=Le,v.shuffle=he,v.sortBy=ye,v.tap=yr,v.throttle=Ze,v.times=pr,v.toArray=be,v.transform=Jt,v.union=Re,v.uniq=Te,v.values=Qt,v.where=Au,v.without=De,v.wrap=nr,v.xor=Fe,v.zip=$e,v.zipObject=ze,v.collect=ae,v.drop=Le,v.each=re,v.eachRight=ue,v.extend=wu,v.methods=Pt,v.object=ze,v.select=ne,v.tail=Le,v.unique=Te,v.unzip=$e,or(v),v.clone=_t,v.cloneDeep=wt,v.contains=Yt,v.escape=rr,v.every=Zt,v.find=te,v.findIndex=_e,v.findKey=jt,v.findLast=ee,v.findLastIndex=we,v.findLastKey=kt,v.has=Et,v.identity=ur,v.indexOf=ke,v.isArguments=mt,v.isArray=fu,v.isBoolean=At,v.isDate=It,v.isElement=Lt,v.isEmpty=Nt,v.isEqual=Rt,v.isFinite=Tt,v.isFunction=Dt,v.isNaN=$t,v.isNull=zt,v.isNumber=Bt,v.isObject=Ft,v.isPlainObject=Cu,v.isRegExp=qt,v.isString=Ht,v.isUndefined=Wt,v.lastIndexOf=Ee,v.mixin=or,v.noConflict=ar,v.noop=ir,v.now=Iu,v.parseInt=Lu,v.random=cr,v.reduce=ce,v.reduceRight=fe,v.result=fr,v.runInContext=h,v.size=ge,v.some=ve,v.sortedIndex=Ne,v.template=sr,v.unescape=hr,v.uniqueId=gr,v.all=Zt,v.any=ve,v.detect=te,v.findWhere=te,v.foldl=ce,v.foldr=fe,v.include=Yt,v.inject=ce,or(function(){var n={};return ku(v,function(t,e){v.prototype[e]||(n[e]=t)}),n}(),!1),v.first=xe,v.last=Pe,v.sample=pe,v.take=xe,v.head=xe,ku(v,function(n,t){var e="sample"!==t;v.prototype[t]||(v.prototype[t]=function(t,r){var u=this.__chain__,o=n(this.__wrapped__,t,r);return u||null!=t&&(!r||e&&"function"==typeof t)?new y(o,u):o})}),v.VERSION="2.4.1",v.prototype.chain=br,v.prototype.toString=dr,v.prototype.value=mr,v.prototype.valueOf=mr,_u(["join","pop","shift"],function(n){var t=Ir[n];v.prototype[n]=function(){var n=this.__chain__,e=t.apply(this.__wrapped__,arguments);return n?new y(e,n):e}}),_u(["push","reverse","sort","unshift"],function(n){var t=Ir[n];v.prototype[n]=function(){return t.apply(this.__wrapped__,arguments),this}}),_u(["concat","slice","splice"],function(n){var t=Ir[n];v.prototype[n]=function(){return new y(t.apply(this.__wrapped__,arguments),this.__chain__)}}),iu.spliceObjects||_u(["pop","shift","splice"],function(n){var t=Ir[n],e="splice"==n;v.prototype[n]=function(){var n=this.__chain__,r=this.__wrapped__,u=t.apply(r,arguments);return 0===r.length&&delete r[0],n||e?new y(u,n):u}}),v}var g,v=[],y=[],b=0,d={},m=+new Date+"",_=75,w=40,x=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",j=/\b__p \+= '';/g,C=/\b(__p \+=) '' \+/g,O=/(__e\(.*?\)|\b__t\)) \+\n'';/g,P=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,E=/\w*$/,S=/^\s*function[ \n\r\t]+\w/,A=/<%=([\s\S]+?)%>/g,I=RegExp("^["+x+"]*0+(?=.$)"),L=/($^)/,N=/\bthis\b/,R=/['\n\r\t\u2028\u2029\\]/g,T=["Array","Boolean","Date","Error","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setTimeout"],D=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],F=0,$="[object Arguments]",z="[object Array]",B="[object Boolean]",q="[object Date]",H="[object Error]",W="[object Function]",M="[object Number]",K="[object Object]",U="[object RegExp]",V="[object String]",G={};
G[W]=!1,G[$]=G[z]=G[B]=G[q]=G[M]=G[K]=G[U]=G[V]=!0;var J={leading:!1,maxWait:0,trailing:!1},Q={configurable:!1,enumerable:!1,value:null,writable:!1},X={args:"",array:null,bottom:"",firstArg:"",init:"",keys:null,loop:"",shadowedProps:null,support:null,top:"",useHas:!1},Y={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,undefined:!1},Z={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},nt=Y[typeof window]&&window||this,tt=Y[typeof exports]&&exports&&!exports.nodeType&&exports,et=Y[typeof module]&&module&&!module.nodeType&&module,rt=et&&et.exports===tt&&tt,ut=Y[typeof global]&&global;!ut||ut.global!==ut&&ut.window!==ut||(nt=ut);var ot=h();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(nt._=ot,define("lodash",[],function(){return ot})):tt&&et?rt?(et.exports=ot)._=ot:tt._=ot:nt._=ot}).call(this),define("subject",["lodash"],function(n){var t={initialize:function(){}},e=function(){};return e.prototype=t,e.proto=function(t,e){return n.isObject(t)?n.assign(this.prototype,t):this.prototype[t]=e,this},e.protoMerge=function(t,e){if(n.isString(t)){var r=this.prototype[t],u=n.assign({},r,e);this.proto(t,u)}else n.each(t,n.bind(function(n,t){this.protoMerge(t,n)},this))},e.extend=function(t,e,r){var u,o;n.isFunction(t)?(u=n.assign({},e,{initialize:t}),o=r):n.isObject(t)&&(u=t||{},o=r);var a,i=this;return a=function(){var n=Object.create(a.prototype);return n.initialize.apply(n,arguments),n},n.assign(a,i,o),a.prototype=Object.create(i.prototype),a.prototype.constructor=a,a.proto(u),a.__super__=i.prototype,a},e.extend.bind(e)}),define("no",["require","exports","module","subject"],function(n,t,e){function r(n){return!isNaN(n)}var u=n("subject"),o=e.exports=u({initialize:function(n){this.number=this.evaluate(n)},validate:function(n){return"number"==typeof n&&r(n)},coerce:function(n){return parseFloat(n,10)},evaluate:function(n){return this.validate(n)?n:this.coerce(n)},ensureValidity:function(n){if(!this.validate(this.number))throw n=n||"is not a valid number.",new Error("Number "+this.number+" - "+n)},add:function(n){return n=this.evaluate(n),this.number=this.number+n,this},subtract:function(n){return n=this.evaluate(n),this.number=this.number-n,this},multiply:function(n){return n=this.evaluate(n),this.number=this.number*n,this},divide:function(n){return n=this.evaluate(n),this.number=this.number/n,this},isGt:function(n){return n=this.evaluate(n),this.number>n},isGte:function(n){return n=this.evaluate(n),this.number>=n},isLt:function(n){return n=this.evaluate(n),this.number<n},isLte:function(n){return n=this.evaluate(n),this.number<=n},value:function(){return this.number}});return o});
define('__backbone-ui-resizable/handle/update-position',['require','exports','module','./helpers','no'],function (require, exports, module) {
	

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

define('__backbone-ui-resizable/handle/enable-disable',['require','exports','module'],function (require, exports, module) {
	

	exports.disableHandle = function disableHandle() {

		this.disableDraggable();
		this.$el
			.addClass(this.resizable.handleOptions.clss + '-disabled')
			.removeClass(this.resizable.handleOptions.clss + '-enabled');

		return this;
	};

	exports.enableHandle = function enableHandle(direction, options) {

		this.enableDraggable();
		this.$el
			.addClass(this.resizable.handleOptions.clss + '-enabled')
			.removeClass(this.resizable.handleOptions.clss + '-disabled');

		return this;
	};
});

define('__backbone-ui-resizable/handle/base',['require','exports','module','backbone-ui-draggable','lodash','./update-position','./enable-disable'],function (require, exports, module) {
	

	var draggable = require('backbone-ui-draggable'),
		_ = require('lodash');

	var _updatePosition = require('./update-position');

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

			// calculate ratio point
			this.ratio = options.ratio;
			this.outer = options.thickness * this.ratio;
			this.inner = options.thickness - this.outer;


			// [1] set the updatePosition method
			this.updatePosition = _.bind(_updatePosition[this.direction], this);


			// [2] setStyles
			// [2.0] general styles
			this.setStyles();

			// [2.1] place the handle
			// initialize handle position
			this.updatePosition();

			// [5] enable!
			this.enableHandle();

			////////////////////
			///////////////////////
			//////////////////////////
			this.listenTo(this.resizable.modeld, 'change', this.updatePosition);
			this.listenTo(this.resizable, 'resizestop', this.updatePosition);
			///////////////////////////
			////////////////////////
			////////////////////

			this.resizable.listenTo(this, 'movestart', function () {
				this.trigger('resizestart', this);
			});

			// UPDATE handle positions whenever the movement stops!
			// ONLY WHEN MOVEMENT STOPS
			this.resizable.listenTo(this, 'movestop', function () {
				this.trigger('resizestop', this);
			});
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
					height: this.resizable.modeld.get('width'),
				};

			} else if (axis === 'y') {
				// vertical sliding direction
				styles = {
					zIndex: 99,
					width: this.resizable.modeld.get('height'),
					height: this.thickness
				};
			}

			this.$el.css(styles);
		},

		map: _.extend(draggable.prototype.map, {
			height: '->css:height',
			width: '->css:width',
		})
	});

	// proto
	handle.proto(require('./enable-disable'));
});

define('__backbone-ui-resizable/handle/index',['require','exports','module','./base'],function (require, exports, module) {
	

	var baseHandle = require('./base');

	function nY(delta, options) {
		var remainder = this.resizable.moveN(delta, options);


		// ALWAYS RETURN 0, as the handle is
		// positioned relative to the resizable object,
		// and thus it must not modify its own position
		return 0;
	}

	function sY(delta, options) {
		var remainder = this.resizable.moveS(delta, options);

		// IF there is a remainder,
		// return the difference, so that the handle
		// cannot move beyond the resizable's boundaries
		return delta - remainder;
	}

	function wX(delta, options) {
		var remainder = this.resizable.moveW(delta, options);

		// ALWAYS RETURN 0, as the handle is
		// positioned relative to the resizable object,
		// and thus it must not modify its own position
		return 0;
	}

	function eX(delta, options) {
		var remainder = this.resizable.moveE(delta, options);

		// IF there is a remainder,
		// return the difference, so that the handle
		// cannot move beyond the resizable's boundaries
		return delta - remainder;
	}


	var n = { beforeMoveY: nY },
		s = { beforeMoveY: sY },
		w = { beforeMoveX: wX },
		e = { beforeMoveX: eX };



	exports.n = baseHandle.extend(n);

	exports.s = baseHandle.extend(s);

	exports.w = baseHandle.extend(w);

	exports.e = baseHandle.extend(e);

	exports.nw = baseHandle.extend(n).extend(w);

	exports.ne = baseHandle.extend(n).extend(e);

	exports.sw = baseHandle.extend(s).extend(w);

	exports.se = baseHandle.extend(s).extend(e);
});

define('__backbone-ui-resizable/helpers',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');


	function notNaN(v) {
		return !isNaN(v);
	}

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
		var res = parseFloat(v);

		if (isNaN(res)) {
			throw new Error(v + ' not number');
		} else {
			return res;
		}
	};

	exports.numberifyProperties = function numberifyProperties(props, obj) {
		var res = {};

		_.each(props, function (p) {
			res[p] = parseFloat(obj[p]);
		});

		return res;
	};



	exports.fitValueWithin = function fitValueWithin(value, min, max) {

		if (!isNaN(min)) {
			value = value > min ? value : min;
		}

		if (!isNaN(max)) {
			value = value < max ? value : max;
		}

		return value;
	};


	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var isNumber = /^-?\d*(\.\d+)?$/;
	exports.stringifyPositionalValue = function stringifyPositionalValue(v) {
		// [1] check if it is a isNumber
		return isNumber.test(v) ? v + 'px' : v;
	};
});

define('__backbone-ui-resizable/actions/e',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaE = function deltaE(attempted, force) {

		if (force) {
			return attempted;
		}

		var m = this.modeld;

		var w = m.get('width'),
			minW = m.get('minWidth'),
			maxW = m.get('maxWidth');

		var r = no(m.get('left')).add(w).value(),
			minR = m.get('minRight'),
			maxR = m.get('maxRight');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				no(minW).subtract(w).value(),
				no(minR).subtract(r).value()
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				no(maxW).subtract(w).value(),
				no(maxR).subtract(r).value()
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveE = function moveE(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			delta = this.deltaE(attemptedDelta, options.force);

		modeld.set('width', no(modeld.get('width')).add(delta).value());

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'expand' : 'contract',
				handle: 'e',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-x', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/w',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaW = function deltaW(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.modeld;

		var w = m.get('width'),
			minW = m.get('minWidth'),
			maxW = m.get('maxWidth');

		var l = m.get('left'),
			minL = m.get('minLeft'),
			maxL = m.get('maxLeft');


			// maximum delta towards WEST (-)
		var maxWDelta = helpers.max(
				no(w).subtract(maxW).value(),
				no(minL).subtract(l).value()
			),
			// maximum delta towards EAST (+)
			maxEDelta = helpers.min(
				no(w).subtract(minW).value(),
				no(maxL).subtract(l).value()
			);

		return helpers.fitValueWithin(attempted, maxWDelta, maxEDelta);
	};

	exports.moveW = function moveW(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			delta = this.deltaW(attemptedDelta, options.force);

		modeld.set({
			left: no(modeld.get('left')).add(delta).value(),
			width: no(modeld.get('width')).subtract(delta).value()
		});

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'contract' : 'expand',
				handle: 'w',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-x', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/s',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaS = function deltaS(attempted, force) {



		if (force) {
			return attempted;
		}


		var m = this.modeld;

		var h = m.get('height'),
			minH = m.get('minHeight'),
			maxH = m.get('maxHeight');

		var b = no(m.get('top')).add(h).value(),
			minB = m.get('minBottom'),
			maxB = m.get('maxBottom');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				no(minH).subtract(h).value(),
				no(minB).subtract(b).value()
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				no(maxH).subtract(h).value(),
				no(maxB).subtract(b).value()
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveS = function moveS(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			delta = this.deltaS(attemptedDelta, options.force);

		modeld.set('height', no(modeld.get('height')).add(delta).value());

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'y',
				delta: delta,
				action: delta > 0 ? 'expand' : 'contract',
				handle: 's',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-y', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/n',['require','exports','module','lodash','no','../helpers'],function (require, exports, module) {
	

	var _ = require('lodash'),
		no = require('no');

	var helpers = require('../helpers');

	exports.deltaN = function deltaN(attempted, force) {


		if (force) {
			return attempted;
		}


		var m = this.modeld;

		var h = m.get('height'),
			minH = m.get('minHeight'),
			maxH = m.get('maxHeight');

		var t = m.get('top'),
			minT = m.get('minTop'),
			maxT = m.get('maxTop');


			// maximum delta towards NORTH (-)
		var maxNDelta = helpers.max(
				no(h).subtract(maxH).value(),
				no(minT).subtract(t).value()
			),
			// maximum delta towards SOUTH (+)
			maxSDelta = helpers.min(
				no(h).subtract(minH).value(),
				no(maxT).subtract(t).value()
			);

		return helpers.fitValueWithin(attempted, maxNDelta, maxSDelta);
	};

	exports.moveN = function moveN(attemptedDelta, options) {
		options = options || {};

		var modeld = this.modeld,
			delta = this.deltaN(attemptedDelta, options.force);

		modeld.set({
			top: modeld.get('top') + delta,
			height: no(modeld.get('height')).subtract(delta).value()
		});

		// events
		if (!options.silent && delta !== 0) {

			var eventData = _.assign({
				axis: 'x',
				delta: -1 * delta,
				action: delta > 0 ? 'contract' : 'expand',
				handle: 'n',

			}, options);

			this.trigger('resize', this, eventData)
				.trigger('resize-y', this, eventData)
		}

		return attemptedDelta - delta;
	};
});

define('__backbone-ui-resizable/actions/index',['require','exports','module'],function (require, exports, module) {
	

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
	 * @param options {Obejct}
	 *     options will be passed straight to handle.moveToLeft,
	 *     which will pass options on to event data
	 */
	exports.expandToLeft = function expandToLeft(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveW(-1 * attemptedDelta, options));
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
	exports.expandToRight = function expandToRight(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveE(attemptedDelta, options));
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
	exports.expandToTop = function expandToTop(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveN(-1 * attemptedDelta, options));
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
	exports.expandToBottom = function expandToBottom(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveS(attemptedDelta, options));
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
	exports.contractToRight = function contractToRight(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveW(attemptedDelta, options));
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
	exports.contractToLeft = function contractToLeft(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveE(-1 * attemptedDelta, options));
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
	exports.contractToBottom = function contractToBottom(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveN(attemptedDelta, options));
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
	exports.contractToTop = function contractToTop(attemptedDelta, options) {

		options = options || {};
		options.agent = options.agent || 'code';

		return Math.abs(this.moveS(-1 * attemptedDelta, options));
	};
});

define('__backbone-ui-resizable/animations',['require','exports','module'],function (require, exports, module) {
	

	/**
	 *
	 *
	 * @private
	 * @param options
	 *
	 */
	function createAnimation(_options) {

		return function (attemptedDelta, options) {

			// [0] set up options
			options = options || {};

			// [1] delta should be in accordance to the positionDeltaMultiplier
			//     attemptedDelta should ALWAYS BE POSITIVE, as the action here is directional
			//     e.g. 'contractToE' assumes the direction will be -1,
			//     that is why we have the positionDeltaMultiplier
			//     using Math.abs assures no mistakes will happen.
			attemptedDelta = _options.positionDeltaMultiplier * Math.abs(attemptedDelta);


			// [1.2] delta > 0 = contraction
			//       delta < 0 = expansion
			var delta = this[_options.delta](attemptedDelta, options.force);


			// [4] get current position
			var start = parseFloat(this.model.get(_options.dimension));


			// [5] build animation object
			//     delta > 0 = contraction
			//     delta < 0 = expansion
			var animation = {};
			animation[_options.dimension] = start + _options.dimensionDeltaMultiplier * Math.abs(delta);


			// [6] set complete function
			//     to trigger resizestop
			var originalComplete = options.complete;
			options.complete = _.bind(function () {

				this.trigger('resizestop', this);

				if (originalComplete) {
					return originalComplete.apply(this.$el, arguments);
				}

			}, this);

			// [7] set new step function
			var originalStep = options.step;
			options.step = _.bind(function (now, tween) {

				var lastDelta = Math.abs(now - start);

				// 'this' refers to the resizable object
				this[_options.move](_options.positionDeltaMultiplier * lastDelta, { force: true });

				// change start
				start = now;


				if (originalStep) {
					return originalStep.apply(this.$el, arguments);
				}

			}, this);

			// [8] trigger resizestart
			this.trigger('resizestart', this);

			// [9] GO!
			this.$el.animate(animation, options);

			// return remainder
			return attemptedDelta - delta;
		}
	}


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
	 * @method aExpandToW
	 * @param attemptedDelta {+Number}
	 * @param options {Obejct}
	 *     options will be passed straight to handle.animateToLeft,
	 *     which will pass options on to event data
	 */
	exports.aExpandToW = createAnimation({
		delta: 'deltaW',
		move: 'moveW',
		dimension: 'width',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: 1,
	});



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
	 * @method aContractToE
	 * @param attemptedDelta {+Number}
	 */
	exports.aContractToE = createAnimation({
		delta: 'deltaW',
		move: 'moveW',
		dimension: 'width',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: -1
	});

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
	 * @method aExpandToE
	 * @param attemptedDelta {+Number}
	 */
	exports.aExpandToE = createAnimation({
		delta: 'deltaE',
		move: 'moveE',
		dimension: 'width',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: 1,
	});

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
	 * @method aContractToW
	 * @param attemptedDelta {+Number}
	 */
	exports.aContractToW = createAnimation({
		delta: 'deltaE',
		move: 'moveE',
		dimension: 'width',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: -1
	})

	/**
	 *
	 *  -------
	 *  |^^^^^|
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.aExpandToN = createAnimation({
		delta: 'deltaN',
		move: 'moveN',
		dimension: 'height',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: 1,
	});



	/**
	 *   vvvvv
	 *  -------
	 *  |     |
	 *  |     |
	 *  |     |
	 *  -------
	 *
	 */
	exports.aContractToS = createAnimation({
		delta: 'deltaN',
		move: 'moveN',
		dimension: 'height',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: -1,
	});

	/**
	 *
	 *  -------
	 *  |     |
	 *  |     |
	 *  |vvvvv|
	 *  -------
	 *
	 */
	exports.aExpandToS = createAnimation({
		delta: 'deltaS',
		move: 'moveS',
		dimension: 'height',
		positionDeltaMultiplier: 1,
		dimensionDeltaMultiplier: 1,
	});

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
	exports.aContractToN = createAnimation({
		delta: 'deltaS',
		move: 'moveS',
		dimension: 'height',
		positionDeltaMultiplier: -1,
		dimensionDeltaMultiplier: -1,
	})
});

define('__backbone-ui-resizable/enable-disable',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Sets up the enabling and disabling system.
	 *
	 * @method _initializeResizableEnableDisable
	 * @private
	 */
	exports._initializeResizableEnableDisable = function initializeResizableEnableDisable() {


		// listen to enable and disable option changes
		this.listenTo(this.modeld, 'change:resizableStatus', function (model) {

			if (this.resizableEnabled()) {
				// is enabled

				// [1] enable handles
				_.each(this.handles, function (handleObj, direction) {
					handleObj.enableHandle();
				}, this);

				// [2] set classes
				this.$el
					.removeClass(this.resizableClass + '-disabled')
					.addClass(this.resizableClass + '-enabled');
			} else {
				// is disabled

				// [1] disable handles
				_.each(this.handles, function (handleObj, direction) {
					handleObj.disableHandle();
				}, this);

				// [2] set classes
				this.$el
					.removeClass(this.resizableClass + '-enabled')
					.addClass(this.resizableClass + '-disabled');
			}

		});


	};

	/**
	 * Returns whether the resizable capabilities are enabled.
	 *
	 * @method resizableEnabled
	 */
	exports.resizableEnabled = function resizableEnabled() {
		return this.modeld.get('resizableStatus') === 'enabled';
	};

	/**
	 * Sets the resizableStatus to 'disabled'
	 *
	 * @method disableResizable
	 */
	exports.disableResizable = function disableResizable() {

		this.modeld.set('resizableStatus', 'disabled');

		return this;
	};

	/**
	 * Sets the resizableStatus to 'enabled'
	 *
	 * @method enableResizable
	 */
	exports.enableResizable = function enableResizable(options) {

		this.modeld.set('resizableStatus', 'enabled');
		return this;
	};

	/**
	 * Disables a single handle
	 *
	 * @method disableHandle
	 */
	exports.disableHandle = function disableHandle(direction) {
		var handleObj = this.handles[direction];

		if (handleObj) {
			handleObj.disableHandle();
		}

		return this;
	};

	/**
	 * Enables a single handle
	 *
	 * @method disableHandle
	 */
	exports.enableHandle = function enableHandle(direction, options) {
		var handleObj = this.handles[direction];

		if (handleObj) {
			handleObj.enableHandle();
		} else {
			this.handles[direction] = this.buildHandle(direction, options);
		}

		return this;
	};
});

define('__backbone-ui-resizable/build-handle',['require','exports','module','jquery','lodash'],function (require, exports, module) {
	

	var $ = require('jquery'),
		_ = require('lodash');


	/**
	 * Builds a SINGLE $el for a direction handle.
	 *
	 * @method buildHandle$El
	 * @private
	 */
	exports.buildHandle$El = function buildHandle$El(direction, options) {
		var clss = options.clss;

		var $handle = $('<div></div>');

		$handle
			.addClass(clss)
			.addClass(clss + '-' + direction);

		return $handle.appendTo(this.$el);
	}


	/**
	 * Builds a single handle and returns it.
	 * Takes care of creating the $el, if necessary.
	 *
	 * @method buildHandle
	 * @param direction {String}
	 * @param options {Object}
	 */
	exports.buildHandle = function buildHandle(direction, options) {

		options = options || {};

		_.defaults(options, this.handleOptions);

		var ratio = options.ratio,
			thickness = options.thickness;

		var builderOptions = _.extend({}, options, {
			el: this.buildHandle$El(direction, options),
			resizable: this,
			direction: direction,


			// ratio and thickness may be set for each
			// isolated handle.
			ratio: _.isObject(ratio) ? ratio[direction] : ratio,
			thickness: _.isObject(thickness) ? thickness[direction] : thickness
		});

		// [4] build the handle object
		var handleObj = this.handleBuilder[direction](builderOptions);


		return handleObj;
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

define('backbone-ui-resizable',['require','exports','module','lowercase-backbone','backbone-ui-draggable','jquery','lodash','./__backbone-ui-resizable/handle/index','./__backbone-ui-resizable/handle/helpers','./__backbone-ui-resizable/actions/e','./__backbone-ui-resizable/actions/w','./__backbone-ui-resizable/actions/s','./__backbone-ui-resizable/actions/n','./__backbone-ui-resizable/actions/index','./__backbone-ui-resizable/animations','./__backbone-ui-resizable/enable-disable','./__backbone-ui-resizable/build-handle'],function (require, exports, module) {
	

	var backbone = require('lowercase-backbone'),
		draggable = require('backbone-ui-draggable'),
		$ = require('jquery'),
		_ = require('lodash');


	// internal
	var handleBuilder = require('./__backbone-ui-resizable/handle/index'),
		helpers = require('./__backbone-ui-resizable/handle/helpers');


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

			this.initializeModelView(options);

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

			// disable the draggable
			if (!options.enableDraggable) {
				this.disableDraggable();
			}


			// set initial data
			var data = _.extend({
				minWidth: 2 * this.handleOptions.thickness,
				minHeight: 2 * this.handleOptions.thickness,

				width: this.$el.width(),
				height: this.$el.height(),

			}, this.$el.position(), options);

			this.modeld.set(data);



			/////////////
			// HANDLES //
			this.handleOptions = _.extend(this.handleOptions, _.pick(options, ['clss', 'ratio', 'thickness']));

			// get the options for the handle
			var directions = options.handles || this.handles;
			directions = _.isArray(directions) ? directions : directions.split(',');

			// build all handles
			// and overwrite defautl handles prop.
			this.handles = {};
			_.each(directions, function (direction) {

				// build the handle
				this.handles[direction] = this.buildHandle(direction, this.handleOptions);

			}, this);



			// set enabling system
			this._initializeResizableEnableDisable();
		},

		/**
		 * The builder that returns a handle object instance.
		 *
		 * @property handleBuilder
		 * @type Function
		 */
		handleBuilder: handleBuilder,

		handles: 'n,s,w,e,nw,ne,sw,se',

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
			clss: 'handle',
			ratio: 0.2,
			thickness: 30,
		},

		stringifiers: {
			height: helpers.stringifyPositionalValue,
			minHeight: helpers.stringifyPositionalValue,
			maxHeight: helpers.stringifyPositionalValue,

			width: helpers.stringifyPositionalValue,
			minWidth: helpers.stringifyPositionalValue,
			maxWidth: helpers.stringifyPositionalValue,

			left: helpers.stringifyPositionalValue,
			top: helpers.stringifyPositionalValue
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
	resizable
		.proto(require('./__backbone-ui-resizable/actions/e'))
		.proto(require('./__backbone-ui-resizable/actions/w'))
		.proto(require('./__backbone-ui-resizable/actions/s'))
		.proto(require('./__backbone-ui-resizable/actions/n'))
		.proto(require('./__backbone-ui-resizable/actions/index'));


	resizable
		.proto(require('./__backbone-ui-resizable/animations'));

	resizable
		.proto(require('./__backbone-ui-resizable/enable-disable'))
		.proto(require('./__backbone-ui-resizable/build-handle'));

});

