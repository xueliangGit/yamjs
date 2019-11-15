# Yam - a baseComponents for html

> _本组件基类即将开源，现在阶段只是内部使用，修复一些 bug，以及一些优化_
> Yam 一个 webComponent 的渲染函数组件;兼容非 webComponent 渲染

[看实例](https://yamjs.bestsloth.top/dist/index.html)

YamJS 是一个针对 html 的开发的一个组件基类，让你开发一个组件，可以运行在原生 HTML/vue/react 等环境。

脚手架已经完善

```bash

 #安装

 npm i yamjs-cli -g

 #创建 keys联系我来获取

 yamjs create app keys
```

## 背景

在这个各种组件化的漫天飞的阶段，需要一种综合的组件来去结合所有的框架，那就是 webComponent。

只需要写一次即可，在其他地方就可以用了。所以就写了一个组件基类。

## 特点

- 可以在任意框架（如 vue，react）和非框架环境中使用
- 可以配置组件环境外部是否可以和组件交互
- 组件标签自动驱动，无需手动启动，达到即写即用。

## 组件基类--Yam

一个简单的组件构成

```js
import Yam, { Component } from "../lib/index";
import MyTimer from "./myTimer";
@Component({
  tagName: "go-top",
  style: require("./goTop.stylus"),
  shadow: true,
  customElements: true,
  props: ["msg"]
})
class App extends Yam {
  $data() {
    return {
      list: [0, 12, 2, 3],
      index: 1
    };
  }
  $beforeCreate() {
    console.log("-----beforeCreate");
  }
  $created() {
    console.log("-----created");
  }
  $beforeMount() {
    console.log("-----beforeMount");
  }
  $mounted() {
    console.log("-----mounted");
  }
  $beforeDestroyed() {
    console.log("-----beforeMount");
  }
  $destroyed() {
    console.log("-----destroyed");
  }
  $beforeUpdate() {
    console.log("-----beforeUpdate");
  }
  $updated() {
    console.log("-----updated");
  }
  show(v) {
    this.$router.show();
    // console.log(v)
  }
  showList() {
    return this.list.map(v => <li>{v}</li>);
  }
  switch(i) {
    // this.emit('ad')
    // console.log(this.$refs.mytim)
    this.$refs.mytim.showP();
    // this.index = i
  }
  childEmit(i) {
    console.log(`子组件传来信息` + i);
    console.log(this);
  }
  getList() {
    // 渲染其他组件方式
    return (
      <MyTimer
        msgTime={123 + "" + this.index}
        ref="mytim"
        showFn={this.showList.bind(this)}
      />
    );
  }
  render() {
    return (
      <div className="asd">
        {this.msg}
        {/* {this.list.map((v, k) => <li key={k} ani='fade'>{v}</li>) } */}
        <div>
          <span onClick={this.switch.bind(this, 2)}>我的</span>
          <span onClick={this.switch.bind(this, 1)}>nide</span>
        </div>
        {this.getList()}
        <div />
      </div>
    );
  }
}
export default App;
```

引入基类`Yam` 和注解`Component`

### 组件注解使用@Component

> 注解的配置项有

- `tagName` 组件名/标签名(带链接符)

  - 在 webComponent 模式下（即默认模式下：`customElements:true`），该名字就是标签名字。组件内外直接写标签就可以渲染出来，组件内也可以写成引入的组件名字。
  - 在非 webComponent 模式下（即`customElements:false`），在组件环境外需要使用`renderAt(el)`函数去执行 root 元素渲染，组件内部需要写引入的组件名字。

- `style`样式

  - 暂时支持引入写法，样式暂时使用 stylus 语法，框架约定了一种规则，在样式文件顶部若是出现`[scope]`关键字，那么这个样式仅仅对该组件生效，若是没有出现`[scope]`关键字，那么该样式在 dom 根结点下全局有效：例如

    - 带有`[scope]`

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
        [dom="com_go-top"] div {
          height: 100%;
          font-weight: bold;
        }
        [dom="com_go-top"] a {
          display: inline-block;
        }
      </style>
      <div dom="com_go-top">
        ....
      </div>
      ```

    - 若是不带有`[scope]`

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
        div {
          height: 100%;
          font-weight: bold;
        }
        a {
          display: inline-block;
        }
      </style>
      <div dom="com_go-top">
        ....
      </div>
      ```

      - [root]根结点 是\$dom 元素

  - 支持使用@import 引入外部样式文件

- `shadow`影子树（`false`）是否使用影子树，影子树，参考[MDN 的解释](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/shadow)，简单来说就是隔离开原有的 dom 环境，新建一个环境，次新环境与外环境样式不相冲突。默认是`false`

- `customElements`使用 webcomponent 形式（`true`）是否使用原生 webComponent 形式，默认是`true`，将影响组件的写法。为`true`时，直接写`tagName`即可，为`false`时，需要在 js 里使用`renderAt(el)`来渲染。

- `props`父级传值（`[]`）

  - 来自于父级的传值。在组件内部传值随意，
  - **组件环境外部向组件传值时只能是字符串形式**。

- `canBeCalledExt`是否可以被外部调用(false)

  - 主要是用外组件环境外界调用内部组件内部方法时使用，默认是 false

### 基类的使用

- `$data(){return {data:'data'}}`设定组件数据
- `render(){return ()}`组件内容模版
  - 此处暂时支持使用的是`react`的`jsx`语法。

dom 数据更新是仅仅在`$data`设定以及注解里`prop`设定的值改变时时候触发，此处会有 300 做截流处理。

业务方法直接写就 OK，方法和值直接取就行。

> #### 基类生命周期

- `$beforeCreate(){}`组件实例被创建之前
- `$created(){}`组件实例被创建之后
- `$beforeMount(){}`组件实例数据渲染之前
- `$mounted(){}`组件实例数据渲染之后（这个时候基本上已经渲染完了 dom）
- `$beforeUpdate(){}`组件内部数据后 dom 更新之前调用
- `$updated(){}`组件内部数据更新后 dom 更新后调用（_注意：在此回调里进行给数据赋值，可能会导致死循环，ruturn false 可以避免_)
- `$beforeDestroyed(){}`组件销毁之前调用
- `$destroyed(){}`组件销毁之后调用

