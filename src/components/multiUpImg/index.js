/*
 * @Author: xuxueliang
 * @Date: 2020-02-18 15:13:32
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-06 16:02:13
 */
// import Yam, { Component } from 'yamjs'
import Yam, { Component } from '../../lib/index'
import img from './but-jubaozhaoshanchu@2x.png'
import style from './index.stylus'

let num = 0
@Component({
  tagName: 'multi-upimg',
  style: style,
  props: ['serverurl', 'title', 'type', 'suffix', 'width', 'height', 'max']
})
class App extends Yam {
  $data () {
    return {
      // your data
      max: 5,
      title: '213',
      num: ++num,
      imgs: [],
      imgKeys: []
    }
  }
  uploadok (imgObj) {
    // console.log(imgObj)
    this.imgs.push(imgObj.picUrl)
    this.imgKeys.push(imgObj.picKey)
    console.log(this.__isWillupdate)
    this.update()
    this.updateEmitImgs()
  }
  $mounted () {
    console.log(document.getElementById('upimg'))
  }
  updateEmitImgs () {
    this.emitProp('uploadok', this.imgs, this.imgKeys)
  }
  $beforeUpdate () {
    console.log(this)
  }
  getList () {
    console.log('getList,=', this.num)
    if (num < 49) {
      return <multi-upImg />
    }
    return this.num
  }
  render () {
    return <div className='img-divs'>
      { this.imgs.map((v, i) => (
        <div key={ i } className='img-show' style={ { 'width': this.width + 'px', height: this.height + 'px', backgroundImage: 'url(' + v + (this.suffix || '') + ')' } }>

          <span className='close' onClick={ () => { this.imgs.splice(i, 1) && this.imgKeys.splice(i, 1) && this.update() && this.updateEmitImgs() } } >
            <img src={ img } />
          </span>
        </div>
      ))
      }
      <up-img id='upimg' selelctOnly={ true } className={ `img-show ${ this.imgs.length >= this.max ? 'hide' : '' }` } style={ { 'width': this.width + 'px', height: this.height + 'px' } } type={ this.type } suffix={ this.suffix } serverurl={ this.serverurl } uploadok={ this.uploadok.bind(this) } title="上传图片"></up-img>
      { this.getList() }
    </div >
  }
}
export default App
