import BaseComponent, { Component } from '../lib/BaseComponent'
// var goTopTem = require('./goTopTem.html')
// eslint-disable-next-line no-unused-vars
import MyTimer from './myTimer'
@Component({
  tagName: 'go-top',
  style: require('./goTop.styl'),
  shadow: true
})
class GoTop extends BaseComponent {
  $config () {
    console.log('GoTop:#config', GoTop._style)
    return {
      component: true,
      // style,
      props: ['msg']
    }
  }
  $data () {
    return {
      list: [1, 2, 3]
    }
  }
  show (v) {
    console.log(v)
  }
  showList () {
    return this.list.map(v => <li>{v}</li>)
  }
  render () {
    return (
      <div >
        <MyTimer ref='myTimer'>
          adads
        </MyTimer>
        <p>4341321</p>
        <ul className={this.list.length > 3 ? 'big' : 'small'}>{this.list.length > 3 ? this.list.map(v => <li ani='fade'>{v}</li>) : this.list.map(v => <p onClick={this.show.bind(this, v)}>{v * -1 }</p>)}
        </ul>
        {this.list.map(v => <p key={v} onClick={this.show.bind(this, v)}>{v * -1 }</p>)}
        {this.list.map(v => <p key={v} onClick={this.show.bind(this, v)}>{v * -10 }</p>)}
        {this.show}
        {this.msg}
        <slot name='bottom' />
        <video />
        <MyTimer >
          123123
        </MyTimer>
      </div>
    )
  }
  $connectedCallback () {
    console.log('$connectedCallback')
    setTimeout(() => {
      this.list = [5, 6, 7, 78]
      console.log(this.list)
      setTimeout(() => {
        this.list = [9, 4]
        console.log(this._config())
        console.log(this._shadow)
      }, 3000)
    }, 3000)
  }
}
console.log(GoTop._style)
