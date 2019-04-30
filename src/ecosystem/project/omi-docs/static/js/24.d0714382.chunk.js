webpackJsonp([24],{44:function(n,e){n.exports="## JSX\n\nJSX is the best UI expression with the least grammatical noise, the strongest expressive ability and Turing complete. The template engine is not complete, the template string is Turing complete, but the grammatical noise is too big. \n\n```js\nJSX > JS\n```\n\n## Hello JSX\n\nWith JSX, closed XML tags can be written in JS to express DOM structures, such as:\n\n```jsx\nconst element = <h1>Hello, world!</h1>\n```\n\n## Data binding\n\nVariables or expressions, or JS statement blocks, are wrapped in single parentheses according to the binding:\n\n```jsx\n<h1>{user.name}</h1>\n```\n\nTry it in Omi's render method:\n\n```jsx\ndefine('my-element', class extends WeElement {\n  render(props) {\n    return <h1>{props.name}</h1>\n  }\n})\n```\n\nUsing element:\n\n```jsx\n<my-element name='dntzhang' />\n```\n\nYou can also write expressions:\n\n```jsx\n<h1>{user.age > 18 ? 'Adult' : 'Minor'}<h1>\n```\n\nJSX can also be embedded in expressions:\n\n```jsx\n<h1>{ user.age > 18 ? <div>Adult</div> : <div>Minor</div> }<h1>\n```\n\nThe above three elements are actually if else. If only if, you can:\n\n```jsx\n<h1>{ user.age > 18 && <div>\u6210\u5e74</div> }<h1>\n```\n\nPowerful!\n\n## List rendering\n\nDatasource:\n\n```js\nconst arr = [{\n  message: 'foo',\n}, {\n  message: 'bar'\n}]\n```\n\nJSX rendering:\n\n```jsx\n<ul>\n  {arr.map(item =>\n    <li>{item.message}</li>\n  )}\n</ul>\n```\n\nEquate to:\n\n```jsx\n<ul>\n  {\n    arr.map(item => {\n      return <li>{item.message}</li>\n    })\n  }\n</ul>\n```\n\nIf it's a `{}'package, you need `return'. If you need an index:\n\n```jsx\n<ul>\n  {arr.map((item, index) =>\n    <li>{index}: {item.message}</li>\n  )}\n</ul>\n```\n\n## Comprehensive example\n\nHere is a ninety-nine multiplication table:\n\n```jsx\nimport { define, render, WeElement } from 'omi'\n\ndefine('my-app', class extends WeElement {\n\n  static css = `span{\n    display: inline-block;\n    width: 68px;\n  }`\n\n  render(props) {\n    return (\n      <div>\n        {props.numbers.map((a, indexA) =>\n          <div>\n            {\n              props.numbers.map((b, indexB) => {\n                return indexA <= indexB && <span>{a}*{b}={a * b} </span>\n              })\n            }\n          </div>\n        )}\n      </div>\n    )\n  }\n})\n\nrender(<my-app numbers={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />, 'body')\n```\n\nResult display:\n\n![](https://github.com/Tencent/omi/raw/master/assets/99.jpg)\n\n[\u2192 Online Demo](https://tencent.github.io/omi/packages/omi/examples/99/)"}});
//# sourceMappingURL=24.d0714382.chunk.js.map