/*
 * @Author: xuxueliang
 * @Date: 2020-02-29 16:15:59
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 23:53:01
 */
/*
* 针对不支持MutationObserver  做法，添加 appendYamNode 方法
*
*/
import { setAttributes } from './index' // supportMutationObserver
import { getComponentByElm } from './componentUtil'
let __localYamjsElm = {}
export default function (k, v) {
  __localYamjsElm[k] = v
}
function yamjsRender (node, tagName = '') {
  if (!node.isInited) {
    tagName = tagName || (node.tagName ? node.tagName.toLocaleLowerCase() : '')
    if (!tagName) return
    if (__localYamjsElm[tagName]) {
      new __localYamjsElm[tagName]().renderAt(node)
    }
    // else {
    //   // console.log('没有[', tagName, ']组件')
    // }
  }
}
window.yamjsRender = function (node, tagName) {
  yamjsRender(node, tagName)
}
// if (!supportMutationObserver) {
//   window.yamjsRender = function (node, tagName = '') {
//     if (!node.isInited) {
//       tagName = tagName || node.tagName.toLocaleLowerCase()
//       if (__localYamjsElm[tagName]) {
//         new __localYamjsElm[tagName]().renderAt(node)
//       } else {
//         console.log('没有[', tagName, ']组件')
//       }
//     }
//   }
//   HTMLElement.prototype.appendYamjsNode = function (node) {
//     this.appendChild(node)
//     runRender(node)
//   }
//   HTMLElement.prototype.insertYamjsNodeBefore = function (newNode, referenceNode) {
//     if (referenceNode) {
//       this.insertBefore(newNode, referenceNode)
//       runRender(newNode)
//     }
//   }
//   HTMLElement.prototype.removeYamjsNode = function (node) {
//     this.removeChild(node)
//     if (!node.isUnset) {
//       node.isUnset = true
//       let comp = getComponentByElm(this)
//       comp.__beforeDisconnectedCallback()
//       comp.__disconnectedCallback()
//       comp = null
//     }
//   }
//   HTMLElement.prototype.setYamjsNodeAttribute = function (key, val) {
//     this.setAttribute(key, val)
//     let comp = getComponentByElm(this)
//     setAttributes(comp, key, val)
//     comp.update()
//     comp = null
//   }
// }
function runRender (node) {
  if (node.isYamjsInnerNode) return
  if (node.parentElement) {
    yamjsRender(node)
  } else {
    setTimeout(() => {
      runRender(node)
    }, 100)
  }
}
initHTMLEvent()
function initHTMLEvent () {
  let HTMLElementPrototype = HTMLElement.prototype
  HTMLElementPrototype._appendChild = HTMLElementPrototype.appendChild
  HTMLElementPrototype.appendChild = function (node) {
    this._appendChild(node)
    runRender(node)
  }
  HTMLElementPrototype._insertBefore = HTMLElementPrototype.insertBefore

  HTMLElementPrototype.insertBefore = function (node, referenceNode) {
    if (referenceNode) {
      this._insertBefore(node, referenceNode)
      runRender(node)
    }
  }
  HTMLElementPrototype._removeChild = HTMLElementPrototype.removeChild
  HTMLElementPrototype.removeChild = function (node) {
    this._removeChild(node)
    if (node.isComponent && !node.isUnset) {
      node.isUnset = true
      let comp = getComponentByElm(node)
      if (comp) {
        comp.__beforeDisconnectedCallback()
        comp.__disconnectedCallback()
        comp = null
      }
    }
  }
  HTMLElementPrototype._replaceChild = HTMLElementPrototype.replaceChild
  HTMLElementPrototype.replaceChild = function (newNode, oldNode) {
    this.removeChild(oldNode)
    this.appendChild(newNode)
  }
  HTMLElementPrototype._setAttribute = HTMLElementPrototype.setAttribute
  HTMLElementPrototype.setAttribute = function (key, val) {
    this._setAttribute(key, val)
    if (this.isComponent) {
      let comp = getComponentByElm(this)
      setAttributes(comp, key, val)
      comp.update()
      comp = null
    }
  }
  // HTMLElement.prototype.setYamjsNodeAttribute = function (key, val) {
  //   this.setAttribute(key, val)
  //   if (this.isComponent) {
  //     let comp = getComponentByElm(this)
  //     setAttributes(comp, key, val)
  //     comp.update()
  //     comp = null
  //   }
  // }
}
