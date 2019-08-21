/*!
 * Yam.js v0.2.0
 * (c) 2014-2019 xuxueliang
 * Released under the MIT License.
 * lastTime:Wed Aug 21 2019 16:59:49 GMT+0800 (GMT+08:00).
 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) { descriptor.writable = true; }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
  if (staticProps) { _defineProperties(Constructor, staticProps); }
  return Constructor;
}

var createClass = _createClass;

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

/*
 * @Author: xuxueliang
 * @Date: 2019-08-08 18:17:44
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-16 14:29:14
 */
var global = window || {
  MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || function () {}
};
var doc = document || {};

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 16:59:42
 */


var MutationObserver = global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver; // 浏览器兼容

function creatMutationObserser(el, callFn) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    attributes: true
  };
  var observer = new MutationObserver(function (mutations) {
    // 构造函数回调
    mutations.forEach(function (record) {
      callFn && callFn(record);

      if (record.type === 'attributes') ;

      if (record.type === 'childList') ;
    });
  });
  observer.observe(el, config);
  return observer;
} // 代理


function setAttributes(obj, name, value) {
  if (obj[name] === value) { return; }

  try {
    obj[name] = JSON.parse(value);
  } catch (e) {
    obj[name] = value;
  }
}


function getStyleStr(_id, style) {
  if (!style) { return ''; }

  if (!Array.isArray(style)) {
    style = [style];
  }

  return style.map(function (v) {
    return _getStrByStyle(_id, v, styleIsScope(v));
  }).join('');
}

function styleIsScope(style) {
  if (typeof style === 'string') {
    return style.includes('[scope]');
  } else if (style) {
    return style[0][1].includes('[scope]');
  }

  return false;
}

function _getStrByStyle(_id, style, isScope) {
  if (style) {
    var str = (typeof style === 'string' ? style : style[0][1]).split('\n');

    var _isScope = str[0].includes('scope');

    if (_isScope) {
      str.shift();
    }

    return map(str, function (v) {
      if (v.includes('{')) {
        if (v.includes('[root]')) {
          if (_isScope) {
            v = v.replace('[root]', '');
          } else {
            v = v.replace('[root]', '[dom="' + _id + '"]');
          }
        }

        return _isScope ? '[dom="' + _id + '"] ' + v : v;
      }

      return v;
    }).join('');
  }

  return '';
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isFalse(v) {
  return v === false;
}

function forEach(array) {
  var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var get = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var getArr = []; // eslint-disable-next-line no-cond-assign

  for (var i = 0, item; item = array[i]; i++) {
    var runResult = v(item, i);
    get && getArr.push(runResult);

    if (typeof runResult === 'boolean' && !runResult && !get) {
      return get ? getArr : null;
    }
  }

  return get ? getArr : null;
}

function map(array) {
  var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  return forEach(array, v, true);
}

var toCamelCase = function toCamelCase(str) {
  return str.replace(/-(\w)/g, function (x) {
    return x.slice(1).toUpperCase();
  });
};
/**
 * @summary 获取guid
 * @returns [guid]
 */


var guid2 = function guid2() {
  return S4() + S4() + '-' + S4() + S4();
};

function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}

function getStackTrace() {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
}

var log = function log() {
  var arguments$1 = arguments;

  {
    return null;
  }

  var stack = getStackTrace() || '';
  var matchResult = stack.match(/\(.*?\)/g) || [];
  var line = matchResult[1] || '';

  for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
    arg[_key] = arguments$1[_key];
  }

  arg[arg.length] = '=>from ' + line.replace('(', '').replace(')', '');
  console.log.apply(console, arg);
};


var requestIdleCallback = function requestIdleCallback(callback, timeOut) {
  callback(); // window.requestIdleCallback ? window.requestIdleCallback(callback, timeOut ? { timeout: timeOut } : {}) : callback()
}; // raf


var requestAnimationFrame = function requestAnimationFrame(callback, isNeed) {
  callback(); // !isNeed ? callback() : window.requestAnimationFrame ? window.requestAnimationFrame(callback) : callback()
};

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 15:56:49
 */

function createElement$1(tagName, vnode) {
  var elm = doc.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
} // function createElementNS (namespace, tagName) {
//   return document.createElementNS(namespaceMap[namespace], tagName)
// }


function createTextNode(text) {
  return doc.createTextNode(text);
}

function createComment(text) {
  return doc.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode, isNeed) {
  requestAnimationFrame(function () {
    parentNode.insertBefore(newNode, referenceNode);
    insertCall(newNode);
  });
}

function removeChild(node, child) {
  requestAnimationFrame(function () {
    // 移除事件 触发
    if (child.beforeDisconnectedCallback) {
      child.beforeDisconnectedCallback();
    }

    node.removeChild(child); // 移除事件 触发

    if (child.disconnectedCallback && !child.isUnset) {
      child.disconnectedCallback();
    }
  });
}

function appendChild(node, child, isNeed) {
  requestAnimationFrame(function () {
    if (!node) {
      return false;
    }

    node.appendChild(child);
    insertCall(child);
  });
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  requestAnimationFrame(function () {
    node.textContent = text;
  });
}

function setAttribute(node, key, val) {
  node.setAttribute(key, val);
}

function setAttachShadow(node) {
  var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return node.attachShadow(conf);
} // addCallBack


function insertCall(child) {
  if (child._domInsertCall) {
    child._domInsertCall();
  }
}

var nodeOps = Object.freeze({
  createElement: createElement$1,
  // createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute,
  setAttachShadow: setAttachShadow
});

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-06-25 13:56:05
 */
// $Component Symbol
var $ComponentSymbol = Symbol('$Component'); // $vdom Symbol

var $vdomSymbol = Symbol('$vdom'); // $componentData Symbol

var $componentDataSymbol = Symbol('$componentData');
var $closestParentSymbol = Symbol('$closestParentSymbol');

var symbol = /*#__PURE__*/Object.freeze({
  $ComponentSymbol: $ComponentSymbol,
  $vdomSymbol: $vdomSymbol,
  $componentDataSymbol: $componentDataSymbol,
  $closestParentSymbol: $closestParentSymbol
});

var _require = getCjsExportFromNamespace(symbol);

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-15 18:49:44
 */
var $ComponentSymbol$1 = _require.$ComponentSymbol,
    $closestParentSymbol$1 = _require.$closestParentSymbol; // 设置组件标示


var syncComponentMark = function syncComponentMark(context) {
  context.elm.isComponent = true;
  context.elm.componentName = context._name;
  context.elm.componentId = context._rootId;
}; // 获取元素的最近的组件


var getComponentMark = function getComponentMark(dom) {
  var elm = dom;
  var oldelm = dom;

  while (elm) {
    if (elm.isComponent) {
      return getComponentByElm(elm);
    }

    oldelm = elm;
    elm = elm._parentNode;
  }

  return oldelm;
};

var getCallFnName = function getCallFnName(context, prop) {
  return "".concat(context.tagType || context._tagName, "_").concat(prop, "_fn");
}; // 获取component


function getComponentByElm(elm) {

  if (elm.getApp) {
    return elm.getApp();
  }

  return null;
} // setGet getComponentByElm


function setComponentForElm(elm, context) {
  {
    elm.getApp = function () {
      return context;
    };
  }
} // 获取上一个自定义组件


function getparentCom(elm) {
  if (!elm) { return null; }
  var coms = getComponentMark(elm);

  if (coms._rootId >= 0) {
    return coms;
  }

  return null;
} // 设定上一个自定义组件


function setClosetParentCom(context) {
  context[$closestParentSymbol$1] = context.elm._parentNode ? getparentCom(context.elm._parentNode) : null;
} // 获取上一个自定义组件


function getClosetParentCom(context) {
  return context[$closestParentSymbol$1];
}

function onReadyElmFn(elm) {
  elm._readyCall = [];

  elm.onReady = function (fn) {
    if (elm.isInited) {
      fn();
    } else {
      elm._readyCall.push(fn);
    }
  };
}

function runOnReadyElmFn(elm) {
  if (elm._readyCall) {
    for (var i = 0; i < elm._readyCall.length; i++) {
      elm._readyCall[i]();
    }
  }
}

var componentUtil = {
  getCallFnName: getCallFnName,
  syncComponentMark: syncComponentMark,
  getComponentMark: getComponentMark,
  getComponentByElm: getComponentByElm,
  setComponentForElm: setComponentForElm,
  getparentCom: getparentCom,
  setClosetParentCom: setClosetParentCom,
  getClosetParentCom: getClosetParentCom,
  runOnReadyElmFn: runOnReadyElmFn,
  onReadyElmFn: onReadyElmFn
};
var componentUtil_1 = componentUtil.getCallFnName;
var componentUtil_2 = componentUtil.syncComponentMark;
var componentUtil_3 = componentUtil.getComponentMark;
var componentUtil_4 = componentUtil.getComponentByElm;
var componentUtil_5 = componentUtil.setComponentForElm;
var componentUtil_6 = componentUtil.getparentCom;
var componentUtil_7 = componentUtil.setClosetParentCom;
var componentUtil_8 = componentUtil.getClosetParentCom;

