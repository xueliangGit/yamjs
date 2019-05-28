import BaseComponent, { Component } from '../../lib/index'
// eslint-disable-next-line no-unused-vars
import WheelView from './WheelView'
import calendar from './daytool'
@Component({
  tagName: 'date-picker',
  style: require('./datePicker.stylus'),
  props: ['startTime', 'showzg'],
  canBeCalledExt: true
})
class App extends BaseComponent {
  /**
 * 弹窗组件
 */
  $data () {
    return {
      state: this.getInitialState(),
      nowDate: new Date(),
      gzDay: '',
      gzMonth: '',
      gzYear: '',
      showDate: ''
    }
  }
  getInitialState () {
    return {
      year: [], // 年份数组
      month: [], // 月份数组
      date: [], // 天数数组
      yIndex: 0, // 当前的年下标
      mIndex: 0, // 当前的月下标
      dIndex: 0 // 当前的日下标
    }
  }
  $beforeMount () {
    let year = []// 年数组
    let month = []// 月数组
    let day = []// 日数组
    let startYear = (this.startTime && this.startTime.getFullYear()) || (this.nowDate.getFullYear() - 50)
    let endYear = (this.endTime && this.endTime.getFullYear()) || (this.nowDate.getFullYear() + 50)
    for (let i = startYear;
      i <= endYear; i++) {
      year.push(i)
    }
    console.log((this.nowDate.getFullYear() - 50))
    this.endYear = endYear
    this.startYear = startYear
    this.startMonth = (this.startTime && this.startTime.getMonth()) || 0
    this.endMonth = (this.endTime && this.endTime.getMonth()) || 11
    this.startDay = (this.startTime && this.startTime.getDate()) || 1
    this.endDay = (this.endTime && this.endTime.getDate()) || 31
    // 起始年份等于终止年份时，月份数组的获取
    if (endYear === startYear) {
      for (let i = this.startMonth + 1;
        i <= this.endMonth + 1; i++) {
        month.push(i)
      }

      // 起始月份等于终止月份时，日期的获取
      if (this.startMonth === this.endMonth) {
        for (let i = this.startDay;
          i <= this.endDay; i++) {
          day.push(i)
        }
      } else { // 等年不等月
        for (let i = this.startDay;
          i <= new Date(year[0], month[0], 0).getDate(); i++) {
          day.push(i)
        }
      }
    } else {
      for (let i = this.startMonth + 1; i <= 12; i++) {
        month.push(i)
      }
      for (let i = this.startDay;
        i <= new Date(year[0], month[0], 0).getDate(); i++) {
        day.push(i)
      }
    }
    this.setState({
      year: year, // 年数组
      month: month, // 月数组
      day: day, // 日数组
      yIndex: 0, // 当前的年
      mIndex: 0, // 当前的月
      dIndex: 0// 当前的日
    })
    let data = year[this.state.yIndex] + '-' + month[this.state.mIndex] +
    '-' + day[this.state.dIndex]
    this.onDataSelect(data)// 初次渲染后，触发回调
  }
  onDataSelect (data) {
    this.elm.value = data
    this.showDate = data
    if (this.showzg) {
      let lunar = calendar.solar2lunar(...data.split('-'))
      this.gzYear = lunar.gzYear
      this.gzMonth = lunar.gzMonth
      this.gzDay = lunar.gzDay
      this.showDate = `${data}(${lunar.gzYear}${lunar.gzMonth}${lunar.gzDay})`
    }
    this.elm.lunar = this.gzYear + this.gzMonth + this.gzDay
    // this.emitProp('d', data, this.elm.lunar)
  }
  dateSure () {
    this.emitProp('d', this.showDate)
  }
  onDataChange (type, index) {
    console.log('onDataChange', type + '--->' + index)
    let year = this.state.year
    let month = []
    let day = []
    let isInStartYear
    let isInEndYear
    let isInStartYearmonth
    let isInEndYearmonth
    switch (type) {
      case 'year':// 年带动月日变化
        isInStartYear = this.state.year[index] ===
        this.startYear
        isInEndYear = this.state.year[index] ===
        this.endYear
        isInStartYearmonth = this.state.month[0] ===
          this.startMonth
        isInEndYearmonth = this.state.month[0] ===
          this.endMonth

        if (isInStartYear) { // 如果当前年份等于初始年份
          for (let i = this.startMonth + 1; i <= 12; i++) {
            month.push(i)
          }
          for (let i = this.startDay;
            i <= new Date(year[0], month[this.state.mIndex], 0).getDate(); i++) {
            day.push(i)
          }
        } else if (isInEndYear) { // 如果当前年份等于终止年份
          for (let i = 1; i <= this.endMonth + 1; i++) {
            month.push(i)
          }
          if (isInEndYearmonth) { // 当前月份等于终止月份
            for (let i = 1; i <= this.endday; i++) {
              day.push(i)
            }
          } else { // 当前月份不等于终止月份
            for (let i = 1; i <= new Date(this.state.year[index],
              month[this.state.mIndex], 0).getDate(); i++) {
              day.push(i)
            }
          }
        } else { // 当前年份既不等于起始也不等于终止年份
          for (let i = 1; i <= 12; i++) {
            month.push(i)
          }
          for (let i = 1; i <= new Date(this.state.year[index], month[this.state.mIndex], 0).getDate(); i++) {
            day.push(i)
          }
        }
        this.setState({
          month: month,
          day: day,
          yIndex: index
          // mIndex: 0,
          // dIndex: 0
        })
        break
      case 'month':// 月带动日变化
        isInStartYear = this.state.year[this.state.yIndex] === this.startYear
        isInEndYear = this.state.year[this.state.yIndex] === this.endYear
        isInStartYearmonth = this.state.month[index] === this.startMonth + 1
        isInEndYearmonth = this.state.month[index] === this.endMonth + 1

        // 当前年月份等于起始年月份等于终止年月份
        if (isInStartYear && isInEndYear && isInStartYearmonth && isInEndYearmonth) {
          for (let i = this.startDay;
            i <= this.endTime.getDate(); i++) {
            day.push(i)
          }
        } else if (isInStartYear && isInStartYearmonth) { // 当前年月等于起始年月
          for (let i = this.startDay; i <= new Date(this.state.year[this.state.yIndex], this.state.month[index], 0).getDate(); i++) {
            day.push(i)
          }
        } else if (isInEndYear && isInEndYearmonth) { // 当前年月等于终止年月
          for (let i = 1; i <= this.endTime.getDate(); i++) {
            day.push(i)
          }
        } else {
          for (let i = 1; i <= new Date(this.state.year[this.state.yIndex], this.state.month[index], 0).getDate(); i++) {
            day.push(i)
          }
        }
        this.setState({
          mIndex: index,
          day: day
          // dIndex: 0
        })
        break
      case 'day':
        this.setState({ dIndex: index })
        break
    }
    let data = this.state.year[this.state.yIndex] + '-' + this.state.month[this.state.mIndex] + '-' + this.state.day[this.state.dIndex]
    this.onDataSelect(data)// 数据变化之后，触发回调
  }

