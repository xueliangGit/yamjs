/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-03-11 19:07:03
 */
// $Component Symbol
import { isDev } from '../env'
let SymbolFlag = (!isDev && window.Symbol) || ((s) => (s + 'Symbol'))
// if(process.env.NODE_ENV==='')
export const $ComponentSymbol = SymbolFlag('$Component')
// $vdom Symbol
export const $vdomSymbol = SymbolFlag('$vdom')
// $componentData Symbol
export const $componentDataSymbol = SymbolFlag('$componentData')
export const $closestParentSymbol = SymbolFlag('$closestParent')
export const $slotSymbol = SymbolFlag('$slot')
