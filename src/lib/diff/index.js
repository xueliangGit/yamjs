import nodeOps from './nodeOps'
// import { renderElement } from '../vDom/createElement'
import { isDef } from '../utils'
// import _ from 'lodash'
/**
* 核心patch算法，比较新旧node树的差异
*/
export default function patch (parentElm, vnode, oldVnode) {
  if (!oldVnode) {
    /* 当旧节点不存在，直接批量插入新节点树 */
    addVnodes(parentElm, null, vnode, -1)
  } else if (!vnode) {
    /* 当新节点不存在，直接批量删除旧节点树 */
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
  } else {
    // console.log(sameVnode(oldVnode, vnode))
    if (sameVnode(oldVnode, vnode)) {
      /* 当新旧节点相同，进行 patchVNode 操作，对比两个 node 节点 */
      // console.log('--------------------')
      // console.log(oldVnode, vnode)
      patchVnode(oldVnode, vnode)
    } else {
      /* 否则两个不同直接删除旧节点，插入新节点 */
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1)
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1)
    }
  }
}
/**
    * 在 parent 这个父节点下插入一个子节点
    * 如果指定了 ref 则插入到 ref 这个子节点前面
    */
function insert (parent, elm, ref) {
  if (parent) {
    if (ref) {
      if (ref.parentNode === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}

/**
    * 创建新的节点，tag 存在创建一个标签节点，否则创建一个文本节点
    * @param {object} vnode 当前节点virtual node对象
    * @param {object} parentElm 当前节点父节点
    * @param {object} vnode 当前节点的下一个节点，如果存在则表示将当前节点插入此节点（refElm）之前
    */
function createElm (vnode, parentElm, refElm) {
  insert(parentElm, vnode.render(), refElm)

  /* 存在tag，则创建标签，否则创建文本节点 */
  // if (vnode.tag) {
  //   insert(parentElm, nodeOps.createElement(vnode.tag), refElm)
  // } else {
  //   insert(parentElm, nodeOps.createTextNode(vnode.text), refElm)
  // }
}

/**
    * 批量创建新的节点
    * 参数对应
    * 当前节点父节点 refElm表示将节点插入在refElm节点之前 节点集合 开始下标 结束下标
    */
function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx) {
  if (startIdx > -1) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], parentElm, refElm)
    }
  } else {
    createElm(vnodes, parentElm, refElm)
  }
}

/**
    * 移除一个节点
    */
function removeNode (el) {
  const parent = nodeOps.parentNode(el)
  if (parent) {
    nodeOps.removeChild(parent, el)
  }
}

/**
    * 批量移除节点
    * 参数对应
    * 父节点 孩子节点集合 开始下标 结束下标
    */
function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]
    if (ch) {
      removeNode(ch.elm)
    }
  }
}

/**
* 比较两个节点是否是相同节点
*/
function sameVnode (a, b) {
  /* 判断key、tag、是否是注释节点、是否同时定义数据（或不定义）、同时满足当标签类型为 input 的时候 type 相同 */
  // return (
  //   a.key === b.key &&
  //     a.tagName === b.tagName &&
  //     // a.isComment === b.isComment &&
  //     // (!!a.data) === (!!b.data) &&
  //     sameInputType(a, b)
  // )
  return (
    a.key === b.key &&
    a.tagName === b.tagName &&
    sameInputType(a, b)
    // &&
    // sameProp(a.props, b.props) &&
    //   // a.isComment === b.isComment &&
    //   // (!!a.data) === (!!b.data) &&
    //   sameInputType(a, b)
  )
}
// function sameProp (a, b) {
//   let newProp = Object.keys(Object.assign({}, a, b))
//   if (!newProp) return true
//   for (let i = 0, keys; keys = newProp[i]; i++) {
//     // console.log(a[keys], b[keys], keys)
//     if (keys.indexOf('on') === 0) {
//       if (a[keys].toString() !== b[keys].toString()) {
//         return false
//       }
//     } else {
//       if (a[keys] !== b[keys]) {
//         return false
//       }
//     }
//   }
//   return true
// }
/**
* 比较两个节点是否同为 input 标签且 type 相同
*/
function sameInputType (a, b) {
  if (a.tagName !== 'input') return true
  let i
  const typeA = (i = a.data) && (i = i.attrs) && i.type
  const typeB = (i = b.data) && (i = i.attrs) && i.type
  return typeA === typeB
}

/**
    * 深度比较两个节点，当节点的孩子节点不等时，调用 updateChildren 操作孩子节点
    */
