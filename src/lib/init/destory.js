import cacheLib from '../utils/cacheLib'
import { guid2 } from '../utils'
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
