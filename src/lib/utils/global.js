/*
 * @Author: xuxueliang
 * @Date: 2019-08-08 18:17:44
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-16 14:29:14
 */
let global = window || {
  MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || function () { }
}
let doc = document || {

}

export {
  global,
  doc
}
