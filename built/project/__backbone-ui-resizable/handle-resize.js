define(["require","exports","module","./movement-data"],function(e,t,n){var r=e("./movement-data");n.exports=function(t,n){var i={top:n.position.top,left:n.position.left,bottom:n.position.top+n.size.height,right:n.position.left+n.size.width,width:n.size.width,height:n.size.height};this.set(i);var s=this.model.attributes,o=this.model.previousAttributes(),u=r(s,o);this.trigger("resize",this,t,n,u),this.handleResize(t,n,u)}});