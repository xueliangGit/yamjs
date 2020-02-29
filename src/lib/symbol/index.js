/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-02-23 12:29:25
 */
// $Component Symbol
let SymbolFlag = window.Symbol || ((s) => (s + 'Symbol'))
export const $ComponentSymbol = SymbolFlag('$Component')
// $vdom Symbol
export const $vdomSymbol = SymbolFlag('$vdom')
// $componentData Symbol
export const $componentDataSymbol = SymbolFlag('$componentData')
export const $closestParentSymbol = SymbolFlag('$closestParent')
export const $slotSymbol = SymbolFlag('$slot')
