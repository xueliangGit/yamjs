/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 16:35:15
 */
// import { _createElementJson } from '../vDom/createElement'
import updateElement from '../diff/index'
import { creatMutationObserser, setAttributes, forEach, isFalse, getDomStyleFlag, isFunc, isStr } from '../utils/index' // log,
import { getChildSlot, isSlotTag } from '../helpers/slotHelper'
import { getCallFnName, syncComponentMark, setComponentForElm, getComponentByElm, setClosetParentCom } from '../utils/componentUtil'
import nodeOps from '../utils/nodeOps'
// import taskLine from '../utils/taskLine'
import lifeCycle from './lifeCycle'
import Destory from './destory'
import ChildComponentsManage from './childComponentsManage'
// import { HTML_TAGS } from '../vDom/creatConfig'
import { $vdomSymbol, $componentDataSymbol, $closestParentSymbol, $slotSymbol } from '../symbol/index'
import { isDev } from '../env'
import { getMixinConfig } from './_mixin'
import { _createElementJson } from '../vDom/createElement'
// 初始化 init
let componenesSize = {}
let styleIsInstalled = {}
function _init () {
  lifeCycle.beforeCreate(this)
  create.call(this)
  lifeCycle.created(this)
  lifeCycle.beforeMount(this)
  setClosetParentCom(this)
  createdComponent.call(this)
  // taskLine.addMicTask(() => {
  // initRefs.call(this)
  lifeCycle.mounted(this)
  // })
  this.update = () => {
    _update(this)
  }
  if (this.isbyUsedByuser) {
    _update(this)
    delete this.isbyUsedByuser
  }
  // taskLine.runMicTask()
}
function create () {
  if (this.elm) {
    // this._initSoltHooks = initSolt
    // // 新的处理slot
    this[$slotSymbol] = this[$slotSymbol] || {}
    // 处理是和否有keeplive - 保持组件的内部的协调性
    getChildSlot(this, this.elm)
    this[$slotSymbol]['length'] = Object.keys(this[$slotSymbol]).length
    // this.elm.children = []
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
    bindElmentEvent(this)
    setComponentForElm(this.elm, this)
  } else {
    this.elm = this
  }
  // 设置元素信息
  this.elm._eid = this._eid
  // _extends(this.$config(), this)
  // mixin
  let data = this[$componentDataSymbol] = Object.assign(...getMixinConfig().$data.map(v => v()), isFunc(this.$data) ? this.$data() : this.$data || {})
  if (this._props) {
    this._props.forEach(v => {
      let propVal = (this.props ? this.props[v] : this.elm.getAttribute(v))
      data[v] = typeof propVal === 'number' || isStr(propVal) ? propVal : propVal || data[v] || null
      // setAttributes(this, v, this.getAttribute(v))
    })
    if (!this.props && this.elm.nodeType !== 11) {
      // 处理外环境的情况
      let elm = this.elm
      this.mutation = creatMutationObserser(elm, function (record) {
        if (record.type === 'attributes') {
          let comps = getComponentByElm(elm)
          setAttributes(comps, record.attributeName, elm.getAttribute(record.attributeName) || data[record.attributeName] || null)
          _update(comps)
        }
      }, { attributeFilter: this._props })
      // 绑定 原生元素上的方法
      forEach(elm.attributes, (v) => {
        if (isFunc(window[v.value])) {
          elm._runfn_ = elm._runfn_ || {}
          elm._runfn_[getCallFnName(this, v.name)] = window[v.value]
          elm.removeAttribute(v.name)
        }
      })
      // 添加 监听事件， 适配三方框架
      this.addWatcher = elm.addWatcher = (names, fn = () => { }) => {
        // 添加监听方法
        elm._runfn_ = elm._runfn_ || {}
        elm._runfn_[getCallFnName(this, names)] = fn
      }
      let handle = (e) => {
        // console.log('DOMNodeRemoved', e)
        if (elm) {
          if (e.target._eid && e.target._eid === elm._eid && e.target === elm) {
            elm.parentNode.removeEventListener('DOMNodeRemoved', handle, false)
            if (elm.disconnectedCallback) {
              if (!elm.isRemovedBySlot) {
                elm.beforeDisconnectedCallback()
                elm.disconnectedCallback()
              }
            }
          }
        }
      }
      // 绑定 移除事件
      if (elm.parentNode) {
        elm.parentNode.addEventListener('DOMNodeRemoved', handle, false)
      } else {
        // console.log(this.elm)
      }
    }
  }
  Object.keys(data).forEach(key => {
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return this[$componentDataSymbol][key]
      },
      set: function proxySetter (newVal) {
        this[$componentDataSymbol][key] = newVal
        _update(this)
      }
    })
    if (typeof this[$componentDataSymbol][key] === 'object' && !Array.isArray(this[$componentDataSymbol][key])) {
      // setProxy(this[$componentDataSymbol][key], this)
    }
  })
}
function _update (context) {
  if (context.__isWillupdate) {
    clearTimeout(context.__isWillupdate)
    context.__isWillupdate = null
  }
  context.__isWillupdate = setTimeout(() => {
    context.__isWillupdate = null
    update.call(context)
  })
}
// function initRefs () {
//   this.$refs = this.$refs || {}
//   // console.log(ref.forEach)
//   forEach(this.__shadowRoot.querySelectorAll('[ref]'), (v) => {
//     // console.log('initRefs', v, this)
//     this.$refs[v.getAttribute('ref')] = v.isComponent ? getComponentByElm(v) : v
//     // v.removeAttribute('ref')
//   })
// }
// 创建组件
function createdComponent () {
  if (this.render) {
    // style.innerText = this._style
    if (this._shadow) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = nodeOps.setAttachShadow(this.elm, { mode: 'closed' }))
      // 判断是否是iframe
      // if (shadowRoot.nodeName && shadowRoot.nodeName === 'IFRAME') {
      //   shadowRoot = shadowRoot.contentDocument.body
      // }
      componenesSize[this._tagName] = componenesSize[this._tagName] ? componenesSize[this._tagName] + 1 : 1
      shadowRoot._root = this._tagName + '-' + componenesSize[this._tagName]
      shadowRoot._parentElement = this.elm
      shadowRoot._parentNode = this.elm
      nodeOps.appendChild(shadowRoot, getFram.call(this, true))
      this.$dom = shadowRoot.lastChild
    } else {
      this.__shadowRoot = this.elm
      nodeOps.appendChild(this.elm, getFram.call(this))
      this.$dom = this.__shadowRoot.lastChild
    }
    initStyle.call(this)
    //
  }
  this.initStyle = initStyle
}
function initStyle () {
  let style = document.createElement('style')
  style.type = 'text/css'
  try {
    style.appendChild(document.createTextNode(this._style))
  } catch (ex) {
    style.styleSheet.cssText = this._style
  }
  let p
  if (this._styleDom && (p = this._styleDom.parentNode)) {
    p.replaceChild(style, this._styleDom)
  } else {
    if (this._shadow) {
      nodeOps.insertBefore(this.__shadowRoot, style, this.$dom)
    } else {
      let parentS = this[$closestParentSymbol]
      if (!parentS) parentS = getComponentByElm(this.elm)
      while (!parentS._shadow && parentS[$closestParentSymbol]) {
        parentS = parentS[$closestParentSymbol]
      }
      let nameStyle = parentS._shadow ? parentS.__shadowRoot._root : 'HTML'
      // parent.tagName === 'HTML' ? 'HTML' : parent._root ? parent._root : parent.parentNode ? parent.parentNode._root || parent.parentNode.host.tagName : 'HTML'
      if (!styleIsInstalled[nameStyle]) {
        styleIsInstalled[nameStyle] = []
      }
      if (!~styleIsInstalled[nameStyle].indexOf(this._cid)) {
        // console.log('parentS.parentS._shadow ', parentS._shadow, parentS, nameStyle)
        if (nameStyle === 'HTML') {
          // body
          document.head.appendChild(style)
        } else {
          nodeOps.insertBefore(parentS.__shadowRoot, style, parentS.$dom)
        }
        // nameStyle
        styleIsInstalled[nameStyle].push(this._cid)
      }
    }
  }
  this._styleDom = style
}
// 若不是 自定元素仅仅值一个自定义组件需要绑定 相应的到元素上事件
function bindElmentEvent (context) {
  syncComponentMark(context)
  context.elm.disconnectedCallback = context.__disconnectedCallback.bind(context)
  context.elm.beforeDisconnectedCallback = context.__beforeDisconnectedCallback.bind(context)
  if (context._canBeCalledExt) {
    // 获取子组件
    context.elm.$refs = (name) => {
      return name ? context.$refs[name] || null : context.$refs
    }
    // 调用组件的方法
    context.elm.emit = (...arg) => context.emit(...arg)
    // 调用父组件的方法
    context.elm.emitProp = (...arg) => context.emitProp(...arg)
  }
}
// 删除标示
// eslint-disable-next-line no-unused-vars
function delFlag (context, key) {
  if (isDev || context.env === 'development') {
    return
  }
  delete context[key]
}
//
function getRenderData (context) {
  let element = context.render(_createElementJson)
  setRootName(element, context._tagName, context)
  return element
}
function setRootName (element, tagName, context) {
  element._root = element._root || tagName
  if (element.childNodes) {
    for (var i = 0; i < element.childNodes.length; i++) {
      let v = element.childNodes[i]
      // element.childNodes.forEach((v, i) => {
      setRootName(v, tagName, context)
      if (isSlotTag(v)) {
        let slotelm = (context[$slotSymbol][v.props.name || 'default']) || []
        element.childNodes.splice(i, 1, ...slotelm)
        // v.childNodes = context[$slotSymbol][v.props.name || 'default']
        i += slotelm.length
      }
      // })
    }
  }
}
// 获取dom片段
function getFram (isNeedDiv = false) {
  let dom = document.createDocumentFragment() || document.createElement('div')
  this[$vdomSymbol] = getRenderData(this)// .render()
  this[$vdomSymbol]._rootId = this._rootId
  dom._parentElement = this.__shadowRoot
  dom._parentNode = this.__shadowRoot
  updateElement(dom, this[$vdomSymbol])
  dom._eid = this._eid
  dom.lastChild._eid = this._eid
  dom.lastChild.setAttribute(getDomStyleFlag(this._cid + '-root', true), '')
  return dom
}
// 更新dom
function update () {
  // 优化 update 默认在¥updated内方法 只是数据更新不是dom更新
  if (this.__stopUpdata) return
  lifeCycle.beforeUpdate(this)
  if (this[$vdomSymbol]) {
    let newNode = getRenderData(this)// this.render()
    let oldNode = this[$vdomSymbol]
    this[$vdomSymbol] = newNode
    this[$vdomSymbol]._rootId = this._rootId
    updateElement(this.$dom, newNode, oldNode)
    if (isFalse(lifeCycle.updated(this))) {
      this.__stopUpdata = true
      setTimeout(() => {
        this.__stopUpdata = false
      }, 500)
    }
  }
}

// 处理  已经初始化的组件，再次初始化问题 -- vue 非编译版本出现问题
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
export default function init (context, isRenderIn) {
  // 初始化 配置信息
  _init.call(context)
}
// 初始化 参数和数据
export function initConfig () {
  this.Destory = new Destory(this)
  this.ChildComponentsManage = new ChildComponentsManage(this)
}
