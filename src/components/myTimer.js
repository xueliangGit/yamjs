import BaseComponent, { Component } from '../lib/index'
// var style = require('./myTimers.styl')
// console.log('style', style, style.toString())
 @Component({
   tagName: 'my-timer',
   style: require('./myTimers.stylus'),
   shadow: false,
   customElements: false,
   props: ['msgTime'],
   canBeCalledExt: false
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
     //  console.log(this)
   }
   showList () {
     return this.list.map(v => <li>{v}</li>)
   }
   render () {
     return (
       <div >
         <slot name='top' />
         <p onClick={this.show.bind(this)} className='red' ref='p' >4341321</p>
          我是myTimer
         <p> {this.msgTime }</p>
         {this.showList()}
         <slot name='bottom' />
       </div>
     )
   }
   $updated () {
     console.timeEnd('-----updated')
   }
   $beforeUpdate () {
     console.time('-----updated')
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
