/*
 * Yam.js v0.6.11
 * (c) 2019-2020 xuxueliang
 * Released under the MIT License.
 * lastTime:Wed Oct 14 2020 19:52:57 GMT+0800 (GMT+08:00).
 */
function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) { return {}; }
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) { continue; }
    target[key] = source[key];
  }

  return target;
}

var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

function _objectWithoutProperties(source, excluded) {
  if (source == null) { return {}; }
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) { continue; }
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) { continue; }
      target[key] = source[key];
    }
  }

  return target;
}

var objectWithoutProperties = _objectWithoutProperties;

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

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

var arrayWithoutHoles = _arrayWithoutHoles;

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); }
}

var iterableToArray = _iterableToArray;

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var nonIterableSpread = _nonIterableSpread;

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

var toConsumableArray = _toConsumableArray;

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-11 19:07:03
 */

var SymbolFlag =  function (s) {
  return s + 'Symbol';
}; // if("development"==='')


var $ComponentSymbol = SymbolFlag('$Component'); // $vdom Symbol

var $vdomSymbol = SymbolFlag('$vdom'); // $componentData Symbol

var $componentDataSymbol = SymbolFlag('$componentData');
var $closestParentSymbol = SymbolFlag('$closestParent');
var $slotSymbol = SymbolFlag('$slot');

/*
 * @Author: xuxueliang
 * @Date: 2020-09-03 12:13:36
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 16:30:14
 */
function getSlotComponentsIsOrInstallState(elm) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (elm.innerComponent) {
    return elm.innerComponentInstallState;
  }

  return !!def;
}

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 16:31:10
 */

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
  if (!elm.isComponent) {
    return getComponentMark(elm);
  }

  {
    return elm[$ComponentSymbol];
  }
} // setGet getComponentByElm


function setComponentForElm(elm, context) {
  {
    elm[$ComponentSymbol] = context;
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
  context[$closestParentSymbol] = context.elm._parentNode ? getparentCom(context.elm._parentNode) : context[$closestParentSymbol] || null;
} // 获取上一个自定义组件

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-11 20:28:16
 */
var canUseCustomElements = !!(window.customElements && window.customElements.define);
var preFixCom = 'com-';
var isFunctionComponent = 'isFC';
var supporShadow = !!HTMLElement.prototype.attachShadow;

/*
 * @Author: xuxueliang
 * @Date: 2020-09-14 16:08:33
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 15:17:06
 */

var context = [];
function HandleError(e, from) {
  console.warn(e, from);
  context.forEach(function (v) {
    return v(e, from);
  });
}
var initHandleError = function initHandleError(fn) {
  isFunc(fn) && context.push(fn);
};

/**
 * [def 定义对象属性]
 * @param  {Object}  obj        对象
 * @param  {String}  key        键值
 * @param  {*}       val        属性值
 * @param  {Boolean} enumerable 是否可被枚举
 */

function def(obj, key, val, enumerable) {
  var other = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  Object.defineProperty(obj, key, Object.assign({
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  }, other));
}

function difineStatic(obj, key, val) {
  def(obj, key, val, false, {
    configurable: false,
    writable: false
  });
}


var MutationObserver = global.MutationObserver || global.WebKitMutationObserver || global.MozMutationObserver; // 浏览器兼容

function creatMutationObserser(el, callFn) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    attributes: true
  };
  if (!MutationObserver) { return; }
  var observer = new MutationObserver(function (mutations) {
    // 构造函数回调
    mutations.forEach(function (record) {
      callFn && callFn(record);

      if (record.type === 'attributes') ;

      if (record.type === 'childList') ;
    });
  });

  try {
    observer.observe(el, config);
  } catch (e) {
    HandleError(e); // console.log(e)
  }

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


var getStyleStrCache = {};

function getStyleStr(_id, style) {
  if (!style) { return ''; }
  if (getStyleStrCache[_id]) { return getStyleStrCache[_id]; }

  if (!Array.isArray(style)) {
    style = [style];
  }

  return getStyleStrCache[_id] = style.map(function (v) {
    return _getStrByStyle(_id, v);
  }).join('');
}

function getDomStyleFlag(_id, attr) {
  return attr ? _id : '[' + _id + ']';
}

function _getStrByStyle(_id, style) {
  if (style) {
    var str = (isStr(style) ? style : style[1]).split('\n');
    var styleConfig = {};

    if (~str[0].indexOf('[config]')) {
      // 获取配置信息
      try {
        var getConf = findStyleConfig(str, 1);
        styleConfig = getConf.config || {};
        str.splice(0, getConf.index + 1);
      } catch (e) {
        HandleError(e); // console.error(e)
      }
    }

    return map(str, function (v) {
      if (~v.indexOf('{')) {
        if (~v.indexOf('[root]')) {
          return v.replace('[root]', getDomStyleFlag(_id + '-root')); // }
        }

        return styleConfig.scoped ? getIdStyle(v.replace(' {', '').replace('{', ''), getDomStyleFlag(_id)) + '{' : v;
      }

      return v;
    }).join('\n');
  }

  return '';
}

function findStyleConfig(arr, index) {
  var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (~arr[index].indexOf('}')) {
    return {
      index: index,
      config: Object.assign.apply(null, map(str, function (v) {
        var vp = v.split(':');
        return defineProperty({}, vp[0], vp[1]);
      }))
    };
  } else {
    str.push(arr[index].replace(/ /g, '').replace(/;/g, ''));
    return findStyleConfig(arr, index + 1, str);
  }
}

function getIdStyle(str, id) {
  if (~str.indexOf('keyframes') || ~str.indexOf('%') || str.indexOf('.') === -1 && (~str.indexOf('from') || ~str.indexOf('to'))) {
    return str;
  }

  if (~str.indexOf(':')) {
    var strArr = str.split(':');
    strArr[0] = strArr[0] + id;
    return strArr.join(':');
  }

  return str + id;
}

function isUndef(v) {
  return v === undefined || v === null;
}

function isFunc(v) {
  return typeof v === 'function';
}

