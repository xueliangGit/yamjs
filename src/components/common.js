import Owl from '../lib/index'
import animate from '../lib/plugins/animate'
import router from '../lib/plugins/router'
import reactAdapter from '../lib/plugins/reactAdapter'
Owl.use(animate)
Owl.use(router)
Owl.use(reactAdapter)
