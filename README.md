English | [简体中文](https://github.com/ZainChen/omi-vscode/blob/master/README.CN.md)

# Omi Visual Studio Code extension
[![VisualStudioMarketplace](https://img.shields.io/badge/VisualStudioMarketplace-v2.2.0-orange.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)
[![Downloads](https://img.shields.io/badge/Downloads-5.5K%2B-brightgreen.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)
[![UpdateTime](https://img.shields.io/badge/UpdateTime-2019%2F06%2F18%2023%3A00%3A00-blue.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)

This extension adds omi support for Visual Studio Code.

# Function
- Welcome omi `[Welcome Screen]`
- Omi component tag and attribute completion `[Completion prompt for markdown format]`
- Omi mouse hover prompt, the prompt content is in markdown format (Complete library contains omiu and omim components) `[Support user-defined add component completion information, press TAB to jump to the transition location]`
- Omi custom code highlighting injection `[Tag attribute values support json highlighting, support omi css highlighting]`
- Omi snippets `[Omi Common clip, press TAB to jump to the transition positionn]`

# Development Plan
- Omi ecosystem `[All branches and versions(Upgrading, temporarily closed)]`
- GitHub switch `[GitHub tree view to switch url(Upgrading, temporarily closed)]`
- GitHub file view `[open github file(Upgrading, temporarily closed)]`
- Gitgub file download function. `[Any files and folders(Upgrading, temporarily closed)]`

# Function Description

## Omi Welcome
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun7.gif" alt="omi"/></p>

## Label and attribute completion
User-defined completion information: https://github.com/ZainChen/omi-vscode/blob/master/src/completion/README.md
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun1.gif" alt="omi"/></p>

## Hover
User-defined prompt information: https://github.com/ZainChen/omi-vscode/blob/master/src/hover/README.md
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun9.gif" alt="omi"/></p>

## Code highlighting injection
Custom code highlighting injection `[Html file tag attribute support json highlight, omi css highlight]`
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun10.png" alt="omi"/></p>

## Function snippets
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun3.gif" alt="omi"/></p>

## Omi set
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun8.png" alt="omi"/></p>

# About

https://github.com/Tencent/omi

<p align="center"><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/omi-logo2019.png" alt="omi" width="100"/></p>
<p align="center"><img src="https://tencent.github.io/omi/assets/omi-inside-outside.jpg" alt="omi" width="1000"/></p>
<h2 align="center">Omi -  Front End Cross-Frameworks Framework</h2>
<p align="center">Merge Web Components, JSX, HTM, Virtual DOM and Proxy into one framework with tiny size and high performance. Write components once, using in everywhere, such as Omi, React, Vue or Angular.</p>

## Ecosystem of Omi

#### Base

| **Project**                         | **Description**                           |
| ------------------------------- | ----------------------------------- |
| [omi-docs](https://tencent.github.io/omi/site/docs/index.html)| Omi official documents |
| [omim![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png)](https://github.com/Tencent/omi/tree/master/packages/omim)| Cross-Frameworks components, powered by Material Design and Omi.([DOCS & REPL](https://tencent.github.io/omi/packages/omim/docs/build/index.html) && [JOIN US!](https://github.com/Tencent/omi/tree/master/packages/omim#contribution))|
| [omio![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/omio)| Omi for old browsers with same api(IE8+)|
| [omis](https://github.com/Tencent/omi/tree/master/packages/omis)| Server-side rendering(support omio only)|
| [omi-router](https://github.com/Tencent/omi/tree/master/packages/omi-router) |Omi official router in 1KB js|
| [omi-cli](https://github.com/Tencent/omi/tree/master/packages/omi-cli)| Project scaffolding. [→ Base Templates](https://github.com/Tencent/omi/tree/master/packages/omi-cli/template) and [→ Other Templates](https://github.com/omijs) |
| [omi-devtools](https://github.com/f/omi-devtools)| Browser DevTools extension |
| [omiu](https://tencent.github.io/omi/packages/omiu/examples/build/index.html)| Simple Omi UI |
| [omil](https://github.com/Wscats/omil)|Webpack loader for Omi.js components|
| [omi-snippets](https://github.com/Wscats/omi-snippets) |A beautify VSCode extension for .omi or .eno file, [Install now!](https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets)|

#### Mini Program(小程序)

| **Project**                         | **Description**                           |
| ------------------------------- | ----------------------------------- |
| [omi-cloud![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/omi-cloud)| 小程序•云开发|
| [omip![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/omip)| 直接使用 Omi 开发小程序或 H5 SPA|
| [mps![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/mps)| 原生小程序增强框架(JSX + Less 输出 WXML + WXSS)，也支持 QQ 轻应用 |
| [cax![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png)](https://github.com/Tencent/omi/tree/master/packages/cax)| 小程序 Canvas 和 SVG 渲染引擎 |
| [omix](https://github.com/Tencent/omi/tree/master/packages/omix)| 极小却精巧的小程序框架|
| [omi-mp](https://github.com/Tencent/omi/tree/master/packages/omi-mp)| 通过微信小程序开发和生成 Web 单页应用(H5 SPA)|
| [comi](https://github.com/Tencent/omi/tree/master/packages/comi)| 小程序代码高亮和 markdown 渲染组件 |
| [wx-touch-event](https://github.com/qbright/wx-touch-event)| 基于 AlloyFinger/omi-finger 改造的小程序手势解决方案 |

#### Other

| **Project**                         | **Description**                           |
| ------------------------------- | ----------------------------------- |
| [omi-chart](https://github.com/Tencent/omi/tree/master/packages/omi-chart)| Simple HTML5 Charts using chart-x tag.|
| [md2site](https://tencent.github.io/omi/assets/md2site/)| Static Site Generator with markdown powered by Omio.|
| [omi-mvvm](https://github.com/Tencent/omi/blob/master/tutorial/omi-mvvm.md)| MVVM comes back bravely with [mappingjs](https://github.com/Tencent/omi/tree/master/packages/mappingjs) strong support.|
| [omi-30-seconds](https://github.com/Tencent/omi/tree/master/packages/omi-30-seconds)| Useful Omi snippets that you can understand in 30 seconds.|
| [omi-canvas](https://github.com/Tencent/omi/tree/master/packages/omi-canvas)| Perfect fusion of web components, jsx and canvas.|
| [omi-swiper](https://github.com/loo41/Omi-Swiper)| Omi + Swiper  |
| [omi-vscode](https://github.com/ZainChen/omi-vscode)| VSCode extension for omi, [Install now!](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi) |
| [omi-ex](https://github.com/Tencent/omi/tree/master/packages/omi-ex)| Omi.js extension(TypeScript) |
| [omi-transform](https://github.com/Tencent/omi/tree/master/packages/omi-transform)|Omi / [css3transform](https://tencent.github.io/omi/packages/omi-transform/css3transform/) integration. Made css3 transform super easy in your Omi project.|
| [omi-tap](https://github.com/Tencent/omi/releases/tag/v4.0.24)| Native tap event support(omi v4.0.24+）|
| [omi-finger](https://github.com/Tencent/omi/tree/master/packages/omi-finger)|Support touch and gesture events in your Omi project.|
| [omi-touch](https://github.com/Tencent/omi/tree/master/packages/omi-touch)|Smooth scrolling, rotation, pull to refresh and any motion for the web.|
| [omi-native](https://github.com/Tencent/omi/tree/master/packages/omi-native)|Render web components to native|
|[omi-i18n](https://github.com/i18next/omi-i18n)| Internationalization solution for omi.js using i18next ecosystem |
| [omi-page](https://github.com/Tencent/omi/tree/master/packages/omi-page) |Tiny client-side router by [page](https://github.com/visionmedia/page.js)|

## Why Omi?

- Cross framework(react, vue, angular) custom elements by omi
- One framework. Mobile & desktop & mini program
- [Super fast rendering and updating](https://tencent.github.io/omi/packages/omi/examples/perfs/)
- Tiny size
- Supports TypeScript
- Reactive data-binding
- Having Cross-frameworks UI components - [omim](https://tencent.github.io/omi/packages/omim/docs/build/index.html)
- Excellent compatibility(IE8+) with [omio](https://github.com/Tencent/omi/tree/master/packages/omio)
- Real [MVVM](https://github.com/Tencent/omi/blob/master/tutorial/omi-mvvm.md) with [mappingjs](https://github.com/Tencent/omi/tree/master/packages/mappingjs) strong support
- Enhanced CSS, [rpx unit support](https://github.com/Tencent/omi/releases/tag/v4.0.26) base on **750** screen width
- Compliance with browser trend and API design
- Merge [**Web Components**](https://developers.google.com/web/fundamentals/web-components/), [**JSX**](https://reactjs.org/docs/introducing-jsx.html) and [**HTM**](https://github.com/developit/htm) into one framework
- Web Components can also be a data-driven view, **`UI = fn(data)`**.
- JSX is the best development experience (code intelligent completion and tip) UI Expression with least [grammatical noise](https://github.com/facebook/jsx#why-not-template-literals) and it's turing complete(template engine is not, es template string is but grammatical noise is too loud)
- Look at [Facebook React vs Web Components](https://softwareengineering.stackexchange.com/questions/225400/pros-and-cons-of-facebooks-react-vs-web-components-polymer)，Omi **combines their advantages** and gives developers the **freedom to choose the way they like**
- **Shadow DOM merges with Virtual DOM**, Omi uses both virtual DOM and real Shadow DOM to make view updates more accurate and faster
- **Scoped CSS**'s best solution is [**Shadow DOM**](https://developers.google.com/web/fundamentals/web-components/shadowdom), the community churning out frameworks and libraries for Scoped CSS (using JS or JSON writing styles such as Radium, jsxstyle, react-style; binding to webpack using generated unique `className` `filename-classname-hash`, such as CSS Modules, Vue), are hack technologies; _and Shadow DOM Style is the perfect solution_.
- The original **Path Updating** **store system**. Proxy-based automatic **accurate** update, **low power consumption**, high degree of freedom, excellent performance, easy integration of `requestIdleCallback`,It will automatically update UI partially when data is changed

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
# Contributors

| [<img src="https://avatars2.githubusercontent.com/u/7917954?s=60&amp;v=4" width="60px;"/><br /><sub>dntzhang</sub>](https://github.com/dntzhang)<br />[💻](https://github.com/Tencent/omi "Code") [📖](https://github.com/Tencent/omi "Documentation") [⚠️](https://github.com/Tencent/omi "Tests") | [<img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/zain.png" width="60px;"/><br /><sub>ZainChen</sub>](https://github.com/ZainChen)<br />[💻](https://zainzy.com "Code") [📖](https://zainzy.com "Documentation") [⚠️](https://zainzy.com "Tests") |
| :---: | :---: |

<!-- |  |  | -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
