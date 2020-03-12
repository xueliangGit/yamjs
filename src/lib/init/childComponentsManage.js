/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-12 14:17:13
 */
import cacheLib from '../utils/cacheLib'
import { guid2 } from '../utils/index'
class ChildComponentsManage {
  constructor(context) {
    this.id = 'childComponents' + '-' + (context._eid || guid2())
    cacheLib.set(this.id, {})
  }
  get (_eid) {
    if (_eid) {

    } else {
      return cacheLib.get(this.id)
    }
  }
  add (App) {
    let Apps = this.get()
    App.Destory && App.Destory.add(() => {
      delete Apps[App._eid]
    })
    Apps[App._eid] = App
  }
  del (index) {
    if (this.isDestorying) {
      return null
    }
    let Apps = this.get()
    if (Apps) {
      let app = Apps[index]
      delete Apps[index]
      return app
    }
    return null
  }
  destory () {
    let Apps = this.get()
    this.isDestorying = true
    for (let i in Apps) {
      Apps[i] && Apps[i].__beforeDisconnectedCallback()
      Apps[i] && Apps[i].__disconnectedCallback()
      delete Apps[i]
    }
    this.isDestorying = false
    // forEach(Apps, (app) => {
    //   console.log('app', app)
    //   app.__beforeDisconnectedCallback()
    //   app.__disconnectedCallback()
    // })
    Apps = null
    cacheLib.del(this.id)
  }
}
export default ChildComponentsManage
