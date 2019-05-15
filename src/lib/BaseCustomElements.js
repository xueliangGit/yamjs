import { $ComponentSymbol } from './symbol'
export default function getCustom (Target) {
  // eslint-disable-next-line
  class ElmApp extends HTMLElement {
    constructor () {
      super()
      console.log(this)
    }
    connectedCallback () {
      this[$ComponentSymbol] = new Target()
      this[$ComponentSymbol].renderAt(this)
    }
    disconnectedCallback () {
      if (!this.isUnset) {
        this.isUnset = true
        console.log('disconnectedCallbackdisconnectedCallbackdisconnectedCallback')
        this[$ComponentSymbol].disconnectedCallback()
      }
    }
  }
  return ElmApp
}
