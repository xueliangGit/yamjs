/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-01 15:22:48
 */
import Yam, { Component } from '../../index'
@Component({
  tagName: 'router-view',
  style: require('./router.stylus'),
  props: ['live']
})
class RouterView extends Yam {
  $beforeCreate () {
    this.cache = {}
  }
  $created () {
    this.$router.keepLive = !!this.live
  }
  $updated () {
    if (!!this.live && !this.cache[window.location.hash]) {
      this.cache[window.location.hash] = this.$refs.routerDiv.childNodes[0]
    } else {

    }
    console.log(this.cache)
  }
  getPage () {
  }
  $mounted () {
    this.elm.updateView = (e) => {
      console.log('update', this.$router.current.component)
      this.updateView(e)
    }
  }
  updateView (e) {
    if (this.live) {
      let old = e.oldURL
      old = old.split('#')[1]
      if (old) {
        this.cache[old] = this.$refs.routerDiv.childNodes[0]
        console.log(this.$router)
      }
    }
    this.update()
    console.log('this.$refs.dom', this.$refs.dom)
  }
  showCacheView (hashName) {
    this.$refs.routerDiv.appendChild(this.cache[hashName])
    return ''
  }
  showNewView () {
    if (this.$refs) {
      this.$refs.cacheDiv.appendChild(this.$refs.routerDiv.childNodes[0])
    }
    return <this.$router.current.component />
  }
  getCurrentComponent () {
    if (this.$router.current && this.$router.current.component) {
      return <this.$router.current.component ref='dom' />
    } else {
      return <page-404 path={this.$router.current.path}>
        { this.get404() }
      </page-404>
    }
  }
  get404 () {
    return <div class='tip-404' >
      <p class='title-404 tac'>YAMJS</p>
      <p class='text-404 tac'>【404】 肯定是你的方向不对</p>
      <p class='des-404 tac'>只要方向对，目标肯定就在远方，先去检查一下吧</p>
    </div >
  }
  render () {
    let hashName = window.location.hash.split('?')[0]
    return (
      <div ref='routerDiv'>{
        this.live && this.cache[hashName]
          ? this.showCacheView(hashName)
          : this.getCurrentComponent() }</div>
    )
  }
}
export default RouterView
