webpackJsonp([20],{50:function(n,e){n.exports="# omi-router\n\nomi-router is a router plugin of [Omi](http://omijs.org), and it is lightweight, easy and powerful to use. It is a solution to build Omi's SPA(Single Page Application).\n\n[\u2192 DEMO](https://tencent.github.io/omi/packages/omi-router/examples/spa/build/)\n\nThe advantage of SPA is very clear.\n\n* No refresh to load a content\n* No refresh to previous/forward page\n* Shareable link (Other can see the same page as you see)\n* No blank page and transmission animation\n* Reusable resource (If multi-page, same resource shold be loaded multi times)\n\nYes, there are many advantages. Let's do it.\n\n## Install\n\n### NPM\n\n```js\nnpm install omi-router\n```\n\n## Usage\n\n```js\n//You can visit route in the global context.\nimport 'omi-router'\nimport { define, WeElement, render } from 'omi'\nimport './about'\nimport './home'\nimport './user'\nimport './user-list'\n\ndefine('my-app', class extends WeElement {\n  static observe = true\n\n  data = { tag: 'my-home' }\n\n  install() {\n\n    route('/', () => {\n      this.data.tag = 'my-home'\n    })\n\n    route('/about', (evt) => {\n      console.log(evt.query)\n      this.data.tag = 'my-about'\n    })\n\n    route('/user-list', () => {\n      this.data.tag = 'user-list'\n    })\n\n    route('/user/:name/category/:category', (evt) => {\n      this.data.tag = 'my-user'\n      this.data.params = evt.params\n    })\n\n    route('*', function () {\n      console.log('not found')\n    })\n\n    route.before = (evt) => {\n      console.log('before')\n      //prevent route when return false\n      //return false\n    }\n\n    route.after = (evt) => {\n      console.log('after')\n    }\n  }\n\n  onClick = () => {\n    route.to('/user/vorshen/category/html')\n  }\n\n  render(props, data) {\n    return (\n      <div>\n        <ul>\n          <li><a href=\"#/\" >Home</a></li>\n          <li><a href=\"#/about\" >About</a></li>\n          <li><a href=\"#/user-list\" >UserList</a></li>\n          <li><a href=\"#/about?name=dntzhang&age=18\" >About Dntzhang</a></li>\n        </ul>\n        <div id=\"view\">\n          <data.tag params={data.params} />\n        </div>\n        <div><button onClick={this.onClick}>Test route.to</button></div>\n      </div>\n    )\n  }\n})\n\nrender(<my-app />, \"#container\")\n```\n\n## Match\n\n| Rule | Path | route.params |\n|---------|------|--------|\n| /user/:name | /user/dntzhang | `{ name: 'dntzhang' }` |\n| /user/:name/category/:category | /user/dntzhang/category/js | `{ name: 'dntzhang', category: 'js' }` |\n\nNote: If hash is empty, it will be automatically recognized as `/` \u3002\n\n## With Query Parameter\n\n```html\n<li><a href=\"#/about?name=dntzhang&age=18\" >About</a></li>\n```\n\n```js\nroute('/about', (evt) => {\n  //output { name: 'dntzhang', age : '18' } when click the tag above\n  console.log(evt.query)\n})\n```\n\n## With Data\n\n```js\nroute.to('/about',(evt) => {\n  //{ a: 1 }\n  console.log(evt.data)\n})\nroute.to('/about', { a: 1 })\n```\n\n## Links\n\n* [DEMO](https://tencent.github.io/omi/packages/omi-router/examples/simple/)\n* [Source](https://github.com/Tencent/omi/tree/master/packages/omi-router/examples/simple)\n\n## License\nThis content is released under the [MIT](http://opensource.org/licenses/MIT) License.\n"}});
//# sourceMappingURL=20.7729a37c.chunk.js.map