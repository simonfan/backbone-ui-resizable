define(["require","exports","module","lodash","./movement-data"],function(e,t,n){function s(e,t,n){var i=e;return r.isNumber(t)&&(i=i>t?i:t),r.isNumber(n)&&(i=i<n?i:n),i}var r=e("lodash"),i=e("./movement-data");n.exports=function(t){var n=this.model;if(r.isNumber(t.width)){var o=n.get("minWidth"),u=n.get("maxWidth");t.width=s(t.width,o,u)}if(r.isNumber(t.height)){var a=n.get("minHeight"),f=n.get("maxHeight");t.height=s(t.height,a,f)}n.set(t);var l=n.toJSON(),c=n.previousAttributes(),h=i(l,c);return this.trigger("resize",this,h),n.trigger("resize",n,h),this}});