function isStr(v) {
  return typeof v === 'string';
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

  if (array && array.length) {
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

  return null;
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

var toKebabCase = function toKebabCase(str) {
  return str ? str.replace(/([A-Z])/g, '-$1').toLowerCase() : str;
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


var requestIdleCallback = function requestIdleCallback(callback, timeOut) {
  callback(); // window.requestIdleCallback ? window.requestIdleCallback(callback, timeOut ? { timeout: timeOut } : {}) : callback()
}; // raf


var requestAnimationFrame = function requestAnimationFrame(callback) {
  // Promise.resolve().then(() => {
  // callback()
  // })
  callback(); // !isNeed ? callback() : window.requestAnimationFrame ? window.requestAnimationFrame(callback) : callback()
};

var getCid = function getCid(value) {
  return preFixCom + value;
}; // 添加slot

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
  if (!parentNode || !newNode) { return; } // 针对内部node 处理 加flag

  requestAnimationFrame(function () {
    // 针对内部node 处理 加flag
    newNode.isYamjsInnerNode = true;
    parentNode.insertBefore(newNode, referenceNode);
    insertCall(newNode);
  });
}

function removeChild(node, child) {
  if (!child || !node) { return; }
  requestAnimationFrame(function () {
    // console.dir(child)
    // 移除事件 触发
    if (child.beforeDisconnectedCallback && !child.isRemovedBySlot) {
      child.beforeDisconnectedCallback();
    } // 针对内部node 处理 加flag


    child.isYamjsInnerNode = true;

    if (child._ref) {
      var pCom = getparentCom(child);

      if (pCom && pCom.$refs) {
        delete pCom.$refs['child._ref'];
      }
    }

    node.removeChild(child); // 移除事件 触发

    if (!child.isRemovedBySlot && child.disconnectedCallback && !child.isUnset) {
      child.disconnectedCallback();
    }
  });
}

function appendChild(node, child, isNeed) {
  if (!node || !child) {
    return false;
  }

  requestAnimationFrame(function () {
    // 针对内部node 处理 加flag
    child.isYamjsInnerNode = true;
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
  // ie 没有影子树，后期再考虑使用iframe替代
  // if (node.attachShadow) {
  //   return node.attachShadow(conf)
  // } else {
  //   let ifa = createElement$1('iframe')
  //   ifa.setAttribute('style', 'border:none;display:block;display:inline-block;')
  //   node.appendChild(ifa)
  //   window.ifa = ifa
  //   return ifa
  // }
  return node.attachShadow ? node.attachShadow(conf) : node;
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
 * @LastEditTime: 2020-10-14 16:48:04
 */
// const translateTpLow = (input) => {
//   if (!Array.isArray(input)) {
//     input = [input]
//   }
//   return Object.assign.apply(null, input.map(v => {
//     let str = v.toLowerCase()
//     if (str.substr(0, 2) === 'on') {
//       str = str.substr(2)
//     }
//     return {
//       [v]: str
//     }
//   }))
// }
var HTML_TAGS = window.HTML_TAGS = {};
/* {
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
}
*/

var GLOBAL_ATTRIBUTES = {
  accessKey: 'accesskey',
  className: 'class',
  class: 'class',
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
  onTouchMove: 'touchmove',
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

/*
 * @Author: xuxueliang
 * @Date: 2020-03-29 17:08:56
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 17:50:25
 */
var defaultIndex = 0;
var renderFunctionComponent = function renderFunctionComponent(context, comsp) {
  comsp = comsp || context.tagName(context.props);
  context.childNodes = comsp.childNodes;
};
function renderAsync(el, context, parent) {
  // 获取的是 ()=>import(/**/)
  try {
    var comsp = context.tagName(context.props);

    if (!comsp.then) {
      context.asyncComponent.tagName = context.asyncComponent.tagName || 'default-' + context.asyncComponent.name + '-' + ++defaultIndex; // comsp._root = context.asyncComponent.tagName

      Object.assign(comsp.props, context.props);
      context.tagName[isFunctionComponent] = true;
      context[isFunctionComponent] = true; // 本是无状态组件 不用=手动创建
      // let createCom = function () { }
      // createCom.prototype = Yam.default.prototype
      // createCom.prototype.constructor = createCom
      // createCom._tagName = context.tagName._tagName = 'default-' + context.asyncComponent.name + '-' + ++defaultIndex
      // //  = 'default-' + context.asyncComponent.name + '-' + ++defaultIndex
      // createCom.prototype.render = context.tagName
      // // comsp.then = context.tagName.then = function (cb) {
      // comsp = Promise.resolve({ default: createCom })
      // }
      // 直接渲染

      Promise.resolve().then(function () {
        var parentElm = parent || el.parentNode;
        var app = comsp.render(null, null, context.asyncComponent.tagName);
        app[isFunctionComponent] = true;
        nodeOps.insertBefore(parentElm, app, el);
        nodeOps.removeChild(parentElm, el);
        context.elm = app;
        renderFunctionComponent(context, comsp);
      });
    } else {
      comsp.then(function (res, copm) {
        var Components = copm || res.default;
        var parentElm = parent || el.parentNode;
        context.tagName._tagName = Components._tagName;
        HTML_TAGS[Components._tagName] = {
          name: Components._tagName,
          isComponent: true,
          class: Components
        };
        context.isAsyncComponent = false;

        context._init(Components, context.props, context.childNodes, context._root, context.isText);

        var app = context.render(null, parentElm);
        nodeOps.insertBefore(parentElm, app, el);
        nodeOps.removeChild(parentElm, el);
      }).catch(function (v) {
        console.warn(v);
      });
    }
  } catch (e) {
    HandleError(e, 'renderAsync');
    console.warn(e);
  } finally {}
}

// import cacheLib from '../utils/cacheLib'
// eslint-disable-next-line no-extend-native

Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce(function (acc, val) {
    return Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val);
  }, []);
}; // let i = 0


var Element = /*#__PURE__*/function () {
  function Element(tagName) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var childNodes = arguments.length > 2 ? arguments[2] : undefined;

    var _root = arguments.length > 3 ? arguments[3] : undefined;

    var isText = arguments.length > 4 ? arguments[4] : undefined;

    classCallCheck(this, Element);

    // if (isFunc(tagName) && tagName._isLazyLoad) {
    //   this._isloading = true
    //   this._renderTask = []
    //   tagName(res => {
    //     this._init(res, props, childNodes, _root, isText)
    //     this._isloading = false
    //     this._runRenderTask()
    //   })
    // } else {
    this._init(tagName, props, childNodes, _root, isText); // }

  } // _runRenderTask () {
  //   if (this._renderTask.length) {
  //     this._render(...this._renderTask.shift())
  //     this._runRenderTask()
  //   }
  // }


  createClass(Element, [{
    key: "_init",
    value: function _init(tagName) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var childNodes = arguments.length > 2 ? arguments[2] : undefined;

      var _root = arguments.length > 3 ? arguments[3] : undefined;

      var isText = arguments.length > 4 ? arguments[4] : undefined;

      // 处理 $props
      if (props && props.$props) {
        // 自定义函数组件
        Object.assign(props, props.$props);
        delete props.$props;
      }

      if (props) {
        if (Array.isArray(props)) {
          childNodes = props;
          props = {};
        } else if (typeof props === 'string') {
          isText = true;
          childNodes = props;
          props = {};
        }
      }

      if (isText) {
        this.tagName = tagName;
        this.props = props;
        this.text = childNodes;
        this.childNodes = undefined;
        this.isText = true;
      } else {

        this.tagName = this.asyncComponent || tagName;
        this.props = props || {};
        this.childNodes = Array.isArray(childNodes) ? childNodes.flat(3) : [childNodes];
        this.childNodes = this.childNodes.map(function (v, key) {
          // if (typeof v === 'string' || typeof v === 'number' || isFunc(v) || typeof v === 'undefined' || typeof v === 'null') {
          if (_typeof_1(v) !== 'object' || isUndef(v)) {
            v = new Element('textNode', '', v + '', _root, true);
          } else if (!v.tagName) {
            try {
              if (v.nodeType === 3) {
                v = new Element('textNode', '', v.nodeValue, _root, true);
              } else {
                v = new Element('textNode', '', JSON.stringify(v) + '', _root, true);
              }
            } catch (e) {
              v = new Element('textNode', '', '无法识别', _root, true);
            }
          }

          v.key = key;

          if (v.props && v.props.key) {
            v.key = v.props.key;
          }

          return v;
        }); // console.log(this[$slotSymbol])
        // 异步的组件

        if (isFunc(this.tagName) && !this.tagName._tagName && !HTML_TAGS[this.tagName._tagName || toKebabCase(this.tagName.name)]) {
          // maybe is a async component
          this.isAsyncComponent = true;
          this.asyncComponent = this.tagName;

          if (this.tagName[isFunctionComponent]) {
            this[isFunctionComponent] = true;
          }
        } // 正常的component


        var tag = isFunc(this.tagName) && this.tagName._tagName ? HTML_TAGS[this.tagName._tagName] : HTML_TAGS[this.tagName] || HTML_TAGS[this.tagName.name] || this.tagName;
        var object = _typeof_1(tag) === 'object';

        var tagClass = isFunc(tag) && this.tagName._tagName;

        var localAttrs = object ? tag.attributes || {} : {};
        var attrs = Object.assign({}, GLOBAL_ATTRIBUTES, localAttrs);
        var tagType = object ? tag.name : tagClass ? tag._tagName : tag;
        this.isElement = tagClass ? tag.customElements : true;
        this.tagType = this.asyncComponent ? this.asyncComponent.name : tagType;
        this.needClass = tagClass || object && tag.isComponent;
        this.class = this.needClass && (tag.class || tag);
        this.attrs = attrs;
        this._name = toCamelCase(this.isAsyncComponent ? 'div' : tagType);
      }

      this._root = _root; // 带搞根结点
    }
  }, {
    key: "render",
    value: function render() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var parentELm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var domFlag = arguments.length > 2 ? arguments[2] : undefined;
      // if (this._isloading) {
      //   this._renderTask.push([key, parentELm, domFlag])
      // } else {
      return this._render(key, parentELm, domFlag); // }
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this = this;
      var parentELm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var domFlag = arguments.length > 2 ? arguments[2] : undefined;

      if (this.isAsyncComponent) {
        // 异步组件
        this.elm = document.createElement('div');
        renderAsync(this.elm, this, parentELm);
        return this.elm;
      }

      if (this.isText) {
        this.elm = document.createTextNode(this.text);
        return this.elm;
      }

      var mark;
      var el;
      var parentCom;
      var component;
      domFlag = domFlag || (this._root ? getCid(this._root) : (mark = getComponentMark(parentELm), mark && getCid(mark._tagName))); // let slot = []
      // 自定义webcomponent
      // console.log()

      if (this.needClass) {
        var cacheDom = this.mountElm || document.createElement('div'); // 回调

        cacheDom._parentNode = parentELm;
        cacheDom._parentElement = parentELm; // console.log('slot-render', this.childNodes)
        // fix 隐藏 component 使用方法调用
        //  eslint-disable-next-line new-cap

        component = new this.class(); // new 20191223 处理组件内部的slot
        // console.log('components-slot', slot, this)

        forEach(this.childNodes, function (v) {
          if (v instanceof Element) {
            addSlot(component, v, v.props.slot, true);
          } else {
            addSlot(component, v, v.getAttribute ? v.getAttribute('slot') : null, true);
          }
        });
        component.props = this.props;
        component.renderAt(cacheDom);
        setComponentForElm(cacheDom, component);
        el = cacheDom; // 自定义组件 挂在在其父级的自定义组件上

        parentCom = getparentCom(parentELm);

        if (parentCom && parentCom.ChildComponentsManage) {
          parentCom.ChildComponentsManage.add(component);
        } // 在下一级组件 添加样式


        domFlag && el.setAttribute(domFlag, '');
      } else {
        // 没有slot了
        // if (this.tagName === 'slot') {
        //   el = document.createDocumentFragment()
        // } else {
        el = document.createElement(this.tagType);
        domFlag && el.setAttribute(domFlag, ''); // }
        // 处理 slot 更新
        // if (this.tagName === 'slot') {
        // 不需要再 处理solt
        // 20191114
        // 处理slot新的形式
        // let mark = getparentCom(parentELm)
        // // console.log(mark)
        // let slotKey = this.props.name || 'default'
        // el.setAttribute('tag', 'slot')
        // 切换为新的方式
        // if (mark[$slotSymbol] && mark[$slotSymbol][slotKey]) {
        //   // forEach(mark[$slotSymbol][slotKey], (v) => {
        //   //   if (v instanceof Element) {
        //   //     el.appendChild(v.render())
        //   //   } else {
        //   //     // if (v._isComponent) {
        //   //     //   el.appendChild(v.cloneNode(true))
        //   //     // } else {
        //   //     el.appendChild(v)
        //   //     // }
        //   //   }
        //   // })
        // }
        // 埋点 slottHooks
        // mark.__hooks_slot[slotKey] = function (slotKeys) {
        //   // patch(el)
        //   forEach(mark[$slotSymbol][slotKeys], (v) => {
        //     console.log('__hooks_slot', v, el)
        //     if (v instanceof Element) {
        //       el.appendChild(v.render())
        //     } else {
        //       // if (v._isComponent) {
        //       //   el.appendChild(v.cloneNode(true))
        //       // } else {
        //       el.appendChild(v)
        //       // }
        //     }
        //   })
        // }
        // el.isBelong = mark._name
        // doAfterSlotUpdate(el, this, mark.elm.rand, mark)
        // 添加 移除时的事件
        // el.disconnectedCallback = () => {
        //   setSlotState(mark, this.props.name, false)
        // }
        // }

        el._parentNode = parentELm;
        el._parentElement = parentELm;
      } // slot = el.querySelectorAll('[tag=slot]') // 由新的slot 机制代替
      // el.props = this.props


      if (this.props && !isSlotTag(this)) {
        Object.keys(this.props).forEach(function (prop) {
          if (prop in _this.attrs) {
            if (isFunc(_this.props[prop])) {
              if (prop === 'ref') {
                _this.props[prop](getComponentByElm(el));
              }
            } else {
              if (prop === 'ref') {
                parentCom = parentCom || getparentCom(parentELm);

                if (!parentCom['$refs']) {
                  parentCom['$refs'] = {};
                }

                parentCom.$refs[_this.props[prop]] = component || el;
                el._ref = _this.props[prop];
              } else {
                el.setAttribute(_this.attrs[prop], _this.props[prop]);
              }
            }
          } else if (prop in EVENT_HANDLERS) {
            el.addEventListener(EVENT_HANDLERS[prop], _this.props[prop]);
          } else if (!isFunc(_this.props[prop]) && !_this.class) {
            el.setAttribute(prop, _this.props[prop]);
          } else if (isFunc(_this.props[prop])) {
            if (_this.isElement) {
              // let fnName = getCallFnName(this, prop) // `${this.tagType}_${prop}_fn`
              el._runfn_ = el._runfn_ || {};
              el._runfn_[getCallFnName(_this, prop)] = _this.props[prop]; // el.setAttribute(prop, fnName)
            }
          } else if (prop.indexOf(preFixCom) === 0) {
            el.setAttribute(prop, '');
          } else if (prop !== 'style') {
            var comps;

            if (el.isComponent) {
              comps = getComponentByElm(el);
            }

            if (!comps || comps.$config.props.indexOf(prop) < 0) {
              el.setAttribute(prop, _this.props[prop]);
            }
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
              } else if (isStr(value)) {
                el.style[prop] = value;
              } else {
                throw new Error("Expected \"number\" or \"string\" but received \"".concat(_typeof_1(value), "\""));
              }
            });
          } else {
            el.setAttribute('style', styles);
          }
        }

        parentCom = null;
        component = null;
      } // if (slot.length) {
      //   forEach(slot, (v) => {
      //     setSlotState(getComponentByElm(el), v.getAttribute('name'), false)
      //   })
      // }
      // 组件内部使用
      // if (slot.length && this.childNodes) {
      // new
      // let coms = getComponentByElm(el)
      // console.log('components-slot', slot, this)
      // forEach(this.childNodes, (v) => {
      //   addSlot(coms, v, v.props.slot)
      // })
      // old
      // this.rand = this.rand || Math.random()
      // el.rand = this.rand
      // cacheLib.set(this._name + 'slot-' + this.rand, this.childNodes)
      // let coms = getComponentByElm(el)
      // if (el.beforeDisconnectedCallback) {
      //   coms.addDestory(() => {
      //     cacheLib.del(this._name + 'slot-' + this.rand)
      //   })
      // }
      // // 检测插槽 是否有内容填充
      // coms = null
      // }
      // 处理组件在最顶层时 slot 情况
      // let comsOri = getparentCom(parentELm._parentElement)
      // if (comsOri && comsOri[$slotSymbol].length) {
      //   // slot = el.querySelectorAll('[tag=slot]')
      //   comsOri.elm.rand = comsOri.elm.rand || Math.random()
      //   this.rand = comsOri.elm.rand
      //   let _names = comsOri._name
      //   cacheLib.set(_names + 'slot-' + this.rand, comsOri._childrenOri)
      //   // 组件使用结束-销毁
      //   comsOri.addDestory(() => {
      //     cacheLib.del(_names + 'slot-' + this.rand)
      //   })
      //   comsOri = null
      // }
      // fix 简单组件渲染时 获取不到slot
      // 渲染子组件


      this.childNodes.forEach(function (child, key) {
        var newParents = el.isComponent ? null : el; // getRenderElmBySlot(slot, child, el) 已经舍去

        if (newParents) {
          if (child instanceof Element) {
            // 优化若是null 就不进行下一步操作了
            if (newParents) {
              // console.log('appendChild:nodeOps.default.appendChild', nodeOps.appendChild)
              nodeOps.appendChild(newParents, child.render(key, el, domFlag));
            }
          } else {
            nodeOps.appendChild(newParents, child);
          }
        }
      }); // if (this.tagName === 'slot') {
      //   this.elm = el.childNodes[0]
      //   this.elmSize = el.childNodes.length
      //   if (parentELm) {
      //     // 设置slot 标示
      //     parentELm.hasslot = true
      //   }
      // } else {

      this.elm = el; // }

      return el;
    }
  }]);

  return Element;
}(); // do slot 更新后的slot数据渲染
function createElementJson(tagName) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var childNodes = arguments.length > 2 ? arguments[2] : undefined;
  var root = arguments.length > 3 ? arguments[3] : undefined;
  return new Element(tagName, props, childNodes, root);
}
function _createElementJson(tagName) {
  var arguments$1 = arguments;

  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  for (var _len = arguments.length, childNodes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    childNodes[_key - 2] = arguments$1[_key];
  }

  // childNodes = childNodes.length ? childNodes : undefined
  return createElementJson(tagName, props, childNodes);
}

