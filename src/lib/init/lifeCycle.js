import { $ComponentSymbol, $vdomSymbol } from '../symbol/index'
// import { runOnReadyElmFn } from '../utils/componentUtil'
export default {
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
    if (context.elm && context.elm.onReady) {
      typeof context.elm.onReady === 'function' && context.elm.onReady()
    } else {
      Object.defineProperty(context.elm, 'onReady', {
        configurable: false,
        enumerable: true,
        get: function proxyGetter () {
          return function () {}
        },
        set: function proxySetter (newVal) {
          typeof newVal === 'function' && newVal.call(context.elm)
        }
      })
    }
  },
  // 更新之前
  beforeUpdate (context) {
    _run(context, '$beforeUpdate')
  },
  // 更新之后
  updated (context) {
    _run(context, '$updated')
  },
  // 即将销毁
  beforeDestroyed (context) {
    _run(context, '$beforeDestroyed')
  },
  // 销毁后
  destroyed (context) {
    _run(context, '$destroyed')
    context[$ComponentSymbol] = null
    context[$vdomSymbol] = null
    context.elm = null
    context.$dom = null
    context.isDestoryed = true
    context.mutation = null
    context.Destory = null
    context.ChildComponentsManage = null
  }
}
function _run (context, name) {
  context[name] && typeof context[name] === 'function' && context[name]()
}
