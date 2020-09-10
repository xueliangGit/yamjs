/*
 * @Author: xuxueliang
 * @Date: 2019-12-19 14:17:40
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-10 15:42:50
 */
import Yam, { Component } from 'yamjs'
function GetList (props) {
  let { index } = props
  // this.props = props
  return <div $props={ props }>
    { props }
    < div index={ index + 12 } >
      asdads is ACopm
    </div >
    IS GETLIST FUNCTION COMPONENTS { index }
  </div >
}
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
      show: true,
      active: 1
    }
  }
  $created () {
  }
  toggleShow () {
    this.show = false
    setTimeout(() => {
      this.show = true
    }, 3000)
  }
  render () {
    let nowTabs = typeof this.tabs === 'string' ? this.tabs.split(',') : this.tabs || []
    return <div>
      { this.show ? <GetList onClick={ () => this.toggleShow() } index={ this.active } /> : '' }
      { GetList({ index: this.active, onClick: () => console.log(222) }) }
      <div className='tabs-group'>
        { nowTabs.map((v, i) =>
          <div active={ this.active } key={ i } className={ (+this.active === i + 1 ? 'active' : '') + ' tabs' } onClick={ () => { this.active = i + 1 } } >
            { v }{ this.active }
          </div>
        ) }
      </div>

    </div >
  }
}
export default App
