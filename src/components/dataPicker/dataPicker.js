/*
 * @Author: xuxueliang
 * @Date: 2019-08-20 20:09:03
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-27 17:14:51
 */
import Yam, { Component } from '../../lib/index'
// eslint-disable-next-line no-unused-vars
import WheelView from '../wheelView/WheelView'
@Component({
  tagName: 'data-picker',
  style: require('./dataPicker.stylus'),
  props: ['startTime', 'showzg'],
  shadow: true,
  canBeCalledExt: true
})
class datePicker extends Yam {
  /**
 * 弹窗组件
 */
  $data () {
    return {
      listData: [],
      showDate: '',
      indexs: [],

      stateIndexs: []
    }
  }
  init (data, index) {
    if (Array.isArray(data)) {
      index = index || []
      this.listData = data
      this.indexs = data.map((v, i) => index[i] || 0)
    }
  }
  setData (index, data) {
    this.listData.splice(index, 1, data)
    this.update()
  }
  $beforeMount () {
  }
  onDataSelect (data) {
    this.showDate = data
  }
  dateSure () {
    this.hide()
    this.elm.value = this.showDate
    this.emitProp('change', this.showDate)
  }
  hide () {
    this.slideOut('bottom', this.$dom)
  }
  show () {
    this.slideIn('bottom', this.$dom)
  }
  getDataFromKey () {
    return this.listData.map((v, i) =>
      v[this.indexs[i]]
    )
  }
  onDataChange (type, index) {
    console.log('onDataChange', type + '--->' + index)
    let key = +type.split('key')[1]
    this.indexs[key] = index
    let data = this.getDataFromKey()
    this.onDataSelect(data)// 数据变化之后，触发回调
    this.emitProp('dataChange', { colum: key, index, data })
  }
  getWheel () {
    return this.listData.map((v, i) =>
      <WheelView key={i} className=' dib' style={{ 'width': 1 / this.listData.length * 100 + '%' }} type={'key' + i} data={v}
        index={this.indexs[i]}
        onDataChange={this.onDataChange.bind(this)} />
    )
  }
  render () {
    return (
      <div className='dialog'>
        <div className='buttons'>
          <span onClick={this.hide.bind(this)} className='button left'>取消</span>
          <div className='title '>{ this.showDate }</div>
          <span onClick={this.dateSure.bind(this)} className='button right'>确定</span>
        </div>
        <div className='box' >
          { this.getWheel() }
        </div>
      </div>
    )
  }
}
// console.log(GoTop._style)
export default datePicker
