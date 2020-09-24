(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.utils = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getCss = void 0;

  /*
   * @Author: xuxueliang
   * @Date: 2019-06-25 13:56:05
   * @LastEditors: xuxueliang
   * @LastEditTime: 2020-02-29 18:00:19
   */
  var getCss = function getCss(curEle, attr) {
    var val = null;

    if ('getComputedStyle' in window) {
      val = window.getComputedStyle(curEle, null)[attr];
    } else {
      val = curEle.currentStyle[attr];
    } // console.log(val)


    return val;
  };

  _exports.getCss = getCss;
});