// import _ from 'lodash'

/**
* 核心patch算法，比较新旧node树的差异
*/

function patch(parentElm, vnode, oldVnode) {
  if (!vnode && !oldVnode) {
    return;
  }

  if (!oldVnode) {
    /* 当旧节点不存在，直接批量插入新节点树 */
    addVnodes(parentElm, null, vnode, -1, true);
  } else if (!vnode) {
    /* 当新节点不存在，直接批量删除旧节点树 */
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
  } else {
    // console.log(sameVnode(oldVnode, vnode))
    if (sameVnode(oldVnode, vnode)) {
      /* 当新旧节点相同，进行 patchVNode 操作，对比两个 node 节点 */
      // console.log('--------------------')
      // console.log(oldVnode, vnode)
      patchVnode(oldVnode, vnode);
    } else {
      /* 否则两个不同直接删除旧节点，插入新节点 */
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
    }
  }
}
/**
    * 在 parent 这个父节点下插入一个子节点
    * 如果指定了 ref 则插入到 ref 这个子节点前面
    */

function insert(parent, elm, ref, isFirst) {
  if (parent) {
    if (ref) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, elm, ref, !isFirst);
      }
    } else {
      nodeOps.appendChild(parent, elm, !isFirst);
    }
  }
}
/**
    * 创建新的节点，tag 存在创建一个标签节点，否则创建一个文本节点
    * @param {object} vnode 当前节点virtual node对象
    * @param {object} parentElm 当前节点父节点
    * @param {object} vnode 当前节点的下一个节点，如果存在则表示将当前节点插入此节点（refElm）之前
    */


function createElm(vnode, parentElm, refElm, isFirst) {
  insert(parentElm, vnode.render(null, parentElm), refElm, isFirst);
  /* 存在tag，则创建标签，否则创建文本节点 */
  // if (vnode.tag) {
  //   insert(parentElm, nodeOps.createElement(vnode.tag), refElm)
  // } else {
  //   insert(parentElm, nodeOps.createTextNode(vnode.text), refElm)
  // }
}
/**
    * 批量创建新的节点
    * 参数对应
    * 当前节点父节点 refElm表示将节点插入在refElm节点之前 节点集合 开始下标 结束下标
    */


function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, isFirst) {
  if (startIdx > -1) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], parentElm, refElm, isFirst);
    }
  } else {
    createElm(vnodes, parentElm, refElm, isFirst);
  }
}
/**
    * 移除一个节点
    */


function removeNode(el) {
  var parent = nodeOps.parentNode(el);

  if (parent) {
    nodeOps.removeChild(parent, el);
  }
}
/**
    * 批量移除节点
    * 参数对应
    * 父节点 孩子节点集合 开始下标 结束下标
    */


function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];

    if (ch) {
      removeNode(ch.elm);
    }
  }
}
/**
* 比较两个节点是否是相同节点
*/


function sameVnode(a, b) {
  /* 判断key、tag、是否是注释节点、是否同时定义数据（或不定义）、同时满足当标签类型为 input 的时候 type 相同 */
  // return (
  //   a.key === b.key &&
  //     a.tagName === b.tagName &&
  //     // a.isComment === b.isComment &&
  //     // (!!a.data) === (!!b.data) &&
  //     sameInputType(a, b)
  // )
  // tagType 代替tagName
  return a.key === b.key && a.tagType === b.tagType && sameInputType(a, b) && editProp(a, b) // &&
  //   // a.isComment === b.isComment &&
  //   // (!!a.data) === (!!b.data) &&
  //   sameInputType(a, b)
  ;
}

function editProp(a, b) {
  var newProp = Object.keys(Object.assign({}, a.props || {}, b.props || {})); // eslint-disable-next-line no-cond-assign

  for (var i = 0, keys; keys = newProp[i]; i++) {
    if (keys === 'style') {
      (function () {
        var styles = b.props.style;

        if (_typeof_1(styles) === 'object') {
          Object.keys(styles).forEach(function (prop) {
            var value = styles[prop];

            if (typeof value === 'number') {
              if (prop !== 'zIndex') {
                a.elm.style[prop] = "".concat(value, "px");
              } else {
                a.elm.style[prop] = "".concat(value);
              }
            } else if (typeof value === 'string') {
              a.elm.style[prop] = value;
            } else {
              throw new Error("Expected \"number\" or \"string\" but received \"".concat(_typeof_1(value), "\""));
            }
          });
        } else {
          if (a.elm.getAttribute('style') !== styles) {
            a.elm.setAttribute('style', styles);
          }
        }
      })();
    } else {
      if (isDef(b.props[keys])) {
        if (a.props[keys] !== b.props[keys]) {
          a.props[keys] = b.props[keys];
          setProp(keys, b.attrs, b.props[keys], a.elm);
        }
      } else {
        if (isDef(a.props[keys])) {
          delete a.props[keys];
          a.elm.removeAttribute(a.attrs[keys]); // 更新null

          setProp(keys, b.attrs, null, a.elm);
        }
      }
    }
  }

  return true;
}

function setProp(keys, attrs, props, elm) {
  if (keys in attrs) {
    elm.setAttribute(attrs[keys], props);
  }

  if (typeof props === 'function') { return; }

  if (elm.isComponent) {
    var elmCom = componentUtil_4(elm);

    if (elmCom[keys] !== props) {
      elmCom[keys] = props;
    }

    elmCom = null;
  }
}
/**
* 比较两个节点是否同为 input 标签且 type 相同
*/


function sameInputType(a, b) {
  if (a.tagName !== 'input') { return true; }
  var i;
  var typeA = (i = a.data) && (i = i.attrs) && i.type;
  var typeB = (i = b.data) && (i = i.attrs) && i.type;
  return typeA === typeB;
}
/**
    * 深度比较两个节点，当节点的孩子节点不等时，调用 updateChildren 操作孩子节点
    */


function patchVnode(oldVnode, vnode) {
  requestIdleCallback(function () {
    // 如果这个是个组件，那么跳过该组件的patch
    if (oldVnode.elm.isComponent) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance; // console.log(vnode)

      return;
    }
    /* 两个节点全等，不做改变，直接 return  */
    // 如果新老 vnode 相等
    //


    if (oldVnode === vnode) {
      return;
    }

    if (oldVnode.text && oldVnode.text === vnode.text) {
      vnode.elm = oldVnode.elm;
      return;
    }
    /* 当新老节点都是静态节点且 key 都相同时，直接将 componentInstance 与 elm 从老 VNode 节点“拿过来”即可 */


    if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    /* 取新老节点的 elm ，以及它们的孩子节点集合 */


    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.childNodes;
    var ch = vnode.childNodes;
    /* 新节点是文本节点，直接设置文本 */

    if (vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    } else {
      /* 新老节点的孩子节点都存在且不相等，调用 updateChildren 比较孩子节点 */
      // && (oldCh !== ch)
      if (oldCh && ch && ch.length) {
        updateChildren(elm, oldCh, ch);
      } else if (ch && ch.length) {
        /* 只有新节点的孩子节点存在 */

        /* 老节点为文本节点，则首先清除其节点文本内容  */
        if (oldVnode.text) { nodeOps.setTextContent(elm, ''); }
        /* 批量添加新节点 */

        addVnodes(elm, null, ch, 0, ch.length - 1);
      } else if (oldCh && oldCh.length) {
        /* 只有旧节点的孩子节点存在，批量删除 */
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (oldVnode.text) {
        /* 当只有老节点是文本节点的时候，清除其节点文本内容 */
        nodeOps.setTextContent(elm, '');
      }
    }
  });
}
/**
* 比对两个节点的孩子节点集合
*/


