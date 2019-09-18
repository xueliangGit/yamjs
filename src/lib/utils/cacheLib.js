/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-17 20:01:23
 */
let cacheData = window.cacheData = {}
export default {
  get (key) {
    // console.log('cacheData', cacheData)
    return cacheData[key] || null
  },
  set (key, value) {
    cacheData[key] = value
  },
  del (key) {
    delete cacheData[key]
  }
}
