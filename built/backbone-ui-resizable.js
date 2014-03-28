//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define("__backbone-ui-resizable/movement-data",["require","exports","module","subject","lodash"],function(e,i,t){var s=e("subject"),n=(e("lodash"),{left:"right",right:"left",top:"bottom",bottom:"top"}),o=t.exports=s(function(e,i){this.current=e||{},this.previous=i||{}});o.proto({data:function(){var e=this.axis(),i=this.action(e),t=this.handle(e),s=this.direction(t,i);return{axis:e,action:i,handle:t,direction:s}},delta:function(e){var i=this.previous[e]||0,t=this.current[e]||0;return t-i},axis:function(){return 0!==this.delta("width")?"x":0!==this.delta("height")?"y":!1},action:function(e){e=e||this.axis();var i="x"===e?"width":"height",t=this.delta(i);return t>0?"expand":0>t?"contract":!1},handle:function(e){return e=e||this.axis(),"x"===e?0!==this.delta("left")?"left":"right":0!==this.delta("top")?"top":"bottom"},direction:function(e,i){return e=e||this.handle(),i=i||this.action(),"expand"===i?e:n[e]}})}),define("__backbone-ui-resizable/handle-resize",["require","exports","module","./movement-data"],function(e,i,t){var s=e("./movement-data");t.exports=function(e,i){var t={top:i.position.top,left:i.position.left,bottom:i.position.top+i.size.height,right:i.position.left+i.size.width,width:i.size.width,height:i.size.height},n=this.model;this.model.set(t);var o=n.attributes,a=n.previousAttributes(),r=s(o,a);this.trigger("resize",n,r),n.trigger("resize",n,r),this.handleResize(e,i,r)}}),define("backbone-ui-resizable",["require","exports","module","jquery-ui-resizable","lowercase-backbone","model-dock","lodash","./__backbone-ui-resizable/handle-resize"],function(e,i,t){function s(e){return e+"px"}e("jquery-ui-resizable");var n=e("lowercase-backbone"),o=e("model-dock"),a=e("lodash"),r=e("./__backbone-ui-resizable/handle-resize"),h=t.exports=o.extend({initialize:function(){n.view.prototype.initialize.apply(this,arguments),this.initializeModelDock.apply(this,arguments),this.initializeResizableDock.apply(this,arguments)},initializeResizableDock:function(e){o.prototype.initialize.apply(this,arguments),a.bindAll(this,"handleResize","handleResizeStart","handleResizeStop"),this.resizableOptions=a.assign(this.resizableOptions,e.resizableOptions),this.$el.resizable(this.resizableOptions).on("resize",a.bind(r,this)).on("resizestart",this.handleResizeStart).on("resizestop",this.handleResizeStop)}});h.proto({resizableOptions:{handles:"n,ne,e,se,s,sw,w,nw"},stringifiers:{height:s,width:s,left:s,top:s},map:{top:"->css:top",left:"->css:left",width:"->css:width",height:"->css:height"},handleResize:function(){},handleResizeStart:function(){},handleResizeStop:function(){}})});