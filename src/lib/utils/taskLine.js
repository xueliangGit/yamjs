/*
 * @Author: xuxueliang
 * @Date: 2019-08-16 15:06:26
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-10 15:43:57
 */

let tasks = {
  mac: [],
  mic: []
}
let asyncRunQueue = (cb = () => { }) => {
  window.Promise ? Promise.resolve().then(cb) : window.setImmediate ? setImmediate(cb) : setTimeout(cb, 0)
}
let asyncRunMacQueue = (cb = () => { }) => {
  setTimeout(cb, 0)
}
export default {
  addMacTask (fn = () => { }) {
    tasks.mac.push(fn)
    if (!tasks.macRuning) {
      tasks.macRuning = true
      this.runMacTack()
    }
  },
  addMicTask (fn = () => { }) {
    // fn()
    tasks.mic.push(fn)
    if (!tasks.micRuning) {
      tasks.micRuning = true
      this.runMicTask()
    }
  },
  runMacTack () {
    this.runMicTask('mac')
  },
  runMicTask (key = 'mic') {
    (key === 'mic' ? asyncRunQueue : asyncRunMacQueue)(() => {
      runTash(key)
      tasks[key + 'Runing'] = false
    })
  }
}

function runTash (key) {
  // eslint-disable-next-line
  for (let item; item = tasks[key][0];) {
    tasks[key].shift()()
  }
  // console.warn('runTash', key, 'isOver')
}
