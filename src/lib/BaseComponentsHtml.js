/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 17:59:25
 */
import init from './init'
import { Mix } from './init/mix'
import { getStyleStr } from './utils'
var comps = window.comps = {}
@Mix()
// eslint-disable-next-line
class Yam extends HTMLElement {
  constructor() {
    super()
    this._config()
    comps[this._cid] = this
    // console.log('Yam', this._style)
  }
  connectedCallback () {
    init(this)
    this.$connectedCallback && this.$connectedCallback()
  }
  disconnectedCallback () {
    console.log('disconnectedCallback')
    // 取消 监听
    this.mutation.disconnect()
    this.isUnset = true
  }
  // 会被覆盖的方法
  $config () {
    return {

    }
  }
  // 会被覆盖的方法
  $data () {
    return {
    }
  }
  // 会被覆盖的方法
  $updated () {
  }
}
export default Yam
// 注解
export function Component (Config) {
  let { tagName, shadow, style, props } = Config
  return function (Target) {
    Target._tagName = tagName
    Target._shadow = !!shadow
    Target.prototype._config = function () {
      this._tagName = tagName
      this._shadow = !!shadow
      this._props = props || []
      this._cid = 'com-' + tagName
      this._style = getStyleStr(this._cid, style)
      // console.log('this._style', this._style)
    }
    try {
      window.customElements.define(tagName, Target)
    } catch (e) {
      console.log('e', e)
    }
  }
}
