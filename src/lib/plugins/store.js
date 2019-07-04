export default function StoreFactory (conf) {
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
  /**
 * 需要在一个地方统一声明一些状态，在组件内部都可以使用
 *
 * */
  class Store {
    constructor (conf) {
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
    }
    commit (fnNameOrstate, ...params) {
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
    }
    install (target) {
      target.addAuto('store', (context) => {
        context.$store = this.add(context)
      })
    }
  }
  return new Store(conf)
}
