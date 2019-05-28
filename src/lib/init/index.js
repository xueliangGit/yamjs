// import updateElement from '../vDom'
import updateElement from '../diff'
// /creatMutationObserser ,setAttributes,
import { creatMutationObserser, setAttributes, forEach, getCallFnName } from '../utils'
import nodeOps from '../utils/nodeOps'
import lifeCycle from './lifeCycle'
import { $ComponentSymbol, $vdomSymbol, $componentDataSymbol } from '../symbol'
// 初始化 init
let componenesSize = {}
let styleIsInstalled = {}
function _init () {
  lifeCycle.beforeCreate(this)
  if (this.elm) {
    // 现在都走这个
    bindElmentEvent(this)
  } else {
    this.elm = this
  }
  // _extends(this.$config(), this)
  let data = this[$componentDataSymbol] = this.$data()
  if (this._props) {
    this._props.forEach(v => {
      let propVal = (this.props ? this.props[v] : this.elm.getAttribute(v))
      data[v] = typeof propVal === 'number' || typeof propVal === 'string' ? propVal : propVal || data[v] || null
      // setAttributes(this, v, this.getAttribute(v))
    })
    if (!this.props) {
      this.mutation = creatMutationObserser(this.elm, (record) => {
        if (record.type === 'attributes') {
          setAttributes(this, record.attributeName, this.elm.getAttribute(record.attributeName) || data[record.attributeName] || null)
          _update(this)
        }
      }, { attributeFilter: this._props })
      // 绑定 原声元素上的方法
      forEach(this.elm.attributes, (v) => {
        if (typeof window[v.value] === 'function') {
          this.elm._runfn_ = this.elm._runfn_ || {}
          this.elm._runfn_[getCallFnName(this, v.name)] = window[v.value]
          this.elm.removeAttribute(v.name)
        }
      })
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
  lifeCycle.created(this)
  lifeCycle.beforeMount(this)
  createdComponent.call(this)
  initRefs.call(this)
  lifeCycle.mounted(this)
  this.update = () => {
    _update(this)
  }
}
function _update (context) {
  if (context.__isWillupdate) {
    clearTimeout(context.__isWillupdate)
    context.__isWillupdate = null
  }
  context.__isWillupdate = setTimeout(() => {
    context.__isWillupdate = null
    update.call(context)
  }, 20)
}
function initRefs () {
  this.$refs = this.$refs || {}
  this.__shadowRoot.querySelectorAll('[ref]').forEach(v => {
    this.$refs[v.getAttribute('ref')] = v[$ComponentSymbol] || v
    v.removeAttribute('ref')
  })
}
// 创建组件
function createdComponent () {
  if (this.render) {
    let style = document.createElement('style')
    style.type = 'text/css'
    style.innerText = this._style
    if (this._shadow) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = nodeOps.setAttachShadow(this.elm, { mode: 'closed' }))
      componenesSize[this._tagName] = componenesSize[this._tagName] ? componenesSize[this._tagName] + 1 : 1
      shadowRoot._root = this._tagName + '-' + componenesSize[this._tagName]
      nodeOps.appendChild(shadowRoot, style)
      nodeOps.appendChild(shadowRoot, getFram.call(this, true))
    } else {
      this.__shadowRoot = this.elm
      nodeOps.appendChild(this.elm, getFram.call(this))
      let parent = this.elm
      while (parent.parentElement || parent._parentElement) {
        parent = parent.parentNode || parent._parentNode
      }
      let nameStyle = parent.tagName === 'HTML' ? 'HTML' : parent._root ? parent._root : parent.parentNode ? parent.parentNode._root || parent.parentNode.host.tagName : 'HTML'
      if (!styleIsInstalled[nameStyle]) {
        styleIsInstalled[nameStyle] = []
      }
      if (!styleIsInstalled[nameStyle].includes(this._eid)) {
        if (nameStyle === 'HTML') {
        // body
          document.head.appendChild(style)
        } else {
        // div inner
          parent.insertBefore(style, parent.lastChild)
        }
        // nameStyle
        styleIsInstalled[nameStyle].push(this._eid)
      }
    }
    //
  }
}
// 若不是 自定元素仅仅值一个自定义组件需要绑定 相应的到元素上事件
function bindElmentEvent (context) {
  context.elm.disconnectedCallback = context.__disconnectedCallback
  context.elm.beforeDisconnectedCallback = context.__beforeDisconnectedCallback
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
}
// 获取dom片段
function getFram (isNeedDiv = false) {
  if (isNeedDiv) {
    this.$div = document.createElement('div')
  } else {
    this.$div = document.createElement('div')
  }
  this.$div.setAttribute('dom', this._eid)
  try {
    this[$vdomSymbol] = this.render()
  } catch (e) {
    console.log('e', e)
  }
  this.$div._parentElement = this.__shadowRoot
  this.$div._parentNode = this.__shadowRoot
  updateElement(this.$div, this[$vdomSymbol])
  return this.$div
}
// 更新dom
async function update () {
  lifeCycle.beforeUpdate(this)
  setTimeout(() => {
    if (this[$vdomSymbol]) {
      console.time('------$update')
      let newNode = this.render()
      let oldNode = this[$vdomSymbol]
      this[$vdomSymbol] = newNode
      updateElement(this.$div, newNode, oldNode)
      console.timeEnd('------$update')
      lifeCycle.updated(this)
    }
  })
}
export default function init (context) {
  _init.call(context)
}
