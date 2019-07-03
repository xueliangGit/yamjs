const StoreFactory = function (conf) {
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

      }
    })
  }
  /**
 * 需要在一个地方统一声明一些状态，在组件内部都可以使用
 *
 * */
  class Store {
    constructor (conf) {
      this.do = storeData.isBelone
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
    }
    commit (fnNameOrstate, ...params) {
      if (storeData.methods[fnNameOrstate]) {
        storeData.methods[fnNameOrstate](storeData.state, ...params)
      } else if (storeData.state[fnNameOrstate]) {
        storeData.state[fnNameOrstate] = params[0]
      }
      Store.update()
    }
    add (target) {
      storeData.isAdded[target._eid] = target
      target.addDestory(function () {
        delete storeData.isAdded[target._eid]
      })
      return this
    }
    static update () {
      Object.keys(storeData.isAdded).forEach(v => {
        storeData.isAdded[v].update()
      })
    // this.target.update()
    }
  }
  return new Store(conf)
}

export default function (obj) {
  return new StoreFactory(obj)
}
