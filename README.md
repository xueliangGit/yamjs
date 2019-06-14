# Yam - a baseComponents for html

Yam 一个webComponent的渲染函数组件;兼容非webComponent渲染

## 背景

在这个各种组件化的漫天飞的阶段，需要一种综合的组件来去结合所有的框架，那就是webComponent。

只需要写一次即可，在其他地方就可以用了。所以就写了一个组件基类。

## 特点

* 可以在任意框架中使用
* 可以控制外部是否可以和组件交互
* 框架只包含最基本的内容，

## 组件基类--Yam

一个简单的组件构成

```js
 import Yam, { Component } from '../lib/index'
 import MyTimer from './myTimer'
 @Component({
   tagName: 'go-top',
   style: require('./goTop.stylus'),
   shadow: true,
   customElements: true,
   props: ['msg']
 })
 class App extends Yam {
   $data () {
     return {
       list: [0, 12, 2, 3],
       index: 1
     }
   }
   $beforeCreate () {
     console.log('-----beforeCreate')
   }
   $created () {
     console.log('-----created')
   }
   $beforeMount () {
     console.log('-----beforeMount')
   }
   $mounted () {
     console.log('-----mounted')
   }
   $beforeDestroyed () {
     console.log('-----beforeMount')
   }
   $destroyed () {
     console.log('-----destroyed')
   }
   $beforeUpdate () {
     console.log('-----beforeUpdate')
   }
   $updated () {
     console.log('-----updated')
   }
   show (v) {
     this.$router.show()
     // console.log(v)
   }
   showList () {
     return this.list.map(v => <li>{v}</li>)
   }
   switch (i) {
     // this.emit('ad')
     // console.log(this.$refs.mytim)
     this.$refs.mytim.showP()
     // this.index = i
   }
   childEmit (i) {
     console.log(`子组件传来信息` + i)
     console.log(this)
   }
   getList () {
     // 渲染其他组件方式
     return <MyTimer msgTime={123 + '' + this.index} ref='mytim' showFn={this.showList.bind(this)} />
   }
   render () {
     return (
       <div className='asd'>
         {this.msg}
         {/* {this.list.map((v, k) => <li key={k} ani='fade'>{v}</li>) } */}
         <div>
           <span onClick={this.switch.bind(this, 2)}>我的</span>
           <span onClick={this.switch.bind(this, 1)}>nide</span>
         </div>
         {this.getList()}
         <div />
       </div>
     )
   }
 }
 export default App
 
```

引入基类`Yam` 和注解`Component`

### 组件注解使用@Component

> 注解的配置项有

* `tagName `   组件名/标签名(带链接符)
  
  * 在webComponent模式下（即默认模式下：`customElements:false`），该名字就是标签名字。组件内外直接写标签就可以渲染出来，组件内也可以写成引入的组件名字。
* 在非webComponent模式下（即`customElements:true`），在组件环境外需要使用`renderAt(el)`函数去执行root元素渲染，组件内部需要写引入的组件名字。
  
* `style `样式
  
* 暂时支持引入写法，样式暂时使用stylus语法，框架约定了一种规则，在样式文件顶部若是出现`[scope]`关键字，那么这个样式仅仅对该组件生效，若是没有出现`[scope]`关键字，那么该样式在dom根结点下全局有效：例如
  
    * 带有`[scope]`
    
      ```stylus
      // styl 样式
      [scope]
      div
        height 100%
        font-weight bold
      a
        display inline-block
      ```
    
      编译后是
    
      ```html
      <style> 
      [dom="com_go-top"] div {  height: 100%;  font-weight: bold;}[dom="com_go-top"] a {  display: inline-block;}
      </style>
      <div dom="com_go-top">
      	....
      </div>
      ```
    
    * 若是不带有`[scope]`
    
      ```stylus
      // styl 样式
      div
        height 100%
        font-weight bold
      a
        display inline-block
      ```
    
      编译后是
    
      ```html
      <style> 
      div {  height: 100%;  font-weight: bold;}a {  display: inline-block;}
      </style>
      <div dom="com_go-top">
      	....
      </div>
      ```
    
      

* `shadow`影子树（`false`）
  
* 是否使用影子树，影子树，参考[MDN的解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/shadow)，简单来说就是隔离开原有的dom环境，新建一个环境，次新环境与外环境样式不相冲突。默认是`false`
  
* `customElements`使用webcomponent形式（`true`）
  
* 是否使用原生webComponent形式，默认是`true`，将影响组件的写法。为`true`时，直接写`tagName`即可，为`false`时，需要在js里使用`renderAt(el)`来渲染。
  