var isSlotTag = function isSlotTag(tag) {
  return (tag.tagName || tag) === 'slot';
};
var addSlot = function addSlot(context, child) {
  var slotAttr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
  var isRewriteSlotFor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var cb = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};

  if (!isRewriteSlotFor && child._isSlotFor && child._isSlotFor !== context._eid) {
    slotAttr = 'default';
  }

  slotAttr = slotAttr || 'default';
  !context[$slotSymbol] && (context[$slotSymbol] = {});

  if (isRewriteSlotFor || !child._isSlotFor) {
    child._isSlotFor = context._eid;
  }

  if (!child.render) {
    child.render = function () {
      return child;
    };
  }

  if (!child.elm) {
    child.elm = child;
  }

  (context[$slotSymbol][slotAttr] = context[$slotSymbol][slotAttr] || []).push(child); // if (slotAttr !== 'default') {
  //   if (child.attributes) {
  //     child.removeAttribute('slot')
  //   } else if (child.props && child.props.slot) {
  //     delete child.props.slot
  //   }
  // }

  cb();
};
function initSolt(context, childNodes) {
  context[$slotSymbol] = {};
  childNodes.forEach(function (v) {
    addSlot(context, v, (v.attributes ? v.getAttribute('slot') : v.props && v.props.slot) || 'default');
  });
  context[$slotSymbol]['length'] = Object.keys(context[$slotSymbol]).length;
  context.update(); // console.log('initSolt', this)
} // export function markChildSlotComponents (context, elm) {
//   // eslint-disable-next-line no-cond-assign
//   for (var j = 0, child; child = elm.childNodes[j]; j++) {
//     let tagname = child.tagName && child.tagName.toLowerCase()
//     if ((tagname && HTML_TAGS[tagname] && typeof HTML_TAGS[tagname] === 'object' && HTML_TAGS[tagname].isComponent)) {
//       console.log('-------child', j, child, child.innerHTML)
//       if (!child.innerComponent) {
//         child.innerComponent = true
//         // child._slotSymbol =
//         child._Elment = getNewElment(child, child, tagname, true)
//         child.innerHTML = ''
//         child._Elment.mountElm = child
//         console.log('=========')
//         console.dir(child._Elment)
//       }
//       // console.dir(child._Elment.render())
//     }
//     if (child.childNodes && child.childNodes.length) {
//       markChildSlotComponents(context, child)
//     }
//   }
// }

function syncSlotComponentsState(elm) {
  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (elm && elm.innerComponent) {
    elm.innerComponentInstallState = !!state;
  }
} // export function getSlotComponentsIsOrInstallState (elm, def = true) {
//   if (elm.innerComponent) {
//     return elm.innerComponentInstallState
//   }
//   return !!def
// }

function isSlotComponentsAndRender(node) {
  // console.dir('isSlotComponentsAndRender')
  // console.dir(node)
  // console.dir(node._Elment)
  // if (node._Elment && !node._Elment.isRendering) {
  //   // node.innerHTML = ''
  //   node._Elment.isRendering = true
  //   const l = node._Elment.render()
  //   console.dir(l)
  //   node._Elment.isRendering = false
  //   // node.appendChild()
  //   return true
  // }
  return false;
} // 获取新的元素Elment Slot 成组

