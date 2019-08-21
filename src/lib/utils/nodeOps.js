/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 15:56:49
 */
import { doc as document } from './global'
import { requestAnimationFrame } from './index'
function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName)
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple')
  }
  return elm
}
// function createElementNS (namespace, tagName) {
//   return document.createElementNS(namespaceMap[namespace], tagName)
// }
function createTextNode (text) {
  return document.createTextNode(text)
}
function createComment (text) {
  return document.createComment(text)
}
function insertBefore (parentNode, newNode, referenceNode, isNeed) {
  requestAnimationFrame(() => {
    parentNode.insertBefore(newNode, referenceNode)
    insertCall(newNode)
  }, isNeed)
}
function removeChild (node, child) {
  requestAnimationFrame(() => {
    // 移除事件 触发
    if (child.beforeDisconnectedCallback) {
      child.beforeDisconnectedCallback()
    }
    node.removeChild(child)
    // 移除事件 触发
    if (child.disconnectedCallback && !child.isUnset) {
      child.disconnectedCallback()
    }
  })
}
function appendChild (node, child, isNeed) {
  requestAnimationFrame(() => {
    if (!node) {
      return false
    }
    node.appendChild(child)
    insertCall(child)
  }, isNeed)
}
function parentNode (node) {
  return node.parentNode
}
function nextSibling (node) {
  return node.nextSibling
}
function tagName (node) {
  return node.tagName
}
function setTextContent (node, text) {
  requestAnimationFrame(() => {
    node.textContent = text
  })
}
function setAttribute (node, key, val) {
  node.setAttribute(key, val)
}
function setAttachShadow (node, conf = {}) {
  return node.attachShadow(conf)
}
// addCallBack
function insertCall (child) {
  if (child._domInsertCall) {
    child._domInsertCall()
  }
}
var nodeOps = Object.freeze({
  createElement: createElement$1,
  // createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setAttribute: setAttribute,
  setAttachShadow
})
export default nodeOps
