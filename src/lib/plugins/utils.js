/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 18:00:19
 */
export const getCss = (curEle, attr) => {
  var val = null
  if ('getComputedStyle' in window) {
    val = window.getComputedStyle(curEle, null)[attr]
  } else {
    val = curEle.currentStyle[attr]
  }
  // console.log(val)
  return val
}
