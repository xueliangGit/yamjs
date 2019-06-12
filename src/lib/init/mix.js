import { createElementJson } from '../vDom/createElement'
import { forEach } from '../utils'
// 注解
// 预留字段
var reserved = 'constructor __createElement connectedCallback $connectedCallback disconnectedCallback $disconnectedCallback $config $data mutation render $beforeCreate $created $beforeMount $mounted $beforeDestroyed $destroyed $beforeUpdate $updated renderAt emit emitProp __connectedCallback __disconnectedCallback __beforeDisconnectedCallback _config __isWillupdate'
// 安装的扩展
var installed = []
window.parant = []
export function Mix () {
  return function (Target) {
    Target.__createElement = function (tagName, props = {}, ...childNodes) {
      // childNodes = childNodes.length ? childNodes : undefined
      return createElementJson(tagName, props, childNodes)
    }
    Target.use = (Config) => {
      /**
       * obj={
       *  name:'',
       * install:function(baseConpoment){}
       * }
       *  */
      let { name, install, needs } = Config
      if (!name) {
        console.warn(`
            必须填写name
          `)
        return false
      }
      if (typeof install !== 'function') {
        console.warn(`
            install 必须是个方法
          `)
        return false
      }
      if (needs) {
        if (typeof needs === 'string') {
          needs = [needs]
        }
        forEach(needs, v => {
          if (!installed.includes(v)) {
            console.info(`%c 该扩展【 ${name} 】需要依赖 【${v}】扩展`, 'background:#ff0')
          }
        })
      }
      if (installed.includes(name)) {
        console.info(`已经注册此扩展:${name}`)
      } else {
        installed.push(name)
        install(addPrototype(Target, name))
      }
    }
  }
}
function addPrototype (Target, name) {
  return {
    /**
     * @summary 获取原有的方法
     * @param {type} 方法名
     * @return 方法
     */
    getPrototype (type) {
      return Target.prototype[type] || null
    },
    addPrototype (type, fn, isCovered = false) {
      if (reserved.includes(type) || Target.prototype[type]) {
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
    }
  }
}