function updateChildren(parentElm, oldCh, newCh) {
  /* 定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引 */

  /* 定义 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这索引对应的 VNode 节点 */
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVnode = oldCh[0];
  var oldEndVnode = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVnode = newCh[0];
  var newEndVnode = newCh[newEndIdx];
  /* 定义当前面所有条件都不满足时，才使用的变量，具体后面分析 */

  var oldKeyToIdx, idxInOld, refElm;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    /* 当 oldStartVnode 不存在时，直接更新索引以及对应的节点指向 */
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      /* 当 oldEndVnode 不存在时，直接更新索引以及对应的节点指向 */
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      /* 当两个节点相同时，调用 patchVnode 并更新索引以及对应的节点指向 */
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      /* 当两个节点相同时，调用 patchVnode 并更新索引以及对应的节点指向 */
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right

      /* 当两个节点相同时，调用 patchVnode ，将 oldStartVnode 插入父节点最后并更新索引以及对应的节点指向 */
      patchVnode(oldStartVnode, newEndVnode);
      insert(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm)); // nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))

      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left

      /* 当两个节点相同时，调用 patchVnode ，将oldEndVnode  插入oldStartVnode前面并更新索引以及对应的节点指向 */
      patchVnode(oldEndVnode, newStartVnode);
      insert(parentElm, oldEndVnode.elm, oldStartVnode.elm); // nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)

      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      /* 当以上条件都不满足，调用 createKeyToOldIdx 获取一个 key-索引 的 map 集合 */
      var elmToMove = oldCh[idxInOld];
      if (!oldKeyToIdx) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
      /* 取出对应 key 的节点索引，不存在则为 null  */
      /// / console.log('oldKeyToIdx', oldKeyToIdx)

      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;

      if (!idxInOld) {
        /* 索引不存在，直接创建一个新的节点 */
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        /* 索引存在 */
        elmToMove = oldCh[idxInOld]; // console.log('elmToMove=--------=')

        if (sameVnode(elmToMove, newStartVnode)) {
          /* 两个节点相同，调用 patchVnode 将老节点集合中对应节点赋值为 undefined ，将节点插入 oldStartVnode 之前，更新对应索引 */
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          insert(parentElm, newStartVnode.elm, oldStartVnode.elm); // nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)

          newStartVnode = newCh[++newStartIdx];
        } else {
          /* 两节点不相同，直接创建新节点插入，更新对应索引 */
          createElm(newStartVnode, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }
  /* 终止条件， oldStartIdx > oldEndIdx 说明 newCh 中还有剩余节点，直接批量添加 */


  if (oldStartIdx > oldEndIdx) {
    // console.log('============')
    // console.log('', newStartIdx, newEndIdx, newCh)
    refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    var fgm = document.createDocumentFragment();
    addVnodes(fgm, refElm, newCh, newStartIdx, newEndIdx);
    parentElm.appendChild(fgm);
  } else if (newStartIdx > newEndIdx) {
    /* 终止条件， newStartIdx > newEndIdx 说明 oldCh 中还有剩余节点，直接批量删除 */
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
/**
* 创建一个 key-索引 对应 map 表
*/


function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }

  return map;
}

/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 15:48:08
 */

var lifeCycle = {
  // 初始化前
  beforeInit: function beforeInit(context) {
    _run(context, '$beforeInit');
  },
  // 创建实例之前
  beforeCreate: function beforeCreate(context) {
    _run(context, '$beforeCreate');
  },
  // 创建实例
  created: function created(context) {
    _run(context, '$created');
  },
  // 挂在数据之前
  beforeMount: function beforeMount(context) {
    _run(context, '$beforeMount');
  },
  // 挂在数据
  mounted: function mounted(context) {
    _run(context, '$mounted'); // runOnReadyElmFn(context.elm)


    if (context.elm && context.elm.onReady) {
      typeof context.elm.onReady === 'function' && context.elm.onReady();
    } else {
      Object.defineProperty(context.elm, 'onReady', {
        configurable: false,
        enumerable: true,
        get: function proxyGetter() {
          return function () {};
        },
        set: function proxySetter(newVal) {
          typeof newVal === 'function' && newVal.call(context.elm);
        }
      });
    }
  },
  // 更新之前
  beforeUpdate: function beforeUpdate(context) {
    _run(context, '$beforeUpdate');
  },
  // 更新之后
  updated: function updated(context) {
    return _run(context, '$updated') || void 0;
  },
  // 即将销毁
  beforeDestroyed: function beforeDestroyed(context) {
    if (context.$router && context.$router.keepLive) { return; }

    _run(context, '$beforeDestroyed');
  },
  // 销毁后
  destroyed: function destroyed(context) {
    if (context.$router && context.$router.keepLive) { return; }

    _run(context, '$destroyed');

    context[$ComponentSymbol] = null;
    context[$vdomSymbol] = null;
    context.elm = null;
    context.$dom = null;
    context.isDestoryed = true;
    context.mutation = null;
    context.Destory = null;
    context.ChildComponentsManage = null;
  }
};

function _run(context, name) {
  try {
    if (context['lifeCycleCall'] && context.lifeCycleCall[name.substr(1, name.length) + '_callfn']) {
      forEach(context.lifeCycleCall[name.substr(1, name.length) + '_callfn'], function (v) {
        return v();
      });
    }
  } catch (e) {}

  return context[name] && typeof context[name] === 'function' ? context[name]() : undefined;
}

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-06-25 13:56:05
 */
var cacheData = {};
var cacheLib = {
  get: function get(key) {
    // console.log('cacheData', cacheData)
    return cacheData[key] || null;
  },
  set: function set(key, value) {
    cacheData[key] = value;
  },
  del: function del(key) {
    delete cacheData[key];
  }
};

var destoryId = 0;

var Destory =
/*#__PURE__*/
function () {
  function Destory(context) {
    classCallCheck(this, Destory);

    this.id = 'beforeDestroyedCall' + '-' + (context._eid || guid2());
    cacheLib.set(this.id, {});
  }

  createClass(Destory, [{
    key: "get",
    value: function get() {
      return cacheLib.get(this.id);
    }
  }, {
    key: "add",
    value: function add(fn) {
      var beforeDestroyedCall = this.get();
      var guid = ++destoryId;
      beforeDestroyedCall[guid] = fn;
      beforeDestroyedCall = null;
      return guid;
    }
  }, {
    key: "del",
    value: function del(eventId) {
      var beforeDestroyedCall = this.get();
      var fn = beforeDestroyedCall[eventId];
      delete beforeDestroyedCall[eventId];
      beforeDestroyedCall = null;
      return fn;
    }
  }, {
    key: "run",
    value: function run() {
      var beforeDestroyedCall = this.get();

      for (var i in beforeDestroyedCall) {
        typeof beforeDestroyedCall[i] === 'function' && beforeDestroyedCall[i]();
      }

      beforeDestroyedCall = null;
      cacheLib.del(this.id);
    }
  }]);

  return Destory;
}();

var ChildComponentsManage =
/*#__PURE__*/
function () {
  function ChildComponentsManage(context) {
    classCallCheck(this, ChildComponentsManage);

    this.id = 'childComponents' + '-' + (context._eid || guid2());
    cacheLib.set(this.id, {});
  }

  createClass(ChildComponentsManage, [{
    key: "get",
    value: function get(_eid) {
      if (_eid) ; else {
        return cacheLib.get(this.id);
      }
    }
  }, {
    key: "add",
    value: function add(App) {
      var Apps = this.get();
      Apps[App._eid] = App;
    }
  }, {
    key: "del",
    value: function del(index) {
      if (this.isDestorying) {
        return null;
      }

      var Apps = this.get();
      var app = Apps[index];
      delete Apps[index];
      return app;
    }
  }, {
    key: "destory",
    value: function destory() {
      var Apps = this.get();
      this.isDestorying = true;

      for (var i in Apps) {
        Apps[i].__beforeDisconnectedCallback();

        Apps[i].__disconnectedCallback();

        delete Apps[i];
      }

      this.isDestorying = false; // forEach(Apps, (app) => {
      //   console.log('app', app)
      //   app.__beforeDisconnectedCallback()
      //   app.__disconnectedCallback()
      // })

      Apps = null;
      cacheLib.del(this.id);
    }
  }]);

  return ChildComponentsManage;
}();

var componenesSize = {};
var styleIsInstalled = {};

function _init() {
  var _this = this;

  lifeCycle.beforeCreate(this);
  create.call(this);
  lifeCycle.created(this);
  lifeCycle.beforeMount(this);
  createdComponent.call(this);
  componentUtil_7(this);
  initRefs.call(this);
  lifeCycle.mounted(this);

  this.update = function () {
    _update(_this);
  };

  if (this.isbyUsedByuser) {
    _update(this);

    delete this.isbyUsedByuser;
  }
}

function create() {
  var _this2 = this;

  if (this.elm) {
    // 现在都走这个
    this._childrenOri = this.elm.children.length ? map(this.elm.children, function (v) {
      return delChildrenOriThatFromYam(v, _this2);
    }) : undefined;
    this.elm._childrenOri = this._childrenOri;

    if (this._childrenOri) {
      // 开启把原有的 子集销毁
      // eslint-disable-next-line no-cond-assign
      for (var j = 0, child; child = this.elm.children[j];) {
        this.elm.removeChild(child);
      }
    }

    bindElmentEvent(this);
    componentUtil_5(this.elm, this);
  } else {
    this.elm = this;
  } // 设置元素信息


  this.elm._eid = this._eid; // _extends(this.$config(), this)

  var data = this[$componentDataSymbol] = this.$data();

  if (this._props) {
    this._props.forEach(function (v) {
      var propVal = _this2.props ? _this2.props[v] : _this2.elm.getAttribute(v);
      data[v] = typeof propVal === 'number' || typeof propVal === 'string' ? propVal : propVal || data[v] || null; // setAttributes(this, v, this.getAttribute(v))
    });

    if (!this.props) {
      this.mutation = creatMutationObserser(this.elm, function (record) {
        if (record.type === 'attributes') {
          setAttributes(_this2, record.attributeName, _this2.elm.getAttribute(record.attributeName) || data[record.attributeName] || null);

          _update(_this2);
        }
      }, {
        attributeFilter: this._props
      }); // 绑定 原声元素上的方法

      forEach(this.elm.attributes, function (v) {
        if (typeof window[v.value] === 'function') {
          _this2.elm._runfn_ = _this2.elm._runfn_ || {};
          _this2.elm._runfn_[componentUtil_1(_this2, v.name)] = window[v.value];

          _this2.elm.removeAttribute(v.name);
        }
      }); // 添加 监听事件， 适配三方框架

      this.addWatcher = this.elm.addWatcher = function (names) {
        var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        // 添加监听方法
        _this2.elm._runfn_ = _this2.elm._runfn_ || {};
        _this2.elm._runfn_[componentUtil_1(_this2, names)] = fn;
      };

      var handle = function handle(e) {
        // console.log('DOMNodeRemoved', e)
        if (e.target._eid && e.target._eid === _this2.elm._eid) {
          _this2.elm.parentNode.removeEventListener('DOMNodeRemoved', handle, false);

          if (_this2.elm.disconnectedCallback) {
            _this2.elm.beforeDisconnectedCallback();

            _this2.elm.disconnectedCallback();
          }
        }
      }; // 绑定 移除事件


      this.elm.parentNode.addEventListener('DOMNodeRemoved', handle, false);
    }
  }

  Object.keys(data).forEach(function (key) {
    Object.defineProperty(_this2, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return this[$componentDataSymbol][key];
      },
      set: function proxySetter(newVal) {
        this[$componentDataSymbol][key] = newVal;

        _update(this);
      }
    });

    if (_typeof_1(_this2[$componentDataSymbol][key]) === 'object' && !Array.isArray(_this2[$componentDataSymbol][key])) ;
  });
}

