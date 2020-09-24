(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./utils", "../utils/index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./utils"), require("../utils/index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils, global.index);
    global.tools = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _utils, _index) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
   * @Author: xuxueliang
   * @Date: 2019-06-25 13:56:05
   * @LastEditors: xuxueliang
   * @LastEditTime: 2020-09-03 12:52:28
   */
  var _default = {
    name: 'tools',
    install: function install(target) {
      var data = {
        timeOutIds: {},
        intervalIds: {}
      };
      target.addPrototype('getCss', function (attr, elm) {
        // console.log(attr)
        return (0, _utils.getCss)(elm || this.elm, attr);
      }); // 设置延时器

      target.addPrototype('setTimeout', function (fn) {
        var _this = this;

        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        var timeOutId = setTimeout.apply(void 0, [function () {
          (0, _index.isFunc)(fn) && fn();

          _this.delDestory(ids);

          timeOutId = null;
        }].concat(params));
        var ids = this.addDestory(function () {
          // console.log('timeOutId,', timeOutId)
          if (timeOutId) {
            clearTimeout(timeOutId);
            timeOutId = null;
          }
        });
        data.timeOutIds[ids] = timeOutId;
        return timeOutId;
      }); // 取消延时器

      target.addPrototype('clearTimeout', function (eventId) {
        this.delDestory(eventId);
        clearTimeout(data.timeOutIds[eventId]);
        delete data.timeOutIds[eventId];
        return true;
      }); // 设置定时器

      target.addPrototype('setInterval', function (fn) {
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }

        var intervalId = setInterval.apply(void 0, [function () {
          // console.log('intervalId,', intervalId)
          (0, _index.isFunc)(fn) && fn.apply(void 0, arguments);
        }].concat(params));
        var ids = this.addDestory(function () {
          // console.log('intervalId,', intervalId)
          if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
          }
        });
        data.timeOutIds[ids] = intervalId;
        return intervalId;
      }); // 取消定时器

      target.addPrototype('clearInterval', function (eventId) {
        this.delDestory(eventId);
        clearInterval(data.timeOutIds[eventId]);
        delete data.timeOutIds[eventId];
        return true;
      });
    }
  };
  _exports.default = _default;
});