function getNewElment(context, child, tagname) {
  var isNotDel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var props = {};
  forEach(child.attributes, function (v) {
    props[v.name] = v.value;
  });
  tagname = tagname || child.tagName && child.tagName.toLowerCase();
  return _createElementJson.apply(void 0, [tagname, props].concat(toConsumableArray(getChildSlot(context, child, false, isNotDel))));
}
function getChildSlot(context, elm) {
  var isAddToContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var isNotDel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var newChildNodes = [];

  if (elm.childNodes.length) {
    // eslint-disable-next-line no-cond-assign
    for (var j = 0, child; child = elm.childNodes[j];) {
      var slotAttr = child.getAttribute && child.getAttribute('slot') || undefined;
      var tagname = child.tagName && child.tagName.toLowerCase(); // console.log('getChildSlot', this, child, child.tagName, tagname, HTML_TAGS[tagname])

      if (tagname && HTML_TAGS[tagname] && _typeof_1(HTML_TAGS[tagname]) === 'object' && HTML_TAGS[tagname].isComponent) {
        var newCom = getNewElment(context, child, tagname);
        newCom._ori = child;
        newCom._isComponent = true;
        child = newCom;
      }

      if (isAddToContext) {
        addSlot(context, child, slotAttr, true);
      } else {
        newChildNodes.push(child);
      } // 设置 isRemovedBySlot 处理外环境使用slot嵌套组件
      // child.isRemovedBySlot = true
      // if (child.childNodes && child.childNodes.length) {
      //   // markChildSlotComponents(context, child)
      // }


      if (!isNotDel) {
        nodeOps.removeChild(elm, child._ori || child);
      } else {
        j++;
      }
    }
  }

  return newChildNodes;
}
function isRerenderSlotElment(context, el) {
  // 处理从新渲染的dom
  if (el.isComponent) {
    var comp = getComponentByElm(el);
    context[$slotSymbol] = comp[$slotSymbol];
    context.isRerender = true;
    el.isInited = false;
    el.isUnset = false;
    el.innerHTML = '';
  }
}

/*
 * @Author: xuxueliang
 * @Date: 2019-08-16 15:06:26
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-10 15:43:57
 */
var tasks = {
  mac: [],
  mic: []
};

var asyncRunQueue = function asyncRunQueue() {
  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  window.Promise ? Promise.resolve().then(cb) : window.setImmediate ? setImmediate(cb) : setTimeout(cb, 0);
};

var asyncRunMacQueue = function asyncRunMacQueue() {
  var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  setTimeout(cb, 0);
};

var taskLine = {
  addMacTask: function addMacTask() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    tasks.mac.push(fn);

    if (!tasks.macRuning) {
      tasks.macRuning = true;
      this.runMacTack();
    }
  },
  addMicTask: function addMicTask() {
    var fn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    // fn()
    tasks.mic.push(fn);

    if (!tasks.micRuning) {
      tasks.micRuning = true;
      this.runMicTask();
    }
  },
  runMacTack: function runMacTack() {
    this.runMicTask('mac');
  },
  runMicTask: function runMicTask() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mic';
    (key === 'mic' ? asyncRunQueue : asyncRunMacQueue)(function () {
      runTash(key);
      tasks[key + 'Runing'] = false;
    });
  }
};

function runTash(key) {
  // eslint-disable-next-line
  for (var item; item = tasks[key][0];) {
    tasks[key].shift()();
  } // console.warn('runTash', key, 'isOver')

}

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
  } // taskLine.runMicTask()
  // console.log('---runMicTask--')

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

function createElmOnly(vnode, parentElm, refElm, isFirst) {
  nodeOps.appendChild(parentElm, vnode.render(null, parentElm));
}
/**
    * 批量创建新的节点
    * 参数对应
    * 当前节点父节点 refElm表示将节点插入在refElm节点之前 节点集合 开始下标 结束下标
    */


function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, isFirst) {
  if (startIdx > -1) {
    if (startIdx <= endIdx) {
      var flag = document.createDocumentFragment();
      flag._parentElement = parentElm;
      flag._parentNode = parentElm;

      for (; startIdx <= endIdx; ++startIdx) {
        // createElm(vnodes[startIdx], flag, refElm, isFirst)
        createElmOnly(vnodes[startIdx], flag);
      } // console.log(flag, parentElm, vnodes)


      insert(parentElm, flag, refElm, isFirst);
    }
  } else {
    createElm(vnodes, parentElm, refElm, isFirst);
  }
}
/**
    * 移除一个节点
    */


function removeNode(el, index) {
  var parent = nodeOps.parentNode(el);

  if (parent) {
    if (index) {
      nodeOps.removeChild(parent, parent.childNodes[index]);
    } else {
      nodeOps.removeChild(parent, el);
    }
  }
}
/**
    * 批量移除节点
    * 参数对应
    * 父节点 孩子节点集合 开始下标 结束下标
    */


function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  var before = 0;

  if (parentElm.hasslot) {
    for (var i = 0; i < startIdx; i++) {
      if (vnodes[i].elmSize) {
        before += +vnodes[i].elmSize;
      }
    }
  }

  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vnodes[startIdx];

    if (ch && ch.elm) {
      if (ch.elmSize) {
        var l = 1;

        for (l; l < ch.elmSize; l++) {
          removeNode(ch.elm, before + startIdx + 1);
        }

        removeNode(ch.elm);
      } else {
        removeNode(ch.elm);
      }
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
  return (// a.key === b.key &&  暂时去掉
    a.tagName === b.tagName && sameInputType(a, b) && sameComponents(a, b) && editProp(a, b) // &&
    //   // a.isComment === b.isComment &&
    //   // (!!a.data) === (!!b.data) &&
    //   sameInputType(a, b)

  );
}

function CompareObj(objA, objB, flag) {
  for (var key in objA) {
    if (!flag) {
      // 跳出整个循环
      break;
    }

    if (!objB.hasOwnProperty(key)) {
      flag = false;
      break;
    }

    if (!Array.isArray(objA[key])) {
      // 子级不是数组时,比较属性值
      if (objB[key] !== objA[key]) {
        flag = false;
        break;
      }
    } else {
      if (!Array.isArray(objB[key])) {
        flag = false;
        break;
      }

      var oA = objA[key];
      var oB = objB[key];

      if (oA.length !== oB.length) {
        flag = false;
        break;
      }

      for (var k in oA) {
        if (!flag) {
          break;
        } // 这里跳出循环是为了不让递归继续


        flag = CompareObj(oA[k], oB[k], flag);
      }
    }
  }

  return flag;
}

function sameComponents(a, b) {
  if (a.class) {
    if (a.class === b.class) {
      taskLine.addMicTask(function () {
        // 如果是 class TODO a
        var elmCom = getComponentByElm(a.elm); // a.childNodes = b.childNodes

        initSolt(elmCom, b.childNodes);
      }); // elmCom._initSoltHooks()

      return true;
    }

    return false;
  } else if (a[isFunctionComponent]) {
    if (b.asyncComponent && a.asyncComponent === b.asyncComponent) {
      if (!CompareObj(a.props, b.props, true)) {
        // a.props = b.props
        editProp(a, b, true);
        b._isFinishPatch = true;
        taskLine.addMicTask(function () {
          renderFunctionComponent(b);
          updateChildren(a.elm, a.childNodes, b.childNodes);
        });
      }

      return true;
    }

    return false;
  }

  return true;
}

