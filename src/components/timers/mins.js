import Yam, { Component } from '../../lib/index'
// import { Transform } from 'stream'
// var style = require('./myTimers.styl')
// console.log('style', style, style.toString())
 @Component({
   tagName: 'my-mins',
   style: require('./mins.stylus'),
   props: ['mins']
 })
class App extends Yam {
   $data () {
     return {
     }
   }
   show (v) {
     console.log(this.emitProp('showFn', 'asdasd'))
   }
   showP (v) {
     console.log('adsasd')
     //  console.log(this)
   }
   getStyle (i) {
     return { transform: 'rotate(' + 360 / 24 * i + 'deg)' }
   }
   showList () {
     let listArray = []
     for (let i = 23; i >= 0; i--) {
       listArray.push(<li style={this.getStyle(i)}><span style={this.getStyle(i * -1 + 90)}>{i}</span></li>)
     }
     return listArray
   }
   render () {
     return (
       <div >
         <ul className='hour' >
           {this.showList()}
         </ul>
       </div>
     )
   }
   $updated () {
     console.timeEnd('-----updated')
   }
   $beforeUpdate () {
     console.time('-----updated')
   }
 }
console.log('GoTop:#config', App._tagName)

export default App