function _update(context) {
  // console.log('_update', context, context.__isWillupdate, context.__stopUpdata)
  if (context.__isWillupdate) {
    clearTimeout(context.__isWillupdate);
    context.__isWillupdate = null;
  }

  context.__isWillupdate = setTimeout(function () {
    context.__isWillupdate = null;
    update.call(context);
  }, 20);
}

function initRefs() {
  var _this3 = this;

  this.$refs = this.$refs || {};

  this.__shadowRoot.querySelectorAll('[ref]').forEach(function (v) {
    _this3.$refs[v.getAttribute('ref')] = v.isComponent ? componentUtil_4(v) : v;
    v.removeAttribute('ref');
  });
} // 创建组件


function createdComponent() {
  if (this.render) {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerText = this._style;

    if (this._shadow) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = nodeOps.setAttachShadow(this.elm, {
        mode: 'closed'
      }));
      componenesSize[this._tagName] = componenesSize[this._tagName] ? componenesSize[this._tagName] + 1 : 1;
      shadowRoot._root = this._tagName + '-' + componenesSize[this._tagName];
      shadowRoot._parentElement = this.elm;
      shadowRoot._parentNode = this.elm;
      nodeOps.appendChild(shadowRoot, style);
      nodeOps.appendChild(shadowRoot, getFram.call(this, true)); // console.log('shadowRoot', shadowRoot)
    } else {
      this.__shadowRoot = this.elm;
      nodeOps.appendChild(this.elm, getFram.call(this));
      var parent = this.elm;

      while ((parent.parentElement || parent._parentElement) && parent.nodeType !== 11) {
        parent = parent.parentNode || parent._parentNode;
      }

      var nameStyle = parent.tagName === 'HTML' ? 'HTML' : parent._root ? parent._root : parent.parentNode ? parent.parentNode._root || parent.parentNode.host.tagName : 'HTML';

      if (!styleIsInstalled[nameStyle]) {
        styleIsInstalled[nameStyle] = [];
      }

      if (!styleIsInstalled[nameStyle].includes(this._cid)) {
        if (nameStyle === 'HTML') {
          // body
          document.head.appendChild(style);
        } else {
          // div inner
          parent.insertBefore(style, parent.lastChild);
        } // nameStyle


        styleIsInstalled[nameStyle].push(this._cid);
      }
    } //

  }
} // 若不是 自定元素仅仅值一个自定义组件需要绑定 相应的到元素上事件


function bindElmentEvent(context) {
  componentUtil_2(context);
  context.elm.disconnectedCallback = context.__disconnectedCallback.bind(context);
  context.elm.beforeDisconnectedCallback = context.__beforeDisconnectedCallback.bind(context);

  if (context._canBeCalledExt) {
    // 获取子组件
    context.elm.$refs = function (name) {
      return name ? context.$refs[name] || null : context.$refs;
    }; // 调用组件的方法


    context.elm.emit = function () {
      return context.emit.apply(context, arguments);
    }; // 调用父组件的方法


    context.elm.emitProp = function () {
      return context.emitProp.apply(context, arguments);
    }; // context.elm.emit = (fnName) => {

  } // delFlag(context, '_canBeCalledExt')

} // 删除标示


function getFram() {
  var isNeedDiv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (isNeedDiv) {
    this.$dom = document.createElement('div');
  } else {
    this.$dom = document.createElement('div');
  }

  this.$dom.setAttribute('dom', this._cid);

  try {
    this[$vdomSymbol] = this.render(); // console.log(this[$vdomSymbol])

    this[$vdomSymbol]._rootId = this._rootId;
  } catch (e) {
    log('e', e);
  } // this.$dom._childrenOri = this._childrenOri


  this.$dom._parentElement = this.__shadowRoot;
  this.$dom._parentNode = this.__shadowRoot;
  patch(this.$dom, this[$vdomSymbol]);
  this.$dom._eid = this._eid;
  return this.$dom;
} // 更新dom


function update() {
  var _this4 = this;

  // 优化 update 默认在¥updated内方法 只是数据更新不是dom更新
  if (this.__stopUpdata) { return; }
  lifeCycle.beforeUpdate(this);
  setTimeout(function () {
    if (_this4[$vdomSymbol]) {
      // console.time('------$update')
      var newNode = _this4.render();

      var oldNode = _this4[$vdomSymbol];
      _this4[$vdomSymbol] = newNode;
      _this4[$vdomSymbol]._rootId = _this4._rootId;
      patch(_this4.$dom, newNode, oldNode); // console.timeEnd('------$update')

      if (isFalse(lifeCycle.updated(_this4))) {
        _this4.__stopUpdata = true;
        setTimeout(function () {
          _this4.__stopUpdata = false;
        }, 500);
      }
    }
  });
} // 处理  已经初始化的组件，再次初始化问题 -- vue 非编译版本出现问题


function delChildrenOriThatFromYam(child, context) {
  if (!child) { return child; }

  if (child.getAttribute('dom') === 'com-' + context._tagName) {
    return null;
  }

  return child;
}

function init(context) {
  // 初始化 配置信息
  _init.call(context);
} // 初始化 参数和数据

function initConfig() {
  this.Destory = new Destory(this);
  this.ChildComponentsManage = new ChildComponentsManage(this);
}

var canUseCustomElements = !!(window.customElements && window.customElements.define);

