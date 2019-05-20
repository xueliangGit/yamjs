import BaseComponent, { Component } from '../lib/index'
// var goTopTem = require('./goTopTem.html')
// eslint-disable-next-line no-unused-vars
import MyTimer from './myTimer'
@Component({
  tagName: 'go-top',
  style: require('./goTop.stylus'),
  shadow: false,
  customElements: true,
  props: ['msg']
})
class App extends BaseComponent {
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
    console.log('-----mounted')
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
    console.log('-----updated')
  }
  show (v) {
    this.$router.show()
    // console.log(v)
  }
  showList () {
    return this.list.map(v => <li>{v}</li>)
  }
  switch (i) {
    // this.emit('ad')
    // console.log(this.$refs.mytim)
    // this.$refs.mytim.showP()
    this.index = i
  }
  childEmit (i) {
    console.log(`子组件传来信息` + i)
    console.log(this)
  }
  getList () {
    // return <MyTimer msgTime={123 + '' + this.index} ref='mytim' showFn={this.showList.bind(this)} />
    if (this.index === 1) {
      return this.list.map((v, k) => <div key={k} ani='fade'>{v}</div>)
    } else if (this.index === 2) {
      return <MyTimer msgTime={123 + '' + this.index} ref='mytim' showFn={this.childEmit.bind(this)} />
    }
    return ''
  }
  render () {
    return (
      <div className='asd' />
    )
  }
  $connectedCallback () {
    // console.log('$connectedCallback')
    // setTimeout(() => {
    //   // this.list = [5, 6, 7, 78]
    //   let p = []
    //   for (let j = 0; j < 500; j++) {
    //     p.push(j)
    //   }
    //   console.time('beginUpdate1')
    //   this.list = p
    //   console.timeEnd('beginUpdate1')
    //   console.log(this.list)
    //   setTimeout(() => {
    //     let pp = []
    //     for (let l = 0; l < 8; l++) {
    //       pp.push(l)
    //     }
    //     console.time('beginUpdate2')
    //     this.list = pp
    //     console.timeEnd('beginUpdate2')

    //     setTimeout(() => {
    //       console.time('beginUpdate3')
    //       this.list = this.list.reverse()
    //       console.timeEnd('beginUpdate3')
    //       // console.log(this._config())
    //       // console.log(this._shadow)
    //       setTimeout(() => {
    //         console.time('beginUpdate3')
    //         this.list = this.list.reverse()
    //         console.timeEnd('beginUpdate3')
    //       // console.log(this._config())
    //       // console.log(this._shadow)
    //       }, 5000)
    //     }, 5000)
    //   }, 5000)
    // }, 5000)
  }
}
// console.log(GoTop._style)
export default App
