// import updateElement from '../vDom'
import updateElement from '../diff'

import { creatMutationObserser, proxy, setAttributes, _extends } from '../utils/index'
// $vdom Symbol
var $vdom = Symbol('$vdom')
// $componentData Symbol
var $componentData = Symbol('$componentData')
// 初始化 init
let styleIsInstalled = {}
function _init () {
  _extends(this.$config(), this)
  let data = this[$componentData] = this.$data()
  if (this._props) {
    this._props.forEach(v => {
      data[v] = this.getAttribute(v)
      setAttributes(this, v, this.getAttribute(v))
    })
    this.mutation = creatMutationObserser(this, (record) => {
      if (record.type === 'attributes') {
        setAttributes(this, record.attributeName, this.getAttribute(record.attributeName))
      }
    }, { attributeFilter: this._props })
  }
  Object.keys(data).forEach(key => {
    proxy(key, Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return this[$componentData][key]
      },
      set: function proxySetter (newVal) {
        this[$componentData][key] = newVal
        _update(this)
      }
    }))
  })
  // console.warn('asdasd', this)
  // observe(data || {}, this)
  createdComponent.call(this)
  initRefs.call(this)
}
function _update (context) {
  update.call(context)
}
function initRefs () {
  this.$refs = this.$refs || {}
  this.__shadowRoot.querySelectorAll('[ref]').forEach(v => {
    this.$refs[v.getAttribute('ref')] = v
    v.removeAttribute('ref')
  })
  // console.log(this.__shadowRoot.querySelectorAll('[ref]'))
}
// 创建组件
function createdComponent () {
  if (this.render) {
    let style = document.createElement('style')
    style.type = 'text/css'
    style.innerText = this._style
    if (this._shadow) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = this.attachShadow({ mode: 'closed' }))
      // var clone = document.importNode(getFram.call(this), true)
      shadowRoot.appendChild(style)
      shadowRoot.appendChild(getFram.call(this))
    } else {
      // this.appendChild(style)
      this.appendChild(getFram.call(this))
      this.__shadowRoot = this
      let parent = this.parentElement
      while (parent.parentElement) {
        parent = parent.parentNode
      }
      let nameStyle = parent.tagName === 'HTML' ? 'HTML' : parent.parentNode.host.tagName
      if (!styleIsInstalled[nameStyle]) {
        styleIsInstalled[nameStyle] = []
      }
      if (!styleIsInstalled[nameStyle].includes(this._cid)) {
        if (parent.tagName === 'HTML') {
          // body
          document.head.appendChild(style)
        } else {
          // div inner
          parent.parentNode.insertBefore(style, parent)
        }
        // nameStyle
        // console.log('parent', parent.parentNode, styleIsInstalled)
        styleIsInstalled[nameStyle].push(this._cid)
      }
    }
    //
  }
}
// 获取dom片段
function getFram () {
  this.$dom = document.createElement('div')
  this.$dom.setAttribute('dom', this._cid)
  // console.log(this.render.toString())
  try {
    this[$vdom] = this.render()
  } catch (e) {
    console.log('e', e)
  }
  updateElement(this.$dom, this[$vdom])
  return this.$dom
}
// 更新dom
async function update () {
  setTimeout(() => {
    if (this[$vdom]) {
      console.time('------$update')
      let newNode = this.render()
      let oldNode = this[$vdom]
      this[$vdom] = newNode
      updateElement(this.$dom, newNode, oldNode)
      console.timeEnd('------$update')
      console.log(newNode)
      this.$updated()
    }
  })
}
export default function init (context) {
  _init.call(context)
}
