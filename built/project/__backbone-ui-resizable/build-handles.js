define(["require","exports","module","jquery","lodash"],function(e,t,n){function s(e,t){var n=t.clss,i=r("<div></div>");return i.addClass(n).addClass(n+"-"+e),i.insertAfter(this.$el)}function o(e,t){if(i.isArray(e)){var n=i.map(e,function(e){return s.call(this,e,t)},this);return i.zipObject(e,n)}if(i.isObject(e))return i.mapValues(e,function(e,n){return e=i.isObject(e)?e:this.$el.find(e),e.length!==0?e:s.call(this,n,t)},this);if(i.isString(e))return e=e.replace(" ",""),e=e.split(","),o.call(this,e,t)}function u(e,t){return i.mapValues(e,function(e,n){return this.handleBuilder(i.extend({},t,{el:e,direction:n,resizable:this,thickness:i.isNumber(t.thickness)?t.thickness:t.thickness[n],ratio:i.isNumber(t.ratio)?t.ratio:t.ratio[n],canvas:this.$canvas}))},this)}var r=e("jquery"),i=e("lodash");n.exports=function(t){var n=t.directions,r=o.call(this,t.directions,t);this.handles=u.call(this,r,t)}});