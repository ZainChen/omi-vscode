[English](https://github.com/ZainChen/omi-vscode/blob/master/src/completion/README.md) | 简体中文

# Omi 代码补全功能

(PS: 暂只支持 omi 组件补全)

支持语言：`omi`, `vue`, `html`, `json`, `javascript`, `javascriptreact`, `typescript`, `typescriptreact`, `tex`, `c`, `cpp`, `css`, `markdown`, `php`, `python`, `jsonc`, `objective-c`, `xml`, `sql`, `java`, `swift`, `go`, `csharp`

## 1. 结构

>config `[代码补全配置库]`
>
>>test `[存放用于测试的代码补全配置文件]`
>>>
>>>test.json `[自定义用于测试的代码补全]`
>>
>>omiu.json `[omiu 相关代码补全]`
>>
>index.js `[功能实现代码]`
>
>README.CN.md `[中文说明文档]`
>
>README.md `[英文说明文档]`

## 2. 用户自定义代码补全信息

(PS:此方法也适用于在`omi-vscode`源码中添加代码补全，欢迎大家贡献：https://github.com/ZainChen/omi-vscode)

### 2.1. 安装好 `omi` 扩展后，进入 `omi` 扩展安装目录

```
C:\Users\[你的用户名]\.vscode-insiders[根据vscode版本不同有区别]\extensions\zainchen.omi-*[*为omi版本号]\src\completion\
```

源码贡献目录

```
omi-vscode/tree/master/src/completion
```

### 2.2. 添加自定义代码补全配置文件

在 `config` 文件夹中新建 json 文件，文件名随意，按指定文件结构配置即可，支持添加任意子文件夹。

(PS: 当前行有多个提示信息匹配会依次尾加提示)

配置文件结构说明：

```js
{
    "fileTypes": [ ".*", '.js', 'zain.js' ],  //支持当前配置文件代码补全的文件类型及具体文件，'.*'为任意类型，'.js'为指定后缀名，'zain.js'为指定文件
    "completion": {  //所有补全信息
        "o-button": {  //一个补全信息配置
            "label": "o-button",
            "kind": 24,
            "detail": "...",
            "sortText": "a",
            "cmd": false,
            "attribute": {
                "type": {
                    "label": "type",
                    "kind": 22,
                    "detail": "[omiu]o-button",
                    "insertText": "type='${1|primary,default,warn,vcode|}'",
                    "documentation": "...",
                    "sortText": "a",
                    "cmd": false
                },
                "size": {
                    ...
                }
            }
        },
        "o-icon": {
            ...
        }
    }
}
```