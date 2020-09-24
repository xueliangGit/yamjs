(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/toConsumableArray", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/toConsumableArray"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.toConsumableArray, global.classCallCheck, global.createClass);
    global.store = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _toConsumableArray2, _classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = StoreFactory;
  _toConsumableArray2 = _interopRequireDefault(_toConsumableArray2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);

  /*
   * @Author: xuxueliang
   * @Date: 2019-08-01 15:22:48
   * @LastEditors: xuxueliang
   * @LastEditTime: 2020-09-08 14:47:49
   */
  function StoreFactory(conf) {
    // 一个时间记录器
    var timeTool = {
      commits: []
    };
    var replayNums = -1; // 一个状态管理工具

    var storeData = {
      isBelone: 'yamjs',
      state: {},
      methods: {},
      isAdded: {}
    };

    function proxy(ori, key) {
      Object.defineProperty(ori, key, {
        configurable: false,
        enumerable: true,
        get: function proxyGetter() {
          return storeData.state[key];
        },
        set: function proxySetter(newVal) {// 不进行赋值
        }
      });
    }

    function _commit(fnNameOrstate) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (storeData.methods[fnNameOrstate]) {
        var _storeData$methods;

        if ((_storeData$methods = storeData.methods)[fnNameOrstate].apply(_storeData$methods, [storeData.state].concat(params)) !== false) {
          Store.update();
        }
      } else if (storeData.state[fnNameOrstate]) {
        if (storeData.state[fnNameOrstate] !== params[0]) {
          storeData.state[fnNameOrstate] = params[0];
          Store.update();
        }
      }
    }
    /**
    * 需要在一个地方统一声明一些状态，在组件内部都可以使用
    *
    * */


    var Store = /*#__PURE__*/function () {
      function Store(conf) {
        (0, _classCallCheck2.default)(this, Store);
        this.do = storeData.isBelone;
        this.name = 'store';
        this.mix(conf);
      }

      (0, _createClass2.default)(Store, [{
        key: "mix",
        value: function mix(conf) {
          var _this = this;

          if (conf.state) {
            Object.keys(conf.state).forEach(function (v) {
              storeData.state[v] = conf.state[v];

              if (_this[v] === undefined) {
                proxy(_this, v);
              }
            });
          }

          if (conf.methods) {
            Object.keys(conf.methods).forEach(function (v) {
              storeData.methods[v] = conf.methods[v];
            });
          }

          if (conf.children) {// 子组件也进行
          }
        }
      }, {
        key: "commit",
        value: function commit(fnNameOrstate) {
          for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            params[_key2 - 1] = arguments[_key2];
          }

          timeTool.commits.push([fnNameOrstate].concat(params));

          _commit.apply(void 0, [fnNameOrstate].concat(params));
        }
      }, {
        key: "add",
        value: function add(target) {
          storeData.isAdded[target._eid] = target;
          target.addDestory(function () {
            delete storeData.isAdded[target._eid];
          });
          target.$store = this;
          return this;
        }
      }, {
        key: "install",
        value: function install(target) {
          var _this2 = this;

          // target.add
          target.addAuto('store', function (context) {
            target.$store = _this2.add(context);
          });
        }
      }, {
        key: "apply",
        value: function apply(context) {
          // console.log('apply', context)
          context.$store = this.add(context);
        } // 重播

      }, {
        key: "replay",
        value: function replay() {
          if (++replayNums >= timeTool.commits.length) {
            // console.log('store replay end')
            replayNums = -1;
          } else {
            _commit.apply(void 0, (0, _toConsumableArray2.default)(timeTool.commits[replayNums]));
          }
        } // 复位

      }, {
        key: "reset",
        value: function reset() {
          if (replayNums === -1) return;

          _commit.apply(void 0, (0, _toConsumableArray2.default)(timeTool.commits[timeTool.commits.length - 1]));

          replayNums = -1;
        }
      }], [{
        key: "update",
        value: function update() {
          Object.keys(storeData.isAdded).forEach(function (v) {
            storeData.isAdded[v].update();
          });
        }
      }]);
      return Store;
    }();

    return new Store(conf);
  }
});