function editProp(a, b) {
  var isFCUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!isFCUpdate && b._isFinishPatch) {
    return true;
  }

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
            } else if (isStr(value)) {
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
  var closetsComs = null;
  var isToSetProp = false;

  if (keys in attrs) {
    if (isFunc(props)) {
      // 优化ref 被输出的情况
      if (keys === 'ref') ; else {
        elm.setAttribute(attrs[keys], props());
      }
    } else {
      if (keys !== 'ref') {
        elm.setAttribute(attrs[keys], props);
      }
    }
  } else if (!isFunc(props)) {
    // 不要设置无用的属性
    isToSetProp = true;
  } // if (isFunc(props)) return


  if (elm.isComponent) {
    closetsComs = closetsComs || getComponentByElm(elm);

    if (closetsComs[keys] !== props) {
      closetsComs[keys] = props;
    }
  }

  if (isToSetProp && (!closetsComs || closetsComs.$config.props.indexOf(keys) < 0)) {
    elm.setAttribute(keys, props);
  }

  closetsComs = null;
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
    if (isSlotTag(vnode)) {
      vnode.elmSize = oldVnode.elmSize;
      vnode.elm = oldVnode.elm; // return
    }

    if (oldVnode[isFunctionComponent] || oldVnode.class || oldVnode.elm && oldVnode.elm.isComponent) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
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
    // if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    //   vnode.elm = oldVnode.elm
    //   vnode.componentInstance = oldVnode.componentInstance
    //   return
    // }

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
    // console.log('oldVnode', oldEndVnode, newEndVnode)
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
      // console.log('elmToMove=--------=', oldCh[idxInOld], newStartVnode)

      /* 当以上条件都不满足，调用 createKeyToOldIdx 获取一个 key-索引 的 map 集合 */
      var elmToMove = oldCh[idxInOld];
      if (!oldKeyToIdx) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
      /* 取出对应 key 的节点索引，不存在则为 null  */
      /// / console.log('oldKeyToIdx', oldKeyToIdx)

      idxInOld = isUndef(newStartVnode.key) ? null : oldKeyToIdx[newStartVnode.key];

      if (isUndef(idxInOld)) {
        /* 索引不存在，直接创建一个新的节点 */
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        /* 索引存在 */
        elmToMove = oldCh[idxInOld];

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
    // console.log('updateChildren', 'oldStartIdx:', oldStartIdx, 'newStartIdx:', newStartIdx, 'oldEndIdx', oldEndIdx, 'newEndIdx', newEndIdx)
    // console.log('', newStartIdx, newEndIdx, newCh)
    refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null; // let fgm = document.createDocumentFragment()

    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx); // parentElm.appendChild(fgm)
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

var lifeCycleCallFn = {};

var CreatLifeCycleCall = /*#__PURE__*/function () {
  function CreatLifeCycleCall(context) {
    classCallCheck(this, CreatLifeCycleCall);

    this._cid = context._cid;
    this.target = context;
    lifeCycleCallFn[context._cid] = {};
  }

  createClass(CreatLifeCycleCall, [{
    key: "add",
    value: function add(lcName, fn) {
      var fns = lifeCycleCallFn[this._cid];
      (fns[lcName] || (fns[lcName] = [])).push(fn);
    }
  }, {
    key: "get",
    value: function get(lcName) {
      return lifeCycleCallFn[this._cid][lcName];
    }
  }, {
    key: "run",
    value: function run(lcName) {
      var _this = this;

      var fns = lifeCycleCallFn[this._cid];
      forEach(fns[lcName], function (v) {
        return v.call(_this.target);
      });
    }
  }]);

  return CreatLifeCycleCall;
}();

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


    if (!context[$closestParentSymbol]) {
      if (context.elm && context.elm.onReady) {
        isFunc(context.elm.onReady) && context.elm.onReady();
      } else {
        Object.defineProperty(context.elm, 'onReady', {
          configurable: false,
          enumerable: true,
          get: function proxyGetter() {
            return function () {};
          },
          set: function proxySetter(newVal) {
            isFunc(newVal) && newVal.call(context.elm);
          }
        });
      }
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
  beforeDestroy: function beforeDestroy(context) {
    if (context.$router && context.$router.keepLive) { return; }

    _run(context, '$beforeDestroy');
  },
  // 销毁后
  destroyed: function destroyed(context) {
    if (context.$router && context.$router.keepLive) { return; }

    _run(context, '$destroyed');

    syncSlotComponentsState(context.elm, false);
    context[$ComponentSymbol] = null;
    context[$vdomSymbol] = null; // context.elm[$ComponentSymbol] = null

    context.elm.isInited = false;
    context.elm = null;
    context.$dom = null;
    context.isDestoryed = true;
    context.mutation = null;
    context.Destory = null;
    context.ChildComponentsManage = null;
  }
};
var lifeCycleArray = Object.keys(lifeCycle).map(function (v) {
  return '$' + v;
});
var cacheLifeCycCleFn = {};

function _run(context, name) {
  try {
    if (cacheLifeCycCleFn && cacheLifeCycCleFn[name]) {
      forEach(cacheLifeCycCleFn[name], function (v) {
        return v.call(context);
      });
    }

    if (context._lifeCycleCall) {
      context._lifeCycleCall.run(name);
    }
  } catch (e) {
    HandleError(e, name);
  }

  return context[name] && isFunc(context[name]) ? context[name]() : undefined;
} // 增加全局的生命周期调用函数


var addGlobalLife = function addGlobalLife(lifeCycleName, fn) {
  // if (lifeCycleName[0] !== '$') {
  //   lifeCycleName = '$' + lifeCycleName
  // }
  if (~lifeCycleArray.indexOf(lifeCycleName)) {
    (cacheLifeCycCleFn[lifeCycleName] = cacheLifeCycCleFn[lifeCycleName] || []).push(fn);
    return true;
  }

  return false;
}; // 增加单个单例的生命周期作用

function addLifeCycle(lifeCycle, fn) {
  if (~lifeCycleArray.indexOf(lifeCycle)) {
    if (isFunc(fn)) {
      if (!this._lifeCycleCall) {
        this._lifeCycleCall = new CreatLifeCycleCall(this);
      }

      this._lifeCycleCall.add(lifeCycle, fn);

      return true; // (context.lifeCycleCall.add(lifeCycle + '_callfn'] = context.lifeCycleCall[lifeCycle + '_callfn'] || []).push(fn)
    } else {
      console.warn("\n      \u8981\u6DFB\u52A0\u7684\u7EC4\u4EF6\u5468\u671F\u56DE\u8C03\u5FC5\u987B\u662F\u51FD\u6570\n      ");
    }
  }

  return false;
}

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 19:58:52
 */
var cacheData = window.cacheData = {};
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

var Destory = /*#__PURE__*/function () {
  function Destory(context) {
    classCallCheck(this, Destory);

    this.id = 'beforeDestroyCall' + '-' + (context._eid || guid2());
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
      var beforeDestroyCall = this.get();
      var guid = ++destoryId;
      beforeDestroyCall[guid] = fn;
      beforeDestroyCall = null;
      return guid;
    }
  }, {
    key: "del",
    value: function del(eventId) {
      var beforeDestroyCall = this.get();
      var fn = beforeDestroyCall[eventId];
      delete beforeDestroyCall[eventId];
      beforeDestroyCall = null;
      return fn;
    }
  }, {
    key: "run",
    value: function run() {
      var beforeDestroyCall = this.get();

      for (var i in beforeDestroyCall) {
        _typeof_1(isFunc(beforeDestroyCall[i])) && beforeDestroyCall[i]();
      }

      beforeDestroyCall = null;
      cacheLib.del(this.id);
    }
  }]);

  return Destory;
}();

