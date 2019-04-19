import BaseComponent from '../lib'
// var goTopTem = require('./goTopTem.html')

class GoTop extends BaseComponent {
  constructor () {
    super()
    console.log('GoTop', super._connectedCallback)
  }
  $config () {
    return {
      component: true,
      props: ['msg']
    }
  }
  $data () {
    return {
      list: [1, 2, 3]
    }
  }
  show (v) {
    console.log(v)
  }
  showList () {
    return this.list.map(v => <li>{v}</li>)
  }
  template () {
    console.log('jsx')
    return (
      <div onClick={this.show.bind(this)}>
        <p>4341321</p>
        <ul>{this.list.length > 3 ? this.list.map(v => <li>{v}</li>) : this.list.map(v => <p onClick={this.show.bind(this, v)}>{v * -1 }</p>)}
        </ul>
        {this.list.map(v => <p onClick={this.show.bind(this, v)}>{v * -1 }</p>)}
        {this.list.map(v => <p onClick={this.show.bind(this, v)}>{v * -10 }</p>)}
        {this.show}
        {this.msg}
      </div>
    )
  }
  $connectedCallback () {
    setTimeout(() => {
      this.list = [5, 6, 7, 78]
      console.log(this.list)
      setTimeout(() => {
        this.list = [9, 4]
        console.log(this.list)
      }, 3000)
    }, 3000)
  }
}

window.customElements.define('go-top', GoTop)
