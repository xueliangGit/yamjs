import updateElement from './vDom'
import { creatMutationObserser,
  proxy,
  setAttributes, _extends } from './utils'
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line
class BaseComponent extends HTMLElement  {
  constructor () {
    super()
    console.log('BaseComponent')
  }
  static __createElement (tagName, props = {}, ...childNodes) {
    return {
      tagName,
      props,
      childNodes: childNodes.flat(3)
    }
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
  }
  connectedCallback () {
    this.__init()
    this.__$Els = {}

    if (this.component) {
      this._created()
    }
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
    if (this.template) {
      var shadowRoot = this.__shadowRoot || (this.__shadowRoot = this.attachShadow({ mode: 'closed' }))
      // var clone = document.importNode(this.$getFram(), true)
      shadowRoot.appendChild(this.$getFram())
    }
  }
  $update () {
    if (this.$vdom) {
      console.time('$update')
      let newNode = this.template()
      console.log(newNode)
      console.log('updte')
      updateElement(this.$div, newNode, this.$vdom)
      this.$vdom = newNode
      console.timeEnd('$update')
    }
  }
  $getFram () {
    this.$div = document.createElement('div')
    console.log(this.template)
    this.$vdom = this.template()
    console.log(this.$vdom)
    console.log('onece')
    updateElement(this.$div, this.$vdom)
    return this.$div
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