var ChildComponentsManage = /*#__PURE__*/function () {
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
      App.Destory && App.Destory.add(function () {
        delete Apps[App._eid];
      });
      Apps[App._eid] = App;
    }
  }, {
    key: "del",
    value: function del(index) {
      if (this.isDestorying) {
        return null;
      }

      var Apps = this.get();

      if (Apps) {
        var app = Apps[index];
        delete Apps[index];
        return app;
      }

      return null;
    }
  }, {
    key: "destory",
    value: function destory() {
      var Apps = this.get();
      this.isDestorying = true;

      for (var i in Apps) {
        if (Apps[i]) {
          Apps[i].__beforeDisconnectedCallback();

          Apps[i].__disconnectedCallback();
        }

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

/*
 * @Author: xuxueliang
 * @Date: 2020-07-31 15:32:13
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-14 16:06:52
 */
var baseConfig = {
  $data: [],
  extend: {}
};
var _localConfig = {};

function _getMixinConfig() {
  var cId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'x';
  return _localConfig[cId] || (_localConfig[cId] = Object.assign({}, baseConfig));
}

function mixin(config) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var contextData = _getMixinConfig(context ? context._cid : 'x');

  forEach(Object.keys(config), function (v) {
    if (!_addLifeCycle(v, config[v], context)) {
      _mixin(v, config[v], contextData);
    }
  });
}

function _mixin(v, conf, data) {
  if (v === '$data') {
    data.$data.push(conf);
  } else {
    data.extend[v] = conf;
  }
}

var getMixinConfig = function getMixinConfig(context) {
  return context ? _getMixinConfig(context._cid) : _getMixinConfig();
};

function _addLifeCycle(v, config, context) {
  return context ? addLifeCycle.call(context, v, config) : addGlobalLife(v, config);
}

var componenesSize = {};
var styleIsInstalled = {};

function _init() {
  var _this = this;

  lifeCycle.beforeCreate(this);
  create.call(this);
  lifeCycle.created(this);
  lifeCycle.beforeMount(this);
  setClosetParentCom(this);
  createdComponent.call(this); // taskLine.addMicTask(() => {
  // initRefs.call(this)

  lifeCycle.mounted(this); // })

  this.update = function () {
    _update(_this);
  };

  if (this.isbyUsedByuser) {
    _update(this);

    delete this.isbyUsedByuser;
  } // taskLine.runMicTask()

}

function create() {
  var _this2 = this;

  if (this.elm) {
    // this._initSoltHooks = initSolt
    // // 新的处理slot
    this[$slotSymbol] = this[$slotSymbol] || {}; // 处理是和否有keeplive - 保持组件的内部的协调性

    getChildSlot(this, this.elm);
    this[$slotSymbol]['length'] = Object.keys(this[$slotSymbol]).length; // this.elm.children = []
    // 现在都走这个
    // this._childrenOri = this.elm.children.length ? map(this.elm.children, (v) => delChildrenOriThatFromYam(v, this)) : undefined
    // // console.log('this._childrenOri', this._childrenOri)
    // this.elm._childrenOri = this._childrenOri
    // if (this._childrenOri) {
    //   // 开启把原有的 子集销毁
    //   // eslint-disable-next-line no-cond-assign
    //   for (let j = 0, child; child = this.elm.children[j];) {
    //     // 设置 isRemovedBySlot 处理外环境使用slot嵌套组件
    //     child.isRemovedBySlot = true
    //     nodeOps.removeChild(this.elm, child)
    //     // this.elm.removeChild(child)
    //   }
    // }

    bindElmentEvent(this);
    setComponentForElm(this.elm, this);
  } else {
    this.elm = this;
  } // 设置元素信息


  this.elm._eid = this._eid; // _extends(this.$config(), this)
  // mixin

  var data = this[$componentDataSymbol] = Object.assign.apply(Object, toConsumableArray(getMixinConfig().$data.map(function (v) {
    return v();
  })).concat([isFunc(this.$data) ? this.$data() : this.$data || {}]));

  if (this._props) {
    this._props.forEach(function (v) {
      var propVal = _this2.props ? _this2.props[v] : _this2.elm.getAttribute(v);
      data[v] = typeof propVal === 'number' || isStr(propVal) ? propVal : propVal || data[v] || null; // setAttributes(this, v, this.getAttribute(v))
    });

    if (!this.props && this.elm.nodeType !== 11) {
      // 处理外环境的情况
      var elm = this.elm;
      this.mutation = creatMutationObserser(elm, function (record) {
        if (record.type === 'attributes') {
          var comps = getComponentByElm(elm);
          setAttributes(comps, record.attributeName, elm.getAttribute(record.attributeName) || data[record.attributeName] || null);

          _update(comps);
        }
      }, {
        attributeFilter: this._props
      }); // 绑定 原生元素上的方法

      forEach(elm.attributes, function (v) {
        if (isFunc(window[v.value])) {
          elm._runfn_ = elm._runfn_ || {};
          elm._runfn_[getCallFnName(_this2, v.name)] = window[v.value];
          elm.removeAttribute(v.name);
        }
      }); // 添加 监听事件， 适配三方框架

      this.addWatcher = elm.addWatcher = function (names) {
        var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        // 添加监听方法
        elm._runfn_ = elm._runfn_ || {};
        elm._runfn_[getCallFnName(_this2, names)] = fn;
      };

      var handle = function handle(e) {
        // console.log('DOMNodeRemoved', e)
        if (elm) {
          if (e.target._eid && e.target._eid === elm._eid && e.target === elm) {
            elm.parentNode.removeEventListener('DOMNodeRemoved', handle, false);

            if (elm.disconnectedCallback) {
              if (!elm.isRemovedBySlot) {
                elm.beforeDisconnectedCallback();
                elm.disconnectedCallback();
              }
            }
          }
        }
      }; // 绑定 移除事件


      if (elm.parentNode) {
        elm.parentNode.addEventListener('DOMNodeRemoved', handle, false);
      }
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
  if (context.__isWillupdate) {
    clearTimeout(context.__isWillupdate);
    context.__isWillupdate = null;
  }

  context.__isWillupdate = setTimeout(function () {
    context.__isWillupdate = null;
    update.call(context);
  });
} // function initRefs () {
//   this.$refs = this.$refs || {}
//   // console.log(ref.forEach)
//   forEach(this.__shadowRoot.querySelectorAll('[ref]'), (v) => {
//     // console.log('initRefs', v, this)
//     this.$refs[v.getAttribute('ref')] = v.isComponent ? getComponentByElm(v) : v
//     // v.removeAttribute('ref')
//   })
// }
// 创建组件


function createdComponent() {
  if (this.render) {
    // style.innerText = this._style
    if (this._shadow) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = nodeOps.setAttachShadow(this.elm, {
        mode: 'closed'
      })); // 判断是否是iframe
      // if (shadowRoot.nodeName && shadowRoot.nodeName === 'IFRAME') {
      //   shadowRoot = shadowRoot.contentDocument.body
      // }

      componenesSize[this._tagName] = componenesSize[this._tagName] ? componenesSize[this._tagName] + 1 : 1;
      shadowRoot._root = this._tagName + '-' + componenesSize[this._tagName];
      shadowRoot._parentElement = this.elm;
      shadowRoot._parentNode = this.elm;
      nodeOps.appendChild(shadowRoot, getFram.call(this, true));
      this.$dom = shadowRoot.lastChild;
    } else {
      this.__shadowRoot = this.elm;
      nodeOps.appendChild(this.elm, getFram.call(this));
      this.$dom = this.__shadowRoot.lastChild;
    }

    initStyle.call(this); //
  }

  this.initStyle = initStyle;
}

function initStyle() {
  var style = document.createElement('style');
  style.type = 'text/css';

  try {
    style.appendChild(document.createTextNode(this._style));
  } catch (ex) {
    style.styleSheet.cssText = this._style;
  }

  var p;

  if (this._styleDom && (p = this._styleDom.parentNode)) {
    p.replaceChild(style, this._styleDom);
  } else {
    if (this._shadow) {
      nodeOps.insertBefore(this.__shadowRoot, style, this.$dom);
    } else {
      var parentS = this[$closestParentSymbol];
      if (!parentS) { parentS = getComponentByElm(this.elm); }

      while (!parentS._shadow && parentS[$closestParentSymbol]) {
        parentS = parentS[$closestParentSymbol];
      }

      var nameStyle = parentS._shadow ? parentS.__shadowRoot._root : 'HTML'; // parent.tagName === 'HTML' ? 'HTML' : parent._root ? parent._root : parent.parentNode ? parent.parentNode._root || parent.parentNode.host.tagName : 'HTML'

      if (!styleIsInstalled[nameStyle]) {
        styleIsInstalled[nameStyle] = [];
      }

      if (!~styleIsInstalled[nameStyle].indexOf(this._cid)) {
        // console.log('parentS.parentS._shadow ', parentS._shadow, parentS, nameStyle)
        if (nameStyle === 'HTML') {
          // body
          document.head.appendChild(style);
        } else {
          nodeOps.insertBefore(parentS.__shadowRoot, style, parentS.$dom);
        } // nameStyle


        styleIsInstalled[nameStyle].push(this._cid);
      }
    }
  }

  this._styleDom = style;
} // 若不是 自定元素仅仅值一个自定义组件需要绑定 相应的到元素上事件


function bindElmentEvent(context) {
  syncComponentMark(context);
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
    };
  }
} // 删除标示


function getRenderData(context) {
  var element = context.render(_createElementJson);
  setRootName(element, context._tagName, context);
  return element;
}

function setRootName(element, tagName, context) {
  element._root = element._root || tagName;

  if (element.childNodes) {
    for (var i = 0; i < element.childNodes.length; i++) {
      var v = element.childNodes[i]; // element.childNodes.forEach((v, i) => {

      setRootName(v, tagName, context);

      if (isSlotTag(v)) {
        var _element$childNodes;

        var slotelm = context[$slotSymbol][v.props.name || 'default'] || [];

        (_element$childNodes = element.childNodes).splice.apply(_element$childNodes, [i, 1].concat(toConsumableArray(slotelm))); // v.childNodes = context[$slotSymbol][v.props.name || 'default']


        i += slotelm.length;
      } // })

    }
  }
} // 获取dom片段


function getFram() {
  var dom = document.createDocumentFragment() || document.createElement('div');
  this[$vdomSymbol] = getRenderData(this); // .render()

  this[$vdomSymbol]._rootId = this._rootId;
  dom._parentElement = this.__shadowRoot;
  dom._parentNode = this.__shadowRoot;
  patch(dom, this[$vdomSymbol]);
  dom._eid = this._eid;
  dom.lastChild._eid = this._eid;
  dom.lastChild.setAttribute(getDomStyleFlag(this._cid + '-root', true), '');
  return dom;
} // 更新dom


function update() {
  var _this3 = this;

  // 优化 update 默认在¥updated内方法 只是数据更新不是dom更新
  if (this.__stopUpdata) { return; }
  lifeCycle.beforeUpdate(this);

  if (this[$vdomSymbol]) {
    var newNode = getRenderData(this); // this.render()

    var oldNode = this[$vdomSymbol];
    this[$vdomSymbol] = newNode;
    this[$vdomSymbol]._rootId = this._rootId;
    patch(this.$dom, newNode, oldNode);

    if (isFalse(lifeCycle.updated(this))) {
      this.__stopUpdata = true;
      setTimeout(function () {
        _this3.__stopUpdata = false;
      }, 500);
    }
  }
} // 处理  已经初始化的组件，再次初始化问题 -- vue 非编译版本出现问题
// function delChildrenOriThatFromYam (child, context) {
//   if (!child) return child
//   if (child.getAttribute && child.getAttribute('dom') === 'com-' + context._tagName) {
//     return null
//   }
//   // return getOriDom(child)
//   return child
// }
// 暂时保留，等待后续更优的解决方案
// function getOriDom (child) {
//   if (~child.tagName.indexOf('-')) {
//     let newTag = document.createElement(child.tagName)
//     forEach(child.attributes, (v) => { newTag.setAttribute(v.name, v.value) })
//     console.log('newTag', newTag)
//     if (child.children) {
//       forEach(child.children, (v) => {
//         nodeOps.appendChild(newTag, getOriDom(v))
//       })
//     }
//     return newTag
//   } else {
//     return child
//   }
// }


function init(context, isRenderIn) {
  // 初始化 配置信息
  _init.call(context);
} // 初始化 参数和数据

function initConfig() {
  this.Destory = new Destory(this);
  this.ChildComponentsManage = new ChildComponentsManage(this);
}

/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-15 16:50:36
 */
var lifeCycleArray$1 = Object.keys(lifeCycle).map(function (v) {
  return '$' + v;
}); // 注解
// 预留字段

var reserved = 'constructor __createElement connectedCallback $connectedCallback disconnectedCallback $disconnectedCallback $config $data mutation render $beforeCreate $created $beforeMount $mounted $beforeDestroy $destroyed $beforeUpdate $updated renderAt emit emitProp __connectedCallback __disconnectedCallback __beforeDisconnectedCallback _config __isWillupdate'; // 安装的扩展

var installed = [];
window.parant = []; // 兼容react 的jsx

