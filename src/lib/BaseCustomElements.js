/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-06-25 13:56:05
 */
import { getComponentByElm, setComponentForElm } from './utils/componentUtil'
export default function getCustom (Target) {
  // eslint-disable-next-line
  class ElmApp extends HTMLElement {
    connectedCallback () {
      // onReadyElmFn(this)
      let comps = new Target()
      comps.renderAt(this)
      setComponentForElm(this, comps)
      comps = null
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
