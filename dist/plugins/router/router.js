(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/typeof", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/typeof"), require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._typeof, global.classCallCheck, global.createClass);
    global.router = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _typeof2, _classCallCheck2, _createClass2) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = RouterFactory;
  _typeof2 = _interopRequireDefault(_typeof2);
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);

  /*
   * @Author: xuxueliang
   * @Date: 2019-08-01 15:22:48
   * @LastEditors: xuxueliang
   * @LastEditTime: 2019-09-16 15:42:49
   */
  var changeFnCache = [];

  function RouterFactory(conf) {
    // 一个状态管理工具
    var routerCache = {
      history: []
    };
    /**
     * 需要在一个地方统一声明一些状态，在组件内部都可以使用
     *
     * */

    var Router = /*#__PURE__*/function () {
      function Router() {
        var _this = this;

        var routerConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck2.default)(this, Router);
        this.name = 'Router';
        this.config = {};
        this.pathConf = {};
        this.Conf = Object.assign({
          mode: 'hash'
        }, routerConf.conf);
        this.init(routerConf.routes);
        var routerView = document.getElementsByTagName('router-view')[0];
        changeFnCache.push(function (e) {
          var current = getCurrent();
          _this.current = Object.assign({}, _this.pathConf[current.path] || {}, current);
          routerView && routerView.updateView && routerView.updateView(e);
        });
      }

      (0, _createClass2.default)(Router, [{
        key: "init",
        value: function init(option) {
          var type_ = (0, _typeof2.default)(option);

          if (type_ === 'object') {
            _init(this, option);
          } else {
            console.warn(new Error('使用state.setConfig函数去设置页面跳转需要 传入{}对象，而不是' + type_));
          }
        }
      }, {
        key: "push",
        value: function push(routeObj) {
          if (routeObj.name) {
            // 修复传入参数错误的情况
            if (!this.config[routeObj.name]) {
              console.warn("\n          ".concat(routeObj, " \u6CA1\u6709\u5BF9\u5E94\u7684\u9875\u9762\uFF0C\u8BF7\u68C0\u67E5\n          "));
              return;
            }

            var _url = this.config[routeObj.name].path;

            if (routeObj.query) {
              _url += '?' + memgerQuery(routeObj.query);
            } // console.log(_url)


            routerCache.history.push(routeObj);
            $beforeRouterEnter();
            window.location.href = '#' + _url;
          } else if (routeObj.path) {
            routerCache.history.push(routeObj);
          }
        }
      }, {
        key: "pop",
        value: function pop() {
          routerCache.history.shift();
          window.history.go(-1);
        }
      }, {
        key: "back",
        value: function back() {
          this.pop();
        }
      }, {
        key: "add",
        value: function add(context) {
          context.$router = this;
          return this;
        }
      }, {
        key: "install",
        value: function install(target) {
          var _this2 = this;

          target.addAuto('router', function (context) {
            context.$router = _this2;
          });
        }
      }]);
      return Router;
    }();

    return new Router(conf);
  }

  function getCurrent() {
    var pathnameArray = (window.location.href.split('#')[1] || '').split('?');
    var query = pathnameArray[1];
    var path = pathnameArray[0];
    return {
      query: getParamJson(query),
      path: getAbsPath(path)
    };
  }

  function getParamJson(queryStr) {
    if (!queryStr) {
      return {};
    }

    var arry = queryStr.split('&');
    var params = {};

    for (var i = 0; i < arry.length; i++) {
      var _param = arry[i].split('=');

      params[_param[0]] = _param[1] || null;
    }

    return params;
  }

  function memgerQuery(obj) {
    var params = [];
    Object.keys(obj).forEach(function (v) {
      params.push("".concat(v, "=").concat(obj[v]));
    });
    return params.join('&');
  }

  function getAbsPath(path) {
    if (~path.indexOf('?')) {
      path = path.split('?')[0] || '';
    }

    if (path.charAt(0) !== '/') {
      path = '/' + path;
    }

    if (path.length < 2) {
      return path;
    } else if (path.charAt(path.length - 1) === '/') {
      return path.substr(0, path.length - 1);
    }

    return path;
  }

  function setCurrent(context, obj) {
    context.current = obj;
  }

  function _init(context, option) {
    // 获取本页页面名字
    var current = context.current = getCurrent(); // console.log('current', current)

    /* 写入页面简单路由配置到缓存 */

    option.forEach(function (v) {
      if (v.name) {
        v.path = getAbsPath(v.path || '/');
        context.pathConf[v.path] = context.config[v.name] = {
          path: v.path,
          component: v.component
        };

        if (current.path === v.path) {
          // 当前页面
          setCurrent(context, Object.assign({}, v, current));
        }
      } else {
        console.warn("\n    router:\n      ".concat(v, "\n      \u7F3A\u5C11\u3010name\u3011\u503C\n      "));
      }
    });

    if (!context.current) {
      warnInfo(current);
    }
  }

  function warnInfo(current) {
    console.warn("\n  router:\n    \u8BF7\u68C0\u67E5\u4F20\u5165\u7684\u53C2\u6570\n    ".concat(JSON.stringify(current), "\n    \uFF0C\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u7EC4\u4EF6\n  "));
  }

  function _hashChangFun(e) {
    changeFnCache.forEach(function (v) {
      return v(e);
    }); // console.log('change over')
  }

  window.addEventListener('hashchange', _hashChangFun); // 添加声明周期 routerEnter，routerLeave

  function $beforeRouterEnter() {}
});