//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define("__backbone-ui-resizable/movement-data",["require","exports","module","subject","lodash"],function(e,t,i){var s=e("subject"),n=(e("lodash"),{left:"right",right:"left",top:"bottom",bottom:"top"}),o=i.exports=s(function(e,t){this.current=e||{},this.previous=t||{}});o.proto({data:function(){var e=this.axis(),t=this.delta("x"===e?"width":"height"),i=this.action(e),s=this.handle(e),n=this.direction(s,i);return{axis:e,delta:t,action:i,handle:s,direction:n}},delta:function(e){var t=this.previous[e]||0,i=this.current[e]||0;return i-t},axis:function(){return 0!==this.delta("width")?"x":0!==this.delta("height")?"y":!1},action:function(e){e=e||this.axis();var t="x"===e?"width":"height",i=this.delta(t);return i>0?"expand":0>i?"contract":!1},handle:function(e){return e=e||this.axis(),"x"===e?0!==this.delta("left")?"left":"right":0!==this.delta("top")?"top":"bottom"},direction:function(e,t){return e=e||this.handle(),t=t||this.action(),"expand"===t?e:n[e]}})}),define("__backbone-ui-resizable/handle-resize",["require","exports","module","./movement-data"],function(e,t,i){var s=e("./movement-data");i.exports=function(e,t){var i={top:t.position.top,left:t.position.left,bottom:t.position.top+t.size.height,right:t.position.left+t.size.width,width:t.size.width,height:t.size.height},n=this.model;this.model.set(i);var o=n.attributes,a=n.previousAttributes(),r=s(o,a);this.trigger("resize",this,r),n.trigger("resize",n,r),this.handleResize(e,t,r)}}),define("backbone-ui-resizable",["require","exports","module","jquery-ui-resizable","lowercase-backbone","model-dock","lodash","./__backbone-ui-resizable/handle-resize"],function(e,t,i){function s(e){return e+"px"}e("jquery-ui-resizable");var n=e("lowercase-backbone"),o=e("model-dock"),a=e("lodash"),r=e("./__backbone-ui-resizable/handle-resize"),h=i.exports=o.extend({initialize:function(){n.view.prototype.initialize.apply(this,arguments),this.initializeModelDock.apply(this,arguments),this.initializeResizableDock.apply(this,arguments)},initializeResizableDock:function(e){a.bindAll(this,"handleResize","handleResizeStart","handleResizeStop"),this.resizableOptions=a.assign(this.resizableOptions,e.resizableOptions),this.$el.resizable(this.resizableOptions).on("resize",a.bind(r,this)).on("resizestart",this.handleResizeStart).on("resizestop",this.handleResizeStop)}});h.proto({resizableOptions:{handles:"n,ne,e,se,s,sw,w,nw"},stringifiers:{height:s,width:s,left:s,top:s},map:{top:"->css:top",left:"->css:left",width:"->css:width",height:"->css:height"},handleResize:function(){},handleResizeStart:function(){},handleResizeStop:function(){}})});