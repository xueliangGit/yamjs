import Router from '../lib/plugins/router/router'
export default new Router({ 
  routes: [{
    name: 'index',
    path: '/',
    component: 'my-timer'
  },
  {
    path: '/goTop',
    component: 'go-top',
    name: 'gotop'
  },
  {
    path: '/myTimer',
    component: 'my-timer',
    name: 'myTimer'
  }]
})
