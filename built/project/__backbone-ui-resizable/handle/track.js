define(["require","exports","module"],function(e,t,n){t.all=function(){this.listenTo(this.resizable.model,"change",this.update)},t.n=function(){var t=this.resizable.model;this.resizable.listenTo(this,"move-y",function(e,n){var r=t.get("height"),i=t.get("top");t.set({height:r-n,top:i+n})},this)},t.s=function(){var t=this.resizable.model;this.resizable.listenTo(this,"move-y",function(e,n){t.set("height",t.get("height")+n)})},t.w=function(){var t=this.resizable.model;this.resizable.listenTo(this,"move-x",function(e,n){var r=t.get("width"),i=t.get("left");t.set({width:r-n,left:i+n})})},t.e=function(){var t=this.resizable.model;this.resizable.listenTo(this,"move-x",function(e,n){t.set("width",t.get("width")+n)})}});