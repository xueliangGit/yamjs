import Watcher from '../watcher'
// import { creat } from '../vDom/index'
// 缓存当前执行input事件的input dom对象
let $elm
let timer = null
// 指令处理集合
const CompilerUtils = {
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html')
  },

  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text')
  },
  fixText: function (vm, node, reg, text) {
    replaceTxt(vm, node, reg, text)
  },
  for: function (node, vm, exp) {
    this.bind(node, vm, exp, 'for')
  },

  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model')
    // model 操作
    let self = this
    let val = this._getVmVal(vm, exp)
    // 监听input事件
    node.addEventListener('input', function (e) {
      let newVal = e.target.value
      $elm = e.target

      if (val === newVal) return

      clearTimeout(timer)
      timer = setTimeout(function () {
        self._setVmVal(vm, exp, newVal)
        val = newVal
      })
    })
  },

  bind: function (node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater']
    if (dir !== 'for') {
      let val = this._getVmVal(vm, exp)
      updaterFn && updaterFn(node, val)
      // eslint-disable-next-line no-new
      new Watcher(vm, exp, function (value, oldValue) {
        updaterFn && updaterFn(node, value, oldValue)
      })
    } else {
      let target = exp.split('in')[1].trim()
      let val = this._getVmVal(vm, target)
      // let key = node.getAttribute('x-key') || 'index'
      updaterFn && updaterFn(node, val)
      // creat(node, val)
      console.log(node)
      // eslint-disable-next-line no-new
    }
  },

  eventHandler: function (node, vm, exp, dir) {
    let eventType = dir.split(':')[1]
    // let fn = vm.$options.methods && vm.$options.methods[exp]
    let fn = vm && vm[exp]

    if (eventType && fn) {
      // fn.bind(vm) 将作用域指向vm
      node.addEventListener(eventType, fn.bind(vm), false)
    }
  },

  _getVmVal: function (vm, exp) {
    let val = vm
    // 处理 运算符
    let exps = exp.split('.')
    exps.forEach(key => {
      key = key.trim()
      if (!key) {
        return ''
      }
      val = val[key]
    })
    // console.log('exp', val['attributes.msg'], exp, vm[`${exp}`])
    // return val[`${exp}`]
    return val
  },
  _getForVmVal: function (vm, exp) {
    let val = vm
    // 处理 运算符
    console.log(exp)
    let exps = exp.split('.')
    exps.forEach(key => {
      if (!key) {
        return ''
      }
      val = val[key]
    })
    // return val[`${exp}`]
    return val
  },
  _setVmVal: function (vm, exp, newVal) {
    let val = vm
    let exps = exp.split('.')

    exps.forEach((key, index) => {
      key = key.trim()
      if (index < exps.length - 1) {
        val = val[key]
      } else {
        val[key] = newVal
      }
    })
  }
}

// 指令渲染集合
const updater = {
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value === 'undefined' ? '' : value
  },
  textUpdater: function (node, value) {
    console.log('node', node)
    node.textContent = typeof value === 'undefined' ? '' : value
  },
  modelUpdater: function (node, value, oldValue) {
    if ($elm === node) {
      return false
    }
    $elm = undefined
    node.value = typeof value === 'undefined' ? '' : value
  },
  forUpdater: function (node, value, oldValue) {
    /** 需要 */
    node.textContent = typeof value === 'undefined' ? '' : value
  }
}
// eslint-disable-next-line no-unused-vars
function replaceTxt (vm, node, reg, txt, isWatched) {
  node.textContent = txt.replace(reg, (matched, placeholder) => {
    console.log('placeholder', placeholder, reg, txt, isWatched) // 匹配到的分组 如：song, album.name, singer...
    if (!isWatched) {
      // eslint-disable-next-line no-new
      new Watcher(vm, placeholder, () => { replaceTxt(vm, node, reg, txt, true) }) // 监听变化，进行匹配替换内容
    }
    return placeholder.split('.').reduce((val, key) => {
      return val[key]
    }, vm)
  })
};
export { CompilerUtils, updater }
