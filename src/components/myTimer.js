import BaseComponent, { Component } from '../lib'
// var style = require('./myTimers.styl')
// console.log('style', style, style.toString())
 @Component({
   tagName: 'my-timer',
   style: require('./myTimers.styl'),
   shadow: false,
   props: ['msg']
 })
class App extends BaseComponent {
   $data () {
     return {
       list: [1, 2, 3]
     }
   }
   show (v) {
     window.alert('现在时间' + v)
   }
   showList () {
     return this.list.map(v => <li>{v}</li>)
   }
   render () {
     console.log('jsx')
     return (
       <div >
         <p onClick={this.show.bind(this)} className='red' ref='p' >4341321</p>
          我是myTimer
         {this.showList()}
       </div>
     )
   }
   $updated () {
     console.log('isMYTIMEUpdtaeing')
   }
   $connectedCallback () {
     console.log('$connectedCallback')
     setTimeout(() => {
       this.list = [1111, 2222, 333]
       console.log(this.list)
     }, 3000)
   }
 }
console.log('GoTop:#config', App._tagName)

export default App
