import { _extends } from './utils'
const $Components = Symbol('$Components')
export default function getCustom (Target) {
  // eslint-disable-next-line
  class ElmApp extends HTMLElement {
    constructor () {
      super()
      console.log(this)
    }
    connectedCallback () {
      this[$Components] = new Target()
      this[$Components].renderAt(this)
    }
    disconnectedCallback () {
      if (!this.isUnset) {
        this.isUnset = true
        console.log('disconnectedCallbackdisconnectedCallbackdisconnectedCallback')
        this[$Components].disconnectedCallback()
      }
    }
  }

  _extends(new Target(), ElmApp.prototype)
  return ElmApp
}
