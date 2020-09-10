/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-09 15:37:13
 */
import { creatMutationObserser } from './index'
let domIsLoaded = false
let domFnCache = []

function addObserse () {
  // 在dom变化时需要从新渲染
  let isRun = null
  creatMutationObserser(document.body, (option) => {
    if (option.type === 'childList') {
      console.log(option)
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
if (document.readyState === 'complete') {
  domComplete()
} else {
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') { // 当页面加载状态为完全结束时进入
      domComplete()
    }
    // if (document.readyState === 'interactive') { // DOM构建了就会执行，先与complete执行
    //   // console.log('document is interactive ,so DOM obj is ' + document.getElementById('img1'))
    // }
  }
}
function domComplete () {
  console.log('document is onload')
  domIsLoaded = true
  if (domFnCache.length) {
    setTimeout(function () {
      runDomfn()
      addObserse()
    }, 50)
  }
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
