/*
 * @Author: xuxueliang
 * @Date: 2019-07-03 16:00:17
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 20:08:31
 */
// not use laoder
import Yam, { Component } from './Yam'
import tools from './plugins/tools'
import { getStyleStr } from './utils/index'
Yam.use(tools)
Yam._gSS = getStyleStr
export default Yam
export { Component }
// fix 外环境组件嵌套组件
// ok1 样式只是加载一次
// ok2 完成 基类可有 扩展
// ok3 完成 setTimeOut ，setInterval 封装
// FIX BUG 来回切换会出问题 --
// FIX slot 渲染
// FIX shadow 模式 下slot
// TODO 0 处理解析出来的父级元素 --
// TODO 1 完成diff --
// TODO 1 添加路由
// TODO 2 添加增加减少动画
// TODO 3 添加使用注解去配置组件 --
// TODO 4 父级调用子组件方法，子组件调用父组件方法，父传值到子（两种模式） --
// TODO 5 增加slot
// var iframe = null
// function getFraem () {
//   if (iframe) {
//     return iframe
//   } else {
//     iframe = document.createElement('img')
//     iframe.onload = function (e) {
//       console.log('loaded Success', e)
//     }
//     iframe.onerror = function (e) {
//       console.log('loaded error')
//     }
//     document.body.append(iframe)
//     return iframe
//   }
// }
// function setI (src) {
//   getFraem().src = src
// }
// 针对IE 做深层次兼容处理
