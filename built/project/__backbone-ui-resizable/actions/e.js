define(["require","exports","module","lodash","no","../helpers"],function(e,t,n){var r=e("lodash"),i=e("no"),s=e("../helpers");t.deltaE=function(t,n){if(n)return t;var r=this.model,o=r.get("width"),u=r.get("minWidth"),a=r.get("maxWidth"),f=i(r.get("left")).add(o).value(),l=r.get("minRight"),c=r.get("maxRight"),h=s.max(i(u).subtract(o).value(),i(l).subtract(f).value()),p=s.min(i(a).subtract(o).value(),i(c).subtract(f).value());return s.fitValueWithin(t,h,p)},t.moveE=function(t,n){n=n||{};var s=this.model,o=this.deltaE(t,n.force);s.set("width",i(s.get("width")).add(o).value());if(!n.silent&&o!==0){var u=r.assign({axis:"x",delta:-1*o,action:o>0?"expand":"contract",handle:"e"},n);this.trigger("resize",this,u).trigger("resize-x",this,u)}return t-o}});