* `props`父级传值（`[]`）
  
  * 来自于父级的传值。在组件内部传值随意，**组件环境外部向组件传值时只能是字符串形式**。
* `canBeCalledExt`是否可以被外部调用(false)
  
  * 主要是用外组件环境外界调用内部组件内部方法时使用，默认是false

### 基类的使用

* `$data(){return {data:'data'}}`设定组件数据
* `render(){return ()}`组件内容模版
  * 此处暂时支持使用的是`react`的`jsx`语法。

dom数据更新是仅仅在`$data`设定以及注解里`prop`设定的值改变时时候触发，此处会有300做截流处理。

业务方法直接写就OK，方法和值直接取就行。

> #### 基类生命周期

* `$beforeCreate(){}`组件实例被创建之前
* `$created(){}`组件实例被创建之后
* `$beforeMount(){}`组件实例数据渲染之前
* `$mounted(){}`组件实例数据渲染之后（这个时候基本上已经渲染完了dom）
* `$beforeUpdate(){}`组件内部数据后dom更新之前调用
* `$updated(){}`组件内部数据更新后dom更新后调用
* `$beforeDestroyed(){}`组件销毁之前调用
* `$destroyed(){}`组件销毁之后调用

> #### 公共方法 

* `emit` 触发本组件的方法，主要用在组件外环境调用组件方法
* `emitProp` 触发通过属性传递的方法，适用于组件内外环境
* `update`手动进行更新
* `render`渲染的模版

---

> #### 组件间传值

在写业务时，组件间传值经常会遇到，对此框架也做了处理

* 在组件环境内，组件间传值类似`react`，只是取值不一样，取值的时候直接`this.data`的形式取值就行。

**组件间传值需要在注解中的`prop`注明才能去到值**

* 组件环境外，一切传值只能字符串形式，可以是json字符串，且无法调用

---

> #### 组件间方法调用

* 在组件环境内，组件间
  * 父组件调用子组件方法：通过在子组件上设置`ref`属性（`ref=elm`），父组件中通过`this.$refs`来获取子组件的信息(`this.$refs.elm`)，直接直接调用子组件的方法。
  * 子组件调用父组件方法：通过子组件以属性方式去绑定一个方法，这样就会传到子组件内，子组件内通过`this.emitProp('fnName'[,...param])`方法来出发，第一个参数是方法名，后面参数。该属性不需要在注解的prop内声明。

* 在组件环境外，外部调用组件内方法(需要在注解中设置`canBeCalledExt:true`)，可以通过先获取该组件渲染的根元素，例如是跟元素的id是App，那么调用其组件方法是`App.emit('fnName'[,...param])`方法（`app.emit('init')`调用组件的init方法），获取组件内的子组件，设置子组件ref后通过`App.$refs('ref')`获取子组件，再进行操作。

  * 在非框架的页面中使用组件触发组件外的方法

    需要定义全局的function，属性绑定该方法名，组件内使用`this.emitProp()`方法去触发；

    ```html
    <date-picker id='datePicker' change='change' />
    <script>
    //组件外部
      function change(){
        // 要触发的方法
      }
    </script>
    <script>
      // 组件内部
     import Yam, { Component } from '../lib/index'
     @Component({
       tagName: 'date-picker'
     })
     class App extends Yam {
    	update(){
       this.emitProp('change')
      }
     }
    //...
    </script>
    ```

  * 在第三方框架内使用组件触发组件外的方法

    各个框架都有自己的一套事件传递，触发方法，另外随着框架的更新，方式可能会改变，所以这里没有去做适配，添加了一个方法`addWatcher`来监听组件内部触发外部方法。由于在第三方框架中，div大多都是动态渲染所以，需要使用`onReady`方法来检测加载完后的处理事件

    >  *仅使用在在初始化中为加载完毕时，建议使用 __isInited__来检测一下看是否使用onReady方法*

    ```html
    <date-picker ref='datePicker'  />
    <script>
    //组件外部
      new Vue({
        el:'App',
        mounted:()=>{
          if(this.$refs.datePicker.isInited){
            this.$refs.datePicker.emit('addWatcher','change',(e)=>{
              console.log(e)
            })
          }else{
            this.$refs.datePicker.onReady=function(){
              this.emit('addWatcher','change',(e)=>{
                console.log(e)
              })
            }
         	}
        }
      })
      // react 类似
    </script>
    <script>
      // 组件内部
     import Yam, { Component } from '../lib/index'
     @Component({
       tagName: 'date-picker'
     })
     class App extends Yam {
    	update(){
       this.emitProp('change')
      }
     }
    //...
    </script>
    ```

    

