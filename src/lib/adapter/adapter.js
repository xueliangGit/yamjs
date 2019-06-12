// 兼容 三方框架事件传递
export default {
  name: 'fnAdapter',
  install: function (terget) {
    terget.addPrototype('addWatch', function (names, fn = () => {}) {
      
    })
  }
}
