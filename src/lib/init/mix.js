/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-03 13:10:21
 */
import { _createElementJson } from '../vDom/createElement'
import { forEach, isFunc, isStr } from '../utils/index'
import lifeCycle, { addGlobalLife } from './lifeCycle'
import mixin from './_mixin'
let lifeCycleArray = Object.keys(lifeCycle).map(v => '$' + v)
// 注解
// 预留字段
var reserved = 'constructor __createElement connectedCallback $connectedCallback disconnectedCallback $disconnectedCallback $config $data mutation render $beforeCreate $created $beforeMount $mounted $beforeDestroy $destroyed $beforeUpdate $updated renderAt emit emitProp __connectedCallback __disconnectedCallback __beforeDisconnectedCallback _config __isWillupdate'
// 安装的扩展
var installed = []
window.parant = []
// 兼容react 的jsx
window.React = window.React || { createElement: _createElementJson }
export function Mix () {
  return function (Target) {
    Target.__createElement = _createElementJson
    Target.setConfig = (config = {}) => {
      addPrototype(Target, 'isDev').addAuto('isDev', function (context) {
        context.env = config.isDev ? 'development' : 'pro'
      })
      Target.isDev = !!config.isDev
    }
    Target.use = (Config = {}) => {
      /**
       * obj={
       *  name:'',
       * install:function(baseConpoment){}
       * }
       *  */
      let { name, needs } = Config
      if (!name) {
        console.warn(`
            必须填写name
          `)
        return false
      }
      if (!isFunc(Config.install)) {
        console.warn(`
            install 必须是个方法
          `)
        return false
      }
      if (needs) {
        if (isStr(needs)) {
          needs = [needs]
        }
        forEach(needs, v => {
          if (!~installed.indexOf(v)) {
            console.info(`%c 该扩展【 ${name} 】需要依赖 【${v}】扩展`, 'background:#ff0')
          }
        })
      }
      if (~installed.indexOf(name)) {
        console.info(`已经注册此扩展:${name}`)
      } else {
        installed.push(name)
        Config.install(addPrototype(Target, name))
      }
    }
    Target.mixin = (config = {}) => {
      mixin(config)
    }
  }
}
function addPrototype (Target, name) {
  return {
    mixin (config = {}) {
      mixin(config)
    },
    mixinPrototype (config = {}) {
      forEach(Object.keys(config), (v) => {
        this.addPrototype(v, config[v])
      })
    },
    /**
     * @summary 获取原有的方法
     * @param {type} 方法名
     * @return 方法
     */
    getPrototype (type) {
      return Target.prototype[type] || null
    },
    /**
     * @summary 设置的方法
     * @param {type} 方法名
     */
    addPrototype (type, fn, isCovered = false) {
      if (~reserved.indexOf(type) || Target.prototype[type]) {
        if (isCovered) {
          console.info(`
          ============
          方法名：${type} 已存在，将被【${name}插件】中的 ${type} 方法覆盖
          该覆盖方法将影响到【${Target.prototype[type]['pluginsName'] ? Target.prototype[type]['pluginsName'] + ' 插件' : '框架'}】中使用，请谨慎处理
          ============
          `)
        } else {
          console.info(`
          方法名：${type} 已存在，请修改
          
          该方法是出现在 【${Target.prototype[type]['pluginsName'] ? Target.prototype[type]['pluginsName'] + ' 插件' : '框架'}】中，请修改方法再次安装使用
          `)
          return false
        }
      }
      Target.prototype[type] = fn
      Target.prototype[type]['pluginsName'] = name
    },
    /**
     * @summary 添加自动执行方法,将在mounted时
     * @param {type} 方法名
     */
    addAuto (name, fn, lifeCycle) {
      if (isFunc(fn)) {
        Target.prototype._autoDo = Target.prototype._autoDo || {}
        if (!Target.prototype._autoDo[name]) {
          Target.prototype._autoDo[name] = fn
        } else {
          console.info(`
          自动执行的方法名：${name} 已存在，请查看是否重复注册该方法
          `)
        }
      }
    },
    /**
     * @summary 给各个执行生命周期加方法
     * @param {lifeCycleName} 周期方法名
     * @param {fn} 回调方法
     */
    addGlobalLife (lifeCycleName, fn) {
      if (~lifeCycleArray.indexOf(lifeCycleName)) {
        if (isFunc(fn)) {
          addGlobalLife(lifeCycleName, fn)
        } else {
          console.warn(`
          要添加的组件周期回调必须是函数
          `)
        }
      } else {
        console.warn(`
        要添加的组件周期回调的参数[${lifeCycleName}]，只能是 ${lifeCycleArray.join(',')} ，请检查
        `)
      }
    }
  }
}
