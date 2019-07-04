import Yam from '../lib/index'
import animate from '../lib/plugins/animate'
import router from '../lib/plugins/router'
import reactAdapter from '../lib/plugins/reactAdapter'
import store from './store'
Yam.use(store)
Yam.use(animate)
Yam.use(router)
Yam.use(reactAdapter)
