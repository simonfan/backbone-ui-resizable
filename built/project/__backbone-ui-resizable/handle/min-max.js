define(["require","exports","module","no","./helpers"],function(e,t,n){var r=e("no"),i=e("./helpers");t.n=function(){var t=this.resizable.model,n=t.get("height"),s=t.get("minHeight"),o=t.get("maxHeight"),u=o-n,a=n-s,f=t.get("minTop")||0,l=t.get("maxTop"),c=this.model.get("top");this.model.set({minTop:i.max(r(c).subtract(u).subtract(this.outer).value(),r(f).subtract(this.outer).value()),maxTop:i.min(r(c).add(a).subtract(this.outer).value(),r(l).subtract(this.outer).value())})},t.s=function(){var t=this.resizable.model,n=t.get("height"),s=t.get("minHeight"),o=t.get("maxHeight"),u=n-s,a=o-n,f=t.get("minBottom"),l=t.get("maxBottom"),c=this.model.get("top");this.model.set({minBottom:i.max(r(c).subtract(u).add(this.thickness).value(),r(f).add(this.outer).value()),maxBottom:i.min(r(c).add(a).add(this.thickness).value(),r(l).add(this.outer).value())}),console.log(this.model.get("maxBottom"))},t.w=function(){var t=this.resizable.model,n=t.get("width"),s=t.get("minWidth"),o=t.get("maxWidth"),u=o-n,a=n-s,f=t.get("minLeft")||0,l=t.get("maxLeft"),c=this.model.get("left");this.model.set({minLeft:i.max(r(c).subtract(u).subtract(this.outer).value(),r(f).subtract(this.outer).value()),maxLeft:i.min(r(c).add(a).subtract(this.outer).value(),r(l).subtract(this.outer).value())})},t.e=function(){var t=this.resizable.model,n=t.get("width"),s=t.get("minWidth"),o=t.get("maxWidth"),u=n-s,a=o-n,f=t.get("minRight"),l=t.get("maxRight"),c=this.model.get("left");this.model.set({minRight:i.max(r(c).subtract(u).add(this.thickness).value(),r(f).add(this.outer).value()),maxRight:i.min(r(c).add(this.thickness).add(a).value(),r(l).add(this.outer).value())})}});