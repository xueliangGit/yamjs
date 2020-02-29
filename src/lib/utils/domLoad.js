/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-29 11:47:51
 */
import { creatMutationObserser } from './index'
let domIsLoaded = false
let domFnCache = []

function addObserse () {
  // 在dom变化时需要从新渲染
  let isRun = null
  creatMutationObserser(document, (option) => {
    if (option.type === 'childList') {
      if (option.addedNodes.length) {
        if (isRun) {
          clearTimeout(isRun)
          isRun = null
        }
        isRun = setTimeout(() => {
          runDomfn()
          isRun = null
        }, 100)
      }
    }
  }, {
    'childList': true,
    'subtree': true
  })
}
function domOnLoad (fn) {
  if (typeof fn !== 'function') return
  domFnCache.push(fn)
  if (domIsLoaded) {
    runDomfn(domFnCache.length - 1, false)
  }
}
document.onreadystatechange = function () {
  if (document.readyState === 'complete') { // 当页面加载状态为完全结束时进入
    console.log('document is onload')
    domIsLoaded = true
    if (domFnCache.length) {
      setTimeout(function () {
        runDomfn()
        addObserse()
      }, 50)
    }
  }
  // if (document.readyState === 'interactive') { // DOM构建了就会执行，先与complete执行
  //   // console.log('document is interactive ,so DOM obj is ' + document.getElementById('img1'))
  // }
}
function runDomfn (i = 0, all = true) {
  if (domFnCache[i]) {
    domFnCache[i]()
    if (all) {
      runDomfn(++i)
    }
  }
}
export default domOnLoad
