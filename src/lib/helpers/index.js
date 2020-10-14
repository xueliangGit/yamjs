/*
 * @Author: xuxueliang
 * @Date: 2020-09-03 12:13:36
 * @LastEditors: xuxueliang
 * @LastEditTime: 2020-10-14 16:30:14
 */
export function getSlotComponentsIsOrInstallState (elm, def = true) {
  if (elm.innerComponent) {
    return elm.innerComponentInstallState
  }
  return !!def
}
