// 一个状态管理工具
class State {
  constructor (target) {
    this.target = target
  }
  getState () {
  }
  update () {
    this.target.update()
  }
}
export default {
  name: 'state',
  install: function (target) {
    target.addAuto('state', function (context) {
      context.State = new State(context)
    })
  }
}
