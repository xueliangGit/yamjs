/*
 * @Author: xuxueliang
 * @Date: 2019-08-16 17:53:23
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 19:44:10
 */
// import Yam, { Component } from 'yamjs'
import Yam, { Component } from '../../lib/index'
import style from './upimg1.stylus'
@Component({
  tagName: 'up-img',
  style: style,
  props: ['serverurl', 'title', 'type', 'suffix', 'canEdit', 'selelctOnly'],
  canBeCalledExt: true
})

class App extends Yam {
  $data () {
    return {
      // your data
      imgUrl: '',
      isLoading: false,
      loadingInfo: '加载中...'
    }
  }
  $created () {
    console.log(this.title)
  }
  change (e) {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.isLoading = true
      this.loadingInfo = '加载中...'
      if (this.serverurl) {
        this.upLoad(e.target.files[0])
      } else {
        this.updateUrl({ picUrl: preImg(e.target) })
      }
    }
  }
  updateUrl (obj) {
    this.emitProp('uploadok', obj)
    if (!this.selelctOnly) {
      this.imgUrl = obj.picUrl
    }
    this.isLoading = false
  }
  upLoad (file) {
    let params = new FormData()
    params.append('type', this.type || 0)
    params.append('picFile', file, file.name)
    // console.log(file)
    window.fetch(this.serverurl, {
      method: 'post',
      body: params,
      timeout: 10000
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.updateUrl(response)
      })
      .catch((error) => {
        this.loadingInfo = '加载失败'
        setTimeout(() => {
          this.isLoading = false
        }, 500)
        console.log(error)
      }).finally(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 500)
      })
    return false
  }
  loading () {
    return <div onClick={ (e) => { e.preventDefault() } } className='loading'>
      <div>{ this.loadingInfo }</div>
      <span />
    </div>
  }
  render () {
    // console.log(this.imgUrl)
    return <div className={ `upfile ${this.imgUrl ? '' : 'showbk'}` }>
      <label >
        <input type='file' onChange={ this.change.bind(this) } accept='image/*' />
        { this.imgUrl ? <div className='showimg' style={ { backgroundImage: 'url(' + this.imgUrl + (this.suffix || '') + ')' } } /> : this.isLoading ? '' : <span>+</span> }
        { this.isLoading ? this.loading() : '' }
      </label>
    </div >
  }
}
export default App
function preImg (node) {
  let imgURL = ''
  try {
    var file = null
    if (node.files && node.files[0]) {
      file = node.files[0]
    } else if (node.files && node.files.item(0)) {
      file = node.files.item(0)
    }
    node.value = ''
    // Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
    try {
      imgURL = file.getAsDataURL()
    } catch (e) {
      imgURL = window.URL.createObjectURL(file)
    }
  } catch (e) {
    if (node.files && node.files[0]) {
      var reader = new FileReader()
      reader.onload = function (e) {
        imgURL = e.target.result
      }
      reader.readAsDataURL(node.files[0])
    }
  }
  return imgURL
}