> #### 公共方法

- `emit` 触发本组件的方法，主要用在组件外环境调用组件方法
- `emitProp` 触发通过属性传递的方法，适用于组件内外环境
- `update`手动进行更新
- `render`渲染的模版
- `onReady`组件加载渲染完成，主要是时用于与外部接触的组件

---

> #### 组件间传值

在写业务时，组件间传值经常会遇到，对此框架也做了处理

- 在组件环境内，组件间传值类似`react`，只是取值不一样，取值的时候直接`this.data`的形式取值就行。

**组件间传值需要在注解中的`prop`注明才能去到值**

- 组件环境外，一切传值只能字符串形式，可以是 json 字符串，且无法调用

---

> #### 组件间方法调用

- 在组件环境内，组件间

  - 父组件调用子组件方法：通过在子组件上设置`ref`属性（`ref=elm`），父组件中通过`this.$refs`来获取子组件的信息(`this.$refs.elm`)，直接直接调用子组件的方法。
  - 子组件调用父组件方法：通过子组件以属性方式去绑定一个方法，这样就会传到子组件内，子组件内通过`this.emitProp('fnName'[,...param])`方法来出发，第一个参数是方法名，后面参数。该属性不需要在注解的 prop 内声明。

- 在组件环境外，外部调用组件内方法(需要在注解中设置`canBeCalledExt:true`)，可以通过先获取该组件渲染的根元素，例如是跟元素的 id 是 App，那么调用其组件方法是`App.emit('fnName'[,...param])`方法（`app.emit('init')`调用组件的 init 方法），获取组件内的子组件，设置子组件 ref 后通过`App.$refs('ref')`获取子组件，再进行操作。

  - 在非框架的页面中使用组件触发组件外的方法

    需要定义全局的 function，属性绑定该方法名，组件内使用`this.emitProp()`方法去触发；

    ```html
    <date-picker id="datePicker" change="change" />
    <script>
      //组件外部
      function change() {
        // 要触发的方法
      }
    </script>
    <script>
      // 组件内部
      import Yam, { Component } from "../lib/index";
      @Component({
        tagName: "date-picker"
      })
      class App extends Yam {
        update() {
          this.emitProp("change");
        }
      }
      //...
    </script>
    ```

  - 在第三方框架内使用组件触发组件外的方法

    各个框架都有自己的一套事件传递，触发方法，另外随着框架的更新，方式可能会改变，所以这里没有去做适配，添加了一个方法`addWatcher`来监听组件内部触发外部方法。由于在第三方框架中，div 大多都是动态渲染所以，需要使用`onReady`方法来检测加载完后的处理事件

    > _仅使用在在初始化中为加载完毕时，建议使用 **isInited**来检测一下看是否使用 onReady 方法_

    ```html
    <date-picker ref="datePicker" />
    <script>
      //组件外部
      new Vue({
        el: "App",
        mounted: () => {
          if (this.$refs.datePicker.isInited) {
            this.$refs.datePicker.emit("addWatcher", "change", e => {
              console.log(e);
            });
          } else {
            this.$refs.datePicker.onReady = function() {
              this.emit("addWatcher", "change", e => {
                console.log(e);
              });
            };
          }
        }
      });
      // react 类似
    </script>
    <script>
      // 组件内部
      import Yam, { Component } from "../lib/index";
      @Component({
        tagName: "date-picker"
      })
      class App extends Yam {
        update() {
          this.emitProp("change");
        }
      }
      //...
    </script>
    ```

