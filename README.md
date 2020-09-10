# YamJS - a baseComponents for html

[![NPM version](https://img.shields.io/npm/v/yamjs.svg?style=flat)](https://npmjs.com/package/yamjs) [![NPM downloads](https://img.shields.io/npm/dm/yamjs.svg?style=flat)](https://npmjs.com/package/yamjs)

> YamJS 一个 webComponent 的渲染函数组件;兼容非 webComponent 渲染组件基类

> 从 0.5.0 版本开始已经支持使用[yamjs-loader](https://www.npmjs.com/package/yamjs-loader)去编辑代码；

> 若是需要兼容 IE9+ 需要引入`yamjs/dist/polyfill.yam.for.ie.min.js`

> [看实例](https://demo.yamjs.cn/dist/index.html)

[文档](http://www.yamjs.cn/yamjs/book/)

YamJS 是一个针对 html 的开发的一个组件基类，让你开发一个组件，可以运行在原生 HTML/vue/react 等环境。

脚手架已经完善

```bash

 #安装

 npm i yamjs-cli -g

 #创建 keys联系我来获取 xu.xueliang@163.com

 yamjs create app keys

```

在目录路径执行

- `yarn dev`开始开发模式
- `yarn build`打包应用；开发应用时类似`vue,reactjs`的应用
- `yarn components` 打包组件未模块文件，会自动生成`yamComponet.esm.min.js`esModule 类型文件,`yamComponet.common.min` CommoJS 类型文件,`yamComponet.min.js` UMD 文件，三种类型用于其他框架使用

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
import Yam, { Component } from 'yamjs'
import MyTimer from './myTimer'
@Component({
  tagName: 'go-top',
  style: require('./goTop.stylus'),
  shadow: true,
  customElements: true,
  props: ['msg'],
})
class App extends Yam {
  $data() {
    return {
      list: [0, 12, 2, 3],
      index: 1,
    }
  }
  $beforeCreate() {
    console.log('-----beforeCreate')
  }
  $created() {
    console.log('-----created')
  }
  $beforeMount() {
    console.log('-----beforeMount')
  }
  $mounted() {
    console.log('-----mounted')
  }
  $beforeDestroy() {
    console.log('-----beforeDestroy')
  }
  $destroyed() {
    console.log('-----destroyed')
  }
  $beforeUpdate() {
    console.log('-----beforeUpdate')
  }
  $updated() {
    console.log('-----updated')
  }
  show(v) {
    this.$router.show()
    // console.log(v)
  }
  showList() {
    return this.list.map((v) => <li>{v}</li>)
  }
  switch(i) {
    // this.emit('ad')
    // console.log(this.$refs.mytim)
    this.$refs.mytim.showP()
    // this.index = i
  }
  childEmit(i) {
    console.log(`子组件传来信息` + i)
    console.log(this)
  }
  getList() {
    // 渲染其他组件方式
    return (
      <MyTimer
        msgTime={123 + '' + this.index}
        ref="mytim"
        showFn={this.showList.bind(this)}
      />
    )
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
    )
  }
}
export default App
```

> 兼容性

支持主流浏览器
IE9+

> 更新

- 0.6.0 (2020-09)

  - 支持与 vue 混写，嵌套
  - 优化更新机制，一个组件一个组件的更新
  - 优化 diff
  - 支持 function Component,

    - 使用方式，直接函数方式，吧 props 当作参数传入
    - 支持标签引入 当作普通匿名标签，需要依附`Yamjs`才可以

    ```js
    function GetList(props) {
      let { index } = props
      // this.props = props
      console.log(this)
      return (
        <div $props={props}>
          {props}
          <div index={index + 12}>asdads is ACopm</div>
          IS GETLIST FUNCTION COMPONENTS {index}
        </div>
      )
    }
    @Component({
      tagName: 'switch-tab',
      style: require('./index.stylus'),
      props: ['tabs'],
    })
    class App extends Yam {
      render() {
        return (
          <div>
          <!-- 方法一 -->
         GetList({ index: this.active, onClick: () => console.log(222) })}
         <!-- 方法二 -->
         <GetList />
          </div>
        )
      }
    }
    ```

- 0.5.4 (2020-03-30)

  - 支持使用异步组件

    ```js
      const app=()=>import('./b.js')

      render(){
        return <div>
        <app></app>
        </div>
      }
    ```

- 0.5.0 (2020-03-12)

  - 支持使用 [yamjs-loader](https://www.npmjs.com/package/yamjs-loader) webpack 加载器，并且已加入热更新

- 0.4.0 (2020-02-29)

  - 优化 ie 系列加载（支持 ie9+）
  - 优化不支持`MutationObserver`方法的浏览器（例如 ie10）无法自动渲染新加标签
    - 修改了 `HTMLELEMENT` 对象一些方法,可以自动去渲染标签 `appendChild,insertBefore,removeChild,replaceChild,setAttribute`
    - 添加方法 `yamjsRender(el)` 函数；手动去渲染
  - 优化在 `vue` 项目中，低版本安卓组件未渲染出来

- 0.3.4 (2020-02-19)

  - 优化 slot 规则，减少代码量

- 0.3.2 (2020-01-05)

  - 优化 slot 插槽规则，默认插入和命名插入都支持
  - 优化 外环境下多个 slot 嵌套的复杂情况
  - stroe 增加 replay 和 reset 方法；方便调试 store 内部的数据；
    - replay 把会从开始到现在的一切一切 commit 从新播放一边
    - reset 把状态归位现在
  - 修复 ref 在更新时的显示
  - 修复 父子组件渲染时样式失效的状况

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
