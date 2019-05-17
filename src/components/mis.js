import BaseComponent, { Component } from '../lib/index'
@Component({
  tagName: 'mis-list'
})
class App extends BaseComponent {
  $data () {
    return {
      list: []
    }
  }
  $created () {
    fetch('http://192.168.2.154:2520/Api?url=http://apiey.myhug.cn/a/anti/sampleuserlist&api=').then((res) => res.json()).then(res => {
      console.log(res)
      this.list = res.userList.user
    })
  }
  render () {
    return (
      <div>
        {this.list.map((v, i) => <div>{v.userBase.uId}+{v.userBase.nickName}=============={i}</div>)}
      </div>
    )
  }
}
export default App
