/*
 * @Author: xuxueliang
 * @Date: 2020-09-08 11:40:56
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 14:42:01
 */
'use strict'
import 'core-js/modules/es6.promise.js'
import 'core-js/modules/es6.object.assign'
import 'core-js/modules/es6.function.name'
import 'core-js/modules/web.dom.iterable'
// eslint-disable-next-line no-extend-native
Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce((acc, val) => Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val), [])
}
// require('core-js/shim')
// require('regenerator-runtime/runtime')
// require('core-js/fn/regexp/escape')
