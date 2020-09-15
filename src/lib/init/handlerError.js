/*
 * @Author: xuxueliang
 * @Date: 2020-09-14 16:08:33
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-15 16:39:58
 */

import { isFunc } from "../utils/index"

// 下一步做异常捕获
let context = []
export default function HandleError (e, from) {
  console.warn(e, from)
  context.forEach(v => v(e, from))
}
export const initHandleError = function (fn) {
  isFunc(fn) && context.push(fn)
}