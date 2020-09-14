/*
 * @Author: xuxueliang
 * @Date: 2020-03-29 17:08:56
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-14 16:40:03
 */
// import Yam from '../Yam'
import { HTML_TAGS } from './creatConfig'
import nodeOps from '../utils/nodeOps'
import { isFunctionComponent } from '../Conf'
import HandleError from '../init/handlerError'
let defaultIndex = 0
export const renderFunctionComponent = function (context, comsp) {
  comsp = comsp || context.tagName(context.props)
  context.childNodes = comsp.childNodes
}
export default function renderAsync (el, context, parent) {
  // 获取的是 ()=>import(/**/)
  try {
    let comsp = context.tagName(context.props)
    if (!comsp.then) {
      context.asyncComponent.tagName = context.asyncComponent.tagName || ('default-' + context.asyncComponent.name + '-' + ++defaultIndex)
      // comsp._root = context.asyncComponent.tagName
      Object.assign(comsp.props, context.props)
      context.tagName[isFunctionComponent] = true
      context[isFunctionComponent] = true

      // 本是无状态组件 不用=手动创建
      // let createCom = function () { }
      // createCom.prototype = Yam.default.prototype
      // createCom.prototype.constructor = createCom
      // createCom._tagName = context.tagName._tagName = 'default-' + context.asyncComponent.name + '-' + ++defaultIndex
      // //  = 'default-' + context.asyncComponent.name + '-' + ++defaultIndex
      // createCom.prototype.render = context.tagName
      // // comsp.then = context.tagName.then = function (cb) {
      // comsp = Promise.resolve({ default: createCom })
      // }
      // 直接渲染
      Promise.resolve().then(() => {
        const parentElm = parent || el.parentNode
        let app = comsp.render(null, null, context.asyncComponent.tagName)
        app[isFunctionComponent] = true
        nodeOps.insertBefore(parentElm, app, el)
        nodeOps.removeChild(parentElm, el)
        context.elm = app
        renderFunctionComponent(context, comsp)
      })
    } else {
      comsp.then((res, copm) => {
        const Components = copm || res.default
        const parentElm = parent || el.parentNode
        HTML_TAGS[Components._tagName] = {
          name: Components._tagName,
          isComponent: true,
          class: Components
        }
        context.isAsyncComponent = false
        context._init(Components, context.props, context.childNodes, context._root, context.isText)
        const app = context.render(null, parentElm)
        nodeOps.insertBefore(parentElm, app, el)
        nodeOps.removeChild(parentElm, el)
      }).catch(v => {
        console.warn(v)
      })
    }
  } catch (e) {
    HandleError(e, 'renderAsync')
    console.warn(e)
  } finally {
  }
}