---

> #### 组件插槽

该组件基类支持插槽 slot 方式渲染内容。

渲染规则：

- 组件内只有一个 slot 时，会默认渲染到这个 slot 里，不管是否设定 name 值

- 组件内有多个 slot 时，**需要设定 name 值来区分**，相应在组件外部写的时候需要设定 slot 属性，将根据 slot 和 name 匹配来渲染内容

- 组件内没有 slot 时，会默认把内容渲染到组件内容的尾部。

  _**注意，在使用 slot 时 shadow 不要是设为 True，否则，样式将不生效**_

---

> #### 基类扩展

有时候框架一些方法不满足业务的需要，需要正对业务或者功能进行扩展一些常用的方法，例如 router，http 等，让整个项目都用上。

框架一个静态方法`Yam.use`用来安装扩展，用法如下

```js
import Yam from "../lib/Yam";
import animate from "../lib/plugins/animate";
Yam.use(animate);
```

```js
//animate.js
export default {
  name: "animate",
  needs: ["tolls"],
  install: function(terget) {
    terget.addPrototype("fadeOut", function(duration = 300) {
      const keyframes = [
        { opacity: 1, marginTop: "0" },
        { opacity: 0, marginTop: "50px" }
      ];
      return _animate.call(this, keyframes, duration).finished;
    });
    terget.addPrototype("fadeIn", function(duration = 300) {
      const keyframes = [
        { opacity: 0, marginTop: "50px" },
        { opacity: 1, marginTop: "0px" }
      ];
      return _animate.call(this, keyframes, duration).finished;
    });
  }
};
function _animate(keyframes, duration) {
  console.log(this);
  for (let i in keyframes[0]) {
    this.elm.style[i] = keyframes[0][i];
  }
  this.elm.style.display = "block";
  this.elm.style.transition = duration + "ms";
  for (let i in keyframes[1]) {
    this.elm.style[i] = keyframes[1][i];
  }
  setTimeout(() => {
    this.elm.style.transition = "";
  }, duration);
  return {};
}
```

> ##### 编写扩展时需要注意

一个扩展的形式应该是个对象

有`name`值和`install`方法，例如下面这个样子

```js
let plugin = {
  name: "",
  install: target => {
    terget.addPrototype("fadeIn", function() {});
  }
};
```

- `name`
  - 扩展名字，用来区分其他扩展，避免重复加载的。
