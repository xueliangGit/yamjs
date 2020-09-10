/*
 * @Author: xuxueliang
 * @Date: 2019-10-25 14:40:40
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 16:24:18
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
    console.log('text-show-destroyed')
  }
  switchShow () {
    console.log(this)
    this.show = !this.show
  }
  render () {
    return <div className='g33'>
      <show-demo >
        <button onClick={ () => { this.switchShow() } }>切换{ this.show }</button>
        <slot />
        <p>is yam componets</p>
        { this.show ? <slot name='top' /> : '-----' }
      </show-demo>
    </div >
  }
}
export default TestShow
