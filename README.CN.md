[English](https://github.com/ZainChen/omi-vscode/blob/master/README.md) | 简体中文

# Omi Visual Studio Code 扩展
[![VisualStudioMarketplace](https://img.shields.io/badge/VisualStudioMarketplace-v2.1.8-orange.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)
[![Downloads](https://img.shields.io/badge/Downloads-5.1K%2B-brightgreen.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)
[![UpdateTime](https://img.shields.io/badge/UpdateTime-2019%2F06%2F15%2009%3A30%3A25-blue.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)

此扩展添加了对 Visual Studio Code 的 omi 支持。

# 功能
- Omi 欢迎界面 `[欢迎大家使用 Omi]`
- Omi 组件标签和属性补全, 补全提示支持 markdown `[支持用户自定义添加补全信息, 按 TAB 跳转到过渡位置]`
- Omi 鼠标悬停提示, 提示内容支持 markdown `[支持用户自定义添加提示信息]`
- Omi 自定义代码高亮注入 `[标签属性支持 json 高亮, omi css 高亮]`
- Omi 片段 `[omiu 所有组件片段, 按 TAB 跳转到过渡位置]`

# 开发计划
- Omi 生态系统 `[所有模板下载图形界面]`
- GitHub 切换 `[GitHub 菜单树视图切换任意项目(正在升级，暂时关闭)]`
- GitHub 文件视图 `[打开 GitHub 文件(正在升级，暂时关闭)]`
- Gitgub 文件下载功能 `[任意文件和文件夹(正在升级，暂时关闭)]`

# 功能说明

## Omi 欢迎界面
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun7.png" alt="omi"/></p>

## 标签补全
用户自定义提示信息说明: https://github.com/ZainChen/omi-vscode/blob/master/src/completion/README.md
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun1.gif" alt="omi"/></p>

## 属性补全
用户自定义提示信息说明: https://github.com/ZainChen/omi-vscode/blob/master/src/completion/README.md
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun2.gif" alt="omi"/></p>

## 鼠标悬停提示
用户自定义提示信息说明: https://github.com/ZainChen/omi-vscode/blob/master/src/hover/README.md
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun9.gif" alt="omi"/></p>

## 代码高亮注入
自定义代码高亮注入 `[html 文件标签属性支持 json 高亮]`
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun10.png" alt="omi"/></p>

## 片段功能
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun3.gif" alt="omi"/></p>

## Omi 生态 (即将开发)
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun5.gif" alt="omi"/></p>

## GitHub 切换 (正在升级，暂时关闭)
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun4.gif" alt="omi"/></p>

## GitHub 文件视图和下载 (正在升级，暂时关闭)
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun6.gif" alt="omi"/></p>

## Omi 设置
<p><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/function/fun8.png" alt="omi"/></p>

# 关于

https://github.com/Tencent/omi

<p align="center"><img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/omi-logo2019.png" alt="omi" width="100"/></p>
<p align="center"><img src="https://tencent.github.io/omi/assets/omi-inside-outside.jpg" alt="omi" width="1000"/></p>
<h2 align="center">Omi - 前端跨框架跨平台框架</h2>
<p align="center"><b>基于 Web Components 并支持 IE8+(omio)，小程序(omip) 和 任意前端框架集成</b></p>

## Omi 生态

[→ Omi 生态学习路线图](https://github.com/Tencent/omi/tree/master/assets/rm.md)

#### 基础生态

| **项目**                         | **描述**                           |
| ------------------------------- | ----------------------------------- |
| [omi-docs](https://tencent.github.io/omi/site/docs/cn.html)| Omi 官方文档 |
| [omim![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png)](https://github.com/Tencent/omi/tree/master/packages/omim)|  Omi 打造的跨框架 Material Design UI 组件库, 任意框架可以使用,([DOCS & REPL](https://tencent.github.io/omi/packages/omim/docs/build/cn.html) && [加入我们](https://github.com/Tencent/omi/tree/master/packages/omim#contribution)!)|
| [omio![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/omio)| 兼容老浏览器的 Omi 版本(支持到IE8+)|
| [omis](https://github.com/Tencent/omi/tree/master/packages/omis)| 服务端同构渲染解决方案(目前只能用 omio) |
| [omiu](https://tencent.github.io/omi/packages/omiu/examples/build/zh-cn.html)| 简单 Omi UI|
| [omi-router ](https://github.com/Tencent/omi/tree/master/packages/omi-router) |Omi 官方路由,超级小的尺寸，只有 1KB 的 js|
| [omi-devtools](https://github.com/f/omi-devtools)| 谷歌浏览器开发工具扩展|
| [omi-cli](https://github.com/Tencent/omi/tree/master/packages/omi-cli)| 项目脚手架工具，各种模板任你选 [→ 基础模板](https://github.com/Tencent/omi/tree/master/packages/omi-cli/template) and [→ 其他模板](https://github.com/omijs) |
|[omil](https://github.com/Wscats/omil)| Omi components 的 Webpack loader |
| [omi-snippets](https://github.com/Wscats/omi-snippets) | VSCodse omi 文件扩展, [立即安装!](https://marketplace.visualstudio.com/items?itemName=Wscats.omi-snippets)|

#### 小程序生态

| **项目**                         | **描述**                           |
| ------------------------------- | ----------------------------------- |
| [omi-cloud![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/omi-cloud)| 小程序•云开发|
| [omip![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/omip)| 直接使用 Omi 开发小程序或 H5 SPA|
| [mps![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png) ](https://github.com/Tencent/omi/tree/master/packages/mps)| 原生小程序增强框架(JSX + Less 输出 WXML + WXSS)，也支持 QQ 轻应用  |
| [cax![](https://raw.githubusercontent.com/dntzhang/cax/master/asset/hot.png)](https://github.com/Tencent/omi/tree/master/packages/cax)| 小程序 Canvas 和 SVG 渲染引擎 |
| [omix](https://github.com/Tencent/omi/tree/master/packages/omix)| 极小却精巧的小程序框架|
| [omi-mp](https://github.com/Tencent/omi/tree/master/packages/omi-mp)| 通过微信小程序开发和生成 Web 单页应用(H5 SPA)|
| [comi](https://github.com/Tencent/omi/tree/master/packages/comi)| 小程序代码高亮和 markdown 渲染组件 |
| [wx-touch-event](https://github.com/qbright/wx-touch-event)| 基于 AlloyFinger/omi-finger 改造的小程序手势解决方案 |

#### 其他

| **项目**                         | **描述**                           |
| ------------------------------- | ----------------------------------- |
| [md2site](https://tencent.github.io/omi/assets/md2site/)| 用 markdown 生成静态网站文档.|
| [omi-mvvm](https://github.com/Tencent/omi/blob/master/tutorial/omi-mvvm.cn.md)| MVVM 王者归来, [mappingjs](https://github.com/Tencent/omi/tree/master/packages/mappingjs) 强力加持。|
| [omi-chart](https://github.com/Tencent/omi/tree/master/packages/omi-chart)| 一个 chart-x 标签搞定报表|
| [mp-mvvm ](https://github.com/Tencent/omi/tree/master/packages/mp-mvvm)| 小程序插上 MVVM 的翅膀, [mappingjs](https://github.com/Tencent/omi/tree/master/packages/mappingjs) 强力加持。|
| [omi-30-seconds](https://github.com/Tencent/omi/tree/master/packages/omi-30-seconds)| 30 秒理解一段有用的 Omi 代码片段.|
| [omi-swiper](https://github.com/loo41/Omi-Swiper)| Omi + Swiper  |
| [omi-vscode](https://github.com/ZainChen/omi-vscode)| Vscode extension for omi, [Install now!](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi) |
| [omi-sprite](https://github.com/Tencent/omi/tree/master/packages/omi-sprite)| Web Components, JSX 和 Canvas 的完美融合|
| [omi-canvas](https://github.com/Tencent/omi/tree/master/packages/omi-canvas)| Web Components, JSX 和 Canvas 的完美融合|
| [omi-ex](https://github.com/Tencent/omi/tree/master/packages/omi-ex)| Omi.js 扩展(TypeScript) |
| [omi-transform](https://github.com/Tencent/omi/tree/master/packages/omi-transform)|Omi 和 [css3transform](https://tencent.github.io/omi/packages/omi-transform/css3transform/) 完美结合. 让 css3 transform 在你的 Omi项目中变得超级简单.|
| [omi-tap](https://github.com/Tencent/omi/releases/tag/v4.0.24)| Omi 原生支持 tap 事件（omi v4.0.24+）|
| [omi-finger](https://github.com/Tencent/omi/tree/master/packages/omi-finger)|Omi 官方手势库|
| [omi-touch](https://github.com/Tencent/omi/tree/master/packages/omi-touch)|丝般顺滑的触摸运动|
| [omi-snap](https://github.com/Tencent/omi/blob/master/tutorial/omi-snap.cn.md)|预渲染骨架屏|
|[omi-i18n](https://github.com/i18next/omi-i18n)| Omi 国际化解决方案 |
| [omi-page](https://github.com/Tencent/omi/tree/master/packages/omi-page) | 基于 [page.js](https://github.com/visionmedia/page.js) 的 Omi 路由|

### 特性

- 框架无关，任何框架可以使用 Omi 自定义元素
- 提供桌面、移动和小程序整体解决方案
- [超快的更新和渲染](https://tencent.github.io/omi/packages/omi/examples/perfs/)
- 小巧的尺寸
- 拥有官方跨框架 UI 组件库 - [omim](https://tencent.github.io/omi/packages/omim/docs/build/cn.html)
- 使用 [omio](https://github.com/Tencent/omi/tree/master/packages/omio) 可以兼容到 IE8
- 真正的 [MVVM](https://github.com/Tencent/omi/blob/master/tutorial/omi-mvvm.cn.md), 拥有 [mappingjs](https://github.com/Tencent/omi/tree/master/packages/mappingjs) 强力支持
- 支持 `TypeScript`
- 响应式数据绑定
- 增强了 CSS, [支持 rpx 单位](https://github.com/Tencent/omi/releases/tag/v4.0.26)，基于 **750** 屏幕宽度
- [基于 Shadow Dom 设计](https://developers.google.cn/web/fundamentals/web-components/shadowdom?hl=zh-cn)
- 利用[Chrome 开发工具扩展 ](https://github.com/f/omi-devtools)轻松调试，[从 Chrome 应用商店安装](https://chrome.google.com/webstore/detail/omijs-devtools/pjgglfliglbhpcpalbpeloghnbceocmd/related)
- 符合浏览器的发展趋势以及API设计理念
- [**Web Components**](https://developers.google.com/web/fundamentals/web-components/) + [**JSX**](https://reactjs.org/docs/introducing-jsx.html) + [**HTM**](https://github.com/developit/htm) 融合为一个框架 Omi
- Web Components 也可以数据驱动视图, `UI = fn(data)`
- JSX 是开发体验最棒(智能提示)、[语法噪音最少](https://github.com/facebook/jsx#why-not-template-literals)、图灵完备的 UI 表达式，模板引擎不完备，模板字符串完备但是语法噪音太大
- 看看[Facebook React 和 Web Components对比优势](https://www.cnblogs.com/rubylouvre/p/4072979.html)，Omi 融合了各自的优点，而且给开发者自由的选择喜爱的方式
- `Shadow DOM` 与 `Virtual DOM` 融合，Omi 既使用了`虚拟 DOM`，也是使用真实 `Shadow DOM`，让视图更新更准确更迅速
- 局部 CSS 最佳解决方案(`Shadow DOM`)，社区为局部 CSS 折腾了不少框架和库(使用js或json写样式，如:`Radium`，`jsxstyle`，`react-style`；与webpack绑定使用生成独特的className`文件名—类名—hash值`，如：`CSS Modules`，`Vue`)，还有运行时注入`scoped atrr` 的方式，都是 hack 技术；`Shadow DOM Style` 是最完美的方案
- 独创的 `Path Updating`的 `store` 系统，基于 Proxy 全自动化的精准更新，功耗低，自由度高，性能卓越，方便集成 `requestIdleCallback`，自动化按需更新局部视图

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
# Contributors

| [<img src="https://avatars2.githubusercontent.com/u/7917954?s=60&amp;v=4" width="60px;"/><br /><sub>dntzhang</sub>](https://github.com/dntzhang)<br />[💻](https://github.com/Tencent/omi "Code") [📖](https://github.com/Tencent/omi "Documentation") [⚠️](https://github.com/Tencent/omi "Tests") | [<img src="https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/zain.png" width="60px;"/><br /><sub>ZainChen</sub>](https://github.com/ZainChen)<br />[💻](https://zainzy.com "Code") [📖](https://zainzy.com "Documentation") [⚠️](https://zainzy.com "Tests") |
| :---: | :---: |

<!-- |  |  | -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
