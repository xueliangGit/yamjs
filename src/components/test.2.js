/*
 * @Author: xuxueliang
 * @Date: 2019-10-25 14:46:07
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-09 17:33:30
 */
import Yam, { Component } from '../lib/index'
@Component({
  tagName: 'test-tag',
  style: '',
  props: []
})
class testTag extends Yam {
  $data = {
    // your data
    show: true
  }
  clickFn () {
    this.show = !this.show
  }
  render () {
    return <div>
      <button onClick={ this.clickFn.bind(this) }>
        test-tag
      </button>
      { this.show ? <test-show>
        <p>is yam componets of test-tag</p>
      </test-show> : '' }
    </div>
  }
}
export default testTag
