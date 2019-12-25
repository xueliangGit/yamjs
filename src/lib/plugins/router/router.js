/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-09-16 15:42:49
 */
let changeFnCache = []
export default function RouterFactory (conf) {
  // 一个状态管理工具
  let routerCache = {
    history: []
  }
  /**
   * 需要在一个地方统一声明一些状态，在组件内部都可以使用
   *
   * */
  class Router {
    constructor (routerConf = {}) {
      this.name = 'Router'
      this.config = {}
      this.pathConf = {}
      this.Conf = Object.assign({ mode: 'hash' }, routerConf.conf)
      this.init(routerConf.routes)
      let routerView = document.getElementsByTagName('router-view')[0]
      changeFnCache.push(e => {
        let current = getCurrent()
        this.current = Object.assign(
          {},
          this.pathConf[current.path] || {},
          current
        )
        routerView && routerView.updateView && routerView.updateView(e)
      })
    }
    init (option) {
      var type_ = typeof option
      if (type_ === 'object') {
        init(this, option)
      } else {
        console.warn(
          new Error(
            '使用state.setConfig函数去设置页面跳转需要 传入{}对象，而不是' +
              type_
          )
        )
      }
    }
    push (routeObj) {
      if (routeObj.name) {
        // 修复传入参数错误的情况
        if (!this.config[routeObj.name]) {
          console.warn(`
          ${routeObj} 没有对应的页面，请检查
          `)
          return
        }
        let _url = this.config[routeObj.name].path
        if (routeObj.query) {
          _url += '?' + memgerQuery(routeObj.query)
        }
        console.log(_url)
        routerCache.history.push(routeObj)
        $beforeRouterEnter()
        window.location.href = '#' + _url
      } else if (routeObj.path) {
        routerCache.history.push(routeObj)
      }
    }
    pop () {
      routerCache.history.shift()
      window.history.go(-1)
    }
    back () {
      this.pop()
    }
    add (context) {
      context.$router = this
      return this
    }
    install (target) {
      target.addAuto('router', context => {
        context.$router = this
      })
    }
  }
  return new Router(conf)
}
function getCurrent () {
  var pathnameArray = (window.location.href.split('#')[1] || '').split('?')
  var query = pathnameArray[1]
  var path = pathnameArray[0]
  return { query: getParamJson(query), path: getAbsPath(path) }
}
function getParamJson (queryStr) {
  if (!queryStr) {
    return {}
  }
  let arry = queryStr.split('&')
  let params = {}
  for (var i = 0; i < arry.length; i++) {
    let _param = arry[i].split('=')
    params[_param[0]] = _param[1] || null
  }
  return params
}
function memgerQuery (obj) {
  let params = []
  Object.keys(obj).forEach(v => {
    params.push(`${v}=${obj[v]}`)
  })
  return params.join('&')
}
function getAbsPath (path) {
  if (~path.indexOf('?')) {
    path = path.split('?')[0] || ''
  }
  if (path.charAt(0) !== '/') {
    path = '/' + path
  }
  if (path.length < 2) {
    return path
  } else if (path.charAt(path.length - 1) === '/') {
    return path.substr(0, path.length - 1)
  }
  return path
}
function setCurrent (context, obj) {
  context.current = obj
}
function init (context, option) {
  // 获取本页页面名字
  let current = (context.current = getCurrent())
  console.log('current', current)
  /* 写入页面简单路由配置到缓存 */
  option.forEach(v => {
    if (v.name) {
      v.path = getAbsPath(v.path || '/')
      context.pathConf[v.path] = context.config[v.name] = {
        path: v.path,
        component: v.component
      }
      if (current.path === v.path) {
        // 当前页面
        setCurrent(context, Object.assign({}, v, current))
      }
    } else {
      console.warn(`
    router:
      ${v}
      缺少【name】值
      `)
    }
  })
  if (!context.current) {
    warnInfo(current)
  }
}
function warnInfo (current) {
  console.warn(`
  router:
    请检查传入的参数
    ${JSON.stringify(current)}
    ，没有找到匹配的组件
  `)
}
function _hashChangFun (e) {
  changeFnCache.forEach(v => v(e))
  console.log('change over')
}
window.addEventListener('hashchange', _hashChangFun)
// 添加声明周期 routerEnter，routerLeave
function $beforeRouterEnter () {}
