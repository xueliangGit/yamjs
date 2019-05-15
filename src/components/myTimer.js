import BaseComponent, { Component } from '../lib'
// var style = require('./myTimers.styl')
// console.log('style', style, style.toString())
 @Component({
   tagName: 'my-timer',
   style: require('./myTimers.styl'),
   shadow: false,
   customElements: false,
   props: ['msgTime']
 })
class App extends BaseComponent {
   $data () {
     return {
       list: [1, 2, 3]
     }
   }
   show (v) {
     console.log(this.emitProp('showFn', 'asdasd'))
   }
   showP (v) {
     console.log('adsasd')
     console.log(this)
   }
   showList () {
     return this.list.map(v => <li>{v}</li>)
   }
   render () {
     return (
       <div >
         <p onClick={this.show.bind(this)} className='red' ref='p' >4341321</p>
          我是myTimer
         <p> {this.msgTime }</p>
         {this.showList()}
       </div>
     )
   }
   $updated () {
     console.log('isMYTIMEUpdtaeing')
   }
   $connectedCallback () {
     setTimeout(() => {
       console.log('$connectedCallback')
       this.list = [1111, 2222, 333]
     }, 3000)
   }
 }
console.log('GoTop:#config', App._tagName)

export default App
