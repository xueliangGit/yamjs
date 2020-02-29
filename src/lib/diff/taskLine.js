/*
 * @Author: xuxueliang
 * @Date: 2019-08-16 15:06:26
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 12:01:59
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
    window.Promise ? Promise.resolve().then(() => {
      console.log('runMicTask')
      runTash('mic')
    }) : runTash('mic')
  }
}

function runTash (key) {
  console.log(key, tasks[key].length)
  if (tasks[key].length) {
    tasks[key].shift()()
    runTash(key)
  }
}
