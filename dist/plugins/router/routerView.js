(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/classCallCheck", "@babel/runtime/helpers/createClass", "@babel/runtime/helpers/possibleConstructorReturn", "@babel/runtime/helpers/getPrototypeOf", "@babel/runtime/helpers/inherits", "../../index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/classCallCheck"), require("@babel/runtime/helpers/createClass"), require("@babel/runtime/helpers/possibleConstructorReturn"), require("@babel/runtime/helpers/getPrototypeOf"), require("@babel/runtime/helpers/inherits"), require("../../index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.getPrototypeOf, global.inherits, global.index);
    global.routerView = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _getPrototypeOf2, _inherits2, _index) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _classCallCheck2 = _interopRequireDefault(_classCallCheck2);
  _createClass2 = _interopRequireDefault(_createClass2);
  _possibleConstructorReturn2 = _interopRequireDefault(_possibleConstructorReturn2);
  _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf2);
  _inherits2 = _interopRequireDefault(_inherits2);
  _index = _interopRequireWildcard(_index);

  var _dec, _class;

  var RouterView = (_dec = (0, _index.Component)({
    tagName: 'router-view',
    style: require('./router.stylus'),
    props: ['live']
  }), _dec(_class = /*#__PURE__*/function (_Yam) {
    (0, _inherits2.default)(RouterView, _Yam);

    function RouterView() {
      (0, _classCallCheck2.default)(this, RouterView);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RouterView).apply(this, arguments));
    }

    (0, _createClass2.default)(RouterView, [{
      key: "$beforeCreate",
      value: function $beforeCreate() {
        this.cache = {};
      }
    }, {
      key: "$created",
      value: function $created() {
        this.$router.keepLive = !!this.live;
      }
    }, {
      key: "$updated",
      value: function $updated() {
        if (!!this.live && !this.cache[window.location.hash]) {
          this.cache[window.location.hash] = this.$refs.routerDiv.childNodes[0];
        } else {} // console.log(this.cache)

      }
    }, {
      key: "getPage",
      value: function getPage() {}
    }, {
      key: "$mounted",
      value: function $mounted() {
        var _this = this;

        this.elm.updateView = function (e) {
          // console.log('update', this.$router.current.component)
          _this.updateView(e);
        };
      }
    }, {
      key: "updateView",
      value: function updateView(e) {
        if (this.live) {
          var old = e.oldURL;
          old = old.split('#')[1];

          if (old) {
            this.cache[old] = this.$refs.routerDiv.childNodes[0]; // console.log(this.$router)
          }
        }

        this.update(); // console.log('this.$refs.dom', this.$refs.dom)
      }
    }, {
      key: "showCacheView",
      value: function showCacheView(hashName) {
        this.$refs.routerDiv.appendChild(this.cache[hashName]);
        return '';
      }
    }, {
      key: "showNewView",
      value: function showNewView() {
        if (this.$refs) {
          this.$refs.cacheDiv.appendChild(this.$refs.routerDiv.childNodes[0]);
        }

        return _index.default.__createElement(this.$router.current.component, null);
      }
    }, {
      key: "getCurrentComponent",
      value: function getCurrentComponent() {
        if (this.$router.current && this.$router.current.component) {
          return _index.default.__createElement(this.$router.current.component, {
            ref: "dom"
          });
        } else {
          return _index.default.__createElement("page-404", {
            path: this.$router.current.path
          }, this.get404());
        }
      }
    }, {
      key: "get404",
      value: function get404() {
        return _index.default.__createElement("div", {
          className: "tip-404"
        }, _index.default.__createElement("p", {
          className: "title-404 tac"
        }, "YAMJS"), _index.default.__createElement("p", {
          className: "text-404 tac"
        }, "\u3010404\u3011 \u80AF\u5B9A\u662F\u4F60\u7684\u65B9\u5411\u4E0D\u5BF9"), _index.default.__createElement("p", {
          className: "des-404 tac"
        }, "\u53EA\u8981\u65B9\u5411\u5BF9\uFF0C\u76EE\u6807\u80AF\u5B9A\u5C31\u5728\u8FDC\u65B9\uFF0C\u5148\u53BB\u68C0\u67E5\u4E00\u4E0B\u5427"));
      }
    }, {
      key: "render",
      value: function render() {
        var hashName = window.location.hash.split('?')[0];
        return _index.default.__createElement("div", {
          ref: "routerDiv"
        }, this.live && this.cache[hashName] ? this.showCacheView(hashName) : this.getCurrentComponent());
      }
    }]);
    return RouterView;
  }(_index.default)) || _class);
  var _default = RouterView;
  _exports.default = _default;
});