import BaseComponent from '../lib/index'
import animate from '../lib/plugins/animate'
import router from '../lib/plugins/router'
import reactAdapter from '../lib/plugins/reactAdapter'
BaseComponent.use(animate)
BaseComponent.use(router)
BaseComponent.use(reactAdapter)
