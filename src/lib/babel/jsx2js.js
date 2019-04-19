var generator = require('@babel/generator').default
function buildAttrsCall (attribs, t) {
  let properties = []
  attribs.forEach(attr => {
    let name = attr.name.name
    let value = attr.value
    properties.push(t.objectProperty(t.stringLiteral(name), value))
  })
  return t.ObjectExpression(properties)
}
const createVisitor = (t) => {
  const visitor = {}
  visitor.JSXElement = {
    // 为什么是exit，因为jsx是DFS而不是BFS;
    exit (path, file) {
      let openingPath = path.get('openingElement')
      let children = t.react.buildChildren(openingPath.parent)
      let tagNode = t.identifier(openingPath.node.name.name)
      // 创建React.createElement
      let createElement = t.memberExpression(t.identifier('React'), t.identifier('createElement'))
      // 创建属性
      let attribs = buildAttrsCall(openingPath.node.attributes, t)
      // 创建React.createElement(tag, attrs, ...chidren)表达式
      let callExpr = t.callExpression(createElement, [tagNode, attribs, ...children])
      path.replaceWith(t.inherits(callExpr, path.node))
    }
  }
  return {
    visitor,
    // 配置jsx解析器
    inherits: () => {
      return {
        manipulateOptions (opts, parserOpts) {
          parserOpts.plugins.push('jsx')
        }
      }
    }
  }
}
module.exports = function (babel) {
  const t = babel.types
  return createVisitor(t)
}
