/*
 * @Author: xuxueliang
 * @Date: 2020-03-29 17:08:56
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-29 21:22:35
 */
import { HTML_TAGS } from './creatConfig'
import nodeOps from '../utils/nodeOps'

export default function (el, context, parent) {
  // 获取的是 ()=>import(/**/)
  try {
    context.tagName().then(res => {
      const Components = res.default
      const parentElm = parent || el.parentNode
      HTML_TAGS[context.asyncComponent.name] = {
        name: Components._tagName,
        isComponent: true,
        class: Components
      }
      context.isAsyncComponent = false
      context._init(Components, context.props, context.childNodes, context._root, context.isText)
      const app = context.render(null, parentElm)
      nodeOps.insertBefore(parentElm, app, el)
      nodeOps.removeChild(parentElm, el)
    })
  } catch (e) { }
}
