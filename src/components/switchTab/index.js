/*
 * @Author: xuxueliang
 * @Date: 2019-12-19 14:17:40
 * @LastEditors  : xuxueliang
 * @LastEditTime : 2019-12-19 14:18:33
 */
import Yam, { Component } from 'yamjs'
@Component({
  tagName: 'switch-tab',
  style: require('./index.stylus'),
  props: ['tabs']
})
class App extends Yam {
  $data () {
    return {
      // your data
      nowTabs: [],
      active: 1
    }
  }
  $created () {
    this.nowTabs = typeof this.tabs === 'string' ? this.tabs.split(',') : this.tabs || []
  }
  render () {
    console.log(this.active)

    return <div>
      <div className='tabs-group'>
        { this.nowTabs.map((v, i) =>
          <div active={this.active} key={i} className={(+this.active === i + 1 ? 'active' : '') + ' tabs'} onClick={() => { this.active = i + 1 }} >
            { v }{ this.active }
          </div>
        ) }
      </div>
    </div >
  }
}
export default App
