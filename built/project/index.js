//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define(["require","exports","module","jquery-ui-resizable","lowercase-backbone","model-dock","lodash","./__backbone-ui-resizable/initialize-model","./__backbone-ui-resizable/handle-resize","./__backbone-ui-resizable/actions/move/index","./__backbone-ui-resizable/actions/resize/index"],function(e,t,n){function f(e){return a.test(e)?e+"px":e}e("jquery-ui-resizable");var r=e("lowercase-backbone"),i=e("model-dock"),s=e("lodash"),o=e("./__backbone-ui-resizable/initialize-model"),u=["alsoResize","animate","animateDuration","animateEasing","aspectRatio","autoHide","cancel","containment","delay","disabled","distance","ghost","grid","handles","helper","maxHeight","maxWidth","minHeight","minWidth"],a=/^[0-9]+$/,l=n.exports=i.extend({initialize:function(t){r.view.prototype.initialize.apply(this,arguments),this.initializeModelDock.apply(this,arguments),this.initializeUIResizable.apply(this,arguments)},initializeUIResizable:function(t){s.bindAll(this,"handleElResize","handleElResizeStart","handleElResizeStop","rebuildResizableEl"),this.resizableOptions=s.defaults(s.pick(t,u),this.resizableOptions),this.$el.resizable(this.resizableOptions).on("resize",this.handleElResize).on("resizestart",this.handleElResizeStart).on("resizestop",this.handleElResizeStop),o.apply(this,arguments)},rebuildResizableEl:function(){this.$el.resizable("destroy").resizable(this.model.attributes)},handleElResize:e("./__backbone-ui-resizable/handle-resize"),handleElResizeStart:function(e,t){this.trigger("resizestart",this)},handleElResizeStop:function(e,t){this.trigger("resizestop",this)},resizableOptions:{handles:"n,ne,e,se,s,sw,w,nw"},rebuildOnChange:["handles","maxHeight","maxWidth","minHeight","minWidth"],stringifiers:{height:f,minHeight:f,maxHeight:f,width:f,minWidth:f,maxWidth:f,left:f,top:f},map:{top:"->css:top",left:"->css:left",width:"->css:width",minWidth:"->css:min-width",maxWidth:"->css:max-width",height:"->css:height",minHeight:"->css:min-height",maxHeight:"->css:max-height"}});l.proto(e("./__backbone-ui-resizable/actions/move/index")).proto(e("./__backbone-ui-resizable/actions/resize/index"))});