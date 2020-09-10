/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-07 14:53:31
 */
import { $ComponentSymbol, $vdomSymbol, $closestParentSymbol } from '../symbol/index'
import { forEach, isFunc } from '../utils/index'
import { syncSlotComponentsState } from '../helpers/slotHelper'
// import { runOnReadyElmFn } from '../utils/componentUtil'

let lifeCycleCallFn = {}
class CreatLifeCycleCall {
  constructor(context) {
    this._cid = context._cid
    this.target = context
    lifeCycleCallFn[context._cid] = {}
  }
  add (lcName, fn) {
    let fns = lifeCycleCallFn[this._cid];
    (fns[lcName] || (fns[lcName] = [])).push(fn)
  }
  get (lcName) {
    return lifeCycleCallFn[this._cid][lcName]
  }
  run (lcName) {
    let fns = lifeCycleCallFn[this._cid]
    forEach(fns[lcName], v => v.call(this.target))
  }
}
const lifeCycle = {
  // 初始化前
  beforeInit (context) {
    _run(context, '$beforeInit')
  },
  // 创建实例之前
  beforeCreate (context) {
    _run(context, '$beforeCreate')
  },
  // 创建实例
  created (context) {
    _run(context, '$created')
  },
  // 挂在数据之前
  beforeMount (context) {
    _run(context, '$beforeMount')
  },
  // 挂在数据
  mounted (context) {
    _run(context, '$mounted')
    // runOnReadyElmFn(context.elm)
    if (!context[$closestParentSymbol]) {
      if (context.elm && context.elm.onReady) {
        isFunc(context.elm.onReady) && context.elm.onReady()
      } else {
        Object.defineProperty(context.elm, 'onReady', {
          configurable: false,
          enumerable: true,
          get: function proxyGetter () {
            return function () { }
          },
          set: function proxySetter (newVal) {
            isFunc(newVal) && newVal.call(context.elm)
          }
        })
      }
    }
  },
  // 更新之前
  beforeUpdate (context) {
    _run(context, '$beforeUpdate')
  },
  // 更新之后
  updated (context) {
    return _run(context, '$updated') || void 0
  },
  // 即将销毁
  beforeDestroy (context) {
    if (context.$router && context.$router.keepLive) return
    _run(context, '$beforeDestroy')
  },
  // 销毁后
  destroyed (context) {
    if (context.$router && context.$router.keepLive) return
    _run(context, '$destroyed')
    syncSlotComponentsState(context.elm, false)
    context[$ComponentSymbol] = null
    context[$vdomSymbol] = null
    // context.elm[$ComponentSymbol] = null
    context.elm.isInited = false
    context.elm = null
    context.$dom = null
    context.isDestoryed = true
    context.mutation = null
    context.Destory = null
    context.ChildComponentsManage = null
  }
}
const lifeCycleArray = Object.keys(lifeCycle).map(v => '$' + v)
let cacheLifeCycCleFn = {}
function _run (context, name) {
  try {
    if (cacheLifeCycCleFn && cacheLifeCycCleFn[name]) {
      forEach(cacheLifeCycCleFn[name], (v) => v.call(context))
    }
    if (context._lifeCycleCall) {
      context._lifeCycleCall.run(name)
    }
  } catch (e) {

  }
  return context[name] && isFunc(context[name]) ? context[name]() : undefined
}
// 增加全局的生命周期调用函数
export let addGlobalLife = function (lifeCycleName, fn) {
  // if (lifeCycleName[0] !== '$') {
  //   lifeCycleName = '$' + lifeCycleName
  // }
  if (~lifeCycleArray.indexOf(lifeCycleName)) {
    (cacheLifeCycCleFn[lifeCycleName] = cacheLifeCycCleFn[lifeCycleName] || []).push(fn)
    return true
  }
  return false
}
// 增加单个单例的生命周期作用
export function addLifeCycle (lifeCycle, fn) {
  if (~lifeCycleArray.indexOf(lifeCycle)) {
    if (isFunc(fn)) {
      if (!this._lifeCycleCall) {
        this._lifeCycleCall = new CreatLifeCycleCall(this)
      }
      this._lifeCycleCall.add(lifeCycle, fn)
      return true
      // (context.lifeCycleCall.add(lifeCycle + '_callfn'] = context.lifeCycleCall[lifeCycle + '_callfn'] || []).push(fn)
    } else {
      console.warn(`
      要添加的组件周期回调必须是函数
      `)
    }
  }
  return false
}
export default lifeCycle
