/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-10 11:40:16
 */
// import './polyfill.js'
import init, { initConfig } from './init/index'
import { canUseCustomElements } from './Conf'
import lifeCycle from './init/lifeCycle' // , { addLifeCycle }
import { Mix } from './init/mix'
import _mixin from './init/_mixin'
// getStyleStr 使用loader后使用这个了
import { guid2, toCamelCase, forEach, getCid, isFunc, isStr } from './utils/index' // supportMutationObserver
import { getCallFnName } from './utils/componentUtil' //, getClosetParentCom
import cacheLib from './utils/cacheLib'
import BaseCustomElements from './BaseCustomElements'
import { HTML_TAGS } from './vDom/creatConfig'
import domOnLoad from './utils/domLoad'
import forNotsupportMutationObserver from './utils/forNotsupportMutationObserver.js'
import { version } from '../../package.json'
import { getSlotComponentsIsOrInstallState, syncSlotComponentsState, isSlotComponentsAndRender, isRerenderSlotElment } from './helpers/slotHelper.js'
// var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
// var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
// var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
// if (isIE || isIE11) {
//   import('./polyfill').then(() => { })
// }
var comps = (window.comps = {})
let hasCompsName = []
let compsIds = 0
// let lifeCycleArray = Object.keys(lifeCycle)
@Mix()
class Yam {
  constructor() {
    this._eid = guid2()
    // this.addLifeCycle = addLifeCycle.bind(this)
    initConfig.call(this)
    this._config && this._config()
    lifeCycle.beforeInit(this)
    comps[this._cid + '-' + ++compsIds] = this
    this._rootId = compsIds
    // 自动启动函数
    if (this._autoDo) {
      for (const key in this._autoDo) {
        if (this._autoDo.hasOwnProperty(key)) {
          this._autoDo[key](this)
        }
      }
    }
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
    // 调整this.Destroy 时机，从移除之前转移到移除的时候，
    this.Destory && this.Destory.run()
    lifeCycle.destroyed(this)
    this.isUnset = true
  }
  __beforeDisconnectedCallback () {
    if (this.isDestoryed) return
    lifeCycle.beforeDestroy(this)
    // 取消 监听
    if (!this._is_hot_update) {
      // 如果是热更新造成的 不移除这个监听
      this.mutation && this.mutation.disconnect()
    }
    // 取消 内部组件的 方法
    this.ChildComponentsManage && this.ChildComponentsManage.destory()
    //
    // let ClosetParentCom = getClosetParentCom(this)
    // if (ClosetParentCom) {
    //   ClosetParentCom.ChildComponentsManage &&
    //     ClosetParentCom.ChildComponentsManage.del(this._eid)
    // }
  }
  // 会被覆盖的方法
  $data () {
    return {}
  }
  // 会被覆盖的方法
  $updated () { }
  // 渲染
  renderAt (el, props = null) {
    // 需要判断是否移除后从新加载的
    isRerenderSlotElment(this, el)
    if (isSlotComponentsAndRender(el)) {
      return
    }
    this.props = this.props || props
    this.elm = isStr(el) ? document.querySelector(el) : el
    if ((!this.elm || this.elm.isInited)) return
    this.elm.isInited = true
    syncSlotComponentsState(this.elm, true)
    this.__connectedCallback(true)
  }
  // 手动更新方法
  update () {
    // 鉴定是否应被掉过
    this.isbyUsedByuser = true
  }
  // 执行方法
  emit (fnName, ...params) {
    if (!fnName) {
      console.warn(`需要传入方法名`)
      return
    }
    return isFunc(this[fnName])
      ? this[fnName](...params)
      : (() => {
        console.warn(`该组件【${this._tagName}】没有这个方法:【${fnName}】`)
      })(...params)
  }
  // 触发父级方法
  emitProp (fnName, ...params) {
    if (!fnName) {
      console.warn(`需要传入方法名`)
      return
    }
    if (this.props) {
      if (isFunc(this.props[fnName])) {
        return this.props[fnName](...params)
      } else {
        // console.warn(`该组件【${this._tagName}】没有接收到父组件的传值:【${fnName}】`)
        return null
      }
    } else {
      // 根组件 this.elm.getAttribute(fnName)
      let fn = getCallFnName(this, fnName)
      let runfn =
        window[fn] || (this.elm['_runfn_'] ? this.elm['_runfn_'][fn] : null)
      if (fn && isFunc(runfn)) {
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
Yam.getComsName = () => hasCompsName
export default Yam
// 注解 适配器
export function Component (Config) {
  let {
    tagName,
    shadow,
    style,
    props,
    customElements,
    canBeCalledExt,
    // store,
    // router,
    mixin = [],
    ...params // ...params
  } = (Config || {})
  hasCompsName.push(tagName)
  return function (Target) {
    if (Target._classIsInitedOk) return
    const isCustomElements = (customElements || typeof customElements === 'undefined') &&
      canUseCustomElements
    Target._tagName = tagName
    // Target._$config = Config
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this.$config = Config
      this.isCustomElements = isCustomElements
      this._tagName = tagName
      this._name = toCamelCase(tagName)
      this._shadow = !!shadow || false
      this._props = props || []
      this._canBeCalledExt =
        typeof canBeCalledExt === 'boolean' ? canBeCalledExt : false
      this._cid = getCid(tagName)
      this._style = (Yam._gSS ? Yam._gSS(this._cid, style) : style).toString() // getStyleStr(this._cid, style) 使用了loader 后不需要这个了
      // plugins
      let keys = Object.keys(params)
      forEach(keys, v => {
        let vv = params[v]
        if (isFunc(vv)) {
          return vv(this)
        } else {
          typeof vv === 'object' && isFunc(vv) && vv.apply(this)
        }
      })
      if (!Array.isArray(mixin)) {
        mixin = [mixin]
      }
      forEach(mixin, v => _mixin(v, this))
    }
    // 允许覆盖 ；使用最新的组件去渲染
    // if (!HTML_TAGS[tagName]) {
    // 都把组件存在 HTML_TAGS 里面
    HTML_TAGS[tagName] = {
      name: tagName,
      isComponent: true,
      class: Target
    }
    // }
    // 允许覆盖 ；使用最新的组件去渲染
    // if (!cacheLib.get('com-' + tagName)) {
    cacheLib.set(getCid(tagName), Target)
    // }
    if (
      isCustomElements
    ) {
      Target.customElements = true
      try {
        window.customElements.define(tagName, BaseCustomElements(Target, props))
      } catch (e) {
        // console.log('e' + tagName, e)
      }
    } else {
      Target.customElements = false
      // if (!supportMutationObserver) {
      forNotsupportMutationObserver(tagName, Target)
      // }
      domOnLoad(() => {
        let doms = document.querySelectorAll(tagName)
        forEach(doms, node => {
          if (isSlotComponentsAndRender(node)) {
            return
          }
          if (!node.isInited && getSlotComponentsIsOrInstallState(node, true)) {
            new Target().renderAt(node)
          }
        })
      })
    }
    Target._classIsInitedOk = true
    return Target
  }
}
// 适配器 store
// export function store (Config) {
//   return function (Target) { }
// }
console.log(`
    
    Bate-${version} for this version of yamjs, 
    
    that is a baseComponet for html and can run in html or Vue or reactjs or ng
    
`)