var HTML_TAGS = {
  a: {
    name: 'a',
    attributes: {
      download: 'download',
      href: 'href',
      hrefLang: 'hreflang',
      ping: 'ping',
      referrerPolicy: 'referrerpolicy',
      rel: 'rel',
      target: 'target',
      type: 'type'
    }
  },
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: {
    name: 'audio',
    attributes: {
      autoPlay: 'autoplay',
      autoBuffer: 'autobuffer',
      buffered: 'buffered',
      controls: 'controls',
      loop: 'loop',
      muted: 'muted',
      played: 'played',
      preload: 'preload',
      src: 'src',
      volume: 'volume'
    }
  },
  blockquote: 'blockquote',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  br: 'br',
  button: {
    name: 'button',
    attributes: {
      autoFocus: 'autofocus',
      disabled: 'disabled',
      form: 'form',
      formAction: 'formaction',
      formMethod: 'formmethod',
      formType: 'formtype',
      formValidate: 'formvalidate',
      formTarget: 'formtarget',
      type: 'type',
      value: 'value'
    }
  },
  canvas: {
    name: 'canvas',
    attributes: {
      height: 'height',
      width: 'width'
    }
  },
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: {
    name: 'data',
    attributes: {
      value: 'value'
    }
  },
  datalist: 'datalist',
  dfn: 'dfn',
  div: 'div',
  dd: 'dd',
  del: 'del',
  details: {
    name: 'details',
    attributes: {
      open: 'open'
    }
  },
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: {
    name: 'embed',
    attributes: {
      height: 'height',
      src: 'src',
      type: 'type',
      width: 'width'
    }
  },
  fieldset: {
    name: 'fieldset',
    attributes: {
      disabled: 'disabled',
      form: 'form',
      name: 'name'
    }
  },
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: {
    name: 'form',
    attributes: {
      acceptCharset: 'accept-charset',
      action: 'action',
      autocomplete: 'autocomplete',
      enctype: 'enctype',
      method: 'method',
      name: 'name',
      noValidate: 'novalidate',
      target: 'target'
    }
  },
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  i: 'i',
  input: {
    name: 'input',
    attributes: {
      accept: 'accept',
      autoFocus: 'autofocus',
      autoComplete: 'autocomplete',
      checked: 'checked',
      disabled: 'disabled',
      form: 'form',
      formAction: 'formaction',
      formMethod: 'formmethod',
      formType: 'formtype',
      formValidate: 'formvalidate',
      formTarget: 'formtarget',
      height: 'height',
      list: 'list',
      max: 'max',
      maxLength: 'maxlength',
      min: 'min',
      minLength: 'minlength',
      multiple: 'multiple',
      name: 'name',
      placeholder: 'placeholder',
      readOnly: 'readonly',
      required: 'required',
      size: 'size',
      src: 'src',
      step: 'step',
      type: 'type',
      value: 'value',
      width: 'width'
    }
  },
  img: {
    name: 'img',
    attributes: {
      alt: 'alt',
      crossOrigin: 'crossorigin',
      height: 'height',
      isMap: 'ismap',
      longDesc: 'longdesc',
      referrerPolicy: 'referrerpolicy',
      sizes: 'sizes',
      src: 'src',
      srcset: 'srcset',
      width: 'width',
      useMap: 'usemap'
    }
  },
  ins: 'ins',
  kbd: 'kbd',
  label: {
    name: 'label',
    attributes: {
      htmlFor: 'for'
    }
  },
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: {
    name: 'map',
    attributes: {
      name: 'name'
    }
  },
  mark: 'mark',
  meta: 'meta',
  meter: {
    name: 'meter',
    attributes: {
      form: 'form',
      high: 'high',
      low: 'low',
      min: 'min',
      max: 'max',
      optimum: 'optimum',
      value: 'value'
    }
  },
  nav: 'nav',
  ol: 'ol',
  object: {
    name: 'object',
    attributes: {
      form: 'form',
      height: 'height',
      name: 'name',
      type: 'type',
      typeMustmatch: 'typemustmatch',
      useMap: 'usemap',
      width: 'width'
    }
  },
  optgroup: {
    name: 'optgroup',
    attributes: {
      disabled: 'disabled',
      label: 'label'
    }
  },
  option: {
    name: 'option',
    attributes: {
      disabled: 'disabled',
      label: 'label',
      selected: 'selected',
      value: 'value'
    }
  },
  output: {
    name: 'output',
    attributes: {
      htmlFor: 'for',
      form: 'form',
      name: 'name'
    }
  },
  p: 'p',
  param: {
    name: 'param',
    attributes: {
      name: 'name',
      value: 'value'
    }
  },
  pre: 'pre',
  progress: {
    name: 'progress',
    attributes: {
      max: 'max',
      value: 'value'
    }
  },
  rp: 'rp',
  rt: 'rt',
  rtc: 'rtc',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  section: 'section',
  select: {
    name: 'select',
    attributes: {
      autoFocus: 'autofocus',
      disabled: 'disabled',
      form: 'form',
      multiple: 'multiple',
      name: 'name',
      required: 'required',
      size: 'size'
    }
  },
  small: 'small',
  source: {
    name: 'source',
    attributes: {
      media: 'media',
      sizes: 'sizes',
      src: 'src',
      srcset: 'srcset',
      type: 'type'
    }
  },
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  th: 'th',
  thead: 'thead',
  textarea: {
    name: 'textarea',
    attributes: {
      autoComplete: 'autocomplete',
      autoFocus: 'autofocus',
      cols: 'cols',
      disabled: 'disabled',
      form: 'form',
      maxLength: 'maxlength',
      minLength: 'minlength',
      name: 'name',
      placeholder: 'placeholder',
      readOnly: 'readonly',
      required: 'required',
      rows: 'rows',
      selectionDirection: 'selectionDirection',
      wrap: 'wrap'
    }
  },
  td: 'td',
  tfoot: 'tfoot',
  tr: 'tr',
  track: {
    name: 'track',
    attributes: {
      htmlDefault: 'default',
      kind: 'kind',
      label: 'label',
      src: 'src',
      srclang: 'srclang'
    }
  },
  time: 'time',
  title: 'title',
  u: 'u',
  ul: 'ul',
  video: {
    name: 'video',
    attributes: {
      autoPlay: 'autoplay',
      buffered: 'buffered',
      controls: 'controls',
      crossOrigin: 'crossorigin',
      height: 'height',
      loop: 'loop',
      muted: 'muted',
      played: 'played',
      poster: 'poster',
      preload: 'preload',
      src: 'src',
      width: 'width'
    }
  },
  slot: {
    name: 'div',
    attributes: {
      'name': 'name'
    }
  },
  iframe: {
    name: 'iframe',
    attributes: {
      frameborder: 'frameborder',
      allowtransparency: 'allowtransparency',
      allowfullscreen: 'allowfullscreen',
      scrolling: 'scrolling',
      height: 'height',
      title: 'title',
      src: 'src',
      width: 'width'
    }
  }
};
var GLOBAL_ATTRIBUTES = {
  accessKey: 'accesskey',
  className: 'class',
  contentEditable: 'contenteditable',
  contextMenu: 'contextmenu',
  dir: 'dir',
  draggable: 'draggable',
  dropZone: 'dropzone',
  hidden: 'hidden',
  id: 'id',
  itemId: 'itemid',
  itemProp: 'itemprop',
  itemRef: 'itemref',
  itemScope: 'itemscope',
  itemType: 'itemtype',
  lang: 'lang',
  spellCheck: 'spellcheck',
  tabIndex: 'tabindex',
  title: 'title',
  translate: 'translate',
  ref: 'ref'
};
var EVENT_HANDLERS = {
  onClick: 'click',
  onFocus: 'focus',
  onBlur: 'blur',
  onChange: 'change',
  onSubmit: 'submit',
  onInput: 'input',
  onResize: 'resize',
  onScroll: 'scroll',
  onWheel: 'mousewheel',
  onMouseUp: 'mouseup',
  onMouseDown: 'mousedown',
  onMouseMove: 'mousemove',
  onMouseEnter: 'mouseenter',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onMouseLeave: 'mouseleave',
  onTouchStart: 'touchstart',
  onTouchEnd: 'touchend',
  onTouchCancel: 'touchcancel',
  onContextMenu: 'Ccntextmenu',
  onDoubleClick: 'dblclick',
  onDrag: 'drag',
  onDragEnd: 'dragend',
  onDragEnter: 'dragenter',
  onDragExit: 'dragexit',
  onDragLeave: 'dragleave',
  onDragOver: 'dragover',
  onDragStart: 'Dragstart',
  onDrop: 'drop',
  onLoad: 'load',
  onCopy: 'copy',
  onCut: 'cut',
  onPaste: 'paste',
  onCompositionEnd: 'compositionend',
  onCompositionStart: 'compositionstart',
  onCompositionUpdate: 'compositionupdate',
  onKeyDown: 'keydown',
  onKeyPress: 'keypress',
  onKeyUp: 'keyup',
  onAbort: 'Abort',
  onCanPlay: 'canplay',
  onCanPlayThrough: 'canplaythrough',
  onDurationChange: 'durationchange',
  onEmptied: 'emptied',
  onEncrypted: 'encrypted ',
  onEnded: 'ended',
  onError: 'error',
  onLoadedData: 'loadeddata',
  onLoadedMetadata: 'loadedmetadata',
  onLoadStart: 'Loadstart',
  onPause: 'pause',
  onPlay: 'play ',
  onPlaying: 'playing',
  onProgress: 'progress',
  onRateChange: 'ratechange',
  onSeeked: 'seeked',
  onSeeking: 'seeking',
  onStalled: 'stalled',
  onSuspend: 'suspend ',
  onTimeUpdate: 'timeupdate',
  onVolumeChange: 'volumechange',
  onWaiting: 'waiting',
  onAnimationStart: 'animationstart',
  onAnimationEnd: 'animationend',
  onAnimationIteration: 'animationiteration',
  onTransitionEnd: 'transitionend'
};

Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce(function (acc, val) {
    return Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val);
  }, []);
}; // let i = 0


