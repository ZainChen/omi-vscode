[English](https://github.com/ZainChen/omi-vscode/blob/master/src/hover/README.md) | 简体中文

# Omi 鼠标悬停提示功能

支持语言：`omi`, `vue`, `html`, `json`, `javascript`, `javascriptreact`, `typescript`, `typescriptreact`, `tex`, `c`, `cpp`, `css`, `markdown`, `php`, `python`, `jsonc`, `objective-c`, `xml`, `sql`, `java`, `swift`, `go`, `csharp`

## 1. 结构

>config `[鼠标悬停提示信息配置库]`
>
>>other `[存放其它提示信息配置文件]`
>>>
>>>other.json `[自定义其它提示信息]`
>>
>>omi.json `[omi 相关提示]`
>>
>>omiu.json `[omiu 相关提示]`
>>
>>package.json `[package.json 文件相关提示]`
>>
>
>index.js `[功能实现代码]`
>
>README.CN.md `[中文说明文档]`
>
>README.md `[英文说明文档]`

## 2. 用户自定义提示信息

(PS:此方法也适用于在`omi-vscode`源码中添加提示，欢迎大家贡献：https://github.com/ZainChen/omi-vscode)

### 2.1. 安装好 `omi` 扩展后，进入 `omi` 扩展安装目录

```
C:\Users\[你的用户名]\.vscode-insiders[根据vscode版本不同有区别]\extensions\zainchen.omi-*[*为omi版本号]\src\hover\
```

源码贡献目录

```
omi-vscode/tree/master/src/hover
```

### 2.2. 添加自定义提示配置文件

在 `config` 文件夹中新建 json 文件，文件名随意，按指定文件结构配置即可，支持添加任意子文件夹。

(PS:当前行有多个提示信息匹配会依次尾加提示)

配置文件结构说明：

```js
{
    "fileTypes": [ ".*", ".js", "zain.js" ],  //支持鼠标提示的文件类型及具体文件，'.*'为任意类型，'.js'为指定后缀名，'zain.js'为指定文件
    "hovers": {  //所有提示信息
        "o-button": {  //一个提示信息配置
            "keyword": "o-button",  //提示信息匹配的关键字
            "matchingMethod": "line",  //匹配模式(line光标所在整行匹配；continuous光标所在不含空格的连续字符串匹配)
            "ignoreAZ": false,  //是否忽略大小写(true忽略，false不忽略)
            "markdownText": "markdown text"  //提示文本，支持Markdown
        },
        "o-icon": {
            ...
        }
}
```