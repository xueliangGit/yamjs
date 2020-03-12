/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-12 13:28:47
 */
import { isDev } from '../env'

import { $ComponentSymbol, $closestParentSymbol } from '../symbol'
// 设置组件标示
const syncComponentMark = (context) => {
  context.elm.isComponent = true
  context.elm.componentName = context._name
  context.elm.componentId = context._rootId
}

// 获取元素的最近的组件
const getComponentMark = (dom) => {
  let elm = dom
  let oldelm = dom
  while (elm) {
    if (elm.isComponent) {
      return getComponentByElm(elm)
    }
    oldelm = elm
    elm = elm._parentNode
  }
  return oldelm
}
const getCallFnName = (context, prop) => `${ context.tagType || context._tagName }_${ prop }_fn`
// 获取component
function getComponentByElm (elm) {
  if (!elm.isComponent) {
    return getComponentMark(elm)
  }
  if (isDev || elm[$ComponentSymbol]) {
    return elm[$ComponentSymbol]
  }
  if (elm.getApp) {
    return elm.getApp()
  }
  return null
}
// setGet getComponentByElm
function setComponentForElm (elm, context) {
  if (isDev || context.env === 'development') {
    elm[$ComponentSymbol] = context
  } else {
    elm.getApp = function () {
      return context
    }
  }
}
// 获取上一个自定义组件
function getparentCom (elm) {
  if (!elm) return null
  let coms = getComponentMark(elm)
  if (coms._rootId >= 0) {
    return coms
  }
  return null
}
// 设定上一个自定义组件
function setClosetParentCom (context) {
  context[$closestParentSymbol] = context.elm._parentNode ? getparentCom(context.elm._parentNode) : (context[$closestParentSymbol] || null)
}
// 获取上一个自定义组件
function getClosetParentCom (context) {
  return context[$closestParentSymbol]
}
function onReadyElmFn (elm) {
  elm._readyCall = []
  elm.onReady = function (fn) {
    if (elm.isInited) {
      fn()
    } else {
      elm._readyCall.push(fn)
    }
  }
}
function runOnReadyElmFn (elm) {
  if (elm._readyCall) {
    for (let i = 0; i < elm._readyCall.length; i++) {
      elm._readyCall[i]()
    }
  }
}
export {
  getCallFnName,
  syncComponentMark,
  getComponentMark,
  getComponentByElm,
  setComponentForElm,
  getparentCom,
  setClosetParentCom,
  getClosetParentCom,
  runOnReadyElmFn,
  onReadyElmFn
}
