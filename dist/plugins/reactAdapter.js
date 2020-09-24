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
    global.reactAdapter = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  // 兼容react
  var _default = {
    name: 'reactAdapter',
    install: function install(target) {
      target.addPrototype('setState', function (obj) {
        if (!this.state) {
          this.state = {};
        }

        Object.assign(this.state, obj);
        this.update();
      });
      target.addPrototype('initReact', function (context) {
        // 添加 卸载时触发的方法
        var that = this;

        if (context.componentWillUnmount) {
          context._componentWillUnmount = context.componentWillUnmount;

          context.componentWillUnmount = function () {
            context._componentWillUnmount(); //


            that.__beforeDisconnectedCallback();

            that.__disconnectedCallback();
          };
        } else {
          context.componentWillUnmount = function () {
            //
            that.__beforeDisconnectedCallback();

            that.__disconnectedCallback();
          };
        }
      });
    }
  };
  _exports.default = _default;
});