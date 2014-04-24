//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

define("__backbone-ui-resizable/handle/helpers",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.min=function(e,i){return isNaN(e)?i:isNaN(i)?e:i>e?e:i},i.max=function(e,i){return isNaN(e)?i:isNaN(i)?e:e>i?e:i},i.numberify=function(e){var i=parseFloat(e);if(isNaN(i))throw new Error(e+" not number");return i},i.numberifyProperties=function(e,i){var a={};return t.each(e,function(e){a[e]=parseFloat(i[e])}),a},i.fitValueWithin=function(e,i,t){return isNaN(i)||(e=e>i?e:i),isNaN(t)||(e=t>e?e:t),e};var a=/^-?\d*(\.\d+)?$/;i.stringifyPositionalValue=function(e){return a.test(e)?e+"px":e}}),define("__backbone-ui-resizable/handle/update-position",["require","exports","module","./helpers","no"],function(e,i){function t(){this.model.set("top",-1*this.outer)}function a(){var e=r(this.resizable.model.get("height")).subtract(this.inner);this.model.set("top",e.value())}function n(){this.model.set("left",-1*this.outer)}function s(){var e=r(this.resizable.model.get("width")).subtract(this.inner);this.model.set("left",e.value())}function l(){this.model.set("width",r(this.resizable.model.get("width")).add(2*this.outer).value())}function o(){this.model.set("height",r(this.resizable.model.get("height")).add(2*this.outer).value())}var r=(e("./helpers"),e("no"));i.n=function(){t.call(this),n.call(this),l.call(this)},i.s=function(){a.call(this),n.call(this),l.call(this)},i.w=function(){n.call(this),t.call(this),o.call(this)},i.e=function(){s.call(this),t.call(this),o.call(this)},i.nw=function(){t.call(this),n.call(this)},i.ne=function(){t.call(this),s.call(this)},i.sw=function(){a.call(this),n.call(this)},i.se=function(){a.call(this),s.call(this)}}),define("__backbone-ui-resizable/handle/enable-disable",["require","exports","module"],function(e,i){i.disableHandle=function(){return this.disableDraggable(),this.$el.addClass(this.resizable.handleOptions.clss+"-disabled").removeClass(this.resizable.handleOptions.clss+"-enabled"),this},i.enableHandle=function(){return this.enableDraggable(),this.$el.addClass(this.resizable.handleOptions.clss+"-enabled").removeClass(this.resizable.handleOptions.clss+"-disabled"),this}}),define("__backbone-ui-resizable/handle/base",["require","exports","module","jquery-ui","backbone-ui-draggable","lodash","./update-position","./enable-disable"],function(e,i,t){e("jquery-ui");var a=e("backbone-ui-draggable"),n=e("lodash"),s=e("./update-position"),l={n:"y",s:"y",w:"x",e:"x",nw:"xy",ne:"xy",sw:"xy",se:"xy"},o=t.exports=a.extend({initialize:function(e){a.prototype.initialize.call(this,e),this.initializeResizableHandle(e)},initializeResizableHandle:function(e){this.resizable=e.resizable,this.direction=e.direction,this.axis=l[this.direction],this.thickness=e.thickness,this.ratio=e.ratio,this.outer=e.thickness*this.ratio,this.inner=e.thickness-this.outer,this.updatePosition=n.throttle(n.bind(s[this.direction],this),20),this.setStyles(),this.updatePosition(),this.listenTo(this.resizable.model,"change",this.updatePosition),this.enableHandle()},setStyles:function(){var e,i=this.axis;i.length>1?e={zIndex:100,width:this.thickness,height:this.thickness}:"x"===i?e={zIndex:99,width:this.thickness,height:this.resizable.model.get("width")}:"y"===i&&(e={zIndex:99,width:this.resizable.model.get("height"),height:this.thickness}),this.$el.css(e)},map:n.extend(a.prototype.map,{height:"->css:height",width:"->css:width"})});o.proto(e("./enable-disable"))}),define("__backbone-ui-resizable/handle/index",["require","exports","module","./base"],function(e,i){function t(e,i){var t=this.resizable.moveN(e,i);return e-t}function a(e,i){var t=this.resizable.moveS(e,i);return e-t}function n(e,i){var t=this.resizable.moveW(e,i);return e-t}function s(e,i){var t=this.resizable.moveE(e,i);return e-t}var l=e("./base"),o={beforeMoveY:t},r={beforeMoveY:a},h={beforeMoveX:n},d={beforeMoveX:s};i.n=l.extend(o),i.s=l.extend(r),i.w=l.extend(h),i.e=l.extend(d),i.nw=l.extend(o).extend(h),i.ne=l.extend(o).extend(d),i.sw=l.extend(r).extend(h),i.se=l.extend(r).extend(d)}),define("__backbone-ui-resizable/helpers",["require","exports","module","lodash"],function(e,i){var t=e("lodash");i.min=function(e,i){return isNaN(e)?i:isNaN(i)?e:i>e?e:i},i.max=function(e,i){return isNaN(e)?i:isNaN(i)?e:e>i?e:i},i.numberify=function(e){var i=parseFloat(e);if(isNaN(i))throw new Error(e+" not number");return i},i.numberifyProperties=function(e,i){var a={};return t.each(e,function(e){a[e]=parseFloat(i[e])}),a},i.fitValueWithin=function(e,i,t){return isNaN(i)||(e=e>i?e:i),isNaN(t)||(e=t>e?e:t),e};var a=/^-?\d*(\.\d+)?$/;i.stringifyPositionalValue=function(e){return a.test(e)?e+"px":e}}),define("__backbone-ui-resizable/actions/e",["require","exports","module","lodash","no","../helpers"],function(e,i){var t=e("lodash"),a=e("no"),n=e("../helpers");i.deltaE=function(e,i){if(i)return e;var t=this.model,s=t.get("width"),l=t.get("minWidth"),o=t.get("maxWidth"),r=a(t.get("left")).add(s).value(),h=t.get("minRight"),d=t.get("maxRight"),u=n.max(a(l).subtract(s).value(),a(h).subtract(r).value()),c=n.min(a(o).subtract(s).value(),a(d).subtract(r).value());return n.fitValueWithin(e,u,c)},i.moveE=function(e,i){i=i||{};var n=this.model,s=this.deltaE(e,i.force);if(n.set("width",a(n.get("width")).add(s).value()),!i.silent&&0!==s){var l=t.assign({axis:"x",delta:-1*s,action:s>0?"expand":"contract",handle:"e"},i);this.trigger("resize",this,l).trigger("resize-x",this,l)}return e-s}}),define("__backbone-ui-resizable/actions/w",["require","exports","module","lodash","no","../helpers"],function(e,i){var t=e("lodash"),a=e("no"),n=e("../helpers");i.deltaW=function(e,i){if(i)return e;var t=this.model,s=t.get("width"),l=t.get("minWidth"),o=t.get("maxWidth"),r=t.get("left"),h=t.get("minLeft"),d=t.get("maxLeft"),u=n.max(a(s).subtract(o).value(),a(h).subtract(r).value()),c=n.min(a(s).subtract(l).value(),a(d).subtract(r).value());return n.fitValueWithin(e,u,c)},i.moveW=function(e,i){i=i||{};var n=this.model,s=this.deltaW(e,i.force);if(n.set({left:a(n.get("left")).add(s).value(),width:a(n.get("width")).subtract(s).value()}),!i.silent&&0!==s){var l=t.assign({axis:"x",delta:-1*s,action:s>0?"contract":"expand",handle:"w"},i);this.trigger("resize",this,l).trigger("resize-x",this,l)}return e-s}}),define("__backbone-ui-resizable/actions/s",["require","exports","module","lodash","no","../helpers"],function(e,i){var t=e("lodash"),a=e("no"),n=e("../helpers");i.deltaS=function(e,i){if(i)return e;var t=this.model,s=t.get("height"),l=t.get("minHeight"),o=t.get("maxHeight"),r=a(t.get("top")).add(s).value(),h=t.get("minBottom"),d=t.get("maxBottom"),u=n.max(a(l).subtract(s).value(),a(h).subtract(r).value()),c=n.min(a(o).subtract(s).value(),a(d).subtract(r).value());return n.fitValueWithin(e,u,c)},i.moveS=function(e,i){i=i||{};var n=this.model,s=this.deltaS(e,i.force);if(n.set("height",a(n.get("height")).add(s).value()),!i.silent&&0!==s){var l=t.assign({axis:"y",delta:s,action:s>0?"expand":"contract",handle:"s"},i);this.trigger("resize",this,l).trigger("resize-y",this,l)}return e-s}}),define("__backbone-ui-resizable/actions/n",["require","exports","module","lodash","no","../helpers"],function(e,i){var t=e("lodash"),a=e("no"),n=e("../helpers");i.deltaN=function(e,i){if(i)return e;var t=this.model,s=t.get("height"),l=t.get("minHeight"),o=t.get("maxHeight"),r=t.get("top"),h=t.get("minTop"),d=t.get("maxTop"),u=n.max(a(s).subtract(o).value(),a(h).subtract(r).value()),c=n.min(a(s).subtract(l).value(),a(d).subtract(r).value());return n.fitValueWithin(e,u,c)},i.moveN=function(e,i){i=i||{};var n=this.model,s=this.deltaN(e,i.force);if(n.set({top:a(n.get("top")).add(s).value(),height:a(n.get("height")).subtract(s).value()}),!i.silent&&0!==s){var l=t.assign({axis:"x",delta:-1*s,action:s>0?"contract":"expand",handle:"n"},i);this.trigger("resize",this,l).trigger("resize-y",this,l)}return e-s}}),define("__backbone-ui-resizable/actions/index",["require","exports","module"],function(e,i){i.expandToLeft=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveW(-1*e,i))},i.expandToRight=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveE(e,i))},i.expandToTop=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveN(-1*e,i))},i.expandToBottom=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveS(e,i))},i.contractToRight=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveW(e,i))},i.contractToLeft=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveE(-1*e,i))},i.contractToBottom=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveN(e,i))},i.contractToTop=function(e,i){return i=i||{},i.agent=i.agent||"code",Math.abs(this.moveS(-1*e,i))}}),define("__backbone-ui-resizable/animations",["require","exports","module"],function(e,i){function t(e){return function(i,t){t=t||{},i=e.positionDeltaMultiplier*i;var a=this[e.delta](i,t.force),n=parseFloat(this.model.get(e.dimension)),s={};s[e.dimension]=n+e.dimensionDeltaMultiplier*Math.abs(a);var l=t.step;return t.step=_.bind(function(i){var t=Math.abs(i-n);return this[e.move](e.positionDeltaMultiplier*t,{force:!0}),n=i,l?l.apply(this.$el,arguments):void 0},this),this.$el.animate(s,t),i-a}}i.aExpandToW=t({delta:"deltaW",move:"moveW",dimension:"width",positionDeltaMultiplier:-1,dimensionDeltaMultiplier:1}),i.aContractToE=t({delta:"deltaW",move:"moveW",dimension:"width",positionDeltaMultiplier:1,dimensionDeltaMultiplier:-1}),i.aExpandToE=t({delta:"deltaE",move:"moveE",dimension:"width",positionDeltaMultiplier:1,dimensionDeltaMultiplier:1}),i.aContractToW=t({delta:"deltaE",move:"moveE",dimension:"width",positionDeltaMultiplier:-1,dimensionDeltaMultiplier:-1}),i.aExpandToN=t({delta:"deltaN",move:"moveN",dimension:"height",positionDeltaMultiplier:-1,dimensionDeltaMultiplier:1}),i.aContractToS=t({delta:"deltaN",move:"moveN",dimension:"height",positionDeltaMultiplier:1,dimensionDeltaMultiplier:-1}),i.aExpandToS=t({delta:"deltaS",move:"moveS",dimension:"height",positionDeltaMultiplier:1,dimensionDeltaMultiplier:1}),i.aContractToN=t({delta:"deltaS",move:"moveS",dimension:"height",positionDeltaMultiplier:-1,dimensionDeltaMultiplier:-1})}),define("__backbone-ui-resizable/enable-disable",["require","exports","module"],function(e,i){i._initializeResizableEnableDisable=function(){this.listenTo(this.model,"change:resizableStatus",function(){this.resizableEnabled()?(_.each(this.handles,function(e){e.enableHandle()},this),this.$el.removeClass(this.resizableClass+"-disabled").addClass(this.resizableClass+"-enabled")):(_.each(this.handles,function(e){e.disableHandle()},this),this.$el.removeClass(this.resizableClass+"-enabled").addClass(this.resizableClass+"-disabled"))})},i.resizableEnabled=function(){return"enabled"===this.model.get("resizableStatus")},i.disableResizable=function(){return this.model.set("resizableStatus","disabled"),this},i.enableResizable=function(){return this.model.set("resizableStatus","enabled"),this},i.disableHandle=function(e){var i=this.handles[e];return i&&i.disableHandle(),this},i.enableHandle=function(e,i){var t=this.handles[e];return t?t.enableHandle():this.handles[e]=this.buildHandle(e,i),this}}),define("__backbone-ui-resizable/build-handle",["require","exports","module","jquery","lodash"],function(e,i){var t=e("jquery"),a=e("lodash");i.buildHandle$El=function(e,i){var a=i.clss,n=t("<div></div>");return n.addClass(a).addClass(a+"-"+e),n.appendTo(this.$el)},i.buildHandle=function(e,i){i=i||{},a.defaults(i,this.handleOptions);var t=i.ratio,n=i.thickness,s=a.extend({},i,{el:this.buildHandle$El(e,i),resizable:this,direction:e,ratio:a.isObject(t)?t[e]:t,thickness:a.isObject(n)?n[e]:n}),l=this.handleBuilder[e](s);return l}}),define("backbone-ui-resizable",["require","exports","module","lowercase-backbone","backbone-ui-draggable","jquery","lodash","./__backbone-ui-resizable/handle/index","./__backbone-ui-resizable/handle/helpers","./__backbone-ui-resizable/actions/e","./__backbone-ui-resizable/actions/w","./__backbone-ui-resizable/actions/s","./__backbone-ui-resizable/actions/n","./__backbone-ui-resizable/actions/index","./__backbone-ui-resizable/animations","./__backbone-ui-resizable/enable-disable","./__backbone-ui-resizable/build-handle"],function(e,i,t){var a=e("lowercase-backbone"),n=e("backbone-ui-draggable"),s=e("jquery"),l=e("lodash"),o=e("./__backbone-ui-resizable/handle/index"),r=e("./__backbone-ui-resizable/handle/helpers"),h=t.exports=n.extend({initialize:function(e){a.view.prototype.initialize.call(this,e),this.initializeModelDock(e),this.initializeUIDraggable(e),this.initializeUIResizable(e)},initializeUIResizable:function(e){this.$canvas=e.canvas||this.canvas||s(window),e.enableDraggable||this.disableDraggable();var i=l.extend({minWidth:2*this.handleOptions.thickness,minHeight:2*this.handleOptions.thickness,width:this.$el.width(),height:this.$el.height()},this.$el.position(),e);this.model.set(i),this.handleOptions=l.extend(this.handleOptions,l.pick(e,["clss","ratio","thickness"]));var t=e.handles||this.handles;t=l.isArray(t)?t:t.split(","),this.handles={},l.each(t,function(e){this.handles[e]=this.buildHandle(e,this.handleOptions)},this),this._initializeResizableEnableDisable()},handleBuilder:o,handles:"n,s,w,e,nw,ne,sw,se",handleOptions:{clss:"handle",ratio:.2,thickness:30},stringifiers:{height:r.stringifyPositionalValue,minHeight:r.stringifyPositionalValue,maxHeight:r.stringifyPositionalValue,width:r.stringifyPositionalValue,minWidth:r.stringifyPositionalValue,maxWidth:r.stringifyPositionalValue,left:r.stringifyPositionalValue,top:r.stringifyPositionalValue},map:{top:"->css:top",left:"->css:left",width:"->css:width",minWidth:"->css:min-width",maxWidth:"->css:max-width",height:"->css:height",minHeight:"->css:min-height",maxHeight:"->css:max-height"}});h.proto(e("./__backbone-ui-resizable/actions/e")).proto(e("./__backbone-ui-resizable/actions/w")).proto(e("./__backbone-ui-resizable/actions/s")).proto(e("./__backbone-ui-resizable/actions/n")).proto(e("./__backbone-ui-resizable/actions/index")),h.proto(e("./__backbone-ui-resizable/animations")),h.proto(e("./__backbone-ui-resizable/enable-disable")),h.proto(e("./__backbone-ui-resizable/build-handle"))});