define(["require","exports","module","lodash","no","../helpers"],function(e,t,n){var r=e("lodash"),i=e("no"),s=e("../helpers");t.deltaN=function(t,n){if(n)return t;var r=this.model,o=r.get("height"),u=r.get("minHeight"),a=r.get("maxHeight"),f=r.get("top"),l=r.get("minTop"),c=r.get("maxTop"),h=s.max(i(o).subtract(a).value(),i(l).subtract(f).value()),p=s.min(i(o).subtract(u).value(),i(c).subtract(f).value());return s.fitValueWithin(t,h,p)},t.moveN=function(t,n){n=n||{};var s=this.model,o=this.deltaN(t,n.force);s.set({top:s.get("top")+o,height:i(s.get("height")).subtract(o).value()});if(!n.silent&&o!==0){var u=r.assign({axis:"x",delta:-1*o,action:o>0?"contract":"expand",handle:"n"},n);this.trigger("resize",this,u).trigger("resize-y",this,u)}return t-o}});