- `needs`依赖某个扩展，若设置了，检测到没有安装这个依赖，会有警告信息；接受数组`[]`
- `install`
  - 安装扩展的方法，接受一个参数`target`,参数暂时只有一个方法`addPrototype`用来添加框架公共方法，接受两个参数，第一个是方法名，第二个是方法函数；若是方法名与内置名或者已经有的方法冲突，该方法将添加失败。当使用元素时，可以通过`this.elm`获取

> ##### 组件内一些写扩展时可能用到的值值的说明

- `this.elm` 该组件的最外层`dom`，主要是用来包裹组件
- `this.$dom` 该组件的内容`dom`，若是样式中使用了`[root]`属性，那就是应用到这个 dom 上
- `this.prop` 是组件内部属性传值的缓存值，虽然你可以直接从这里取到来自父级元素的值或者方法，但是建议不要做，当你的组件运营在外部环境中时，是没有`this.prop`,所以用这样取值会报错的。建议使用`this.emitProp`来触发父级传递的方法，去`prop`值，直接用`this.`取值就行
- `this.addDestory`添加组件消除时要销毁的方法，例如 setTimeout

---

> #### 附加

> ##### 定时器，延时器

> ##### 状态管理（2019-7-4）

在有时候项目中会有一些公共的数据和状态在个组件中共享，使用并且有时候还要涉及到更改，所有用到状态的组件同一进行更新。

`yamjs-Store`是一个简单的状态管理器，可以多个组件或者全体使用。

1. 声明一个状态，其结构如下：

- `state`是状态结构，内部包含了使用的所有状态
- `methods`是自定义方法集，是在`store.commit()`的时候触发

```js
import Store from "../lib/plugins/store";
export default new Store({
  state: {
    width: 500
  },
  methods: {
    updateWidth(state, params) {
      console.log(params);
      state.width = params;
    }
  }
});
```

2. 使用状态管理，

- 非全局使用时，是在注解（适配器）Component 内声明使用，

```js
import Yam, { Component } from "../lib/index";
import store from "./store";
@Component({
  tagName: "my-timer",
  style: require("./myTimers.stylus"),
  canBeCalledExt: false,
  store: store,
  props: []
})
class App extends Yam {}
```

- 全局使用时，直接在公共 js 处用`yam.use`方法使用，这样每个组件都会接受状态的监管，一旦状态改变时，所有组件都会进行更新。

```js
import Yam from "../lib/index";
import store from "./store";
Yam.use(store);
```

3. 取公共状态值

   凡事使用状态管理插件的组件内部都会自动创建`$store`对象，例如有个状态值是`width`，那么`this.$store.width`就可以取值了

4. 更新公共状态值

   更是状态值，只是在用了状态管理的组件内才能更新状态值，方法是`this.$store.commit()`，更新的时候会先去找声明状态时的`methods`方法集，若是有该对应方法，那么就会调用执行该方法，此时若是该方法返回了`false`那么本次更新状态将不进行更新组件，其他返回值或者不设返回值则进行更新组件动作；若是在`methods`内没有找到对应的方法集，那么就会去`state`找对应的状态值，若是有状态值，那么就进行更新状态值并且更新组件，若是没有对应的状态值，那么就不作处理

> ####路由管理（2019-7-10）

有时候在组件内部也需要一个切换组件的东西，这里就引入了简单的路由功能。

使用方法：

1. 引入`router`并注入组件的依赖

   ```js
   import Router from "../lib/plugins/router/router";
   export default new Router({
     routes: [
       {
         name: "index",
         path: "/",
         component: "my-timer"
       },
       {
         path: "/goTop",
         component: "go-top",
         name: "gotop"
       },
       {
         path: "/myTimer",
         component: "my-timer",
         name: "myTimer"
       }
     ]
   });
   ```

   `name`主要是用来跳转用的，`path`是地址栏的路径，采用的是 hash 模式；`component`要渲染的组件名字；

   使用路由

   ```js
   //common.js
   import Yam from "../lib/index";
   import router from "./router";

   Yam.use(router);
   //main.js
   import "./components/common";
   import "./lib/plugins/router/routerView";
   ```

   html 中

   ```html
   <router-view></router-view>
   ```

   在组件中使用路由跳转

   ```js

   //....
    goT () {
       this.$router.push({
         name: 'myTimer',
         query:{a:1,b:2}
       })
     }

   //.....
   ```

   跳转之后，地址栏就会变成http://0.0.0.0:8081/#/myTimer?a=1&b=2

   通过目标组件通过`this.$router.current.query`获取