var Element =
/*#__PURE__*/
function () {
  function Element(tagName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var childNodes = arguments.length > 2 ? arguments[2] : undefined;

    var _root = arguments.length > 3 ? arguments[3] : undefined;

    var isText = arguments.length > 4 ? arguments[4] : undefined;

    classCallCheck(this, Element);

    if (isText) {
      this.tagName = tagName;
      this.props = props;
      this.text = childNodes;
      this.childNodes = undefined;
      this.isText = true;
    } else {

      this.tagName = tagName;
      this.props = props || {};
      this.childNodes = Array.isArray(childNodes) ? childNodes.flat(3) : [childNodes];
      this.childNodes = this.childNodes.map(function (v, key) {
        // if (typeof v === 'string' || typeof v === 'number' || typeof v === 'function' || typeof v === 'undefined' || typeof v === 'null') {
        if (_typeof_1(v) !== 'object' || v === null) {
          v = new Element('textNode', '', v + '', _root, true);
        } else if (!v.tagName) {
          try {
            v = new Element('textNode', '', JSON.stringify(v) + '', _root, true);
          } catch (e) {
            v = new Element('textNode', '', '无法识别', _root, true);
          }
        }

        v.key = key;
        return v;
      });
      var tag = HTML_TAGS[this.tagName] || this.tagName;
      var object = _typeof_1(tag) === 'object';
      var tagClass = typeof tag === 'function';
      var localAttrs = object ? tag.attributes || {} : {};
      var attrs = Object.assign({}, GLOBAL_ATTRIBUTES, localAttrs);
      var tagType = object ? tag.name : tagClass ? tag._tagName : tag;
      this.isElement = tagClass ? tag.customElements : true;
      this.tagType = tagType;
      this.needClass = tagClass || object && tag.isComponent;
      this.class = this.needClass && (tag.class || tag);
      this.attrs = attrs;
      this._name = toCamelCase(tagType);
    }

    this._root = _root; // 带搞根结点
  }

  createClass(Element, [{
    key: "render",
    value: function render() {
      var _this = this;
      var parentELm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.isText) {
        this.elm = document.createTextNode(this.text);
        return this.elm;
      }

      var el = null;
      var slot = []; // 自定义webcomponent

      if (this.needClass) {
        var cacheDom = document.createElement('div'); // 回调

        cacheDom._parentNode = parentELm;
        cacheDom._parentElement = parentELm; // fix 隐藏 component 使用方法调用
        //  eslint-disable-next-line new-cap

        var component = new this.class();
        component.props = this.props;
        component.renderAt(cacheDom);
        componentUtil_5(cacheDom, component);
        el = cacheDom; // 自定义组件 挂在在其父级的自定义组件上

        var parentCom = componentUtil_6(parentELm);

        if (parentCom && parentCom.ChildComponentsManage) {
          parentCom.ChildComponentsManage.add(component);
          parentCom = null;
        }

        component = null;
      } else {
        el = document.createElement(this.tagType); // 处理 slot 更新

        if (this.tagName === 'slot') {
          el.setAttribute('tag', 'slot');
          var mark = componentUtil_3(parentELm);
          el.isBelong = mark._name;
          doAfterSlotUpdate(el, this, mark.elm.rand, mark); // 添加 移除时的事件

          el.disconnectedCallback = function () {
            setSlotState(mark, _this.props.name, false);
          };
        }

        el._parentNode = parentELm;
        el._parentElement = parentELm;
      }

      slot = el.querySelectorAll('[tag=slot]'); // el.props = this.props

      if (this.props) {
        Object.keys(this.props).forEach(function (prop) {
          if (prop in _this.attrs) {
            el.setAttribute(_this.attrs[prop], _this.props[prop]);
          } else if (prop in EVENT_HANDLERS) {
            el.addEventListener(EVENT_HANDLERS[prop], _this.props[prop]);
          } else if (typeof _this.props[prop] !== 'function' && !_this.class) {
            el.setAttribute(prop, _this.props[prop]);
          } else if (typeof _this.props[prop] === 'function' && _this.isElement) {
            // let fnName = getCallFnName(this, prop) // `${this.tagType}_${prop}_fn`
            el._runfn_ = el._runfn_ || {};
            el._runfn_[componentUtil_1(_this, prop)] = _this.props[prop]; // el.setAttribute(prop, fnName)
          }
        }); // 兼容 style 是字符串形式

        if ('style' in this.props) {
          var styles = this.props.style;

          if (_typeof_1(styles) === 'object') {
            Object.keys(styles).forEach(function (prop) {
              var value = styles[prop];

              if (typeof value === 'number') {
                if (prop !== 'zIndex') {
                  el.style[prop] = "".concat(value, "px");
                } else {
                  el.style[prop] = "".concat(value);
                }
              } else if (typeof value === 'string') {
                el.style[prop] = value;
              } else {
                throw new Error("Expected \"number\" or \"string\" but received \"".concat(_typeof_1(value), "\""));
              }
            });
          } else {
            el.setAttribute('style', styles);
          }
        }
      }

      if (slot.length) {
        forEach(slot, function (v) {
          setSlotState(componentUtil_4(el), v.getAttribute('name'), false);
        });
      }

      this.childNodes.forEach(function (child, key) {
        // 优化若是null 就不进行下一步操作了
        var newParents = getRenderElmBySlot(slot, child, el);

        if (newParents) {
          nodeOps.appendChild(newParents, child.render(key, el));
        }
      }); // 组件内部使用

      if (slot.length && this.childNodes) {
        this.rand = this.rand || Math.random();
        el.rand = this.rand;
        cacheLib.set(this._name + 'slot-' + this.rand, this.childNodes);
        var coms = componentUtil_4(el);

        if (el.beforeDisconnectedCallback) {
          coms.addDestory(function () {
            cacheLib.del(_this._name + 'slot-' + _this.rand);
          });
        } // 检测插槽 是否有内容填充


        coms = null;
      } // 处理组件在最顶层时 slot 情况


      var comsOri = componentUtil_6(parentELm._parentElement);

      if (comsOri && comsOri._childrenOri) {
        slot = el.querySelectorAll('[tag=slot]');
        comsOri.elm.rand = comsOri.elm.rand || Math.random();
        this.rand = comsOri.elm.rand;
        var _names = comsOri._name;
        cacheLib.set(_names + 'slot-' + this.rand, comsOri._childrenOri); // 组件使用结束-销毁

        comsOri.addDestory(function () {
          cacheLib.del(_names + 'slot-' + _this.rand);
        });
        comsOri = null;
      }

      this.elm = el;
      return this.elm;
    }
  }]);

  return Element;
}(); // do slot 更新后的slot数据渲染
// 只有


function doAfterSlotUpdate(el, context, rand, parentCom) {
  var childNodes = cacheLib.get(el.isBelong + 'slot-' + rand); // console.log('doAfterSlotUpdate', rand, childNodes, el, context, el.isBelong + 'slot-' + rand)

  if (childNodes && childNodes.length) {
    var name = context.props.name;
    var hasSlothContent = false;
    forEach(childNodes, function (v, i) {
      if (name) {
        if (v.render && v.props) {
          if (name === v.props.slot) {
            nodeOps.appendChild(el, v.render(i, el));
            hasSlothContent = !0;
          }
        } else {
          if (name === v.getAttribute('slot')) {
            nodeOps.appendChild(el, v);
            hasSlothContent = !0;
          }
        }
      } else {
        if (v.render) {
          nodeOps.appendChild(el, v.render(i, el));
          hasSlothContent = !0;
        } else {
          nodeOps.appendChild(el, v);
          hasSlothContent = !0;
        }
      }
    }); // console.log(parentCom, name, hasSlothContent)

    setSlotState(parentCom, name, hasSlothContent);
  }
} // 修改 slot状态


function setSlotState(coms, name, hasSlothContent) {
  // 标注slot是否有东西
  coms.$slot = coms.$slot || {};

  if (name) {
    coms.$slot[name] = hasSlothContent;
  } else {
    coms.$slot[0] = hasSlothContent;
  }
} // 添加 组件内slot 区分；slot不能越级渲染,越级渲染只是处在顶层组件中


function getRenderElmBySlot(slot, child, el) {
  var slotBelong = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  // 先获取 slot所属一样的
  if (slot.length) {
    var slotName = child.props ? child.props.slot : child.attributes ? child.getAttribute('slot') : false;

    if (slotName) {
      var l = 0; // eslint-disable-next-line no-cond-assign

      for (var i = 0, v; v = slot[i]; i++) {
        if (slotBelong && slotBelong !== v.isBelong) {
          continue;
        }

        l++;

        if ((!slotBelong || l > 1) && !v.getAttribute('name')) {
          console.warn("\n          \u5F53 \u3010slot\u3011 \u591A\u4E8E\u4E00\u4E2A\u7684\u65F6\u5019\uFF0C\u5FC5\u987B\u8981\u7528name\u533A\u5206\u5F00\uFF0C\n\n          \u5426\u5219\u5C06\u5728\u3010slot\u3011\u51FA\u73B0\u6539\u52A8\u7684\u65F6\u5019\u4F1A\u65F6\u3010slot\u3011\u6E32\u67D3\u51FA\u9519\n\n          >> \u4F4D\u4E8E \u3010".concat(v.isBelong, "\u3011 \u7EC4\u4EF6\u5185\n          "));
        }

        if (v.getAttribute('name') === slotName) {
          setSlotState(componentUtil_4(el), slotName, true);
          return v;
        }
      } // 修改成 若指定了 slot 必须渲染到改slot里


      return null;
    } else {
      var _l = []; // eslint-disable-next-line no-cond-assign

      for (var _i = 0, _v; _v = slot[_i]; _i++) {
        if (slotBelong && slotBelong !== _v.isBelong) {
          continue;
        }

        _l.push(_v);

        if ((!slotBelong || _l.length > 1) && !_v.getAttribute('name')) {
          console.warn("\n          \u5F53 \u3010slot\u3011 \u591A\u4E8E\u4E00\u4E2A\u7684\u65F6\u5019\uFF0C\u5FC5\u987B\u8981\u7528name\u533A\u5206\u5F00\uFF0C\n\n          \u5426\u5219\u5C06\u5728\u3010slot\u3011\u51FA\u73B0\u6539\u52A8\u7684\u65F6\u5019\u4F1A\u65F6\u3010slot\u3011\u6E32\u67D3\u51FA\u9519\n\n          >> \u4F4D\u4E8E \u3010".concat(_v.isBelong, "\u3011 \u7EC4\u4EF6\u5185\n          "));
        }
      } // 修复 只有一个slot且存在name时没有指定slot值不再渲染


      if (_l.length === 1 && !_l[0].getAttribute('name')) {
        return _l[_l.length - 1];
      }
    }

    return null;
  } // 优化 若是组件没有slot将不渲染


  return el.isComponent ? null : el;
}
function createElementJson(tagName) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var childNodes = arguments.length > 2 ? arguments[2] : undefined;
  var root = arguments.length > 3 ? arguments[3] : undefined;
  return new Element(tagName, props, childNodes, root);
}

