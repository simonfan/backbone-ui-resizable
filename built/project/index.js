//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define(["require","exports","module","jquery-ui-resizable","lowercase-backbone","model-dock","lodash","./__backbone-ui-resizable/handle-resize"],function(e,t,n){function a(e){return e+"px"}e("jquery-ui-resizable");var r=e("lowercase-backbone"),i=e("model-dock"),s=e("lodash"),o=e("./__backbone-ui-resizable/handle-resize"),u=n.exports=i.extend({initialize:function(t){r.view.prototype.initialize.apply(this,arguments),this.initializeModelDock.apply(this,arguments),this.initializeResizableDock.apply(this,arguments)},initializeResizableDock:function(t){s.bindAll(this,"handleResize","handleResizeStart","handleResizeStop"),this.resizableOptions=s.assign(this.resizableOptions,t.resizableOptions),this.$el.resizable(this.resizableOptions).on("resize",s.bind(o,this)).on("resizestart",this.handleResizeStart).on("resizestop",this.handleResizeStop)}});u.proto({resizableOptions:{handles:"n,ne,e,se,s,sw,w,nw"},stringifiers:{height:a,width:a,left:a,top:a},map:{top:"->css:top",left:"->css:left",width:"->css:width",height:"->css:height"},handleResize:function(e,t,n){},handleResizeStart:function(e,t){},handleResizeStop:function(e,t){}})});