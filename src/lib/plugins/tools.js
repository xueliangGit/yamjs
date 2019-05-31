import { getCss } from './utils'

export default {
  name: 'tools',
  install: function (terget) {
    terget.addPrototype('getCss', function (attr, elm) {
      console.log(attr)
      return getCss(elm || this.elm, attr)
    })
    terget.addPrototype('setTimeout', function (fn, ...params) {
      let timeOutId = setTimeout(() => {
        typeof fn === 'function' && fn()
        timeOutId = null
      }, ...params)
      let did = this.addDestory(() => {
        console.log('timeOutId,', timeOutId)
        if (timeOutId) {
          clearTimeout(timeOutId)
          timeOutId = null
        }
      })
      return timeOutId
    })
    terget.addPrototype('setInterval', function (fn, ...params) {
      let intervalId = setInterval((...arg) => {
        typeof fn === 'function' && fn(...arg)
      }, ...params)
      this.addDestory(() => {
        console.log('intervalId,', intervalId)
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      })
      return intervalId
    })
  }
}