/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 15:46:29
 */
// 预留字段

var reserved = 'constructor __createElement connectedCallback $connectedCallback disconnectedCallback $disconnectedCallback $config $data mutation render $beforeCreate $created $beforeMount $mounted $beforeDestroyed $destroyed $beforeUpdate $updated renderAt emit emitProp __connectedCallback __disconnectedCallback __beforeDisconnectedCallback _config __isWillupdate'; // 安装的扩展

var installed = [];
window.parant = [];
function Mix() {
  return function (Target) {
    Target.__createElement = function (tagName) {
      var arguments$1 = arguments;

      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      for (var _len = arguments.length, childNodes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        childNodes[_key - 2] = arguments$1[_key];
      }

      // childNodes = childNodes.length ? childNodes : undefined
      return createElementJson(tagName, props, childNodes);
    };

    Target.use = function () {
      var Config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      /**
       * obj={
       *  name:'',
       * install:function(baseConpoment){}
       * }
       *  */
      var name = Config.name,
          needs = Config.needs;

      if (!name) {
        console.warn("\n            \u5FC5\u987B\u586B\u5199name\n          ");
        return false;
      }

      if (typeof Config.install !== 'function') {
        console.warn("\n            install \u5FC5\u987B\u662F\u4E2A\u65B9\u6CD5\n          ");
        return false;
      }

      if (needs) {
        if (typeof needs === 'string') {
          needs = [needs];
        }

        forEach(needs, function (v) {
          if (!installed.includes(v)) {
            console.info("%c \u8BE5\u6269\u5C55\u3010 ".concat(name, " \u3011\u9700\u8981\u4F9D\u8D56 \u3010").concat(v, "\u3011\u6269\u5C55"), 'background:#ff0');
          }
        });
      }

      if (installed.includes(name)) {
        console.info("\u5DF2\u7ECF\u6CE8\u518C\u6B64\u6269\u5C55:".concat(name));
      } else {
        installed.push(name);
        Config.install(addPrototype(Target, name));
      }
    };
  };
}

function addPrototype(Target, name) {
  return {
    /**
     * @summary 获取原有的方法
     * @param {type} 方法名
     * @return 方法
     */
    getPrototype: function getPrototype(type) {
      return Target.prototype[type] || null;
    },

    /**
     * @summary 设置的方法
     * @param {type} 方法名
     */
    addPrototype: function addPrototype(type, fn) {
      var isCovered = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (reserved.includes(type) || Target.prototype[type]) {
        if (isCovered) {
          console.info("\n          ============\n          \u65B9\u6CD5\u540D\uFF1A".concat(type, " \u5DF2\u5B58\u5728\uFF0C\u5C06\u88AB\u3010").concat(name, "\u63D2\u4EF6\u3011\u4E2D\u7684 ").concat(type, " \u65B9\u6CD5\u8986\u76D6\n          \u8BE5\u8986\u76D6\u65B9\u6CD5\u5C06\u5F71\u54CD\u5230\u3010").concat(Target.prototype[type]['pluginsName'] ? Target.prototype[type]['pluginsName'] + ' 插件' : '框架', "\u3011\u4E2D\u4F7F\u7528\uFF0C\u8BF7\u8C28\u614E\u5904\u7406\n          ============\n          "));
        } else {
          console.info("\n          \u65B9\u6CD5\u540D\uFF1A".concat(type, " \u5DF2\u5B58\u5728\uFF0C\u8BF7\u4FEE\u6539\n          \n          \u8BE5\u65B9\u6CD5\u662F\u51FA\u73B0\u5728 \u3010").concat(Target.prototype[type]['pluginsName'] ? Target.prototype[type]['pluginsName'] + ' 插件' : '框架', "\u3011\u4E2D\uFF0C\u8BF7\u4FEE\u6539\u65B9\u6CD5\u518D\u6B21\u5B89\u88C5\u4F7F\u7528\n          "));
          return false;
        }
      }

      Target.prototype[type] = fn;
      Target.prototype[type]['pluginsName'] = name;
    },

    /**
     * @summary 添加自动执行方法,将在mounted时
     * @param {type} 方法名
     */
    addAuto: function addAuto(name, fn) {
      if (typeof fn === 'function') {
        Target.prototype._autoDo = Target.prototype._autoDo || {};

        if (!Target.prototype._autoDo[name]) {
          Target.prototype._autoDo[name] = fn;
        } else {
          console.info("\n          \u81EA\u52A8\u6267\u884C\u7684\u65B9\u6CD5\u540D\uFF1A".concat(name, " \u5DF2\u5B58\u5728\uFF0C\u8BF7\u67E5\u770B\u662F\u5426\u91CD\u590D\u6CE8\u518C\u8BE5\u65B9\u6CD5\n          "));
        }
      }
    }
  };
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) { setPrototypeOf(subClass, superClass); }
}

var inherits = _inherits;

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

var isNativeFunction = _isNativeFunction;

var construct = createCommonjsModule(function (module) {
function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) { return false; }
  if (Reflect.construct.sham) { return false; }
  if (typeof Proxy === "function") { return true; }

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) { setPrototypeOf(instance, Class.prototype); }
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
});

var wrapNativeSuper = createCommonjsModule(function (module) {
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) { return Class; }

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) { return _cache.get(Class); }

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
});

function getCustom(Target) {
  // eslint-disable-next-line
  var ElmApp =
  /*#__PURE__*/
  function (_HTMLElement) {
    inherits(ElmApp, _HTMLElement);

    function ElmApp() {
      classCallCheck(this, ElmApp);

      return possibleConstructorReturn(this, getPrototypeOf(ElmApp).apply(this, arguments));
    }

    createClass(ElmApp, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        // onReadyElmFn(this)
        var comps = new Target();
        comps.renderAt(this);
        componentUtil_5(this, comps);
        comps = null;
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (!this.isUnset) {
          this.isUnset = true;
          var comps = componentUtil_4(this);

          comps.__beforeDisconnectedCallback();

          comps.__disconnectedCallback();
        }
      }
    }]);

    return ElmApp;
  }(wrapNativeSuper(HTMLElement));

  return ElmApp;
}

/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-15 18:49:37
 */
var domIsLoaded = false;
var domFnCache = [];

function addObserse() {
  // 在dom变化时需要从新渲染
  var isRun = null;
  creatMutationObserser(document, function (option) {
    if (option.type === 'childList') {
      if (option.addedNodes.length) {
        if (isRun) {
          clearTimeout(isRun);
          isRun = null;
        }

        isRun = setTimeout(function () {
          runDomfn();
          isRun = null;
        }, 100);
      }
    }
  }, {
    'childList': true,
    'subtree': true
  });
}

function domOnLoad(fn) {
  if (typeof fn !== 'function') { return; }
  domFnCache.push(fn);

  if (domIsLoaded) {
    runDomfn(domFnCache.length - 1, false);
  }
}

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    // 当页面加载状态为完全结束时进入
    console.log('document is onload');
    domIsLoaded = true;

    if (domFnCache.length) {
      setTimeout(function () {
        runDomfn();
        addObserse();
      }, 50);
    }
  } // if (document.readyState === 'interactive') { // DOM构建了就会执行，先与complete执行
  //   // console.log('document is interactive ,so DOM obj is ' + document.getElementById('img1'))
  // }

};

function runDomfn() {
  var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (domFnCache[i]) {
    domFnCache[i]();

    if (all) {
      runDomfn(++i);
    }
  }
}

var version = "0.2.0";

