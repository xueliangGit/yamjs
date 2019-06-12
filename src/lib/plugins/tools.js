import { getCss } from './utils'

export default {
  name: 'tools',
  install: function (terget) {
    const data = {
      timeOutIds: {},
      intervalIds: {}
    }
    terget.addPrototype('getCss', function (attr, elm) {
      console.log(attr)
      return getCss(elm || this.elm, attr)
    })
    terget.addPrototype('setTimeout', function (fn, ...params) {
      let timeOutId = setTimeout(() => {
        typeof fn === 'function' && fn()
        this.delDestory(ids)
        timeOutId = null
      }, ...params)
      let ids = this.addDestory(() => {
        console.log('timeOutId,', timeOutId)
        if (timeOutId) {
          clearTimeout(timeOutId)
          timeOutId = null
        }
      })
      data.timeOutIds[ids] = timeOutId
      return timeOutId
    })
    terget.addPrototype('clearTimeout', function (eventId) {
      this.delDestory(eventId)
      clearTimeout(data.timeOutIds[eventId])
      delete data.timeOutIds[eventId]
      return true
    })
    terget.addPrototype('setInterval', function (fn, ...params) {
      let intervalId = setInterval((...arg) => {
        // console.log('intervalId,', intervalId)
        typeof fn === 'function' && fn(...arg)
      }, ...params)
      let ids = this.addDestory(() => {
        console.log('intervalId,', intervalId)
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      })
      data.timeOutIds[ids] = intervalId
      return intervalId
    })
    terget.addPrototype('clearInterval', function (eventId) {
      this.delDestory(eventId)
      clearInterval(data.timeOutIds[eventId])
      delete data.timeOutIds[eventId]
      return true
    })
  }
}