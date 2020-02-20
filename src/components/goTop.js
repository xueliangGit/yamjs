/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-20 14:03:21
 */
import Yam, { Component } from '../lib/index'
// import jsxp from 'jsx-parser'
// var goTopTem = require('./goTopTem.html')
import MyTimer from './myTimer'
// import store from './store2'
/*eslint-disable */


// @Component()
export default Component({
  tagName: 'go-top',
  style: require('./goTop.stylus'),
  shadow: true,
  canBeCalledExt: true,
  // store,
  props: ['msg']
})(class App extends Yam {
  $data () {
    return {
      list: [0, 12, 2, 3],
      index: 1
    }
  }
  $beforeCreate () {
    console.log('-----beforeCreate')
  }
  $created () {
    console.log('-----created')
  }
  $beforeMount () {
    console.log('-----beforeMount')
  }
  $mounted () {
    // let aaa = JSXParser(`<div a='123'>123123{this.a}<p><s></a></p></div>`)
    // console.log('-----mounted')
    // console.log(aaa)
  }
  $beforeDestroyed () {
    console.log('-----beforeMount')
  }
  $destroyed () {
    console.log('-----destroyed')
  }
  $beforeUpdate () {
    console.log('-----beforeUpdate')
  }
  $updated () {
    console.log('go-top-----updated')
  }
  show (v) {
    this.$router.show()
    // console.log(v)
  }
  showList () {
    return this.list.map(v => <li>{ v }</li>)
  }
  switch (i) {
    // this.$router.push({
    // })
    // this.emit('ad')
    // console.log(this.$refs.mytim)
    // this.$refs.mytim.showP()
    this.index *= i
  }
  goT () {
    this.$router.push({
      name: 'myTimer',
      query: { a: 1, b: 2 }
    })
  }
  getTimer () {
    if (this.index == 1) {
      return <MyTimer ref={ (c) => { this.mytime = c } }>
        <p> 我是时间 - 2</p>
        <p class='times' slot='aaa'>我是时间-11112</p>
        <test-show class='test' slot='bottom'>222222
          <test-show class='blue' slot='top'>3333
          </test-show>
        </test-show>
      </MyTimer >
    }
    return ''
  }
  $beforeDestroyed () {
    console.log('go-top:beforeDestroyed')
  }
  render () {
    return (
      <div className='asd' >
        <test-show title='bottom'>11111</test-show>
        <div onClick={ this.goT.bind(this) }>去timer</div>
        <div onClick={ this.switch.bind(this, -1) }>点击{ this.$store.width }</div>
        <button onClick={ () => this.$store.replay() }>重放</button>
        <button onClick={ () => this.$store.reset() }>复位</button>
        { this.index == 1 ? <slot></slot> : '' }
        { this.getTimer() }

      </div>
    )
  }
}
)
