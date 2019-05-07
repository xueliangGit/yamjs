// import Watcher from '../watcher'
import { CompilerUtils } from '../dom'

class Compiler {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)

    if (this.$el) {
      this.$fragment = this.nodeFragment(this.$el)
      this.compileElement(this.$fragment)
      this.$el.appendChild(this.$fragment)
    }
  }

  nodeFragment (el) {
    let fragment = document.createDocumentFragment()
    let child

    // eslint-disable-next-line no-cond-assign
    while (child = el.firstChild) {
      fragment.appendChild(child)
      console.log(child)
    }
    return fragment
  }

  compileElement (el) {
    let self = this
    let childNodes = el.childNodes;

    [].slice.call(childNodes).forEach(node => {
      let text = node.textContent
      let reg = /\{\{(.*?)\}\}/g

      if (self.isElementNode(node)) {
        // 如果是element节点
        self.compile(node)
      } else if (self.isTextNode(node) && reg.test(text)) {
        // 如果是text节点
        console.log(RegExp.$1)
        // replaceTxt(this.$vm, node, reg, text)
        self.compileText(this.$vm, node, reg, text)
      }
      // 解析子节点包含的指令
      if (node.childNodes && node.childNodes.length) {
        self.compileElement(node)
      }
    })
  }

  compile (node) {
    let self = this
    let nodeAttrs = node.attributes;

    [].slice.call(nodeAttrs).forEach(attr => {
      let attrName = attr.name
      let dir = attrName.substring(2)// 获取x-之后的内容

      if (self.isDirective(attrName)) {
        let exp = attr.value
        if (self.isEventDirective(dir)) { // 判断是否是x-on 结构（x-on:）；即绑定事件结构
          CompilerUtils.eventHandler(node, self.$vm, exp, dir)
          node.removeAttribute(attrName)
        } else {
          // eslint-disable-next-line no-unused-expressions
          if (CompilerUtils[dir]) {
            CompilerUtils[dir](node, self.$vm, exp)
            node.removeAttribute(attrName)
          }
        }
      }
    })
  }

  compileText (vm, node, reg, text) {
    CompilerUtils.fixText(vm, node, reg, text)
  }

  isElementNode (node) {
    return node.nodeType === 1
  }

  isTextNode (node) {
    return node.nodeType === 3
  }

  isDirective (attr) {
    return attr.indexOf('x-') === 0
  }

  isEventDirective (dir) {
    return dir.indexOf('on') === 0
  }
}
export default Compiler
