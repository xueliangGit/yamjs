// 兼容react
export default {
  name: 'reactAdapter',
  install: function (target) {
    target.addPrototype('setState', function (obj) {
      if (!this.state) {
        this.state = {}
      }
      Object.assign(this.state, obj)
      this.update()
    })
    target.addPrototype('initReact', function (context) {
      // 添加 卸载时触发的方法
      var that = this
      if (context.componentWillUnmount) {
        context._componentWillUnmount = context.componentWillUnmount
        context.componentWillUnmount = function () {
          context._componentWillUnmount()
          //
          that.__beforeDisconnectedCallback()
          that.__disconnectedCallback()
        }
      } else {
        context.componentWillUnmount = function () {
          //
          that.__beforeDisconnectedCallback()
          that.__disconnectedCallback()
        }
      }
    })
  }
}