---

> #### 组件插槽

该组件基类支持插槽slot方式渲染内容。

渲染规则：

* 组件内只有一个slot时，会默认渲染到这个slot里，不管是否设定name值

* 组件内有多个slot时，**需要设定name值来区分**，相应在组件外部写的时候需要设定slot属性，将根据slot和name匹配来渲染内容

* 组件内没有slot时，会默认把内容渲染到组件内容的尾部。

  *__注意，在使用slot时 shadow不要是设为True，否则，样式将不生效__*

---

> #### 基类扩展

有时候框架一些方法不满足业务的需要，需要正对业务或者功能进行扩展一些常用的方法，例如router，http等，让整个项目都用上。

框架一个静态方法`Yam.use`用来安装扩展，用法如下

```js
import Yam from '../lib/Yam'
import animate from '../lib/plugins/animate'
Yam.use(animate)
```

```js
//animate.js
export default {
  name: 'animate',
  needs:['tolls'],
  install: function (terget) {
    terget.addPrototype('fadeOut', function (duration = 300) {
      const keyframes = [{ opacity: 1, marginTop: '0' }, { opacity: 0, marginTop: '50px' }]
      return _animate.call(this, keyframes, duration).finished
    })
    terget.addPrototype('fadeIn', function (duration = 300) {
      const keyframes = [{ opacity: 0, marginTop: '50px' }, { opacity: 1, marginTop: '0px' }]
      return _animate.call(this, keyframes, duration).finished
    })
  }
}
function _animate (keyframes, duration) {
  console.log(this)
  for (let i in keyframes[0]) {
    this.elm.style[i] = keyframes[0][i]
  }
  this.elm.style.display = 'block'
  this.elm.style.transition = duration + 'ms'
  for (let i in keyframes[1]) {
    this.elm.style[i] = keyframes[1][i]
  }
  setTimeout(() => {
    this.elm.style.transition = ''
  }, duration)
  return {}
}	
```

> ##### 编写扩展时需要注意

一个扩展的形式应该是个对象

有`name`值和`install`方法，例如下面这个样子

```js
let plugin ={
  name:'',
  install:(target)=>{
     terget.addPrototype('fadeIn', function () {
    })
  }
}
```

* `name`
  * 扩展名字，用来区分其他扩展，避免重复加载的。
* `needs`依赖某个扩展，若设置了，检测到没有安装这个依赖，会有警告信息；接受数组`[]`
* `install`
  * 安装扩展的方法，接受一个参数`target`,参数暂时只有一个方法`addPrototype`用来添加框架公共方法，接受两个参数，第一个是方法名，第二个是方法函数；若是方法名与内置名或者已经有的方法冲突，该方法将添加失败。当使用元素时，可以通过`this.elm`获取

> ##### 组件内一些写扩展时可能用到的值值的说明

* `this.elm` 该组件的最外层`dom`，主要是用来包裹组件
* `this.$div` 该组件的内容`dom`，若是样式中使用了`[root] `属性，那就是应用到这个dom上
* `this.prop` 是组件内部属性传值的缓存值，虽然你可以直接从这里取到来自父级元素的值或者方法，但是建议不要做，当你的组件运营在外部环境中时，是没有`this.prop`,所以用这样取值会报错的。建议使用`this.emitProp`来触发父级传递的方法，去`prop`值，直接用`this.`取值就行
* `this.addDestory`添加组件消除时要销毁的方法，例如setTimeout

---

> ####  TODO

* 添加router扩展
* 添加fetch扩展

> #### BUGS

* 组件外使用slot [x]
* 组件外直接套用组件 渲染失败

> 与react和vue 结合使用时的问题

* 在三方框架内可以调用组件的方法，但是组件内无法调用三方传递进去的放方法

> FIX

* prop 传`0,''`时显示异常
* 组件环境外调用组件内方法调用错误
* 优化 组件内部统一为组件渲染
* 组件外使用slot渲染问题
  * 优化slot渲染，禁止跨组件渲染
  * 优化组件内部渲染过程
* 与VUE结合使用，销毁组件时没有调用销毁方法，导致方法还在继续
* 与react 混合使用，销毁组件周期问题。
* 组件统一设置为自动渲染，添加dom变化监测；

> 兼容性

支持主流浏览器

![image-20190612140407922](./src/lib/image-20190612140407922.png)