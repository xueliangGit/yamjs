import init from './init'
import { canUseCustomElements } from './init/bolConf'
import lifeCycle from './init/lifeCycle'
import { Mix } from './init/mix'
import { getStyleStr, toCamelCase, forEach } from './utils'
import { getCallFnName, getClosetParentCom } from './utils/componentUtil'
import cacheLib from './utils/cacheLib'
import BaseCustomElements from './BaseCustomElements'
import { HTML_TAGS } from './vDom/creatConfig'
import domOnLoad from './utils/domLoad'
var comps = window.comps = {}
let compsIds = 0
@Mix()
class Owl {
  constructor () {
    this._config()
    // console.log(new.target)
    comps[this._cid + '-' + ++compsIds] = this
    this._rootId = compsIds
  }
  __getProps (props) {
    this.__props = props
  }
  __connectedCallback (isRenderIn) {
    init(this, isRenderIn)
    this.$connectedCallback && this.$connectedCallback()
  }
  __disconnectedCallback () {
    if (this.isDestoryed) return
    lifeCycle.destroyed(this)
    this.isUnset = true
  }
  __beforeDisconnectedCallback () {
    if (this.isDestoryed) return
    lifeCycle.beforeDestroyed(this)
    // 取消 监听
    this.mutation && this.mutation.disconnect()
    this.Destory && this.Destory.run()
    // 取消 内部组件的 方法
    this.ChildComponentsManage && this.ChildComponentsManage.destory()
    //
    if (getClosetParentCom(this)) {
      getClosetParentCom(this).ChildComponentsManage && getClosetParentCom(this).ChildComponentsManage.del(this._eid)
    }
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
      if (!this.elm || this.elm.isInited) return
      this.__connectedCallback(true)
    }
  }
  // 手动更新方法
  update () {

  }
  // 执行方法
  emit (fnName, ...params) {
    if (!fnName) {
      console.warn(`需要传入方法名`)
      return
    }
    return (typeof this[fnName] === 'function' ? this[fnName](...params) : (() => {
      console.warn(`该组件【${this._tagName}】没有这个方法:【${fnName}】`)
    })(...params))
  }
  // 触发父级方法
  emitProp (fnName, ...params) {
    if (!fnName) {
      console.warn(`需要传入方法名`)
      return
    }
    if (this.props) {
      if (typeof this.props[fnName] === 'function') {
        return this.props[fnName](...params)
      } else {
        // console.warn(`该组件【${this._tagName}】没有接收到父组件的传值:【${fnName}】`)
        return null
      }
    } else {
      // 根组件 this.elm.getAttribute(fnName)
      let fn = getCallFnName(this, fnName)
      let runfn = window[fn] || (this.elm['_runfn_'] ? this.elm['_runfn_'][fn] : null)
      if (fn && typeof runfn === 'function') {
        return runfn(...params)
      } else {
        // console.warn(`该元素上【${this._tagName}】没有接收到父组件的传值:【${fnName}${fn}】`)
      }
    }
    return null
  }
  // 添加销毁事件
  addDestory (fn) {
    return this.Destory && this.Destory.add(fn)
  }
  // 移除销毁事件
  delDestory (eventId) {
    return this.Destory && this.Destory.del(eventId)
  }
}

export default Owl
// 注解
export function Component (Config) {
  let { tagName, shadow, style, props, customElements, canBeCalledExt } = Config
  return function (Target) {
    Target._tagName = tagName
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this._tagName = tagName
      this._name = toCamelCase(tagName)
      this._shadow = !!shadow || false
      this._props = props || []
      this._canBeCalledExt = typeof canBeCalledExt === 'boolean' ? canBeCalledExt : false
      this._cid = 'com-' + tagName
      this._style = getStyleStr(this._cid, style)
    }
    if (!HTML_TAGS[tagName]) {
      HTML_TAGS[tagName] = {
        name: tagName,
        isComponent: true,
        class: Target
      }
    }
    if (!cacheLib.get('com-' + tagName)) {
      cacheLib.set('com-' + tagName, Target)
    }
    if ((customElements || typeof customElements === 'undefined') && canUseCustomElements) {
      Target.customElements = true
      try {
        window.customElements.define(tagName, BaseCustomElements(Target))
      } catch (e) {
        console.log('e', e)
      }
    } else {
      Target.customElements = false
      domOnLoad(() => {
        let doms = document.querySelectorAll(tagName)
        forEach(doms, (node) => {
          if (!node.isInited) {
            (new Target()).renderAt(node)
          }
        })
      })
    }
  }
}
