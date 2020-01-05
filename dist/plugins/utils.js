export const getCss = (curEle, attr) => {
  var val = null
  if ('getComputedStyle' in window) {
    val = window.getComputedStyle(curEle, null)[attr]
  } else {
    val = curEle.currentStyle[attr]
  }
  console.log(val)
  return val
}
