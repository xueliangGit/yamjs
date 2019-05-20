
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
  observer.observe(el, config)
  return observer
}
// 代理
function proxy (key, setter, self) {
  setter = setter ||
    Object.defineProperty(self, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return self.$Component[key]
      },
      set: function proxySetter (newVal) {
        self.$Component[key] = newVal
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
function getStyleStr (_id, style) {
  if (!style) return ''
  if (style.i) {
    style = [style]
  }
  let isScope = styleIsScope(style[0])
  // console.log(style)
  return style.map(v => _getStrByStyle(_id, v, isScope)).join('')
}
function styleIsScope (style) {
  if (style) {
    return style[0][1].includes('[scope]')
  }
  return false
}
function _getStrByStyle (_id, style, isScope) {
  if (style) {
    let str = style[0][1].split('\n')
    let isScope = str[0].includes('scope')
    if (isScope) {
      str.shift()
    }
    return str.map(v => {
      if (v.includes('{')) {
        return isScope ? '[dom="' + _id + '"] ' + v : v
      }
      return v
    }).join('')
  }
  return ''
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
function forEach (array, v = () => {}, get = false) {
  let getArr = []
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, item; item = array[i]; i++) {
    get ? getArr.push(v(item, i)) : v(item, i)
  }
  return get ? getArr : null
}
function map (array, v = () => {}) {
  return forEach(array, v, true)
}
function setProp (obj, el) {
  // Object.keys(obj.props).forEach(prop => {
  //   if (prop in attrs) {
  //     el.setAttribute(attrs[prop], obj.props[prop])
  //   } else if (prop in EVENT_HANDLERS) {
  //     el.addEventListener(EVENT_HANDLERS[prop], obj.props[prop])
  //   } else {
  //     el.setAttribute(prop, obj.props[prop])
  //   }
  // })
  // if ('style' in obj.props) {
  //   const styles = obj.props.style
  //   Object.keys(styles).forEach(prop => {
  //     const value = styles[prop]
  //     if (typeof value === 'number') {
  //       el.style[prop] = `${value}px`
  //     } else if (typeof value === 'string') {
  //       el.style[prop] = value
  //     } else {
  //       throw new Error(`Expected "number" or "string" but received "${typeof value}"`)
  //     }
  //   })
  // }
}
const toCamelCase = str => str.replace(/-(\w)/g, (x) => { return x.slice(1).toUpperCase() })
module.exports = {
  def: def,
  protoAugment: protoAugment,
  copyAugment: copyAugment,
  hasOwn: hasOwn,
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
  toCamelCase
}
