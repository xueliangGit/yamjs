/*
 * @Author: xuxueliang
 * @Date: 2019-08-01 15:22:48
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-07-31 17:41:54
 */
// import './ast'
import Yam from '../lib/index'
// import animate from '../lib/plugins/animate'
// import router from '../lib/plugins/router/router'
// import reactAdapter from '../lib/plugins/reactAdapter'
import store from './store'
import router from './router'
Yam.setConfig({ isDev: true })
console.log(store)
// Yam.use(store)
// Yam.use(animate)
Yam.use(router)
// Yam.use(reactAdapter)
Yam.mixin({
  $created () {
    console.log('Yam.mixin:$created')
  }
})
