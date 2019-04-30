import BaseComponent from './BaseComponent'
// eslint-disable-next-line no-extend-native
Array.prototype.flat = Array.prototype.flat || function () {
  return this.reduce((acc, val) => Array.isArray(val) ? acc.concat(val.flat()) : acc.concat(val), [])
}
export default BaseComponent
// TODO 1 添加路由
// TODO 2 添加增加减少动画
// TODO 3 添加使用注解去配置组件