function patchVnode (oldVnode, vnode) {
  /* 两个节点全等，不做改变，直接 return  */
  if (oldVnode.text && oldVnode.text === vnode.text) {
    vnode.elm = oldVnode.elm
    return
  }

  /* 当新老节点都是静态节点且 key 都相同时，直接将 componentInstance 与 elm 从老 VNode 节点“拿过来”即可 */
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm
    vnode.componentInstance = oldVnode.componentInstance
    return
  }

  /* 取新老节点的 elm ，以及它们的孩子节点集合 */
  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.childNodes
  const ch = vnode.childNodes

  /* 新节点是文本节点，直接设置文本 */
  if (vnode.text) {
    /// / console.log(vnode, oldVnode)
    nodeOps.setTextContent(elm, vnode.text)
  } else {
    /* 新老节点的孩子节点都存在且不相等，调用 updateChildren 比较孩子节点 */
    // && (oldCh !== ch)
    if (oldCh && ch && ch.length) {
      updateChildren(elm, oldCh, ch)

      // if (ch.length === 1) {
      //   if (ch[0].text) {
      //     nodeOps.setTextContent(elm, ch[0].text)
      //   }
      // } else {
      //   updateChildren(elm, oldCh, ch)
      // }
    } else if (ch && ch.length) {
      /* 只有新节点的孩子节点存在 */
      /* 老节点为文本节点，则首先清除其节点文本内容  */
      if (oldVnode.text) nodeOps.setTextContent(elm, '')
      /* 批量添加新节点 */
      addVnodes(elm, null, ch, 0, ch.length - 1)
    } else if (oldCh && oldCh.length) {
      /* 只有旧节点的孩子节点存在，批量删除 */
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (oldVnode.text) {
      /* 当只有老节点是文本节点的时候，清除其节点文本内容 */
      nodeOps.setTextContent(elm, '')
    } else {
      // 那就是一样的elm
    }
  }
}

/**
* 比对两个节点的孩子节点集合
*/
function updateChildren (parentElm, oldCh, newCh) {
  /* 定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引 */
  /* 定义 oldStartVnode、newStartVnode、oldEndVnode 以及 newEndVnode 分别指向这索引对应的 VNode 节点 */
  let oldStartIdx = 0
  let newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  /* 定义当前面所有条件都不满足时，才使用的变量，具体后面分析 */
  let oldKeyToIdx, idxInOld, refElm

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    /* 当 oldStartVnode 不存在时，直接更新索引以及对应的节点指向 */
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (!oldEndVnode) {
      /* 当 oldEndVnode 不存在时，直接更新索引以及对应的节点指向 */
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      /* 当两个节点相同时，调用 patchVnode 并更新索引以及对应的节点指向 */
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      /* 当两个节点相同时，调用 patchVnode 并更新索引以及对应的节点指向 */
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      /* 当两个节点相同时，调用 patchVnode ，将 oldStartVnode 插入父节点最后并更新索引以及对应的节点指向 */
      patchVnode(oldStartVnode, newEndVnode)
      nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      /* 当两个节点相同时，调用 patchVnode ，将 oldStartVnode 插入父节点最前面并更新索引以及对应的节点指向 */
      patchVnode(oldEndVnode, newStartVnode)
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
    } else {
      /* 当以上条件都不满足，调用 createKeyToOldIdx 获取一个 key-索引 的 map 集合 */
      let elmToMove = oldCh[idxInOld]
      if (!oldKeyToIdx) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      /* 取出对应 key 的节点索引，不存在则为 null  */
      /// / console.log('oldKeyToIdx', oldKeyToIdx)
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null
      if (!idxInOld) {
        /* 索引不存在，直接创建一个新的节点 */
        createElm(newStartVnode, parentElm)
        newStartVnode = newCh[++newStartIdx]
      } else {
        /* 索引存在 */
        elmToMove = oldCh[idxInOld]
        // console.log('elmToMove=--------=')
        if (sameVnode(elmToMove, newStartVnode)) {
          /* 两个节点相同，调用 patchVnode 将老节点集合中对应节点赋值为 undefined ，将节点插入 oldStartVnode 之前，更新对应索引 */
          patchVnode(elmToMove, newStartVnode)
          oldCh[idxInOld] = undefined
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        } else {
          /* 两节点不相同，直接创建新节点插入，更新对应索引 */
          createElm(newStartVnode, parentElm, oldStartVnode.elm)
          newStartVnode = newCh[++newStartIdx]
        }
      }
    }
  }
  /* 终止条件， oldStartIdx > oldEndIdx 说明 newCh 中还有剩余节点，直接批量添加 */
  if (oldStartIdx > oldEndIdx) {
    // console.log('============')
    // console.log('', newStartIdx, newEndIdx, newCh)
    refElm = (newCh[newEndIdx + 1]) ? newCh[newEndIdx + 1].elm : null
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx)
  } else if (newStartIdx > newEndIdx) {
  /* 终止条件， newStartIdx > newEndIdx 说明 oldCh 中还有剩余节点，直接批量删除 */
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
/**
* 创建一个 key-索引 对应 map 表
*/
function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