window.React = window.React || {
  createElement: _createElementJson
};
function Mix() {
  return function (Target) {
    Target.__createElement = _createElementJson; // Target.setConfig = (config = {}) => {
    //   // addPrototype(Target, 'isDev').addAuto('isDev', function (context) {
    //   //   context.env = config.isDev ? 'development' : 'pro'
    //   // })
    //   // Target.isDev = !!config.isDev
    // }

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

      if (!isFunc(Config.install)) {
         console.warn("\n            install \u5FC5\u987B\u662F\u4E2A\u65B9\u6CD5\n          ");
        return false;
      }

      if (needs) {
        if (isStr(needs)) {
          needs = [needs];
        }

        forEach(needs, function (v) {
          if (!~installed.indexOf(v)) {
             console.info("%c \u8BE5\u6269\u5C55\u3010 ".concat(name, " \u3011\u9700\u8981\u4F9D\u8D56 \u3010").concat(v, "\u3011\u6269\u5C55"), 'background:#ff0');
          }
        });
      }

      if (~installed.indexOf(name)) {
         console.info("\u5DF2\u7ECF\u6CE8\u518C\u6B64\u6269\u5C55:".concat(name));
      } else {
        installed.push(name);
        Config.install(addPrototype(Target, name));
      }
    };

    Target.mixin = function () {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      mixin(config);
    };

    Target.errorHandler = initHandleError;
  };
}

