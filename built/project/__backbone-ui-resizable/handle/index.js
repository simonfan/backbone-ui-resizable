define(["require","exports","module","backbone-ui-draggable","./update","./track","./min-max"],function(e,t,n){var r=e("backbone-ui-draggable"),i=e("./update"),s=e("./track"),o=e("./min-max"),u={n:"left top",s:"left bottom",w:"left top",e:"right top",nw:"left top",ne:"right top",sw:"left bottom",se:"right bottom"},a={n:"y",s:"y",w:"x",e:"x",nw:"xy",ne:"xy",sw:"xy",se:"xy"},f=n.exports=r.extend({initialize:function(e){r.prototype.initialize.call(this,e),this.initializeResizableHandle(e)},initializeResizableHandle:function(t){this.resizable=t.resizable,this.direction=t.direction,this.axis=a[this.direction],this.thickness=t.thickness,this.setStyles(),this.hook=this.thickness*t.hook,this.update=_.throttle(_.bind(i[this.direction],this),20),this.initializePosition(t),this.track(),this.on("movestart",this.calcMinMax)},setStyles:function(){var t=this.axis;if(t.length>1)var n={zIndex:100,width:this.thickness,height:this.thickness};else if(t==="x")var n={zIndex:99,width:this.thickness,height:this.resizable.model.get("width")};else if(t==="y")var n={zIndex:99,width:this.resizable.model.get("height"),height:this.thickness};this.$el.css(n)},calcCenter:function(t){this.center={x:this.$el.width()*t,y:this.$el.height()*t}},initializePosition:function(t){var n=this.$el;n.position({my:"center center",at:u[this.direction],of:this.resizable.$el}),this.model.set(n.position()),this.update()},track:function(){_.each(this.direction,function(e){s[e].call(this)},this),s.all.call(this)},calcMinMax:function(){_.each(this.direction,function(e){o[e].call(this)},this)},map:_.extend(r.prototype.map,{height:"->css:height",width:"->css:width"})})});