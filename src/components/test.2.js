/*
 * @Author: xuxueliang
 * @Date: 2019-10-25 14:46:07
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-10-25 14:49:34
 */
import Yam, { Component } from '../lib/index'
@Component({
  tagName: 'test-tag',
  style: '',
  props: []
})
class testTag extends Yam {
  $data () {
    return {
      // your data

    }
  }
  render () {
    return <div>
      <p>is yam componets</p>
    </div>
  }
}
export default testTag
