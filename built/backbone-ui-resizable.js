//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define("__backbone-ui-resizable/movement-data",["require","exports","module","subject","lodash"],function(e,t,i){var s=e("subject"),n=(e("lodash"),{left:"right",right:"left",top:"bottom",bottom:"top"}),o=i.exports=s(function(e,t){this.current=e||{},this.previous=t||{}});o.proto({data:function(){var e=this.axis(),t=this.action(e),i=this.handle(e),s=this.direction(i,t);return{axis:e,action:t,handle:i,direction:s}},delta:function(e){var t=this.previous[e]||0,i=this.current[e]||0;return i-t},axis:function(){return 0!==this.delta("width")?"x":0!==this.delta("height")?"y":!1},action:function(e){e=e||this.axis();var t="x"===e?"width":"height",i=this.delta(t);return i>0?"expand":0>i?"contract":!1},handle:function(e){return e=e||this.axis(),"x"===e?0!==this.delta("left")?"left":"right":0!==this.delta("top")?"top":"bottom"},direction:function(e,t){return e=e||this.handle(),t=t||this.action(),"expand"===t?e:n[e]}})}),define("__backbone-ui-resizable/handle-resize",["require","exports","module","./movement-data"],function(e,t,i){var s=e("./movement-data");i.exports=function(e,t){var i={top:t.position.top,left:t.position.left,bottom:t.position.top+t.size.height,right:t.position.left+t.size.width,width:t.size.width,height:t.size.height},n=this.model;this.model.set(i);var o=n.attributes,r=n.previousAttributes(),a=s(o,r);this.trigger("resize",n,a),n.trigger("resize",n,a),this.handleResize(e,t,a)}}),define("backbone-ui-resizable",["require","exports","module","jquery-ui-resizable","model-dock","lodash","./__backbone-ui-resizable/handle-resize"],function(e,t,i){function s(e){return e+"px"}e("jquery-ui-resizable");var n=e("model-dock"),o=e("lodash"),r=e("./__backbone-ui-resizable/handle-resize"),a=i.exports=n.extend(function(e){n.prototype.initialize.apply(this,arguments),o.bindAll(this,"handleResize","handleResizeStart","handleResizeStop"),this.resizableOptions=o.assign(this.resizableOptions,e.resizableOptions),this.$el.resizable(this.resizableOptions).on("resize",o.bind(r,this)).on("resizestart",this.handleResizeStart).on("resizestop",this.handleResizeStop)});a.proto({resizableOptions:{handles:"n,ne,e,se,s,sw,w,nw"},stringifiers:{height:s,width:s,left:s,top:s},map:{top:"->css:top",left:"->css:left",width:"->css:width",height:"->css:height"},handleResize:function(){},handleResizeStart:function(){},handleResizeStop:function(){}})});