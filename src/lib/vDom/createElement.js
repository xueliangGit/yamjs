/** @jsx createElement */
import { HTML_TAGS, GLOBAL_ATTRIBUTES, EVENT_HANDLERS } from './creatConfig'
// eslint-disable-next-line no-extend-native
Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce((acc, val) => Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val), [])
}
// let i = 0
class Element {
  constructor (tagName, props = undefined, childNodes, _root, isText) {
    if (isText) {
      this.tagName = tagName
      this.props = props
      this.text = childNodes
      this.childNodes = undefined
      this.isText = true
    } else {
      if (typeof tagName !== 'string') {
        console.log('tagName', typeof tagName, tagName._tagName)
      }
      this.tagName = tagName
      this.props = props
      this.childNodes = Array.isArray(childNodes) ? childNodes.flat(3) : [childNodes]
      this.childNodes = this.childNodes.map((v, key) => {
        if (typeof v === 'string' || typeof v === 'number' || typeof v === 'function') {
          v = new Element('textNode', '', v + '', _root, true)
        }
        v.key = key
        return v
      })
    }
    this._root = _root // 带搞根结点
  }
  render (key) {
    // this.key = key || 0
    if (this.isText) {
      this.elm = document.createTextNode(this.text)
      return this.elm
    }
    const tag = HTML_TAGS[this.tagName] || this.tagName
    const object = typeof tag === 'object'
    const tagClass = typeof tag === 'function'
    const localAttrs = object ? tag.attributes || {} : {}
    const attrs = Object.assign({}, GLOBAL_ATTRIBUTES, localAttrs)
    const tagType = object ? tag.name : tagClass ? tag._tagName : tag
    const el = document.createElement(tagType)
    el.props = this.props
    if (this.props) {
      Object.keys(this.props).forEach(prop => {
        if (prop in attrs) {
          el.setAttribute(attrs[prop], this.props[prop])
        } else if (prop in EVENT_HANDLERS) {
          el.addEventListener(EVENT_HANDLERS[prop], this.props[prop])
        } else {
          el.setAttribute(prop, this.props[prop])
        }
      })
      if ('style' in this.props) {
        const styles = this.props.style
        Object.keys(styles).forEach(prop => {
          const value = styles[prop]
          if (typeof value === 'number') {
            el.style[prop] = `${value}px`
          } else if (typeof value === 'string') {
            el.style[prop] = value
          } else {
            throw new Error(`Expected "number" or "string" but received "${typeof value}"`)
          }
        })
      }
    }

    this.childNodes.forEach((child, key) => {
      el.appendChild(child.render(key))
    })
    this.elm = el
    return this.elm
  }
}
export function renderElement (dom) {
  return (dom instanceof Element)
    ? dom.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
    : document.createTextNode(dom) // 如果字符串，只构建文本节点
}
export function createElementJson (tagName, props = {}, childNodes, root) {
  return new Element(tagName, props, childNodes, root)
}
