var babel = require('@babel/core')
var t = require('@babel/types')
var h = require('../../components/goTopTem.html').toString()
const code = `import {uniq, extend, flatten, cloneDeep } from "lodash"`
const visitor = {
  Identifier (path) {
    console.log(path.node.name)
  }
}
const result = babel.transform(`${h}`, {
  plugins: [{
    visitor: visitor
  }]
})
