import init from './init'
import lifeCycle from './init/lifeCycle'
import { Mix } from './init/mix'
import { getStyleStr } from './utils'
import BaseCustomElements from './BaseCustomElements'
var comps = window.comps = {}
@Mix()
class BaseComponent {
  constructor () {
    this._config()
    // console.log(new.target)
    comps[this._id] = this
    // console.log('BaseComponent', isCustomElements)
  }
  __connectedCallback (isRenderIn) {
    init(this, isRenderIn)
    this.$connectedCallback && this.$connectedCallback()
  }
  __disconnectedCallback () {
    console.log('disconnectedCallback')
    // 取消 监听
    // this.mutation.disconnect()
    this.isUnset = true
    lifeCycle.destroyed(this)
  }
  __beforeDisconnectedCallback () {
    console.log('disconnectedCallback')
    // 取消 监听
    // this.mutation.disconnect()
    lifeCycle.beforeDestroyed(this)
  }
  // 会被覆盖的方法
  $config () {
    return {

    }
  }
  // 会被覆盖的方法
  $data () {
    return {}
  }
  // 会被覆盖的方法
  $updated () {
  }
  // 渲染
  renderAt (el) {
    if (!this.isCustomElements) {
      this.elm = typeof el === 'string' ? document.querySelector(el) : el
      this.__connectedCallback(true)
    }
  }
  // 执行方法
  emit (fnName, ...params) {
    // console.log(fnName, this)
    return (typeof this[fnName] === 'function' ? this[fnName](...params) : (() => {
      console.warn(`该组件【${this._tagName}】没有这个方法:【${fnName}】`)
    })(...params))
  }
  // 触发父级方法
  emitProp (fnName, ...params) {
    // console.log(fnName, this.props[fnName])
    return typeof this.props[fnName] === 'function' ? this.props[fnName](...params) : (() => {
      console.warn(`该组件【${this._tagName}】没有接收到父组件的传值:【${fnName}】`)
    })(...params)
  }
}

export default BaseComponent
// 注解
export function Component (Config) {
  let { tagName, shadow, style, props, customElements } = Config
  return function (Target) {
    Target._tagName = tagName
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this._tagName = tagName
      this._shadow = !!shadow
      this._props = props || []
      this._eid = 'com_' + tagName
      this._style = getStyleStr(this._eid, style)
      // if (typeof customElements === 'undefined') {
      //   this.isCustomElements = true
      // }
      // console.log('this._style', this._style)
    }
    if (customElements || typeof customElements === 'undefined') {
      Target.customElements = true
      try {
        window.customElements.define(tagName, BaseCustomElements(Target))
      } catch (e) {
        console.log('e', e)
      }
    } else {
      Target.customElements = false
    }
  }
}