function addPrototype(Target, name) {
  return {
    mixin: function mixin$1() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      mixin(config);
    },
    mixinPrototype: function mixinPrototype() {
      var _this = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      forEach(Object.keys(config), function (v) {
        _this.addPrototype(v, config[v]);
      });
    },

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

      if (~reserved.indexOf(type) || Target.prototype[type]) {
        if (isCovered) {
           console.info("\n          ==\n          \u65B9\u6CD5\u540D\uFF1A".concat(type, " \u5DF2\u5B58\u5728\uFF0C\u5C06\u88AB\u3010").concat(name, "\u63D2\u4EF6\u3011\u4E2D\u7684 ").concat(type, " \u65B9\u6CD5\u8986\u76D6\n          \u8BE5\u8986\u76D6\u65B9\u6CD5\u5C06\u5F71\u54CD\u5230\u3010").concat(Target.prototype[type]['pluginsName'] ? Target.prototype[type]['pluginsName'] + ' 插件' : '框架', "\u3011\u4E2D\u4F7F\u7528\uFF0C\u8BF7\u8C28\u614E\u5904\u7406\n          ==\n          "));
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
    addAuto: function addAuto(name, fn, lifeCycle) {
      if (isFunc(fn)) {
        Target.prototype._autoDo = Target.prototype._autoDo || {};

        if (!Target.prototype._autoDo[name]) {
          Target.prototype._autoDo[name] = fn;
        } else {
           console.info("\n          \u81EA\u52A8\u6267\u884C\u7684\u65B9\u6CD5\u540D\uFF1A".concat(name, " \u5DF2\u5B58\u5728\uFF0C\u8BF7\u67E5\u770B\u662F\u5426\u91CD\u590D\u6CE8\u518C\u8BE5\u65B9\u6CD5\n          "));
        }
      }
    },

    /**
     * @summary 给各个执行生命周期加方法
     * @param {lifeCycleName} 周期方法名
     * @param {fn} 回调方法
     */
    addGlobalLife: function addGlobalLife$1(lifeCycleName, fn) {
      if (~lifeCycleArray$1.indexOf(lifeCycleName)) {
        if (isFunc(fn)) {
          addGlobalLife(lifeCycleName, fn);
        } else {
           console.warn("\n          \u8981\u6DFB\u52A0\u7684\u7EC4\u4EF6\u5468\u671F\u56DE\u8C03\u5FC5\u987B\u662F\u51FD\u6570\n          ");
        }
      } else {
         console.warn("\n        \u8981\u6DFB\u52A0\u7684\u7EC4\u4EF6\u5468\u671F\u56DE\u8C03\u7684\u53C2\u6570[".concat(lifeCycleName, "]\uFF0C\u53EA\u80FD\u662F ").concat(lifeCycleArray$1.join(','), " \uFF0C\u8BF7\u68C0\u67E5\n        "));
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

function getCustom(target, props) {
  // eslint-disable-next-line
  var ElmApp = /*#__PURE__*/function (_HTMLElement) {
    inherits(ElmApp, _HTMLElement);

    function ElmApp() {
      classCallCheck(this, ElmApp);

      return possibleConstructorReturn(this, getPrototypeOf(ElmApp).apply(this, arguments));
    }

    createClass(ElmApp, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {// console.log('Custom square element attributes changed.', this.nodeName, name, oldValue, newValue)
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        // onReadyElmFn(this)
        try {
          if (isSlotComponentsAndRender(this) || this.isInited) {
            return;
          }

          var Target = target || HTML_TAGS[this.nodeName.toLocaleLowerCase()].class;

          if (Target) {
            var comps = new Target();
            comps.renderAt(this);
            setComponentForElm(this, comps);
            comps = null;
          }
        } catch (e) {
          // console.warn('组件【' + this.nodeName + '】渲染错误', e)
          HandleError(e, '组件【' + this.nodeName + '】渲染错误');
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (!this.isUnset && !this.isRemovedBySlot) {
          this.isUnset = true;
          var comps = getComponentByElm(this);
          comps.__beforeDisconnectedCallback && comps.__beforeDisconnectedCallback();
          comps.__disconnectedCallback && comps.__disconnectedCallback();
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return props || [];
      }
    }]);

    return ElmApp;
  }( /*#__PURE__*/wrapNativeSuper(HTMLElement));

  return ElmApp;
}

/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-14 16:08:06
 */
var domIsLoaded = false;
var domFnCache = [];

function addObserse() {
  // 在dom变化时需要从新渲染
  var isRun = null;
  creatMutationObserser(document.body, function (option) {
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

if (document.readyState === 'complete') {
  domComplete();
} else {
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      // 当页面加载状态为完全结束时进入
      domComplete();
    } // if (document.readyState === 'interactive') { // DOM构建了就会执行，先与complete执行
    //   // console.log('document is interactive ,so DOM obj is ' + document.getElementById('img1'))
    // }

  };
}

function domComplete() {
  console.log('document is onload');
  domIsLoaded = true;

  if (domFnCache.length) {
    setTimeout(function () {
      runDomfn();
      addObserse();
    }, 50);
  }
}

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

/*
 * @Author: xuxueliang
 * @Date: 2020-02-29 16:15:59
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 16:35:03
 */

var __localYamjsElm = {};
function forNotsupportMutationObserver (k, v) {
  __localYamjsElm[k] = v;
}

function yamjsRender(node) {
  var tagName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!node.isInited && getSlotComponentsIsOrInstallState(node, true)) {
    tagName = tagName || (node.tagName ? node.tagName.toLocaleLowerCase() : '');
    if (!tagName) { return; }

    if (__localYamjsElm[tagName]) {
      new __localYamjsElm[tagName]().renderAt(node);
    } // else {
    //   // console.log('没有[', tagName, ']组件')
    // }

  }
}

window.yamjsRender = function (node, tagName) {
  yamjsRender(node, tagName);
}; // if (!supportMutationObserver) {
//   window.yamjsRender = function (node, tagName = '') {
//     if (!node.isInited) {
//       tagName = tagName || node.tagName.toLocaleLowerCase()
//       if (__localYamjsElm[tagName]) {
//         new __localYamjsElm[tagName]().renderAt(node)
//       } else {
//         console.log('没有[', tagName, ']组件')
//       }
//     }
//   }
//   HTMLElement.prototype.appendYamjsNode = function (node) {
//     this.appendChild(node)
//     runRender(node)
//   }
//   HTMLElement.prototype.insertYamjsNodeBefore = function (newNode, referenceNode) {
//     if (referenceNode) {
//       this.insertBefore(newNode, referenceNode)
//       runRender(newNode)
//     }
//   }
//   HTMLElement.prototype.removeYamjsNode = function (node) {
//     this.removeChild(node)
//     if (!node.isUnset) {
//       node.isUnset = true
//       let comp = getComponentByElm(this)
//       comp.__beforeDisconnectedCallback()
//       comp.__disconnectedCallback()
//       comp = null
//     }
//   }
//   HTMLElement.prototype.setYamjsNodeAttribute = function (key, val) {
//     this.setAttribute(key, val)
//     let comp = getComponentByElm(this)
//     setAttributes(comp, key, val)
//     comp.update()
//     comp = null
//   }
// }


function runRender(node) {
  var isDoChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (isDoChild && !canUseCustomElements && node.childNodes.length) ;

  if (node.isYamjsInnerNode) { return; }

  if (node.parentElement) {
    yamjsRender(node);
  } else {
    setTimeout(function () {
      runRender(node);
    }, 100);
  }
}

function removeChild$1(node) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  if (!canUseCustomElements && node.childNodes.length) ;

  if (node.isYamjsInnerNode) { return cb(); }

  if (node.isComponent && !node.isUnset) {
    node.isUnset = true;
    var comp = getComponentByElm(node);

    if (comp) {
      comp.__beforeDisconnectedCallback();

      var rmFlag = cb();

      comp.__disconnectedCallback();

      comp = null;
      return rmFlag;
    } else {
      return cb();
    }
  }
} // 20200909
// 修复webcomponent 在不支持的ie中使用时 不能自动注销；
// 但自动注销后又不能恢复
// 实现自动注销需要区遍历子节点，费性能
// 暂不处理
// function checkChildHasComponents (node, isUnset = true, i = 0) {
//   console.log('++++---updaye', i)
//   forEach(node.childNodes, (v) => {
//     if (isUnset) {
//       if (v.isComponent && !v.isUnset) {
//         let comp = getComponentByElm(v)
//         if (comp) {
//           comp.__beforeDisconnectedCallback()
//           comp.__disconnectedCallback()
//           console.warn(comp)
//           comp = null
//         }
//       }
//     } else {
//       console.dir(v)
//       // runRender(v, false)
//     }
//     checkChildHasComponents(v, ++i)
//   })
//   console.log('---updaye', i)
// }


initHTMLEvent();

function initHTMLEvent() {
  var HTMLElementPrototype = HTMLElement.prototype;

  if (HTMLElementPrototype._appendChild) {
    return;
  }

  HTMLElementPrototype._appendChild = HTMLElementPrototype.appendChild;

  HTMLElementPrototype.appendChild = function (node) {
    var returnFlag = this._appendChild(node);

    runRender(node);
    return returnFlag;
  };

  HTMLElementPrototype._insertBefore = HTMLElementPrototype.insertBefore;

  HTMLElementPrototype.insertBefore = function (node, referenceNode) {
    if (referenceNode) {
      var returnFlag = this._insertBefore(node, referenceNode);

      runRender(node);
      return returnFlag;
    }
  };

  HTMLElementPrototype._removeChild = HTMLElementPrototype.removeChild;

  HTMLElementPrototype.removeChild = function (node) {
    var _this = this;

    return removeChild$1(node, function () {
      return _this._removeChild(node);
    }); //  returnFlag
  };

  HTMLElementPrototype._replaceChild = HTMLElementPrototype.replaceChild;

  HTMLElementPrototype.replaceChild = function (newNode, oldNode) {
    var returnFlag = this._replaceChild(newNode, oldNode);

    removeChild$1(oldNode);
    runRender(newNode);
    return returnFlag;
  };

  HTMLElementPrototype._setAttribute = HTMLElementPrototype.setAttribute;

  HTMLElementPrototype.setAttribute = function (key, val) {
    if (Array.isArray(val)) {
      val = val.join(key === 'class' ? ' ' : ',');
    }

    var returnFlag = this._setAttribute(key, val);

    if (this.isComponent) {
      var comp = getComponentByElm(this);
      setAttributes(comp, key, val);
      comp.update();
      comp = null;
    }

    return returnFlag;
  }; // HTMLElement.prototype.setYamjsNodeAttribute = function (key, val) {
  //   this.setAttribute(key, val)
  //   if (this.isComponent) {
  //     let comp = getComponentByElm(this)
  //     setAttributes(comp, key, val)
  //     comp.update()
  //     comp = null
  //   }
  // }

}

var version = "0.6.11";

var _dec, _class;
// var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
// var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
// if (isIE || isIE11) {
//   import('./polyfill').then(() => { })
// }

var comps = window.comps = {};
var hasCompsName = [];
var compsIds = 0; // let lifeCycleArray = Object.keys(lifeCycle)

var Yam = (_dec = Mix(), _dec(_class = /*#__PURE__*/function () {
  function Yam() {
    classCallCheck(this, Yam);

    this._eid = guid2(); // this.addLifeCycle = addLifeCycle.bind(this)

    initConfig.call(this);
    this._config && this._config();
    lifeCycle.beforeInit(this);
    comps[this._cid + '-' + ++compsIds] = this;
    this._rootId = compsIds; // 自动启动函数

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
      if (this.isDestoryed) { return; } // 调整this.Destroy 时机，从移除之前转移到移除的时候，

      this.Destory && this.Destory.run();
      lifeCycle.destroyed(this);
      this.isUnset = true;
    }
  }, {
    key: "__beforeDisconnectedCallback",
    value: function __beforeDisconnectedCallback() {
      if (this.isDestoryed) { return; }
      lifeCycle.beforeDestroy(this); // 取消 监听

      if (!this._is_hot_update) {
        // 如果是热更新造成的 不移除这个监听
        this.mutation && this.mutation.disconnect();
      } // 取消 内部组件的 方法


      this.ChildComponentsManage && this.ChildComponentsManage.destory(); //
      // let ClosetParentCom = getClosetParentCom(this)
      // if (ClosetParentCom) {
      //   ClosetParentCom.ChildComponentsManage &&
      //     ClosetParentCom.ChildComponentsManage.del(this._eid)
      // }
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
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // 需要判断是否移除后从新加载的
      isRerenderSlotElment(this, el);

      this.props = this.props || props;
      this.elm = isStr(el) ? document.querySelector(el) : el;
      if (!this.elm || this.elm.isInited) { return; }
      this.elm.isInited = true;
      syncSlotComponentsState(this.elm, true);

      this.__connectedCallback(true);
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

      return isFunc(this[fnName]) ? this[fnName].apply(this, params) : function () {
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
        if (isFunc(this.props[fnName])) {
          var _this$props;

          return (_this$props = this.props)[fnName].apply(_this$props, params);
        } else {
          // console.warn(`该组件【${this._tagName}】没有接收到父组件的传值:【${fnName}】`)
          return null;
        }
      } else {
        // 根组件 this.elm.getAttribute(fnName)
        var fn = getCallFnName(this, fnName);
        var runfn = window[fn] || (this.elm['_runfn_'] ? this.elm['_runfn_'][fn] : null);

        if (fn && isFunc(runfn)) {
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
    }
  }]);

  return Yam;
}()) || _class);

Yam.getComsName = function () {
  return hasCompsName;
};

function Component(Config) {
  var _ref = Config || {},
      tagName = _ref.tagName,
      shadow = _ref.shadow,
      style = _ref.style,
      props = _ref.props,
      customElements = _ref.customElements,
      canBeCalledExt = _ref.canBeCalledExt,
      _ref$mixin = _ref.mixin,
      mixin$1 = _ref$mixin === void 0 ? [] : _ref$mixin,
      params = objectWithoutProperties(_ref, ["tagName", "shadow", "style", "props", "customElements", "canBeCalledExt", "mixin"]);

  hasCompsName.push(tagName);
  return function (Target) {
    if (Target._classIsInitedOk) { return; }
    var isCustomElements = (customElements || typeof customElements === 'undefined') && canUseCustomElements;
    Target._tagName = tagName;
    Target._cid = getCid(tagName); // Target._$config = Config

    Target._shadow = supporShadow ? !!shadow : false;
    var styleStr = Yam._gSS ? Yam._gSS(Target._cid, style) : style;
    var styleArray = Array.isArray(styleStr) && !styleStr.i ? styleStr : [styleStr];
    Target._style = styleArray.map(function (v) {
      return v ? v.toString() : '';
    }).join('\r');

    Target.prototype._config = function () {
      var _this2 = this;

      // this.$config = Config
      this.isCustomElements = isCustomElements;
      this._tagName = tagName;
      this._name = toCamelCase(tagName);
      this._shadow = Target._shadow;
      this._props = Config.props = props || [];
      difineStatic(this, '$config', Config);
      this._canBeCalledExt = typeof canBeCalledExt === 'boolean' ? canBeCalledExt : false;
      this._cid = Target._cid;
      this._style = Target._style; // getStyleStr(this._cid, style) 使用了loader 后不需要这个了
      // plugins

      var keys = Object.keys(params);
      forEach(keys, function (v) {
        var vv = params[v];

        if (isFunc(vv)) {
          return vv(_this2);
        } else {
          _typeof_1(vv) === 'object' && isFunc(vv) && vv.apply(_this2);
        }
      });

      if (!Array.isArray(mixin$1)) {
        mixin$1 = [mixin$1];
      }

      forEach(mixin$1, function (v) {
        return mixin(v, _this2);
      });
    }; // 允许覆盖 ；使用最新的组件去渲染
    // if (!HTML_TAGS[tagName]) {
    // 都把组件存在 HTML_TAGS 里面


    HTML_TAGS[tagName] = {
      name: tagName,
      isComponent: true,
      class: Target
    }; // }
    // 允许覆盖 ；使用最新的组件去渲染
    // if (!cacheLib.get('com-' + tagName)) {

    cacheLib.set(getCid(tagName), Target); // }

    if (isCustomElements) {
      Target.customElements = true;

      try {
        window.customElements.define(tagName, getCustom(Target, props));
      } catch (e) {
      }
    } else {
      Target.customElements = false; // if (!supportMutationObserver) {

      forNotsupportMutationObserver(tagName, Target); // }

      domOnLoad(function () {
        var doms = document.querySelectorAll(tagName);
        forEach(doms, function (node) {

          if (!node.isInited && getSlotComponentsIsOrInstallState(node, true)) {
            new Target().renderAt(node);
          }
        });
      });
    }

    Target._classIsInitedOk = true;
    return Target;
  };
} // 适配器 store
// export function store (Config) {
//   return function (Target) { }
// }

 console.log("\n    \n    Bate-".concat(version, " for this version of yamjs, \n    \n    that is a baseComponet for html and can run in html or Vue or reactjs or ng\n    \n"));

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

/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-03 12:52:28
 */
var tools = {
  name: 'tools',
  install: function install(target) {
    var data = {
      timeOutIds: {},
      intervalIds: {}
    };
    target.addPrototype('getCss', function (attr, elm) {
      // console.log(attr)
      return getCss(elm || this.elm, attr);
    }); // 设置延时器

    target.addPrototype('setTimeout', function (fn) {
      var arguments$1 = arguments;

      var _this = this;

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments$1[_key];
      }

      var timeOutId = setTimeout.apply(void 0, [function () {
        isFunc(fn) && fn();

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
      var arguments$1 = arguments;

      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments$1[_key2];
      }

      var intervalId = setInterval.apply(void 0, [function () {
        // console.log('intervalId,', intervalId)
        isFunc(fn) && fn.apply(void 0, arguments);
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

/*
 * @Author: xuxueliang
 * @Date: 2019-07-03 16:00:17
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 20:08:31
 */
Yam.use(tools);
Yam._gSS = getStyleStr;
// ok1 样式只是加载一次
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
// 针对IE 做深层次兼容处理

export default Yam;
export { Component };
