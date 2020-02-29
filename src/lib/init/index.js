/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 12:53:04
 */
import { _createElementJson } from '../vDom/createElement'
import updateElement from '../diff/index'
import { creatMutationObserser, setAttributes, forEach, log, isFalse, getDomStyleFlag, addSlot } from '../utils/index'
import { getCallFnName, syncComponentMark, setComponentForElm, getComponentByElm, setClosetParentCom } from '../utils/componentUtil'
import nodeOps from '../utils/nodeOps'
import lifeCycle from './lifeCycle'
import Destory from './destory'
import ChildComponentsManage from './childComponentsManage'
import { HTML_TAGS } from '../vDom/creatConfig'
import { $vdomSymbol, $componentDataSymbol, $closestParentSymbol, $slotSymbol } from '../symbol/index'

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
  initRefs.call(this)
  lifeCycle.mounted(this)
  this.update = () => {
    _update(this)
  }
  if (this.isbyUsedByuser) {
    _update(this)
    delete this.isbyUsedByuser
  }
}
function initSolt (childNodes) {
  this[$slotSymbol] = {}
  childNodes.forEach(v => {
    addSlot.call(this, v, (v.attributes ? v.getAttribute('slot') : v.props && v.props.slot) || 'default')
  })
  this[$slotSymbol]['length'] = Object.keys(this[$slotSymbol]).length
  this.update()
  // console.log('initSolt', this)
}
function create () {
  if (this.elm) {
    this._initSoltHooks = initSolt
    // this._initSolt()
    // // 新的处理slot
    this[$slotSymbol] = this[$slotSymbol] || {}
    // this.__hooks_slot = {}
    // 处理是和否有keeplive - 保持组件的内部的协调性
    // console.log('keeplive', this)
    getChildSlot.call(this, this.elm)
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
  let data = this[$componentDataSymbol] = this.$data()
  if (this._props) {
    this._props.forEach(v => {
      let propVal = (this.props ? this.props[v] : this.elm.getAttribute(v))
      data[v] = typeof propVal === 'number' || typeof propVal === 'string' ? propVal : propVal || data[v] || null
      // setAttributes(this, v, this.getAttribute(v))
    })
    if (!this.props) {
      // 处理外环境的情况
      this.mutation = creatMutationObserser(this.elm, (record) => {
        if (record.type === 'attributes') {
          setAttributes(this, record.attributeName, this.elm.getAttribute(record.attributeName) || data[record.attributeName] || null)
          _update(this)
        }
      }, { attributeFilter: this._props })
      // 绑定 原生元素上的方法
      forEach(this.elm.attributes, (v) => {
        if (typeof window[v.value] === 'function') {
          this.elm._runfn_ = this.elm._runfn_ || {}
          this.elm._runfn_[getCallFnName(this, v.name)] = window[v.value]
          this.elm.removeAttribute(v.name)
        }
      })
      // 添加 监听事件， 适配三方框架
      this.addWatcher = this.elm.addWatcher = (names, fn = () => { }) => {
        // 添加监听方法
        this.elm._runfn_ = this.elm._runfn_ || {}
        this.elm._runfn_[getCallFnName(this, names)] = fn
      }
      let handle = (e) => {
        // console.log('DOMNodeRemoved', e)
        if (this.elm) {
          if (e.target._eid && e.target._eid === this.elm._eid) {
            this.elm.parentNode.removeEventListener('DOMNodeRemoved', handle, false)
            if (this.elm.disconnectedCallback) {
              if (!this.elm.isRemovedBySlot) {
                this.elm.beforeDisconnectedCallback()
                this.elm.disconnectedCallback()
              }
            }
          }
        }
      }
      // 绑定 移除事件
      if (this.elm.parentNode) {
        this.elm.parentNode.addEventListener('DOMNodeRemoved', handle, false)
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
function initRefs () {
  this.$refs = this.$refs || {}
  // console.log(ref.forEach)
  forEach(this.__shadowRoot.querySelectorAll('[ref]'), (v) => {
    // console.log('initRefs', v, this)
    this.$refs[v.getAttribute('ref')] = v.isComponent ? getComponentByElm(v) : v
    // v.removeAttribute('ref')
  })
}
// 创建组件
function createdComponent () {
  if (this.render) {
    let style = document.createElement('style')
    style.type = 'text/css'
    try {
      style.appendChild(document.createTextNode(this._style))
    } catch (ex) {
      style.styleSheet.cssText = this._style
    }
    // style.innerText = this._style
    if (this._shadow) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = nodeOps.setAttachShadow(this.elm, { mode: 'closed' }))
      componenesSize[this._tagName] = componenesSize[this._tagName] ? componenesSize[this._tagName] + 1 : 1
      shadowRoot._root = this._tagName + '-' + componenesSize[this._tagName]
      shadowRoot._parentElement = this.elm
      shadowRoot._parentNode = this.elm
      nodeOps.appendChild(shadowRoot, style)
      nodeOps.appendChild(shadowRoot, getFram.call(this, true))
    } else {
      this.__shadowRoot = this.elm
      nodeOps.appendChild(this.elm, getFram.call(this))
      // // let parent = this.elm
      // console.log(this[$closestParentSymbol], this)
      // ori
      // while ((parent.parentElement || parent._parentElement) && parent.nodeType !== 11) {
      //   parent = parent.parentNode || parent._parentNode
      // }
      // new wati
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
        console.log('parentS.parentS._shadow ', parentS._shadow, parentS, nameStyle)
        if (nameStyle === 'HTML') {
          // body
          document.head.appendChild(style)
        } else {
          // div inner
          // parent.insertBefore(style, parent.lastChild)
          parentS.__shadowRoot.insertBefore(style, parentS.__shadowRoot.lastChild)
        }
        // nameStyle
        styleIsInstalled[nameStyle].push(this._cid)
      }
    }
    //
  }
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
    // context.elm.emit = (fnName) => {
  }
  // delFlag(context, '_canBeCalledExt')
}
// 删除标示
// eslint-disable-next-line no-unused-vars
function delFlag (context, key) {
  if (process.env.NODE_ENV === 'development' || context.env === 'development') {
    return
  }
  delete context[key]
}
//
function getRenderData (context) {
  let element = context.render()
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
      if (v.tagName === 'slot') {
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
  if (isNeedDiv) {
    this.$dom = document.createDocumentFragment() || document.createElement('div')
  } else {
    this.$dom = document.createDocumentFragment() || document.createElement('div')
  }
  // this.$dom.setAttribute('dom', this._cid)
  try {
    this[$vdomSymbol] = getRenderData(this)// .render()
    // console.log(this[$vdomSymbol])
    this[$vdomSymbol]._rootId = this._rootId
  } catch (e) {
    log('e', e)
  }
  // this.$dom._childrenOri = this._childrenOri
  this.$dom._parentElement = this.__shadowRoot
  this.$dom._parentNode = this.__shadowRoot
  updateElement(this.$dom, this[$vdomSymbol])
  this.$dom._eid = this._eid
  this.$dom.lastChild._eid = this._eid
  // this.$dom.lastChild.setAttribute(getDomStyleFlag(this._cid, true), '')
  this.$dom.lastChild.setAttribute(getDomStyleFlag(this._cid + '-root', true), '')
  return this.$dom
}
// 更新dom
function update () {
  // 优化 update 默认在¥updated内方法 只是数据更新不是dom更新
  if (this.__stopUpdata) return
  lifeCycle.beforeUpdate(this)
  // setTimeout(() => {
  // console.log('setTimeout', this._tagName, this)
  if (this[$vdomSymbol]) {
    // console.time('------$update')
    let newNode = getRenderData(this)// this.render()
    let oldNode = this[$vdomSymbol]
    this[$vdomSymbol] = newNode
    this[$vdomSymbol]._rootId = this._rootId
    updateElement(this.$dom, newNode, oldNode)
    // console.timeEnd('------$update')
    if (isFalse(lifeCycle.updated(this))) {
      this.__stopUpdata = true
      setTimeout(() => {
        this.__stopUpdata = false
      }, 500)
    }
  }
  // })
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

// 获取el com
function getNewElment (child, tagname) {
  let props = {}
  // let a = { child }
  // console.log(a)
  // if (child.getAttributeNames) {
  //   child.getAttributeNames().forEach(v => {
  //     props[v] = child.getAttribute(v)
  //   })
  // } else if (child.attributes) {
  forEach(child.attributes, (v) => {
    props[v.name] = v.value
  })
  // }
  tagname = tagname || (child.tagName && child.tagName.toLowerCase())

  return _createElementJson(tagname, props, ...getChildSlot(child, false))
}
function getChildSlot (elm, isAddToContext = true) {
  let newChildNodes = []
  if (elm.childNodes.length) {
    // eslint-disable-next-line no-cond-assign
    for (var j = 0, child; child = elm.childNodes[j];) {
      let slotAttr = (child.getAttribute && child.getAttribute('slot')) || undefined
      let tagname = child.tagName && child.tagName.toLowerCase()
      // console.log('getChildSlot', this, child, child.tagName, tagname, HTML_TAGS[tagname])
      if ((tagname && HTML_TAGS[tagname] && typeof HTML_TAGS[tagname] === 'object' && HTML_TAGS[tagname].isComponent)) {
        let newCom = getNewElment.call(this, child, tagname)
        newCom._ori = child
        newCom._isComponent = true
        child = newCom
        console.log('getAttributeNames1', newCom._ori.childNodes)
      }
      if (isAddToContext) {
        addSlot.call(this, child, slotAttr)
      } else {
        newChildNodes.push(child)
      }
      // 设置 isRemovedBySlot 处理外环境使用slot嵌套组件
      // child.isRemovedBySlot = true
      nodeOps.removeChild(elm, child._ori || child)
    }
  }
  return newChildNodes
}
