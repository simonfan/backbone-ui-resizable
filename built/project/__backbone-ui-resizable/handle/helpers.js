define(["require","exports","module","lodash"],function(e,t,n){var r=e("lodash");t.min=function(t,n){return isNaN(t)?n:isNaN(n)?t:t<n?t:n},t.max=function(t,n){return isNaN(t)?n:isNaN(n)?t:t>n?t:n},t.numberify=function(t){var n=parseFloat(t);if(isNaN(n))throw new Error(t+" not number");return n},t.numberifyProperties=function(t,n){var i={};return r.each(t,function(e){i[e]=parseFloat(n[e])}),i};var i=/^-?\d*(\.\d+)?$/;t.stringifyPositionalValue=function(t){return i.test(t)?t+"px":t}});