import updateElement from './vDom'
import { createElementJson } from './vDom/createElement'
import { creatMutationObserser,
  proxy,
  setAttributes, _extends } from './utils'
// eslint-disable-next-line no-unused-vars
var $vdom = Symbol('$vdom')
var comps = window.comps = {}
// eslint-disable-next-line
class BaseComponent extends HTMLElement {
  constructor () {
    super()
    this._config()
    comps[this._id] = this
    console.log('BaseComponent', this._style)
  }
  static __createElement (tagName, props = {}, ...childNodes) {
    return createElementJson(tagName, props, childNodes)
  }
  __init () {
    _extends(this.$config(), this)
    let data = this.$ComponentData = this.$data()
    if (this.props) {
      this.props.forEach(v => {
        data[v] = this.getAttribute(v)
        setAttributes(this, v, this.getAttribute(v))
      })
      this.mutation = creatMutationObserser(this, (record) => {
        if (record.type === 'attributes') {
          setAttributes(this, record.attributeName, this.getAttribute(record.attributeName))
        }
      }, { attributeFilter: this.props })
    }
    Object.keys(data).forEach(key => {
      proxy(key, Object.defineProperty(this, key, {
        configurable: false,
        enumerable: true,
        get: function proxyGetter () {
          return this.$ComponentData[key]
        },
        set: function proxySetter (newVal) {
          this.$ComponentData[key] = newVal
          this.$update()
        }
      }))
    })
    // observe(data || {}, this)
    if (this.component) {
      this._created()
    }
    this.__initRefs()
  }
  connectedCallback () {
    this.__$Els = {}
    this.__init()
    this.$connectedCallback && this.$connectedCallback()
  }
  disconnectedCallback () {
    //
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
  _created () {
    if (this.render) {
      let style = document.createElement('style')
      style.innerText = this._style
      if (this._shadow) {
        var shadowRoot = this.__shadowRoot || (this.__shadowRoot = this.attachShadow({ mode: 'closed' }))
        // var clone = document.importNode(this.$getFram(), true)
        shadowRoot.appendChild(style)
        shadowRoot.appendChild(this.$getFram())
      } else {
        this.appendChild(style)
        this.appendChild(this.$getFram())
        this.__shadowRoot = this
      }
    }
  }
  $update () {
    if (this[$vdom]) {
      console.time('$update')
      let newNode = this.render()
      console.log(newNode)
      console.log('updte')
      updateElement(this.$div, newNode, this[$vdom])
      this[$vdom] = newNode
      console.timeEnd('$update')
    }
  }
  $getFram () {
    this.$div = document.createElement('div')
    this.$div.setAttribute('dom', this._id)
    // console.log(this.render)
    try {
      this[$vdom] = this.render()
    } catch (e) {
      console.log('e', e)
    }
    updateElement(this.$div, this[$vdom])
    return this.$div
  }
  __initRefs () {
    this.$refs = this.$refs || {}
    this.__shadowRoot.querySelectorAll('[ref]').forEach(v => {
      this.$refs[v.getAttribute('ref')] = v
      v.removeAttribute('ref')
    })
    console.log(this.__shadowRoot.querySelectorAll('[ref]'))
  }
  _animate (keyframes, duration) {
    for (let i in keyframes[0]) {
      this.style[i] = keyframes[0][i]
    }
    this.style.display = 'block'
    this.style.transition = duration + 'ms'
    for (let i in keyframes[1]) {
      this.style[i] = keyframes[1][i]
    }
    setTimeout(() => {
      this.style.transition = ''
    }, duration)
    return {}
  }
  fadeOut (duration = 300) {
    const keyframes = [{ opacity: 1, marginTop: '0' }, { opacity: 0, marginTop: '50px' }]
    return this._animate(keyframes, duration).finished
  }
  fadeIn (duration = 300) {
    const keyframes = [{ opacity: 0, marginTop: '50px' }, { opacity: 1, marginTop: '0px' }]
    return this._animate(keyframes, duration).finished
  }
}
export default BaseComponent
export function Component (Config) {
  let { tagName, shadow, style } = Config
  return function (Target) {
    Target._tagName = tagName
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this._tagName = tagName
      this._shadow = !!shadow
      this._id = 'com_' + Date.now()
      this._style = getStyleStr(this._id, style)
      console.log('this._style', this._style)
    }
    try {
      window.customElements.define(tagName, Target)
    } catch (e) {
      console.log('e', e)
    }
  }
}
function getStyleStr (_id, style) {
  if (style) {
    let str = style[0][1].split('\n')
    console.log(str)
    return str.map(v => {
      if (v.includes('{')) {
        return '[dom="' + _id + '"] ' + v
      }
      return v
    }).join('')
  }
  return ''
}
