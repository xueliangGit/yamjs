/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 15:51:53
 */
import cacheLib from '../utils/cacheLib'
import { guid2 } from '../utils/index'
let destoryId = 0
class Destory {
  constructor (context) {
    this.id = 'beforeDestroyedCall' + '-' + (context._eid || guid2())
    cacheLib.set(this.id, {})
  }
  get () {
    return cacheLib.get(this.id)
  }
  add (fn) {
    let beforeDestroyedCall = this.get()
    let guid = ++destoryId
    beforeDestroyedCall[guid] = fn
    beforeDestroyedCall = null
    return guid
  }
  del (eventId) {
    let beforeDestroyedCall = this.get()
    let fn = beforeDestroyedCall[eventId]
    delete beforeDestroyedCall[eventId]
    beforeDestroyedCall = null
    return fn
  }
  run () {
    let beforeDestroyedCall = this.get()
    for (let i in beforeDestroyedCall) {
      typeof beforeDestroyedCall[i] === 'function' && beforeDestroyedCall[i]()
    }
    beforeDestroyedCall = null
    cacheLib.del(this.id)
  }
}
export default Destory
