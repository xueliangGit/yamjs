/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-27 19:16:31
 */
import Yam, { Component } from '../lib/index'
// import jsxp from 'jsx-parser'
// var goTopTem = require('./goTopTem.html')
// eslint-disable-next-line no-unused-vars
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
      mytime: '',
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
        < p > 我是时间 - 2</p >
        <p slot='aaa'>我是时间-11112</p>
        <show-demo slot='bottom'></show-demo>
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
        <div onClick={ this.goT.bind(this) }>去timer</div>
        <div onClick={ this.switch.bind(this, -1) }>点击{ this.$store.width }</div>
        { this.index == 1 ? <slot></slot> : '' }
        { this.getTimer() }

      </div>
    )
  }
}
)
