/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-06-25 13:56:05
 */
let cacheData = {}
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
