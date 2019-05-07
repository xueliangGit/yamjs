import BaseComponent, { Component } from '../lib'
// var goTopTem = require('./goTopTem.html')
// eslint-disable-next-line no-unused-vars
import MyTimer from './myTimer'
@Component({
  tagName: 'go-top',
  style: require('./goTop.styl'),
  shadow: false,
  props: ['msg']
})
class App extends BaseComponent {
  $data () {
    return {
      list: [0, 1, 2, 3],
      index: 0
    }
  }
  show (v) {
    this.$router.show()
    // console.log(v)
  }
  showList () {
    return this.list.map(v => <li>{v}</li>)
  }
  switch (i) {
    this.index = i
  }
  getList () {
    if (this.index === 1) {
      return this.list.map((v, k) => <div key={k} ani='fade'>{v}</div>)
    } else if (this.index === 2) {
      return <my-timer >
      123123
      </my-timer>
    }
    return ''
  }
  render () {
    return (
      <div >
        <div>
          <span onClick={this.switch.bind(this, 2)}>我的</span>
          <span onClick={this.switch.bind(this, 1)}>nide</span>
        </div>
        {this.getList()}
        <div />
        {/* {this.list.length > 3 ? <input type='text' placeholder='asdas' /> : <input type='text' placeholder='123' />} */}
        {/* <my-timer >
          123123
        </my-timer> */}
        {/*
        {this.list.map((v, k) => <li key={k} ani='fade'>{v}</li>) }
        {this.list.map(v => <p key={v} onClick={this.show.bind(this, v)}>{v * -1 }</p>)}
        {this.list.map(v => <p key={v} onClick={this.show.bind(this, v)}>{v * -10 }</p>)} */}
        {/* <video /> */}
        {/* <my-timer >
          123123
        </my-timer> */}
      </div>
    )
  }
  $updated () {
    console.log('isGoTopUpdtaeing')
  }
  $connectedCallback () {
    // console.log('$connectedCallback')
    setTimeout(() => {
      // this.list = [5, 6, 7, 78]
      let p = []
      for (let j = 0; j < 10; j++) {
        p.push(j)
      }
      console.time('beginUpdate1')
      this.list = p
      console.timeEnd('beginUpdate1')
      // console.log(this.list)
      setTimeout(() => {
        let pp = []
        for (let l = 0; l < 8000; l++) {
          pp.push(l)
        }
        console.time('beginUpdate2')
        this.list = pp
        console.timeEnd('beginUpdate2')

        setTimeout(() => {
          console.time('beginUpdate3')
          this.list = this.list.reverse()
          console.timeEnd('beginUpdate3')
          // console.log(this._config())
          // console.log(this._shadow)
          setTimeout(() => {
            console.time('beginUpdate3')
            this.list = this.list.reverse()
            console.timeEnd('beginUpdate3')
            // console.log(this._config())
            // console.log(this._shadow)
          }, 5000)
        }, 5000)
      }, 5000)
    }, 5000)
  }
}
// console.log(GoTop._style)
export default App
