/*
 * @Author: xuxueliang
 * @Date: 2020-02-29 16:15:59
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-11 16:23:14
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
function removeChild (node) {
  if (node.isYamjsInnerNode) return
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
initHTMLEvent()
function initHTMLEvent () {
  let HTMLElementPrototype = HTMLElement.prototype
  if (HTMLElementPrototype._appendChild) {
    return
  }
  HTMLElementPrototype._appendChild = HTMLElementPrototype.appendChild
  HTMLElementPrototype.appendChild = function (node) {
    let returnFlag = this._appendChild(node)
    runRender(node)
    return returnFlag
  }
  HTMLElementPrototype._insertBefore = HTMLElementPrototype.insertBefore
  HTMLElementPrototype.insertBefore = function (node, referenceNode) {
    if (referenceNode) {
      let returnFlag = this._insertBefore(node, referenceNode)
      runRender(node)
      return returnFlag
    }
  }
  HTMLElementPrototype._removeChild = HTMLElementPrototype.removeChild
  HTMLElementPrototype.removeChild = function (node) {
    let returnFlag = this._removeChild(node)
    removeChild(node)
    return returnFlag
  }
  HTMLElementPrototype._replaceChild = HTMLElementPrototype.replaceChild
  HTMLElementPrototype.replaceChild = function (newNode, oldNode) {
    let returnFlag = this._replaceChild(newNode, oldNode)
    removeChild(oldNode)
    runRender(newNode)
    return returnFlag
  }
  HTMLElementPrototype._setAttribute = HTMLElementPrototype.setAttribute
  HTMLElementPrototype.setAttribute = function (key, val) {
    if (Array.isArray(val)) {
      val = val.join(key === 'class' ? ' ' : ',')
    }
    let returnFlag = this._setAttribute(key, val)
    if (this.isComponent) {
      let comp = getComponentByElm(this)
      setAttributes(comp, key, val)
      comp.update()
      comp = null
    }
    return returnFlag
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
