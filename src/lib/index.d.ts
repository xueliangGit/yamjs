
declare class Yam {
  constructor(name: string, age: number)  //构造函数
  /**
    * 添加扩展.
    * @return {props} 组件传值
    */
  static use(plugins: object): void
  /**
    * 组件状态信息，需要在component里添加配置.
    * @return {props} 组件传值
    */
   $store:{}
  /**
    * 组件配置信息.
    * @return {props} 组件传值
    */
  $config():{
    props?: string[];
    shadowRoot?: boolean;
  }
  /**
    * 组件内使用的数据
    * @return {} 组件数据
    */
  $data():{
    
  }
  /**
    * 创建实例之前 执行方法
    */
  $beforeCreate (): void
  /**
    * 创建实例回调方法
    */
  $created (): void
  /**
    * 挂在数据之前调用方法
    */ 
  $beforeMount (): void
  /**
    * 挂在数据之后调用方法
    */ 
  $mounted (): void
  /**
    * 更新之前调用方法
    */ 
  $beforeUpdate (): void
  /**
    * 更新之后调用方法
    */ 
  $updated (): void
  /**
    * 销毁之前调用
    */ 
  $beforeDestroyed (): void
  /**
    * 销毁之后调用
    */ 
  $destroyed (): void
  /**
    * emit
    */ 
   emit (): void
   /**
    * @summary 调用父级方法
    * @param fnName 方法名字
    * @param params 传值[...param]
    */ 
   emitProp (fnName,[...params]): void
}
/**
  * 定义组件的一些属性类型tagName,style,shadow,customElements,prop
  */ 
declare function Component(config:{
  //组件名字
  tagName: 'tag-name',
  //样式类型
  style: require('./style.stylus'),
  //是否使用影子树来渲染组件内容
  shadow: false,
  //是否使用web自定义组件方式去定义组件 
  customElements:true,
  // 组件传入的属性监听
  props:[],
  // 吃否可以被外部调用组件内部的方法
  canBeCalledExt:true
}):void
export default Yam;
export { Component}