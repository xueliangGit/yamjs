import BaseComponent from '../lib/BaseComponent'
import animate from '../lib/plugins/animate'
import router from '../lib/plugins/router'
BaseComponent.use(animate)
BaseComponent.use(router)
