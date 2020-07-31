/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-07-31 17:43:07
 */

export default function StoreFactory (conf) {
  // 一个时间记录器
  let timeTool = {
    commits: []
  }
  let replayNums = -1
  // 一个状态管理工具
  let storeData = {
    isBelone: 'yamjs',
    state: {},
    methods: {},
    isAdded: {}
  }
  function proxy (ori, key) {
    Object.defineProperty(ori, key, {
      configurable: false,
      enumerable: true,
      get: function proxyGetter () {
        return storeData.state[key]
      },
      set: function proxySetter (newVal) {
        // 不进行赋值
      }
    })
  }
  function _commit (fnNameOrstate, ...params) {
    if (storeData.methods[fnNameOrstate]) {
      if (storeData.methods[fnNameOrstate](storeData.state, ...params) !== false) {
        Store.update()
      }
    } else if (storeData.state[fnNameOrstate]) {
      if (storeData.state[fnNameOrstate] !== params[0]) {
        storeData.state[fnNameOrstate] = params[0]
        Store.update()
      }
    }
  }
  /**
 * 需要在一个地方统一声明一些状态，在组件内部都可以使用
 *
 * */
  class Store {
    constructor(conf) {
      this.do = storeData.isBelone
      this.name = 'store'
      this.mix(conf)
    }
    mix (conf) {
      if (conf.state) {
        Object.keys(conf.state).forEach(v => {
          storeData.state[v] = conf.state[v]
          if (this[v] === undefined) {
            proxy(this, v)
          }
        })
      }
      if (conf.methods) {
        Object.keys(conf.methods).forEach(v => {
          storeData.methods[v] = conf.methods[v]
        })
      }
      if (conf.children) {
        // 子组件也进行
      }
    }
    commit (fnNameOrstate, ...params) {
      timeTool.commits.push([fnNameOrstate, ...params])
      _commit(fnNameOrstate, ...params)
    }
    add (target) {
      storeData.isAdded[target._eid] = target
      target.addDestory(function () {
        delete storeData.isAdded[target._eid]
      })
      target.$store = this
      return this
    }
    static update () {
      Object.keys(storeData.isAdded).forEach(v => {
        storeData.isAdded[v].update()
      })
    }
    install (target) {
      // target.add
      target.addAuto('store', (context) => {
        target.$store = this.add(context)
      })
    }
    apply (context) {
      console.log('apply', context)
      context.$store = this.add(context)
    }
    // 重播
    replay () {
      if (++replayNums >= timeTool.commits.length) {
        // console.log('store replay end')
        replayNums = -1
      } else {
        _commit(...timeTool.commits[replayNums])
      }
    }
    // 复位
    reset () {
      if (replayNums === -1) return
      _commit(...timeTool.commits[timeTool.commits.length - 1])
      replayNums = -1
    }
  }
  return new Store(conf)
}
