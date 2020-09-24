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
    global.animate = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
   * @Author: xuxueliang
   * @Date: 2019-06-25 13:56:05
   * @LastEditors: xuxueliang
   * @LastEditTime: 2020-09-10 17:29:58
   */
  var _default = {
    name: 'animate',
    needs: ['tools'],
    install: function install(target) {
      target.addPrototype('fadeOut', function () {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
        var keyframes = [{
          opacity: 1,
          marginTop: '0'
        }, {
          opacity: 0,
          marginTop: '50px'
        }];
        return _animate.call(this, keyframes, duration).finished;
      });
      target.addPrototype('fadeIn', function () {
        var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
        var keyframes = [{
          opacity: 0,
          marginTop: '50px'
        }, {
          opacity: 1,
          marginTop: '0px'
        }];
        return _animate.call(this, keyframes, duration).finished;
      });
      target.addPrototype('slideIn', function () {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
        var elm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
        elm = elm || this.elm;
        console.log(elm);
        var begin = {};
        var end = {};
        elm.style.display = 'block';
        begin[direction] = elm['left,right'.indexOf(direction) > -1 ? 'clientWidth' : 'clientHeight'] + 'px';
        end[direction] = 0;
        var keyframes = [begin, end];

        _animate.call(elm, keyframes, duration);
      });
      target.addPrototype('slideOut', function () {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'bottom';
        var elm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
        elm = elm || this.elm;
        var begin = {};
        var end = {};
        begin[direction] = 0;
        end[direction] = -elm['left,right'.indexOf(direction) > -1 ? 'clientWidth' : 'clientHeight'] - 10 + 'px';
        var keyframes = [begin, end];

        _animate.call(elm, keyframes, duration, function () {
          elm.style.display = 'none';
        });
      });
    }
  };
  _exports.default = _default;

  function _animate(keyframes, duration, cb) {
    var _this = this;

    // console.log(this, keyframes)
    for (var i in keyframes[0]) {
      this.style[i] = keyframes[0][i];
    }

    this.style.transition = duration + 'ms';

    for (var _i in keyframes[1]) {
      this.style[_i] = keyframes[1][_i];
    }

    setTimeout(function () {
      _this.style.transition = '';
      cb && cb();
    }, duration + 100);
    return {};
  } // fadeOut (duration = 300) {
  //   const keyframes = [{ opacity: 1, marginTop: '0' }, { opacity: 0, marginTop: '50px' }]
  //   return this._animate(keyframes, duration).finished
  // }
  // fadeIn (duration = 300) {
  //   const keyframes = [{ opacity: 0, marginTop: '50px' }, { opacity: 1, marginTop: '0px' }]
  //   return this._animate(keyframes, duration).finished
  // }

});