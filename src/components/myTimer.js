import Yam, { Component } from '../lib/index'
// var style = require('./myTimers.styl')
// eslint-disable-next-line no-unused-vars
import Hour from './timers/hour'
@Component({
  tagName: 'my-timer',
  style: require('./myTimers.stylus'),
  canBeCalledExt: false,
  props: []
})
class App extends Yam {
  $data () {
    return {
      hour: 0,
      mins: 0,
      sec: 0,
      list: [1, 2, 3]
    }
  }
  show (v) {
    // this.$store.commit('width', this.$store.width + 1)
    //  console.log(this.emitProp('showFn', 'asdasd'))
  }
  showP (v) {
    console.log('adsasd', v)
    //  console.log(this)
  }
  showList () {
    return this.list.map(v => <li>{v}</li>)
  }
  render () {
    return (
      <div >
        <p onClick={this.show.bind(this)}>----------{this.$store.width}</p>
        <div>{this.sec % 60 > 30 ? '' : <slot />}</div>
        <div className='all' >
          <Hour callFn={this.showP.bind(this)} className='hour' hour={this.hour} width='200' />
          <Hour callFn={this.showP.bind(this)} className='min' hour={this.mins} step='60' width='280' />
          <Hour callFn={this.showP.bind(this)} className='sce' hour={this.sec} step='60' width='350' />
        </div>
        <div> <slot name='aaaaaa' /></div>
      </div>
    )
  }
  $mounted () {
    this.go()
    this.show()
    this.setTimeout(() => {
      this.$mounted()
    }, 1000)
  }
  $updated () {
    console.log('mytimer UPdater', this._rootId)
  }
  $created () {
    let date = new Date()
    this.hour = date.getHours()
    this.mins = date.getMinutes()
    this.sec = date.getSeconds()
  }
  go () {
    this.sec++
    if (this.sec % 60 === 0) {
      this.mins++
      if (this.mins % 60 === 0) {
        this.mins++
      }
    }
    console.log('mytimer UPdater111', this._rootId)
  }
}
console.log('GoTop:#config', App._tagName)

export default App
