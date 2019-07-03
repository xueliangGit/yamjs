import lifeCycle from './lifeCycle'
let lifeCycleArray = Object.keys(lifeCycle)
function init (context) {
  context.addLifeCycleCallFn = function (lifeCycle, fn) {
    if (~lifeCycleArray.indexOf(lifeCycle)) {
      if (typeof fn === 'function') {
        context.lifeCycleCall = context.lifeCycleCall || {};
        (context.lifeCycleCall[lifeCycle + '_callfn'] = context.lifeCycleCall[lifeCycle + '_callfn'] || []).push(fn)
      } else {
        console.warn(`
        要添加的组件周期回调必须是函数
        `)
      }
    } else {
      console.warn(`
      要添加的组件周期回调的参数，只能是${lifeCycle.join(',')}，请检查
      `)
    }
  }
}
export default init
