/*
 * @Author: xuxueliang
 * @Date: 2019-08-16 15:06:26
 * @LastEditors  : xuxueliang
 * @LastEditTime : 2020-01-23 16:30:28
 */

let tasks = {
  mac: [],
  mic: []
}
export default {
  addMacTask (fn = () => { }) {
    tasks.mac.push(fn)
  },
  addMicTask (fn = () => { }) {
    fn()
    // tasks.mic.push(fn)
  },
  runMacTack () {
    runTash('mac')
  },
  runMicTask () {
    Promise.resolve().then(() => {
      console.log('runMicTask')
      runTash('mic')
    })
  }
}

function runTash (key) {
  if (tasks[key].length) {
    tasks[key].shift()()
    runTash(key)
  }
}
