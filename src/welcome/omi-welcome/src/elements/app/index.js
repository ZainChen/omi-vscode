import { define, WeElement } from 'omi'
// import logo from './logo.svg'  //vscode不支持编译后的js文件中存在本地相对路径，所有资源文件尽量放到html中
import '../app-intro'
// import 'omiu/button'
import 'omiu'

const vscode = acquireVsCodeApi();
const callbacks = {};

window.addEventListener('message', event => {
  const message = event.data;
  switch (message.cmd) {
    case 'vscodeCallback':
      console.log(message.data);
      (callbacks[message.cbid] || function () { })(message.data);
      delete callbacks[message.cbid];
      break;
    default: break;
  }
});

define('my-app', class extends WeElement {
  css = require('./_index.css')

  data = {
    name: 'Omi',
    userName: '',
    time: '',
    show: true
  }
  

  install() {
    this.data.time = this.getTime()
    this.callVscode({cmd: 'getConfig', key: 'omi.user.name'}, userName => this.data.userName = userName)
    this.callVscode({cmd: 'getConfig', key: 'omi.start.welcome'}, show => this.data.show = show)
  }

  clickHandler = () => {
    this.data.name = 'Omio'
    this.update()
  }

  onChangeA = () => {
    if(this.data.show) {
      this.data.show = false
    } else {
      this.data.show = true
    }
    this.callVscode({cmd: 'setConfig', key: 'omi.start.welcome', value: this.data.show}, null)
  }

  getTime() {
    const hour = new Date().getHours();
    if (hour <= 8) return 'good morning';
    else if (hour < 12) return 'good morning';
    else if (hour < 14) return 'good afternoon';
    else if (hour < 18) return 'good afternoon';
    return 'good evening';
  }

  callVscode(data, cb) {
    if (typeof data === 'string') {
      data = { cmd: data };
    }
    if (cb) {
      // 时间戳加上5位随机数
      const cbid = Date.now() + '' + Math.round(Math.random() * 100000);
      callbacks[cbid] = cb;
      data.cbid = cbid;
    }
    vscode.postMessage(data);
  }

  render() {
    return (
      <div class="app">
        <header class="app-header">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxNyAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDI0cHgiIGhlaWdodD0iMTAyNHB4IiB2ZXJzaW9uPSIxLjEiIHN0eWxlPSJzaGFwZS1yZW5kZXJpbmc6Z2VvbWV0cmljUHJlY2lzaW9uOyB0ZXh0LXJlbmRlcmluZzpnZW9tZXRyaWNQcmVjaXNpb247IGltYWdlLXJlbmRlcmluZzpvcHRpbWl6ZVF1YWxpdHk7IGZpbGwtcnVsZTpldmVub2RkOyBjbGlwLXJ1bGU6ZXZlbm9kZCIKdmlld0JveD0iMCAwIDEwMjQgMTAyNCIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KIDxkZWZzPgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+CiAgIDwhW0NEQVRBWwogICAgLmZpbDAge2ZpbGw6bm9uZX0KICAgIC5maWwyIHtmaWxsOiNGRUZFRkV9CiAgICAuZmlsMSB7ZmlsbDojMDdDMTYwfQogICBdXT4KICA8L3N0eWxlPgogPC9kZWZzPgogPGcgaWQ9IuWbvuWxgl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxyZWN0IGNsYXNzPSJmaWwwIiB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0Ii8+CiAgPHJlY3QgY2xhc3M9ImZpbDAiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiLz4KICA8ZyBpZD0iXzIyMjUwNDk2MTU3OTIiPgogICA8Y2lyY2xlIGNsYXNzPSJmaWwxIiBjeD0iNTEyIiBjeT0iNTEyIiByPSI1MTIiLz4KICAgPHBvbHlnb24gY2xhc3M9ImZpbDIiIHBvaW50cz0iMTU5Ljk3LDgwNy44IDMzOC43MSw1MzIuNDIgNTA5LjksODI5LjYyIDUxOS40MSw4MjkuNjIgNjc4Ljg1LDUzNi40NyA4NjQuMDMsODA3LjggNzM5LjgzLDE5NC4zOCA3MjkuMiwxOTQuMzggNTE3LjczLDU4MS4yMyAyOTMuNTQsMTk0LjM4IDI4My4zMywxOTQuMzggIi8+CiAgIDxjaXJjbGUgY2xhc3M9ImZpbDIiIGN4PSI4MzkuMzYiIGN5PSIyNDIuNDciIHI9IjUwIi8+CiAgPC9nPgogPC9nPgo8L3N2Zz4K"
            onClick={this.clickHandler}
            class="app-logo"
            alt="logo"
          />
          <h2 class="app-title">Hi {this.data.userName}, {this.data.time}！Welcome to {this.data.name}！</h2>
        </header>
        {/* <app-intro /> */}
        {/* <o-button onClick={this.clickHandler} style='width:200px;'>I am omiu button.</o-button> */}
        <table class="o-switch-dis" border="15">
          <tr>
            <th>Displays a custom welcome page at startup</th>
            <th>
              <o-switch onChange={this.onChangeA} checked={this.data.show} />
            </th>
          </tr>
        </table>
      </div>
    )
  }
})
