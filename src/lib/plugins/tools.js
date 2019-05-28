import { getCss } from './utils'

export default {
  name: 'tools',
  install: function (terget) {
    terget.addPrototype('getCss', function (attr, elm) {
      console.log(attr)
      return getCss(elm || this.elm, attr)
    })
  }
}
