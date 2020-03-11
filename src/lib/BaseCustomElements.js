/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-11 18:10:34
 */
import { getComponentByElm, setComponentForElm } from './utils/componentUtil'
import { HTML_TAGS } from './vDom/creatConfig'

export default function getCustom () {
  // eslint-disable-next-line
  class ElmApp extends HTMLElement {
    connectedCallback () {
      // onReadyElmFn(this)
      try {
        let Target = HTML_TAGS[this.nodeName.toLocaleLowerCase()].class
        if (Target) {
          let comps = new Target()
          comps.renderAt(this)
          setComponentForElm(this, comps)
          comps = null
        }
      } catch (e) {
        console.warn('组件【' + this.nodeName + '】渲染错误')
      }
    }
    disconnectedCallback () {
      if (!this.isUnset && !this.isRemovedBySlot) {
        this.isUnset = true
        let comps = getComponentByElm(this)
        comps.__beforeDisconnectedCallback()
        comps.__disconnectedCallback()
      }
    }
  }
  return ElmApp
}
