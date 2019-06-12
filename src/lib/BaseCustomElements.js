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
      if (!this.isUnset) {
        this.isUnset = true
        let comps = getComponentByElm(this)
        comps.__beforeDisconnectedCallback()
        comps.__disconnectedCallback()
      }
    }
  }
  return ElmApp
}
