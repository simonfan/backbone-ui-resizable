define(["require","exports","module"],function(e,t,n){t.expandToLeft=function(t){var n=this.handles.w;return n.calcMinMax(),n.moveToLeft(t)},t.expandToRight=function(t){var n=this.handles.e;return n.calcMinMax(),n.moveToRight(t)},t.expandToTop=function(t){var n=this.handles.n;return n.calcMinMax(),n.moveToTop(t)},t.expandToBottom=function(t){var n=this.handles.s;return n.calcMinMax(),n.moveToBottom(t)},t.contractToRight=function(t){var n=this.handles.w;return n.calcMinMax(),n.moveToRight(t)},t.contractToLeft=function(t){var n=this.handles.e;return n.calcMinMax(),n.moveToLeft(t)},t.contractToBottom=function(t){var n=this.handles.n;return n.calcMinMax(),n.moveToBottom(t)},t.contractToTop=function(t){var n=this.handles.s;return n.calcMinMax(),n.moveToTop(t)}});