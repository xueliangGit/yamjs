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
