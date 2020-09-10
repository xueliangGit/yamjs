/*
 * @Author: xuxueliang
 * @Date: 2020-03-10 16:18:57
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-08 11:10:17
 */
import Yam, { Component } from './Yam'
import tools from './plugins/tools'
import { getStyleStr } from './utils/index'
Yam.use(tools)
Yam._gSS = getStyleStr
export default Yam
export { Component }