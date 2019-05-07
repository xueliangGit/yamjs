import { createElementJson } from './vDom/createElement'
import init from './init'
import { getStyleStr } from './utils'
var comps = window.comps = {}
// 预留字段
var reserved = 'constructor __createElement connectedCallback $connectedCallback disconnectedCallback $config $data mutation render'
// 安装的扩展
var installed = []
// eslint-disable-next-line
class BaseComponent extends HTMLElement {
  constructor () {
    super()
    this._config()
    comps[this._id] = this
    // console.log('BaseComponent', this._style)
  }
  static __createElement (tagName, props = {}, ...childNodes) {
    // childNodes = childNodes.length ? childNodes : undefined
    return createElementJson(tagName, props, childNodes)
  }
  static use (Config) {
    /**
     * obj={
     *  name:'',
     * install:function(baseConpoment){}
     * }
     *  */
    let { name, install } = Config
    if (!name) {
      console.warn(`
          必须填写name
        `)
      return false
    }
    if (typeof install !== 'function') {
      console.warn(`
          install 必须是个方法
        `)
      return false
    }
    if (installed.includes(name)) {
      console.info(`已经注册此扩展:${name}`)
    } else {
      installed.push(name)
      install(addPrototype(BaseComponent))
    }
  }
  connectedCallback () {
    this.__$Els = {}
    init.call(this)
    this.$connectedCallback && this.$connectedCallback()
  }
  disconnectedCallback () {
    // 取消 监听
    this.mutation.disconnect()
  }
  // 会被覆盖的方法
  $config () {
    return {

    }
  }
  // 会被覆盖的方法
  $data () {
    return {
    }
  }
  // 会被覆盖的方法
  $updated () {
  }
}
export default BaseComponent
// 注解
export function Component (Config) {
  let { tagName, shadow, style, props } = Config
  return function (Target) {
    Target._tagName = tagName
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this._tagName = tagName
      this._shadow = !!shadow
      this._props = props || []
      this._eid = 'com_' + tagName
      this._style = getStyleStr(this._eid, style)
      // console.log('this._style', this._style)
    }
    try {
      window.customElements.define(tagName, Target)
    } catch (e) {
      console.log('e', e)
    }
  }
}

function addPrototype (Target) {
  return {
    addPrototype (type, fn) {
      if (reserved.includes(type)) {
        console.warn(`
        方法名：${type} 为预留字段，请修改
        `)
        return false
      }
      Target.prototype[type] = fn
    }
  }
}
