// 兼容react
export default {
  name: 'reactAdapter',
  install: function (terget) {
    terget.addPrototype('setState', function (obj) {
      if (!this.state) {
        this.state = {}
      }
      Object.assign(this.state, obj)
      this.update()
    })
  }
}
