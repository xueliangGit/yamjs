/*
 * @Author: xuxueliang
 * @Date: 2020-02-29 16:15:59
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 17:23:22
 */
/*
* 针对不支持MutationObserver  做法，添加 appendYamNode 方法
*
*/
import { supportMutationObserver, setAttributes } from './index'
import { getComponentByElm } from './componentUtil'
let __localYamjsElm = {}
export default function (k, v) {
  __localYamjsElm[k] = v
}
if (!supportMutationObserver) {
  window.yamjsRender = function (node, tagName = '') {
    if (!node.isInited) {
      tagName = tagName || node.tagName.toLocaleLowerCase()
      if (__localYamjsElm[tagName]) {
        new __localYamjsElm[tagName]().renderAt(node)
      } else {
        console.log('没有[', tagName, ']组件')
      }
    }
  }
  HTMLElement.prototype.appendYamjsNode = function (node) {
    this.appendChild(node)
    runRender(node)
  }
  HTMLElement.prototype.insertYamjsNodeBefore = function (newNode, referenceNode) {
    if (referenceNode) {
      this.insertBefore(newNode, referenceNode)
      runRender(newNode)
    }
  }
  HTMLElement.prototype.removeYamjsNode = function (node) {
    this.removeChild(node)
    if (!node.isUnset) {
      node.isUnset = true
      let comp = getComponentByElm(this)
      comp.__beforeDisconnectedCallback()
      comp.__disconnectedCallback()
      comp = null
    }
  }
  HTMLElement.prototype.setYamNodeAttribute = function (key, val) {
    this.setAttribute(key, val)
    let comp = getComponentByElm(this)
    setAttributes(comp, key, val)
    comp.update()
    comp = null
  }
}
function runRender (node) {
  if (node.parentElement) {
    window.yamjsRender(node)
  } else {
    setTimeout(() => {
      runRender(node)
    }, 100)
  }
}