2. 有的方法：

   - `push`进入另外一个组件

     ```js
     this.$router.push({
       name: "myTimer", //name
       query: { a: 1, b: 2 } // 参数
     });
     ```

   - `back`返回

> fix 匹配不到组件时页面无反应情况处理（2019-8-1）
>
> > 添加 404 组件显示，当没有匹配到地址的时候，就会显示 404 组件；用户可以自定义 404 页面；只需要设定 pae-404 组件即可，实例如下:
> >
> > ```js
> > import Yam, { Component } from "yamjs";
> > @Component({
> >   tagName: "page-404",
> >   style: "",
> >   props: ["path"]
> > })
> > class App extends Yam {
> >   data() {
> >     return {
> >       // your data
> >     };
> >   }
> >   render() {
> >     return (
> >       <div>
> >         <p class="tip-404">404</p>
> >         <p class="tip-404">{this.path} 没有相应的页面，请检测</p>
> >       </div>
> >     );
> >   }
> > }
> > export default App;
> > ```
> >
> > 若没有自定义 404 页面会使用组件默认的 404 页面

---

> #### TODO

- page-offline
- 添加 fetch 扩展

> #### BUGS

> FIX

- 在三方框架内可以调用组件的方法，但是组件内无法调用三方传递进去的放方法

* prop 传`0,''`时显示异常
* 组件环境外调用组件内方法调用错误
* 优化 组件内部统一为组件渲染
* 组件外使用 slot 渲染问题
  - 优化 slot 渲染，禁止跨组件渲染
  - 优化组件内部渲染过程
* 与 VUE 结合使用，销毁组件时没有调用销毁方法，导致方法还在继续
* 与 react 混合使用，销毁组件周期问题。
* 组件统一设置为自动渲染，添加 dom 变化监测；

> 兼容性

支持主流浏览器

![image-20190612140407922](https://dev.tencent.com/u/Supermen/p/yam/git/raw/master/src/lib/image-20190612140407922.png)

> todo

- 0.3.1 解决 slot，mounted

> 更新

- 0.2.5 (2019-9-18)
  - 优化 ref，支持`ref={(v)=>{this.dom=v}}`写法；直接把 ref 赋值到`this.com`上
  - 优化 slot；在外环镜中嵌套 slot 时，当 slot 渲染组件时，该组件状态会被保存住，不会被销毁；（暂行方法，等待后续优化）
- 0.2.4 (2019-9-17)
  - 添加设置环境 `Yam.setConfig({isdev:true})`
- 0.2.0 (2019-8-1)
  - 优化 slot 加载显示，调成为，若只有一个 slot 并且定了 name，那么要想插入内容需要定义 slot 属性与之对应，否则不予显示
  - 优化`router`插件，当没有匹配到组件时，默认显示内置的 404 页面；也可以使用自定义 404 页面；详见[路由管理]
  - 优化 diff 算法，当检测到元素时组件时不再进行检测更改，组件的 diff 只是针对自身的组件
- 0.1.9
  - 优化 `store` 使用方式
  - 添加 `router`路由管理
- 0.1.8
  - 添加 `$slot` 属性，显示 slot 是否有内容
  - 添加 `store`状态管理，在不用组件更改状态，所有的状态都会改变,
  - 修复 未加载完毕立即调用`update`方法无效
- 0.1.4

  - 修复 `$updated` 回调里进行赋值（是被监听的值时），有时会进入死循环。在结尾加入 `return false` 可以避免。（原理时在一定时间（500ms）内不更新，谨慎使用）
  - 优化 属性变化时，值属性是 `function` 不再更新。

- 0.1.3

  - 修复属性变化时，值为 false 或者 0 时不变的话的问题
