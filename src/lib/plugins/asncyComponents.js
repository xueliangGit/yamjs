/*
 * @Author: xuxueliang
 * @Date: 2020-03-08 01:42:47
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-29 17:06:26
 */
export default function testResult (url) {
  this.syncComponents = true
  // let result = require(url)
  // console.log(result)
  // return result
  return () => url
}
