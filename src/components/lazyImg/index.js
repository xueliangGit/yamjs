/*
 * @Author: xuxueliang
 * @Date: 2020-06-22 17:20:53
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 18:56:56
 */
import Yam, { Component } from 'yamjs'
import store from '../store2'
let mixin = {
  $data () {
    return {
      showInfo: '12312'
    }
  },
  $mounted () {
    console.log('common_$mouned', this)
  }
}

@Component({
  shadow: true,
  tagName: 'lazy-img',
  style: '',
  mixin,
  store,
  props: ['src', 'width', 'height', 'loadingsrc']
})
class App extends Yam {
  $data () {
    return {
      // your data
      isReady: false
    }
  }
  $mounted () {
    console.log('------------')
    console.log(this.$refs)
    if (this.src) {
      this.loadimg()
    }
  }
  loadimg () {
    let img = new Image()
    img.src = this.src
    img.onload = () => {
      setTimeout(() => {
        this.isReady = true
        console.log(this.$config = false)
        console.log(this.$config)
      }, 1000)
    }
    img.onerror = () => {
      if (!img._isTry) {
        img._isTry = true
        img.src = ''
        setTimeout(() => {
          img.src = this.src
        }, 200)
      }
    }
  }
  render () {
    return <div >
      { this.isReady ? this.src : this.loadingsrc }
      <img ref='img' aaaa={ this.isReady ? this.src : this.loadingsrc } src={ this.isReady ? this.src : this.loadingsrc } /></div>
  }
}
export default App
