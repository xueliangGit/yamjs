/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 15:48:40
 */
import './utils/Polyfill.js'
import init, { initConfig } from './init/index'
import { canUseCustomElements } from './init/bolConf'
import lifeCycle from './init/lifeCycle'
import { Mix } from './init/mix'
import { getStyleStr, guid2, toCamelCase, forEach, getCid, supportMutationObserver } from './utils/index'
import { getCallFnName, getClosetParentCom } from './utils/componentUtil'
import cacheLib from './utils/cacheLib'
import BaseCustomElements from './BaseCustomElements'
import { HTML_TAGS } from './vDom/creatConfig'
import domOnLoad from './utils/domLoad'
import { versionBate } from '../../package.json'
var comps = (window.comps = {})
let hasCompsName = []
let __localYamjsElm = {}
let compsIds = 0
let lifeCycleArray = Object.keys(lifeCycle)
@Mix()
class Yam {
  constructor() {
    this._eid = guid2()
    initConfig.call(this)
    this._config && this._config()
    lifeCycle.beforeInit(this)
    // console.log(new.target)
    comps[this._cid + '-' + ++compsIds] = this
    this._rootId = compsIds
    // 自动启动函数
    // console.log(this._autoDo)
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
      getClosetParentCom(this).ChildComponentsManage &&
        getClosetParentCom(this).ChildComponentsManage.del(this._eid)
    }
  }
  // 会被覆盖的方法
  $config () {
    return {}
  }
  // 会被覆盖的方法
  $data () {
    return {}
  }
  // 会被覆盖的方法
  $updated () { }
  // 渲染
  renderAt (el) {
    if (!this.isCustomElements) {
      // if(el).
      this.elm = typeof el === 'string' ? document.querySelector(el) : el
      if (!this.elm || this.elm.isInited) return
      this.elm.isInited = true
      this.__connectedCallback(true)
    }
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
    return typeof this[fnName] === 'function'
      ? this[fnName](...params)
      : (() => {
        console.warn(`该组件【${ this._tagName }】没有这个方法:【${ fnName }】`)
      })(...params)
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
      let runfn =
        window[fn] || (this.elm['_runfn_'] ? this.elm['_runfn_'][fn] : null)
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
  // 添加声明周期回调函数
  addLifeCycleCallFn (lifeCycle, fn) {
    if (~lifeCycleArray.indexOf(lifeCycle)) {
      if (typeof fn === 'function') {
        this.lifeCycleCall = this.lifeCycleCall || {};
        (this.lifeCycleCall[lifeCycle + '_callfn'] =
          this.lifeCycleCall[lifeCycle + '_callfn'] || []).push(fn)
      } else {
        console.warn(`
        要添加的组件周期回调必须是函数
        `)
      }
    } else {
      console.warn(`
      要添加的组件周期回调的参数，只能是${lifeCycle.join(',') }，请检查
      `)
    }
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
    store,
    router
  } = Config
  hasCompsName.push(tagName)
  return function (Target) {
    Target._tagName = tagName
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this._tagName = tagName
      this._name = toCamelCase(tagName)
      this._shadow = !!shadow || false
      this._props = props || []
      this._canBeCalledExt =
        typeof canBeCalledExt === 'boolean' ? canBeCalledExt : false
      this._cid = getCid(tagName)
      this._style = getStyleStr(this._cid, style)
      // store
      this.$store = {}
      if (store && store.add) {
        store.add(this)
      }
      // router
      this.$router = {}
      if (router) {
        router.add(this)
      }
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
    if (
      (customElements || typeof customElements === 'undefined') &&
      canUseCustomElements
    ) {
      Target.customElements = true
      try {
        window.customElements.define(tagName, BaseCustomElements(Target))
      } catch (e) {
        console.log('e' + tagName, e)
      }
    } else {
      Target.customElements = false
      if (!supportMutationObserver) {
        __localYamjsElm = __localYamjsElm || {}
        __localYamjsElm[tagName] = Target
      }
      domOnLoad(() => {
        let doms = document.querySelectorAll(tagName)
        forEach(doms, node => {
          if (!node.isInited) {
            new Target().renderAt(node)
          }
        })
      })
    }
    return Target
  }
}
// 适配器 store
export function store (Config) {
  return function (Target) { }
}
if (!supportMutationObserver) {
  window.yamjsRender = function (node, tagName = '') {
    if (!node.isInited) {
      tagName = tagName || node.tagName.toLocaleLowerCase()
      if (__localYamjsElm[tagName]) {
        new __localYamjsElm[tagName]().renderAt(node)
      }
    }
  }
}
console.log(`
    
    Bate-${versionBate } for this version of yamjs, 
    
    that is a baseComponet for html and can run in html or Vue or reactjs
    
`)
