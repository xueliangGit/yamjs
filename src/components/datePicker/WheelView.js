import Yam, { Component } from '../../lib/index'
const lineHeight = 40
@Component({
  tagName: 'wheel-view',
  style: require('./wheelView.stylus'),
  shadow: false,
  props: ['data', 'index', 'type', 'gzName']
})
class App extends Yam {
  $data () {
    return {
      data: []
    }
  }
  $updated () {
    this.$refs.scroller.scrollTop = lineHeight * this.index
  }
  $mounted () {
    this.distance = lineHeight
    this.$refs.scroller.scrollTop = lineHeight * this.index
    var self = this
    self.$refs.scroller.addEventListener('touchstart', touchStart, false)
    self.$refs.scroller.addEventListener('touchend', touchEnd, false)
    self.$refs.scroller.addEventListener('mousedown', touchStart, false)
    self.$refs.scroller.addEventListener('mouseup', touchEnd, false)
    function touchStart (event) {
      self.isTouchStart = true
    }
    function touchEnd (event) {
      self.isTouchStart = false
      self.timer = setTimeout(() => {
        self.reSet()
      }, 100)
      // 100毫秒未触摸，认定滚动结束进行状态修正
    }
  }

  /**
   * 监听滚动事件
   * @param e
   */
  onScroll () {
    var self = this
    if (this.timer) clearTimeout(this.timer)// 如果一直在滚动，不会触发timer
    this.timer = setTimeout(() => {
      self.reSet()
    }, 100)
    // 100毫秒未滚动，认定滚动结束
  }

  /**
   * 状态修正
   */
  reSet () {
    var self = this
    if (self.isTouchStart || self.isAutaoreSet) return// 如果在触摸状态，返回
    console.log('scrolling ends..')
    var top = self.$refs.scroller.scrollTop// 滚过的高度
    var dis = top % lineHeight
    var target
    console.log('dis', dis, top)
    if (dis > lineHeight / 2) { // 超过一半，向下滚
      target = top + (lineHeight - dis)
      self.transfrom(target)
    } else { // 否则滚回去
      target = top - dis
      self.transfrom(target)
    }
    self.index = target / lineHeight//  当前选中的序号
    self.emitProp('onDataChange', self.type, self.index)
  }
  handleClick (e) { // 点到哪个滚到目标位置
    console.log('e.clientY', e.clientY - window.innerHeight + lineHeight * 3)
    var distance = e.clientY - window.innerHeight + lineHeight * 3 // 当前点击的位置距目标位置的距离
    var self = this
    var top = self.$refs.scroller.scrollTop // 滚过的高度
    if (distance < 0 && top <= 0) return
    console.log(self.$refs.scroller.scrollHeight, top, self.$refs.scroller.scrollHeight - top - 200)
    if (distance > 0 && self.$refs.scroller.scrollHeight - top - 200 <= 10) return
    var target = top + Math.floor(distance / lineHeight) * lineHeight // 需要滚动的高度
    self.index = target / lineHeight //  当前选中的序号
    console.log(self.$refs.scroller.scrollHeight, top, self.$refs.scroller.scrollHeight - top - 200, self.index, distance)

    self.transfrom(target) // 动画过渡到目标位置
    self.emitProp('onDataChange', self.type, self.index)
    // 回调函数数据改变事件
  }
  /**
   * 动画过渡到目标位置
   * @param target
   */
  transfrom (target) {
    this.isAutaoreSet = true
    var self = this
    var now = self.$refs.scroller.scrollTop
    var step = (target - now) / (lineHeight / 2)
    console.log('dis-step-transfrom', step, target, now, (target - now) / (lineHeight / 2))
    setTimeout(function runto () {
      self.$refs.scroller.scrollTop = target
      setTimeout(() => {
        self.isAutaoreSet = false
      }, 200)
      // if (self.$refs.scroller.scrollTop !== target) { setTimeout(runto, 10) } else { console.warn('dis-ok'); this.isAutoTrue = false }// 没有滚动到目标位置，继续触发自己
    }, 10)
  }

  render () {
    return (<div className='container'
      ref='scroller'
      onScroll={this.onScroll.bind(this)}
      onClick={this.handleClick.bind(this)}>
      <div className='scroller'>
        {
          Array.isArray(this.data) ? this.data.map((item, i) => {
            // 循环把数据显示出来
            return <div className={this.index === i ? 'active item' : 'item'}>{item} {this.index === i ? this.gzName : ''}</div>
          }) : ''
        }
      </div>
    </div>
    )
  }
}
// console.log(GoTop._style)
export default App
