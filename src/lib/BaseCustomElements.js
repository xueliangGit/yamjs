import { $ComponentSymbol } from './symbol'
export default function getCustom (Target) {
  // eslint-disable-next-line
  class ElmApp extends HTMLElement {
    connectedCallback () {
      this[$ComponentSymbol] = new Target()
      console.log('==================')
      console.log(this)
      this[$ComponentSymbol].renderAt(this)
    }
    disconnectedCallback () {
      if (!this.isUnset) {
        this.isUnset = true
        console.log('disconnectedCallbackdisconnectedCallbackdisconnectedCallback')
        this[$ComponentSymbol].__disconnectedCallback()
      }
    }
  }
  return ElmApp
}
