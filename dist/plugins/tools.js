/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-03 12:52:28
 */
import { getCss } from './utils'
import { isFunc } from '../utils/index'

export default {
  name: 'tools',
  install: function (target) {
    const data = {
      timeOutIds: {},
      intervalIds: {}
    }
    target.addPrototype('getCss', function (attr, elm) {
      // console.log(attr)
      return getCss(elm || this.elm, attr)
    })
    // 设置延时器
    target.addPrototype('setTimeout', function (fn, ...params) {
      let timeOutId = setTimeout(() => {
        isFunc(fn) && fn()
        this.delDestory(ids)
        timeOutId = null
      }, ...params)
      let ids = this.addDestory(() => {
        // console.log('timeOutId,', timeOutId)
        if (timeOutId) {
          clearTimeout(timeOutId)
          timeOutId = null
        }
      })
      data.timeOutIds[ids] = timeOutId
      return timeOutId
    })
    // 取消延时器
    target.addPrototype('clearTimeout', function (eventId) {
      this.delDestory(eventId)
      clearTimeout(data.timeOutIds[eventId])
      delete data.timeOutIds[eventId]
      return true
    })
    // 设置定时器
    target.addPrototype('setInterval', function (fn, ...params) {
      let intervalId = setInterval((...arg) => {
        // console.log('intervalId,', intervalId)
        isFunc(fn) && fn(...arg)
      }, ...params)
      let ids = this.addDestory(() => {
        // console.log('intervalId,', intervalId)
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      })
      data.timeOutIds[ids] = intervalId
      return intervalId
    })
    // 取消定时器
    target.addPrototype('clearInterval', function (eventId) {
      this.delDestory(eventId)
      clearInterval(data.timeOutIds[eventId])
      delete data.timeOutIds[eventId]
      return true
    })
  }
}
