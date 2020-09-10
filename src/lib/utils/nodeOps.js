/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-10 19:29:27
 */
import { doc as document } from './global'
import { requestAnimationFrame } from './index'
// import { canUseCustomElements } from '../Conf'
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
  if (!parentNode || !newNode) return
  // 针对内部node 处理 加flag
  requestAnimationFrame(() => {
    // 针对内部node 处理 加flag
    newNode.isYamjsInnerNode = true
    parentNode.insertBefore(newNode, referenceNode)
    insertCall(newNode)
  }, isNeed)
}
function removeChild (node, child) {
  if (!child || !node) return
  requestAnimationFrame(() => {
    // console.dir(child)
    // 移除事件 触发
    if (child.beforeDisconnectedCallback && !child.isRemovedBySlot) {
      child.beforeDisconnectedCallback()
    }
    // 针对内部node 处理 加flag
    child.isYamjsInnerNode = true
    node.removeChild(child)
    // 移除事件 触发
    if (!child.isRemovedBySlot && child.disconnectedCallback && !child.isUnset) {
      child.disconnectedCallback()
    }
  })
}
function appendChild (node, child, isNeed) {
  if (!node || !child) {
    return false
  }
  requestAnimationFrame(() => {
    // 针对内部node 处理 加flag
    child.isYamjsInnerNode = true
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
  // ie 没有影子树，后期再考虑使用iframe替代
  // if (node.attachShadow) {
  //   return node.attachShadow(conf)
  // } else {
  //   let ifa = createElement$1('iframe')
  //   ifa.setAttribute('style', 'border:none;display:block;display:inline-block;')
  //   node.appendChild(ifa)
  //   window.ifa = ifa
  //   return ifa
  // }
  return node.attachShadow ? node.attachShadow(conf) : node
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
