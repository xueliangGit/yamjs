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
    global.asncyComponents = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = testResult;

  /*
   * @Author: xuxueliang
   * @Date: 2020-03-08 01:42:47
   * @LastEditors: xuxueliang
   * @LastEditTime: 2020-03-29 17:06:26
   */
  function testResult(url) {
    this.syncComponents = true; // let result = require(url)
    // console.log(result)
    // return result

    return function () {
      return url;
    };
  }
});