/*
 * @Author: xuxueliang
 * @Date: 2019-10-25 14:40:40
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-11-14 14:27:30
 */
import Yam, { Component } from '../lib/index'
@Component({
  tagName: 'test-show',
  style: '',
  props: []
})
class TestShow extends Yam {
  $data () {
    return {
      // your data
      show: false
    }
  }
  $destroyed () {
    console.log('text-show-destory')
  }
  render () {
    return <div>
      <button onClick={ () => { this.show = !this.show } }>切换</button>
      <slot />
      <p>is yam componets</p>
      { this.show ? <slot name='top' /> : '-----' }

    </div>
  }
}
export default TestShow
