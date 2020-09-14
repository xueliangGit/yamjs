/*
 * @Author: xuxueliang
 * @Date: 2019-06-25 13:56:05
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-09-11 20:28:16
 */
export const canUseCustomElements = !!(window.customElements && window.customElements.define)
export const preFixCom = 'com-'
export const isFunctionComponent = 'isFC'
export const isComponent = 'isC'
export const supporShadow = !!HTMLElement.prototype.attachShadow
