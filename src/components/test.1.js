/*
 * @Author: xuxueliang
 * @Date: 2019-10-25 14:40:40
 * @LastEditors  : xuxueliang
 * @LastEditTime : 2020-01-05 21:54:46
 */
import Yam, { Component } from '../lib/index'
@Component({
  tagName: 'test-show',
  style: require('./goTop.stylus'),
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
