/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-14 16:37:13
 */
import { getComponentByElm, setComponentForElm } from './utils/componentUtil'
import { HTML_TAGS } from './vDom/creatConfig'
import { isSlotComponentsAndRender } from './helpers/slotHelper'
import HandleError from './init/handlerError'

export default function getCustom (target, props) {
  // eslint-disable-next-line
  class ElmApp extends HTMLElement {
    static get observedAttributes () { return props || [] }
    attributeChangedCallback (name, oldValue, newValue) {
      // console.log('Custom square element attributes changed.', this.nodeName, name, oldValue, newValue)
    }
    connectedCallback () {
      // onReadyElmFn(this)
      try {
        if (isSlotComponentsAndRender(this) || this.isInited) {
          return
        }
        let Target = target || HTML_TAGS[this.nodeName.toLocaleLowerCase()].class
        if (Target) {
          let comps = new Target()
          comps.renderAt(this)
          setComponentForElm(this, comps)
          comps = null
        }
      } catch (e) {
        // console.warn('组件【' + this.nodeName + '】渲染错误', e)
        HandleError(e, '组件【' + this.nodeName + '】渲染错误')
      }
    }
    disconnectedCallback () {
      if (!this.isUnset && !this.isRemovedBySlot) {
        this.isUnset = true
        let comps = getComponentByElm(this)
        comps.__beforeDisconnectedCallback && comps.__beforeDisconnectedCallback()
        comps.__disconnectedCallback && comps.__disconnectedCallback()
      }
    }
  }
  return ElmApp
}