var _dec, _class;
var comps = window.comps = {};
var hasCompsName = [];
var compsIds = 0;
var lifeCycleArray = Object.keys(lifeCycle);
var Yam = (_dec = Mix(), _dec(_class =
/*#__PURE__*/
function () {
  function Yam() {
    classCallCheck(this, Yam);

    this._eid = guid2();
    initConfig.call(this);

    this._config();

    lifeCycle.beforeInit(this); // console.log(new.target)

    comps[this._cid + '-' + ++compsIds] = this;
    this._rootId = compsIds; // 自动启动函数

    console.log(this._autoDo);

    if (this._autoDo) {
      for (var key in this._autoDo) {
        if (this._autoDo.hasOwnProperty(key)) {
          this._autoDo[key](this);
        }
      }
    }
  }

  createClass(Yam, [{
    key: "__getProps",
    value: function __getProps(props) {
      this.__props = props;
    }
  }, {
    key: "__connectedCallback",
    value: function __connectedCallback(isRenderIn) {
      init(this);
      this.$connectedCallback && this.$connectedCallback();
    }
  }, {
    key: "__disconnectedCallback",
    value: function __disconnectedCallback() {
      if (this.isDestoryed) { return; }
      lifeCycle.destroyed(this);
      this.isUnset = true;
    }
  }, {
    key: "__beforeDisconnectedCallback",
    value: function __beforeDisconnectedCallback() {
      if (this.isDestoryed) { return; }
      lifeCycle.beforeDestroyed(this); // 取消 监听

      this.mutation && this.mutation.disconnect();
      this.Destory && this.Destory.run(); // 取消 内部组件的 方法

      this.ChildComponentsManage && this.ChildComponentsManage.destory(); //

      if (componentUtil_8(this)) {
        componentUtil_8(this).ChildComponentsManage && componentUtil_8(this).ChildComponentsManage.del(this._eid);
      }
    } // 会被覆盖的方法

  }, {
    key: "$config",
    value: function $config() {
      return {};
    } // 会被覆盖的方法

  }, {
    key: "$data",
    value: function $data() {
      return {};
    } // 会被覆盖的方法

  }, {
    key: "$updated",
    value: function $updated() {} // 渲染

  }, {
    key: "renderAt",
    value: function renderAt(el) {
      if (!this.isCustomElements) {
        this.elm = typeof el === 'string' ? document.querySelector(el) : el;
        if (!this.elm || this.elm.isInited) { return; }
        this.elm.isInited = true;

        this.__connectedCallback(true);
      }
    } // 手动更新方法

  }, {
    key: "update",
    value: function update() {
      // 鉴定是否应被掉过
      this.isbyUsedByuser = true;
    } // 执行方法

  }, {
    key: "emit",
    value: function emit(fnName) {
      var arguments$1 = arguments;

      var _this = this;

      if (!fnName) {
        console.warn("\u9700\u8981\u4F20\u5165\u65B9\u6CD5\u540D");
        return;
      }

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments$1[_key];
      }

      return typeof this[fnName] === 'function' ? this[fnName].apply(this, params) : function () {
        console.warn("\u8BE5\u7EC4\u4EF6\u3010".concat(_this._tagName, "\u3011\u6CA1\u6709\u8FD9\u4E2A\u65B9\u6CD5:\u3010").concat(fnName, "\u3011"));
      }.apply(void 0, params);
    } // 触发父级方法

  }, {
    key: "emitProp",
    value: function emitProp(fnName) {
      var arguments$1 = arguments;

      if (!fnName) {
        console.warn("\u9700\u8981\u4F20\u5165\u65B9\u6CD5\u540D");
        return;
      }

      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments$1[_key2];
      }

      if (this.props) {
        if (typeof this.props[fnName] === 'function') {
          var _this$props;

          return (_this$props = this.props)[fnName].apply(_this$props, params);
        } else {
          // console.warn(`该组件【${this._tagName}】没有接收到父组件的传值:【${fnName}】`)
          return null;
        }
      } else {
        // 根组件 this.elm.getAttribute(fnName)
        var fn = componentUtil_1(this, fnName);
        var runfn = window[fn] || (this.elm['_runfn_'] ? this.elm['_runfn_'][fn] : null);

        if (fn && typeof runfn === 'function') {
          return runfn.apply(void 0, params);
        }
      }

      return null;
    } // 添加销毁事件

  }, {
    key: "addDestory",
    value: function addDestory(fn) {
      return this.Destory && this.Destory.add(fn);
    } // 移除销毁事件

  }, {
    key: "delDestory",
    value: function delDestory(eventId) {
      return this.Destory && this.Destory.del(eventId);
    } // 添加声明周期回调函数

  }, {
    key: "addLifeCycleCallFn",
    value: function addLifeCycleCallFn(lifeCycle, fn) {
      if (~lifeCycleArray.indexOf(lifeCycle)) {
        if (typeof fn === 'function') {
          this.lifeCycleCall = this.lifeCycleCall || {};
          (this.lifeCycleCall[lifeCycle + '_callfn'] = this.lifeCycleCall[lifeCycle + '_callfn'] || []).push(fn);
        } else {
          console.warn("\n        \u8981\u6DFB\u52A0\u7684\u7EC4\u4EF6\u5468\u671F\u56DE\u8C03\u5FC5\u987B\u662F\u51FD\u6570\n        ");
        }
      } else {
        console.warn("\n      \u8981\u6DFB\u52A0\u7684\u7EC4\u4EF6\u5468\u671F\u56DE\u8C03\u7684\u53C2\u6570\uFF0C\u53EA\u80FD\u662F".concat(lifeCycle.join(','), "\uFF0C\u8BF7\u68C0\u67E5\n      "));
      }
    }
  }]);

  return Yam;
}()) || _class);

Yam.getComsName = function () {
  return hasCompsName;
};

function Component(Config) {
  var tagName = Config.tagName,
      shadow = Config.shadow,
      style = Config.style,
      props = Config.props,
      customElements = Config.customElements,
      canBeCalledExt = Config.canBeCalledExt,
      store = Config.store,
      router = Config.router;
  hasCompsName.push(tagName);
  return function (Target) {
    Target._tagName = tagName;
    Target._shadow = !!shadow;

    Target.prototype._config = function () {
      this._tagName = tagName;
      this._name = toCamelCase(tagName);
      this._shadow = !!shadow || false;
      this._props = props || [];
      this._canBeCalledExt = typeof canBeCalledExt === 'boolean' ? canBeCalledExt : false;
      this._cid = 'com-' + tagName;
      this._style = getStyleStr(this._cid, style); // store

      this.$store = {};

      if (store && store.add) {
        store.add(this);
      } // router


      this.$router = {};

      if (router) {
        router.add(this);
      }
    };

    if (!HTML_TAGS[tagName]) {
      HTML_TAGS[tagName] = {
        name: tagName,
        isComponent: true,
        class: Target
      };
    }

    if (!cacheLib.get('com-' + tagName)) {
      cacheLib.set('com-' + tagName, Target);
    }

    if ((customElements || typeof customElements === 'undefined') && canUseCustomElements) {
      Target.customElements = true;

      try {
        window.customElements.define(tagName, getCustom(Target));
      } catch (e) {
        console.log('e', e);
      }
    } else {
      Target.customElements = false;
      domOnLoad(function () {
        var doms = document.querySelectorAll(tagName);
        forEach(doms, function (node) {
          if (!node.isInited) {
            new Target().renderAt(node);
          }
        });
      });
    }
  };
} // 适配器 store
console.log("\n    \n    Bate-".concat(version, " for this version of yamjs, \n    \n    that is a baseComponet for html and can run in html or Vue or reactjs\n    \n"));

var getCss = function getCss(curEle, attr) {
  var val = null;

  if ('getComputedStyle' in window) {
    val = window.getComputedStyle(curEle, null)[attr];
  } else {
    val = curEle.currentStyle[attr];
  }

  console.log(val);
  return val;
};

var tools = {
  name: 'tools',
  install: function install(target) {
    var data = {
      timeOutIds: {},
      intervalIds: {}
    };
    target.addPrototype('getCss', function (attr, elm) {
      console.log(attr);
      return getCss(elm || this.elm, attr);
    }); // 设置延时器

    target.addPrototype('setTimeout', function (fn) {
      var arguments$1 = arguments;

      var _this = this;

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments$1[_key];
      }

      var timeOutId = setTimeout.apply(void 0, [function () {
        typeof fn === 'function' && fn();

        _this.delDestory(ids);

        timeOutId = null;
      }].concat(params));
      var ids = this.addDestory(function () {
        console.log('timeOutId,', timeOutId);

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
      var arguments$1 = arguments;

      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments$1[_key2];
      }

      var intervalId = setInterval.apply(void 0, [function () {
        // console.log('intervalId,', intervalId)
        typeof fn === 'function' && fn.apply(void 0, arguments);
      }].concat(params));
      var ids = this.addDestory(function () {
        console.log('intervalId,', intervalId);

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

/*
 * @Author: xuxueliang
 * @Date: 2019-07-03 16:00:17
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-13 14:50:46
 */

Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce(function (acc, val) {
    return Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val);
  }, []);
};

Yam.use(tools);
// ok2 完成 基类可有 扩展
// ok3 完成 setTimeOut ，setInterval 封装
// FIX BUG 来回切换会出问题 --
// FIX slot 渲染
// FIX shadow 模式 下slot
// TODO 0 处理解析出来的父级元素 --
// TODO 1 完成diff --
// TODO 1 添加路由
// TODO 2 添加增加减少动画
// TODO 3 添加使用注解去配置组件 --
// TODO 4 父级调用子组件方法，子组件调用父组件方法，父传值到子（两种模式） --
// TODO 5 增加slot
// var iframe = null
// function getFraem () {
//   if (iframe) {
//     return iframe
//   } else {
//     iframe = document.createElement('img')
//     iframe.onload = function (e) {
//       console.log('loaded Success', e)
//     }
//     iframe.onerror = function (e) {
//       console.log('loaded error')
//     }
//     document.body.append(iframe)
//     return iframe
//   }
// }
// function setI (src) {
//   getFraem().src = src
// }

export default Yam;
export { Component };
