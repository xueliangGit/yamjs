/*
 * @Author: xuxueliang
 * @Date: 2020-07-31 15:32:13
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-14 16:06:52
 */
// 主要为mixin服务
import { forEach } from '../utils/index'
import { addGlobalLife, addLifeCycle } from './lifeCycle'
const baseConfig = {
  $data: [],
  extend: {}
}
const _localConfig = {}
function _getMixinConfig (cId = 'x') {
  return _localConfig[cId] || (_localConfig[cId] = Object.assign({}, baseConfig))
}
export default function mixin (config, context = null) {
  let contextData = _getMixinConfig(context ? context._cid : 'x')
  forEach(Object.keys(config), (v) => {
    if (!_addLifeCycle(v, config[v], context)) {
      _mixin(v, config[v], contextData)
    }
  })
}
function _mixin (v, conf, data) {
  if (v === '$data') {
    data.$data.push(conf)
  } else {
    data.extend[v] = conf
  }
}
export const getMixinConfig = (context) => {
  return context ? _getMixinConfig(context._cid) : _getMixinConfig()
}
function _addLifeCycle (v, config, context) {
  return context ? addLifeCycle.call(context, v, config) : addGlobalLife(v, config)
}
