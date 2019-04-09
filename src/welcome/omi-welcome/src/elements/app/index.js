import { define, WeElement } from 'omi'
import logo from './logo.svg'
import '../app-intro'
import 'omiu/button'

define('my-app', class extends WeElement {
  css = require('./_index.css')

  name = 'Omi'

  clickHandler = () => {
    this.name = 'Omio'
    this.update()
  }

  render() {
    return (
      <div class="app">
        <header class="app-header">
          <img
            src={logo}
            onClick={this.clickHandler}
            class="app-logo"
            alt="logo"
          />
          <h1 class="app-title">Welcome to {this.name}</h1>
        </header>
        <app-intro />
        <o-button style='width:200px;'>I am omiu button.</o-button>
      </div>
    )
  }
})
