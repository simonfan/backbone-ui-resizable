define(["require","exports","module","./helpers"],function(e,t,n){var r=e("./helpers");t.n=function(){var t=this.resizable.model,n=t.get("height"),i=t.get("minHeight"),s=t.get("maxHeight"),o=s-n,u=n-i,a=t.get("minTop")||0,f=t.get("maxTop"),l=this.model.get("top");this.model.set({minTop:r.max(l-o,a)-this.outer,maxTop:r.min(l+u,f)-this.outer})},t.s=function(){var t=this.resizable.model,n=t.get("height"),i=t.get("minHeight"),s=t.get("maxHeight"),o=n-i,u=s-n,a=t.get("minBottom"),f=t.get("maxBottom"),l=this.model.get("top");this.model.set({minTop:r.max(l-o,a+this.outer),maxTop:r.min(l+u,f-this.inner)})},t.w=function(){var t=this.resizable.model,n=t.get("width"),i=t.get("minWidth"),s=t.get("maxWidth"),o=s-n,u=n-i,a=t.get("minLeft")||0,f=t.get("maxLeft"),l=this.model.get("left");this.model.set({minLeft:r.max(l-o,a)-this.outer,maxLeft:r.min(l+u,f)-this.outer})},t.e=function(){var t=this.resizable.model,n=t.get("width"),i=t.get("minWidth"),s=t.get("maxWidth"),o=n-i,u=s-n,a=t.get("minRight"),f=t.get("maxRight"),l=this.model.get("left");this.model.set({minLeft:r.max(l-o,a+this.outer),maxLeft:r.min(l+u,f-this.inner)})}});