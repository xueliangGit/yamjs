/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-11 19:05:04
 */
import { global as window } from './global'
import { $slotSymbol } from '../symbol'
import { isDev } from '../env'
/**
 * [def 定义对象属性]
 * @param  {Object}  obj        对象
 * @param  {String}  key        键值
 * @param  {*}       val        属性值
 * @param  {Boolean} enumerable 是否可被枚举
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  })
}

/**
 * [protoAugment  支持 __proto__ , 直接将对象的__proto__指向 src 这一组方法]
 * @param  {Object} target [目标对象]
 * @param  {Object} src    [Array方法]
 */
function protoAugment (target, src) {
  // eslint-disable-next-line no-proto
  target.__proto__ = src
}

/**
 * [copyAugment 不支持 __proto__ , 遍历这一组方法，依次添加到对象中，作为隐藏属性（即 enumerable: false，不能被枚举）]
 * @param  {Object} target [目标对象]
 * @param  {Object} src    [Array方法]
 * @param  {Array}  keys   [Array方法键值集合]
 */
function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i]
    def(target, key, src[key])
  }
}

// 返回一个布尔值，指示对象是否具有指定的属性作为自身（不继承）属性
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
// 添加 监控
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver// 浏览器兼容
function creatMutationObserser (el, callFn, config = { attributes: true }) {
  if (!MutationObserver) return
  var observer = new MutationObserver(function (mutations) { // 构造函数回调
    mutations.forEach(function (record) {
      callFn && callFn(record)
      if (record.type === 'attributes') { // 监听属性
        // do any code
      }
      if (record.type === 'childList') { // 监听结构发生变化
        // do any code
      }
    })
  })
  try {
    observer.observe(el, config)
  } catch (e) {
    // console.log(e)
  }
  return observer
}
// 代理
function proxy (key, setter, self) {
  setter = setter ||
    Object.defineProperty(self, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return self[key]
      },
      set: function proxySetter (newVal) {
        self[key] = newVal
      }
    })
}
// 设置属性
function setAttributes (obj, name, value) {
  if (obj[name] === value) return
  try {
    obj[name] = JSON.parse(value)
  } catch (e) {
    obj[name] = value
  }
}
function _extends (oriObj, obj) {
  for (let i in oriObj) {
    obj[i] = oriObj[i]
  }
}
// 处理list forDiractive
function isForDirective (str) {

}
// 获取styleStr
let getStyleStrCache = {}

function getStyleStr (_id, style) {
  if (!style) return ''
  if (getStyleStrCache[_id]) return getStyleStrCache[_id]

  if (!Array.isArray(style)) {
    style = [style]
  }
  return (getStyleStrCache[_id] = style.map(v => _getStrByStyle(_id, v)).join(''))
}
function getDomStyleFlag (_id, attr) {
  return attr ? _id : '[' + _id + ']'
}

function _getStrByStyle (_id, style) {
  if (style) {
    var str = (typeof style === 'string' ? style : style[1]).split('\n')
    let styleConfig = {}
    if (~str[0].indexOf('[config]')) {
      // 获取配置信息
      try {
        let getConf = findStyleConfig(str, 1)
        styleConfig = getConf.config || {}
        str.splice(0, getConf.index + 1)
      } catch (e) {
        console.error(e)
      }
    }
    return map(str, function (v) {
      if (~v.indexOf('{')) {
        if (~v.indexOf('[root]')) {
          return v.replace('[root]', getDomStyleFlag(_id + '-root')) // }
        }
        return styleConfig.scope ? getIdStyle(v.replace(' {', '').replace('{', ''), getDomStyleFlag(_id)) + '{' : v
      }
      return v
    }).join('\n')
  }
  return ''
}
function findStyleConfig (arr, index, str = []) {
  if (~arr[index].indexOf('}')) {
    return {
      index,
      config: Object.assign.apply(null, map(str, v => {
        var vp = v.split(':')
        return {
          [vp[0]]: vp[1]
        }
      }))
    }
  } else {
    str.push(arr[index].replace(/ /g, '').replace(/;/g, ''))
    return findStyleConfig(arr, index + 1, str)
  }
}
function getIdStyle (str, id) {
  if (~str.indexOf('keyframes') ||
    ~str.indexOf('%') ||
    (str.indexOf('.') === -1 && (~str.indexOf('from') || ~str.indexOf('to')))) {
    return str
  }
  if (~str.indexOf(':')) {
    let strArr = str.split(':')
    strArr[0] = strArr[0] + id
    return strArr.join(':')
  }
  return str + id
}
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}
function forEach (array, v = () => { }, get = false) {
  let getArr = []
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, item; item = array[i]; i++) {
    let runResult = v(item, i)
    get && getArr.push(runResult)
    if (typeof runResult === 'boolean' && !runResult && !get) {
      return get ? getArr : null
    }
  }
  return get ? getArr : null
}
function map (array, v = () => { }) {
  return forEach(array, v, true)
}
function setProp (obj, el) {
}

const toCamelCase = str => str.replace(/-(\w)/g, (x) => { return x.slice(1).toUpperCase() })

/**
 * @summary 获取guid
 * @returns [guid]
 */
const guid2 = () => {
  return (S4() + S4() + '-' + S4() + S4())
}
const guid = () => {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
function S4 () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function getStackTrace () {
  var obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}
const log = function (...arg) {
  if (isDev) {
    return null
  }
  var stack = getStackTrace() || ''
  var matchResult = stack.match(/\(.*?\)/g) || []
  var line = matchResult[1] || ''
  arg[arg.length] = '=>from ' + line.replace('(', '').replace(')', '')
  console.log.apply(console, arg)
}
const info = function (...arg) {
  arg[0] = '%c ' + arg[0]
  arg[arg.length] = 'background:#ff0'
  console.log.apply(console, arg)
}
// rIdC
let requestIdleCallback = function (callback, timeOut) {
  callback()
  // window.requestIdleCallback ? window.requestIdleCallback(callback, timeOut ? { timeout: timeOut } : {}) : callback()
}
// raf
let requestAnimationFrame = function (callback, isNeed = true) {
  // Promise.resolve().then(() => {
  // callback()
  // })
  callback()
  // !isNeed ? callback() : window.requestAnimationFrame ? window.requestAnimationFrame(callback) : callback()
}
let getCid = (value) => 'com-' + value

// 添加slot
let addSlot = function (child, slotAttr = 'default', cb = () => { }) {
  !this[$slotSymbol] && (this[$slotSymbol] = {})
  if (!child.render) {
    child.render = () => child
  }
  if (!child.elm) {
    child.elm = child
  }
  (this[$slotSymbol][slotAttr] = this[$slotSymbol][slotAttr] || []).push(child)
  cb()
}
// const supportMutationObserver = !!MutationObserver

export {
  def,
  protoAugment,
  copyAugment,
  hasOwn,
  creatMutationObserser,
  proxy,
  setAttributes,
  _extends,
  isForDirective,
  getStyleStr,
  isDef,
  isUndef,
  isTrue,
  isFalse,
  forEach,
  map,
  setProp,
  toCamelCase,
  guid,
  guid2,
  log,
  info,
  requestIdleCallback,
  requestAnimationFrame,
  getDomStyleFlag, getCid,
  addSlot
  // , supportMutationObserver
}
