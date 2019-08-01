import Yam, { Component } from '../lib/index'
@Component({
  tagName: 'page-404',
  style: '',
  props: ['path']
})
class App extends Yam {
  data () {
    return {
      // your data
    }
  }
  render () {
    return <div>
      <p class='tip-404'>404</p>
      <p class='tip-404'>{this.path} 没有相应的页面，请检测</p>
    </div>
  }
}
export default App
