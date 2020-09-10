/*
 * @Author: xuxueliang
 * @Date: 2020-09-03 12:16:01
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 19:10:16
 */
import { $slotSymbol } from '../symbol/index'
import { HTML_TAGS } from '../vDom/creatConfig'
import { _createElementJson } from '../vDom/createElement'
import nodeOps from '../utils/nodeOps'
import { forEach } from '../utils/index'
import { getComponentByElm } from '../utils/componentUtil'
export const isSlotTag = (tag) => (tag.tagName || tag) === 'slot'
export const addSlot = function (context, child, slotAttr = 'default', isRewriteSlotFor = false, cb = () => { }) {
  if (!isRewriteSlotFor && child._isSlotFor && child._isSlotFor !== context._eid) {
    slotAttr = 'default'
  }
  slotAttr = slotAttr || 'default'
  !context[$slotSymbol] && (context[$slotSymbol] = {})
  if (isRewriteSlotFor || !child._isSlotFor) {
    child._isSlotFor = context._eid
  }
  if (!child.render) {
    child.render = () => child
  }
  if (!child.elm) {
    child.elm = child
  }
  (context[$slotSymbol][slotAttr] = context[$slotSymbol][slotAttr] || []).push(child)
  // if (slotAttr !== 'default') {
  //   if (child.attributes) {
  //     child.removeAttribute('slot')
  //   } else if (child.props && child.props.slot) {
  //     delete child.props.slot
  //   }
  // }
  cb()
}
export function initSolt (context, childNodes) {
  context[$slotSymbol] = {}
  childNodes.forEach(v => {
    addSlot(context, v, (v.attributes ? v.getAttribute('slot') : v.props && v.props.slot) || 'default')
  })
  context[$slotSymbol]['length'] = Object.keys(context[$slotSymbol]).length
  context.update()
  // console.log('initSolt', this)
}
// export function markChildSlotComponents (context, elm) {
//   // eslint-disable-next-line no-cond-assign
//   for (var j = 0, child; child = elm.childNodes[j]; j++) {
//     let tagname = child.tagName && child.tagName.toLowerCase()
//     if ((tagname && HTML_TAGS[tagname] && typeof HTML_TAGS[tagname] === 'object' && HTML_TAGS[tagname].isComponent)) {
//       console.log('-------child', j, child, child.innerHTML)
//       if (!child.innerComponent) {
//         child.innerComponent = true
//         // child._slotSymbol =
//         child._Elment = getNewElment(child, child, tagname, true)
//         child.innerHTML = ''
//         child._Elment.mountElm = child
//         console.log('=========')
//         console.dir(child._Elment)
//       }
//       // console.dir(child._Elment.render())
//     }
//     if (child.childNodes && child.childNodes.length) {
//       markChildSlotComponents(context, child)
//     }
//   }
// }
export function syncSlotComponentsState (elm, state = false) {
  if (elm && elm.innerComponent) {
    elm.innerComponentInstallState = !!state
  }
}
export function getSlotComponentsIsOrInstallState (elm, def = true) {
  if (elm.innerComponent) {
    return elm.innerComponentInstallState
  }
  return !!def
}
export function isSlotComponentsAndRender (node) {
  // console.dir('isSlotComponentsAndRender')
  // console.dir(node)
  // console.dir(node._Elment)
  // if (node._Elment && !node._Elment.isRendering) {
  //   // node.innerHTML = ''
  //   node._Elment.isRendering = true
  //   const l = node._Elment.render()
  //   console.dir(l)
  //   node._Elment.isRendering = false
  //   // node.appendChild()
  //   return true
  // }
  return false
}
// 获取新的元素Elment Slot 成组
export function getNewElment (context, child, tagname, isNotDel = false) {
  let props = {}
  forEach(child.attributes, (v) => {
    props[v.name] = v.value
  })
  tagname = tagname || (child.tagName && child.tagName.toLowerCase())
  return _createElementJson(tagname, props, ...getChildSlot(context, child, false, isNotDel))
}
export function getChildSlot (context, elm, isAddToContext = true, isNotDel = false) {
  let newChildNodes = []
  if (elm.childNodes.length) {
    // eslint-disable-next-line no-cond-assign
    for (var j = 0, child; child = elm.childNodes[j];) {
      let slotAttr = (child.getAttribute && child.getAttribute('slot')) || undefined
      let tagname = child.tagName && child.tagName.toLowerCase()
      // console.log('getChildSlot', this, child, child.tagName, tagname, HTML_TAGS[tagname])
      if ((tagname && HTML_TAGS[tagname] && typeof HTML_TAGS[tagname] === 'object' && HTML_TAGS[tagname].isComponent)) {
        let newCom = getNewElment(context, child, tagname)
        newCom._ori = child
        newCom._isComponent = true
        child = newCom
      }
      if (isAddToContext) {
        addSlot(context, child, slotAttr, true)
      } else {
        newChildNodes.push(child)
      }
      // 设置 isRemovedBySlot 处理外环境使用slot嵌套组件
      // child.isRemovedBySlot = true
      // if (child.childNodes && child.childNodes.length) {
      //   // markChildSlotComponents(context, child)
      // }
      if (!isNotDel) {
        nodeOps.removeChild(elm, child._ori || child)
      } else {
        j++
      }
    }
  }
  return newChildNodes
}
export function isRerenderSlotElment (context, el) {
  // 处理从新渲染的dom
  if (el.isComponent) {
    const comp = getComponentByElm(el)
    context[$slotSymbol] = comp[$slotSymbol]
    context.isRerender = true
    el.isInited = false
    el.isUnset = false
    el.innerHTML = ''
  }
}
