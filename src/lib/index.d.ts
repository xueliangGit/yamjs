
export  interface $config {
  
}
 declare class BASEElement {
  constructor(name: string, age: number)  //构造函数
  getName(id: number): string
  /**
    * 组件配置信息.
    * @return {props} 组件传值
    */
  $config():{
    props?: string[];
    shadowRoot?: boolean;
  }
  /**
    * 组件配置信息
    * @return {props} 组件传值
    */
  $data():{
    // 组件传值
    props?:string[],
    shadowRoot:boolean 
  }
}
declare var foo: number;
declare namespace tools {
  interface KittySettings { }
  /**
   * v 版本
   * */
    v:string;
    date:object
}
export = BASEElement;
export = tools