/*
 * @Author: xuxueliang
 * @Date: 2019-09-17 19:07:58
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 19:29:32
 */
import Yam, { Component } from '../lib/index'
@Component({
  tagName: 'show-demo',
  props: ['title', 'show']
})
class App extends Yam {
  showHide () {
    this.show = !this.show
  }
  $beforeDestroy () {
    console.log('showDeom-destroy')
  }
  render () {
    return (<div style='border:2px #333 dashed;margin:10px'>
      <p onClick={ this.showHide.bind(this) }>插件:{ this.title }</p>
      {/* { this.show ? <slot /> : '' } */ }
      <div><slot /></div>
    </div>)
  }
}
export default App
