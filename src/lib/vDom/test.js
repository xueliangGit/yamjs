/*
 * @Author: xuxueliang
 * @Date: 2020-03-01 01:48:32
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-10 15:27:29
 */
import { HTML_TAGS, GLOBAL_ATTRIBUTES, EVENT_HANDLERS } from './creatConfig'
import { isUndef, isStr } from '../utils/index'

export function createElement (tagName, props = {}, ...childNodes) {
  if (isUndef(props)) {
    props = {}
  }
  const tag = HTML_TAGS[tagName]
  const object = typeof tag === 'object'
  const localAttrs = object ? tag.attributes || {} : {}
  const attrs = Object.assign({}, GLOBAL_ATTRIBUTES, localAttrs)
  const tagType = object ? tag.name : tag
  const el = document.createElement(tagType)
  Object.keys(props).forEach(prop => {
    if (prop in attrs) {
      el.setAttribute(attrs[prop], props[prop])
    }
    if (prop in EVENT_HANDLERS) {
      el.addEventListener(EVENT_HANDLERS[prop], props[prop])
    }
  })
  if ('style' in props) {
    const styles = props.style
    Object.keys(styles).forEach(prop => {
      const value = styles[prop]
      if (typeof value === 'number') {
        el.style[prop] = `${value}px`
      } else if (isStr(value)) {
        el.style[prop] = value
      } else {
        throw new Error(`Expected "number" or "string" but received "${typeof value}"`)
      }
    })
  }
  doChild(childNodes, el)
  return el
}
function doChild (childNodes, el) {
  childNodes.forEach(childNode => {
    if (typeof childNode === 'object') {
      if (childNode.tagName) {
        el.appendChild(childNode)
      } else {
        if (Array.isArray(childNode)) {
          doChild(childNode, el)
        } else {
          el.appendChild(document.createTextNode(childNode.toString()))
        }
      }
    } else if (isStr(childNode) || typeof childNode === 'number') {
      el.appendChild(document.createTextNode(childNode))
    } else if (isFunc(childNode)) {
      el.appendChild(document.createTextNode(childNode.toString()))
    } else {
      console.warn(new Error(`${childNode} Expected "object" or "string" but received "${typeof value}"`))
    }
  })
}
export default createElement
