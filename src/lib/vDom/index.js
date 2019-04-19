/*eslint-disable */
import {createElementByJson} from './createElement'
function creat (dom) {
  let o = dom.cloneNode(true)
  console.log(o)
}
/**
 * 
 * [tagName,porp,child]
 * 只比较 属性和tabname
 * 
 *  */
function delItem($parent,index){
    if($parent.childNodes[index]){
      $parent.removeChild($parent.childNodes[index])
    }else{
    if(index>0){
      delItem($parent,--index)
    }
  }
}
export default function updateElement ($parent, newNode, oldNode, index = 0) {
  if (!oldNode&&newNode) {
    $parent.appendChild(createElementByJson(newNode))
  } else if (!newNode) {
    delItem($parent,index)
  } else if (changed(newNode, oldNode)) {
    if($parent.childNodes[index]){
      $parent.replaceChild(createElementByJson(newNode), $parent.childNodes[index])
    }else{
      $parent.appendChild(createElementByJson(newNode))
    }
  } else if (newNode.tagName) {
    const newLength = newNode.childNodes.length
    const oldLength = oldNode.childNodes.length
    const $childNodesLength = $parent.childNodes.length
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
    typeof node1 === 'string' && node1 !== node2 ||
    node1.tagName !== node2.tagName||
    (typeof node1 === 'string'||typeof node1 === 'number' ) && node1 !== node2 ||
    typeof node1.childNodes ==='object'  &&typeof node1 !== typeof node2||
    node1.length!==node2.length
  )
}

function updateElement1 ($parent, newNode, oldNode, index = 0) {
  console.log(newNode)
  if (!oldNode) {
    $parent.appendChild(createElement.call(this,newNode))
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index])
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(createElement.call(this,newNode), $parent.childNodes[index])
  } else if (newNode.type) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length

    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement1(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      )
    }
  }
}
function changed1 (node1, node2) {
  return (
    typeof node1 !== typeof node2 ||
    typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
  )
}