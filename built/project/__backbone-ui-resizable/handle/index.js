define(["require","exports","module","./base"],function(e,t,n){function i(e,t){var n=this.resizable.moveN(e,t);return 0}function s(e,t){var n=this.resizable.moveS(e,t);return e-n}function o(e,t){var n=this.resizable.moveW(e,t);return 0}function u(e,t){var n=this.resizable.moveE(e,t);return e-n}var r=e("./base"),a={beforeMoveY:i},f={beforeMoveY:s},l={beforeMoveX:o},c={beforeMoveX:u};t.n=r.extend(a),t.s=r.extend(f),t.w=r.extend(l),t.e=r.extend(c),t.nw=r.extend(a).extend(l),t.ne=r.extend(a).extend(c),t.sw=r.extend(f).extend(l),t.se=r.extend(f).extend(c)});