  render () {
    return (
      <div className='dialog'>
        <div className='buttons'>
          <span className='button left'>取消</span>
          <div className='title dib'>{this.showDate}</div>
          <span onClick={this.dateSure.bind(this)} className='button right'>确定</span>
        </div>
        <div className='box' >
          <wheel-view className='year dib' type='year' gzName={this.gzYear} data={this.state.year}
            index={this.state.yIndex}
            onDataChange={this.onDataChange.bind(this)} />
          <WheelView className='month dib' type='month' gzName={this.gzMonth} data={this.state.month}
            index={this.state.mIndex}
            onDataChange={this.onDataChange.bind(this)} />
          <WheelView className='day dib' type='day' gzName={this.gzDay} data={this.state.day}
            index={this.state.dIndex}
            onDataChange={this.onDataChange.bind(this)} />
        </div>
      </div>
    )
  }
  $beforeCreate () {
    console.log('-----beforeCreate')
  }
  $created () {
    console.log('-----created')
  }
  $beforeDestroyed () {
    console.log('-----beforeMount')
  }
  $destroyed () {
    console.log('-----destroyed')
  }
  $beforeUpdate () {
    console.log('-----beforeUpdate')
  }
  $updated () {
    console.log('-----updated')
  }
  show (v) {
    this.$router.show()
  // console.log(v)
  }
  showList () {
    return this.list.map(v => <li>{v}</li>)
  }
}
// console.log(GoTop._style)
export default App
