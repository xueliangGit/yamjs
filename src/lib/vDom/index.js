import { renderElement } from './createElement'

/**
 *
 * [tagName,porp,child]
 * 只比较 属性和tabname
 *
 *  */
function delItem ($parent, index) {
  if ($parent.childNodes[index]) {
    doTransition('del', $parent.childNodes[index], () => {
      $parent.removeChild($parent.childNodes[index])
    }
    )
  } else {
    if (index > 0) {
      delItem($parent, --index)
    }
  }
}
function addItem ($parent, $child) {
  $parent.appendChild($child)
  if ($child.props) {
    doTransition('add', $child, $child.props.ani)
  }
}
function doTransition (tag, child, cb = () => {}) {
  if (tag === 'del') {
    // child.classList.add('ani-leave')
    console.log('child', child.props)
    cb()
  }
  if (tag === 'add') {
    child.classList.add(cb)
    console.log('add', child.props)
  }
}
export default function updateElement ($parent, newNode, oldNode, index = 0) {
  if (!oldNode && newNode) {
    $parent.appendChild(renderElement(newNode))
  } else if (!newNode) {
    delItem($parent, index)
  } else if (changed(newNode, oldNode)) {
    if ($parent.childNodes[index]) {
      $parent.replaceChild(renderElement(newNode), $parent.childNodes[index])
    } else {
      addItem($parent, renderElement(newNode))
    }
  } else if (newNode.tagName) {
    const newLength = newNode.childNodes.length
    const oldLength = oldNode.childNodes.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.childNodes[i],
        oldNode.childNodes[i],
        i
      )
    }
  }
}
function changed (node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === 'string' && node1 !== node2) ||
    node1.tagName !== node2.tagName ||
    ((typeof node1 === 'string' || typeof node1 === 'number') && node1 !== node2) ||
    (typeof node1.childNodes === 'object' && typeof node1 !== typeof node2) ||
    node1.length !== node2.length
  )
}
