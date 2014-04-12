//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define(["require","exports","module","lowercase-backbone","backbone-ui-draggable","jquery","lodash","./__backbone-ui-resizable/build-handles","./__backbone-ui-resizable/handle/index"],function(e,t,n){function l(e){return f.test(e)?e+"px":e}var r=e("lowercase-backbone"),i=e("backbone-ui-draggable"),s=e("jquery"),o=e("lodash"),u=e("./__backbone-ui-resizable/build-handles"),a=e("./__backbone-ui-resizable/handle/index"),f=/^[0-9]+$/,c=n.exports=i.extend({initialize:function(t){r.view.prototype.initialize.call(this,t),this.initializeModelDock(t),this.initializeUIDraggable(t),this.initializeUIResizable(t)},initializeUIResizable:function(t){this.$canvas=t.canvas||this.canvas||s(window);var n=o.extend({minWidth:2*this.handleOptions.thickness,minHeight:2*this.handleOptions.thickness,width:this.$el.width(),height:this.$el.height()},this.$el.position(),t);this.model.set(n);var r=o.defaults(o.pick(t,["directions","clss","ratio","thickness"]),this.handleOptions);u.call(this,r)},handleBuilder:a,handleOptions:{directions:"n,s,w,e,nw,ne,sw,se",clss:"handle",ratio:.2,thickness:30},stringifiers:{height:l,minHeight:l,maxHeight:l,width:l,minWidth:l,maxWidth:l,left:l,top:l},map:{top:"->css:top",left:"->css:left",width:"->css:width",minWidth:"->css:min-width",maxWidth:"->css:max-width",height:"->css:height",minHeight:"->css:min-height",maxHeight:"->css:max-height"}})});