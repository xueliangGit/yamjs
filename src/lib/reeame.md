# BaseComponent

一个兼容webComponent的渲染函数组件;

## 背景

在这个各种组件化的漫天飞的阶段，需要一种综合的组件来去结合所有的框架，那就是webComponent。

只需要写一次即可，在其他地方就可以用了。所以就去写了一个组件基类。

## 组件基类--BaseComponent

一个简单的组件构成

```js
 import BaseComponent, { Component } from '../lib/index'
 import MyTimer from './myTimer'
 @Component({
   tagName: 'go-top',
   style: require('./goTop.stylus'),
   shadow: true,
   customElements: true,
   props: ['msg']
 })
 class App extends BaseComponent {
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
 // console.log(GoTop._style)
 export default App
 
```

引入基类`BaseComponent` 和注解`Component`

### 组件注解使用@Component

> 注解的配置项有

* `tagName `   组件名/标签名(带链接符)
  * 在webComponent模式下（即默认模式下：`customElements:false`），该名字就是标签名字。组件内外直接写标签就可以渲染出来，组件内也可以写成引入的组件名字。
  * 在非webComponent模式下（即`customElements:true`），在组件环境外需要使用`renderAt(el)`函数去执行root元素渲染，组件内部需要写引入的组件名字。

* `style `样式
  * 暂时支持引入写法

* `shadow`影子树（`false`）
  * 是否使用影子树，影子树，参考[MDN的解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/shadow)，简单来说就是隔离开原有的dom环境，新建一个环境，次新环境与外环境样式不相冲突。默认是`false`

* `customElements`使用webcomponent形式（`true`）
  * 是否使用原生webComponent形式，默认是`true`，将影响组件的写法。为`true`时，直接写`tagName`即可，为`false`时，需要在js里使用`renderAt(el)`来渲染。

* `props`父级传值（`[]`）
  * 来自于父级的传值。在组件内部传值随意，**组件环境外部向组件传值时只能是字符串形式**。

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

---

> #### 组件间传值

在写业务时，组件间传值经常会遇到，对此框架也做了处理

在组件环境内，组件间传值类似`react`，只是取值不一样，取值的时候直接`this.data`的形式取值就行。

**组件间传值需要在注解中的`prop`注明才能去到值**

组件环境外，一切传值只能字符串形式，可以是json字符串，且无法调用

---

> #### 组件间方法调用

------------

在组件环境内，组件间，取值的时候直接`this.data`的形式取值就行。

**组件间传值需要在注解中的`prop`注明才能去到值**

---

> #### 基类扩展

有时候框架一些方法不满足业务的需要，需要正对业务或者功能进行扩展一些常用的方法，例如router，http等，让整个项目都用上。

框架一个静态方法`BaseComponent.use`用来安装扩展，用法如下

```js
import BaseComponent from '../lib/BaseComponent'
import animate from '../lib/plugins/animate'
BaseComponent.use(animate)
```

```js
//animate.js
export default {
  name: 'animate',
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

* `name`
  * 扩展名字，用来区分其他扩展，避免重复加载的。
* `install`
  * 安装扩展的方法，接受一个参数`target`,参数暂时只有一个方法`addPrototype`用来添加框架公共方法，接受两个参数，第一个是方法名，第二个是方法函数；若是方法名与内置名或者已经有的方法冲突，将添加失败。



组件内部都有prop

组件外部需要字段去传

组件内部直接调用子组件方法

组件外部需要通过emit方法去调用