//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define("__backbone-ui-resizable/build-handles",["require","exports","module","jquery","lodash"],function(t,i,e){function s(t,i){var e=i.clss,s=h("<div></div>");return s.addClass(e).addClass(e+"-"+t),s.insertAfter(this.$el)}function n(t,i){if(o.isArray(t)){var e=o.map(t,function(t){return s.call(this,t,i)},this);return o.zipObject(t,e)}return o.isObject(t)?o.mapValues(t,function(t,e){return t=o.isObject(t)?t:this.$el.find(t),0!==t.length?t:s.call(this,e,i)},this):o.isString(t)?(t=t.replace(" ",""),t=t.split(","),n.call(this,t,i)):void 0}function a(t,i){return o.mapValues(t,function(t,e){return this.handleBuilder(o.extend({},i,{el:t,direction:e,resizable:this,thickness:o.isNumber(i.thickness)?i.thickness:i.thickness[e],ratio:o.isNumber(i.ratio)?i.ratio:i.ratio[e],canvas:this.$canvas}))},this)}var h=t("jquery"),o=t("lodash");e.exports=function(t){var i=(t.directions,n.call(this,t.directions,t));this.handles=a.call(this,i,t)}}),define("__backbone-ui-resizable/handle/helpers",["require","exports","module","lodash"],function(t,i){var e=t("lodash");i.min=function(t,i){return isNaN(t)?i:isNaN(i)?t:i>t?t:i},i.max=function(t,i){return isNaN(t)?i:isNaN(i)?t:t>i?t:i},i.numberify=function(t){var i=parseInt(t,10);if(isNaN(i))throw new Error(t+" not number");return i},i.numberifyProperties=function(t,i){var s={};return e.each(t,function(t){s[t]=parseInt(i[t],10)}),s}}),define("__backbone-ui-resizable/handle/update",["require","exports","module","./helpers","no"],function(t,i){function e(t){var i=r(this.resizable.model.get("top")).add(t);this.model.set("top",i.value())}function s(t){var i=r(this.resizable.model.get("top"));i.add(this.resizable.model.get("height")).add(t),this.model.set("top",i.value())}function n(t){var i=r(this.resizable.model.get("left"));this.model.set("left",i.add(t).value())}function a(t){var i=r(this.resizable.model.get("left"));i.add(this.resizable.model.get("width")).add(t),this.model.set("left",i.value())}function h(){this.model.set("width",r(this.resizable.model.get("width")).value())}function o(){this.model.set("height",r(this.resizable.model.get("height")).value())}var r=(t("./helpers"),t("no"));i.n=function(){e.call(this,-1*this.outer),n.call(this,0),h.call(this)},i.s=function(){s.call(this,-1*this.inner),n.call(this,0),h.call(this)},i.w=function(){n.call(this,-1*this.outer),e.call(this,0),o.call(this)},i.e=function(){a.call(this,-1*this.inner),e.call(this,0),o.call(this)},i.nw=function(){e.call(this,-1*this.outer),n.call(this,-1*this.outer)},i.ne=function(){e.call(this,-1*this.outer),a.call(this,-1*this.inner)},i.sw=function(){s.call(this,-1*this.inner),n.call(this,-1*this.outer)},i.se=function(){s.call(this,-1*this.inner),a.call(this,-1*this.inner)}}),define("__backbone-ui-resizable/handle/track",["require","exports","module","lodash","./helpers"],function(t,i){var e=t("lodash"),s=t("./helpers");i.all=function(){var t=this.resizable;t.listenTo(this,"movestart",function(){this.trigger("resizestart",t)}),t.listenTo(this,"movestop",function(){this.trigger("resizestop",t)}),this.listenTo(t.model,"change",this.update)},i.n=function(){var t=this.resizable,i=this.direction;t.listenTo(this,"move-y",function(t,n){var a=this.model,h=s.numberify(n.delta),o=s.numberify(a.get("height")),r=s.numberify(a.get("top"));if(a.set({height:o-h,top:r+h}),!n.silent){var l=h>0?"contract":"expand";n=e.assign({action:l,handle:i},n),this.trigger("resize",this,n).trigger("resize-y",this,n).trigger(l,this,n).trigger(l+"y",this,n)}},t)},i.s=function(){var t=this.resizable,i=this.direction;t.listenTo(this,"move-y",function(t,n){var a=this.model,h=s.numberify(a.get("height"))+s.numberify(n.delta);if(a.set("height",h),!n.silent){var o=n.delta>0?"expand":"contract";n=e.assign({action:o,handle:i},n),this.trigger("resize",this,n).trigger("resize-y",this,n).trigger(o,this,n).trigger(o+"y",this,n)}},t)},i.w=function(){var t=this.resizable,i=this.direction;t.listenTo(this,"move-x",function(t,n){var a=this.model,h=s.numberify(n.delta),o=s.numberify(a.get("width")),r=s.numberify(a.get("left"));if(a.set({width:o-h,left:r+h}),!n.silent){var l=h>0?"contract":"expand";n=e.assign({action:l,handle:i},n),this.trigger("resize",this,n).trigger("resize-x",this,n).trigger(l,this,n).trigger(l+"x",this,n)}},t)},i.e=function(){var t=this.resizable,i=this.direction;t.listenTo(this,"move-x",function(t,n){var a=this.model,h=s.numberify(a.get("width"))+s.numberify(n.delta);if(a.set("width",h),!n.silent){var o=n.delta>0?"expand":"contract";n=e.assign({action:o,handle:i},n),this.trigger("resize",this,n).trigger("resize-x",this,n).trigger(o,this,n).trigger(o+"x",this,n)}},t)}}),define("__backbone-ui-resizable/handle/min-max",["require","exports","module","no","./helpers"],function(t,i){var e=t("no"),s=t("./helpers");i.n=function(){var t=this.resizable.model,i=t.get("height"),n=t.get("minHeight"),a=t.get("maxHeight"),h=a-i,o=i-n,r=t.get("minTop")||0,l=t.get("maxTop"),c=this.model.get("top");this.model.set({minTop:s.max(e(c).subtract(h).subtract(this.outer).value(),e(r).subtract(this.outer).value()),maxTop:s.min(e(c).add(o).subtract(this.outer).value(),e(l).subtract(this.outer).value())})},i.s=function(){var t=this.resizable.model,i=t.get("height"),n=t.get("minHeight"),a=t.get("maxHeight"),h=i-n,o=a-i,r=t.get("minBottom"),l=t.get("maxBottom"),c=this.model.get("top");this.model.set({minBottom:s.max(e(c).subtract(h).add(this.thickness).value(),e(r).add(this.outer).value()),maxBottom:s.min(e(c).add(o).add(this.thickness).value(),e(l).add(this.outer).value())}),console.log(this.model.get("maxBottom"))},i.w=function(){var t=this.resizable.model,i=t.get("width"),n=t.get("minWidth"),a=t.get("maxWidth"),h=a-i,o=i-n,r=t.get("minLeft")||0,l=t.get("maxLeft"),c=this.model.get("left");this.model.set({minLeft:s.max(e(c).subtract(h).subtract(this.outer).value(),e(r).subtract(this.outer).value()),maxLeft:s.min(e(c).add(o).subtract(this.outer).value(),e(l).subtract(this.outer).value())})},i.e=function(){var t=this.resizable.model,i=t.get("width"),n=t.get("minWidth"),a=t.get("maxWidth"),h=i-n,o=a-i,r=t.get("minRight"),l=t.get("maxRight"),c=this.model.get("left");this.model.set({minRight:s.max(e(c).subtract(h).add(this.thickness).value(),e(r).add(this.outer).value()),maxRight:s.min(e(c).add(this.thickness).add(o).value(),e(l).add(this.outer).value())})}}),define("__backbone-ui-resizable/handle/index",["require","exports","module","jquery-ui","backbone-ui-draggable","lodash","./update","./track","./min-max"],function(t,i,e){t("jquery-ui");{var s=t("backbone-ui-draggable"),n=t("lodash"),a=t("./update"),h=t("./track"),o=t("./min-max"),r={n:"left top",s:"left bottom",w:"left top",e:"right top",nw:"left top",ne:"right top",sw:"left bottom",se:"right bottom"},l={n:"y",s:"y",w:"x",e:"x",nw:"xy",ne:"xy",sw:"xy",se:"xy"};e.exports=s.extend({initialize:function(t){s.prototype.initialize.call(this,t),this.initializeResizableHandle(t)},initializeResizableHandle:function(t){this.resizable=t.resizable,this.direction=t.direction,this.axis=l[this.direction],this.thickness=t.thickness,this.setStyles(),this.ratio=t.ratio,this.outer=t.thickness*this.ratio,this.inner=t.thickness-this.outer,this.update=n.throttle(n.bind(a[this.direction],this),20),this.initializePosition(t),this.track(),this.on("movestart",this.calcMinMax)},setStyles:function(){var t,i=this.axis;i.length>1?t={zIndex:100,width:this.thickness,height:this.thickness}:"x"===i?t={zIndex:99,width:this.thickness,height:this.resizable.model.get("width")}:"y"===i&&(t={zIndex:99,width:this.resizable.model.get("height"),height:this.thickness}),this.$el.css(t)},initializePosition:function(){var t=this.$el;t.position({my:"center center",at:r[this.direction],of:this.resizable.$el}),this.model.set(t.position()),this.update()},track:function(){n.each(this.direction,function(t){h[t].call(this)},this),h.all.call(this)},calcMinMax:function(){n.each(this.direction,function(t){o[t].call(this)},this)},map:n.extend(s.prototype.map,{height:"->css:height",width:"->css:width"})})}}),define("__backbone-ui-resizable/actions",["require","exports","module"],function(t,i){i.expandToLeft=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.w;return e.calcMinMax(),e.moveToLeft(t,i)},i.expandToRight=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.e;return e.calcMinMax(),e.moveToRight(t,i)},i.expandToTop=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.n;return e.calcMinMax(),e.moveToTop(t,i)},i.expandToBottom=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.s;return e.calcMinMax(),e.moveToBottom(t,i)},i.contractToRight=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.w;return e.calcMinMax(),e.moveToRight(t,i)},i.contractToLeft=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.e;return e.calcMinMax(),e.moveToLeft(t,i)},i.contractToBottom=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.n;return e.calcMinMax(),e.moveToBottom(t,i)},i.contractToTop=function(t,i){i=i||{},i.agent=i.agent||"code";var e=this.handles.s;return e.calcMinMax(),e.moveToTop(t,i)}}),define("backbone-ui-resizable",["require","exports","module","lowercase-backbone","backbone-ui-draggable","jquery","lodash","./__backbone-ui-resizable/build-handles","./__backbone-ui-resizable/handle/index","./__backbone-ui-resizable/actions"],function(t,i,e){function s(t){return c.test(t)?t+"px":t}var n=t("lowercase-backbone"),a=t("backbone-ui-draggable"),h=t("jquery"),o=t("lodash"),r=t("./__backbone-ui-resizable/build-handles"),l=t("./__backbone-ui-resizable/handle/index"),c=/^[0-9]+$/,d=e.exports=a.extend({initialize:function(t){n.view.prototype.initialize.call(this,t),this.initializeModelDock(t),this.initializeUIDraggable(t),this.initializeUIResizable(t)},initializeUIResizable:function(t){this.$canvas=t.canvas||this.canvas||h(window);var i=o.extend({minWidth:2*this.handleOptions.thickness,minHeight:2*this.handleOptions.thickness,width:this.$el.width(),height:this.$el.height()},this.$el.position(),t);this.model.set(i);var e=o.defaults(o.pick(t,["directions","clss","ratio","thickness"]),this.handleOptions);r.call(this,e)},handleBuilder:l,handleOptions:{directions:"n,s,w,e,nw,ne,sw,se",clss:"handle",ratio:.2,thickness:30},stringifiers:{height:s,minHeight:s,maxHeight:s,width:s,minWidth:s,maxWidth:s,left:s,top:s},map:{top:"->css:top",left:"->css:left",width:"->css:width",minWidth:"->css:min-width",maxWidth:"->css:max-width",height:"->css:height",minHeight:"->css:min-height",maxHeight:"->css:max-height"}});d.proto(t("./__backbone-ui-resizable/actions"))});