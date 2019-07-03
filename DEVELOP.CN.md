# omi-vscode 开发

# 1.安装node_modules

```cpp
npm install
```

# 2.运行调试
DEBUG 菜单窗口选择 Extension，按 F5 调试。

# [结构说明]

>.vscode `[vscode 调试及其它配置]`
>>[extensions.json](./.vscode/extensions.json "extensions.json") `[具体作用暂未知]`
>>
>>[launch.json](./.vscode/launch.json "launch.json") `[运行调试具体配置]`
>
>assets `[资源文件]`
>>
>>...
>
>node_modules `[nodejs 模块库]`
>>
>>...
>
>src `[omi-vscode 所有功能实现代码]`
>>
>>algorithm `[算法库]`
>>>
>>>...
>>
>>completion `[代码补全功能]`
>>>
>>>...
>>
>>index.js `[所有功能代码入口]`
>
>test `[vscode 测试环境调试配置]`
>>
>>...
>
>[.eslintrc.json](./.eslintrc.json ".eslintrc.json") `[匹配工具，代码一致性，避免错误(具体作用暂未知)]`
>
>[.gitignore](./.gitignore ".gitignore") `[git 忽略指定文件或文件夹]`
>
>[.vscodeignore](./.vscodeignore ".vscodeignore") `[vscode 打包忽略指定文件或文件夹]`
>
>[CHANGELOG.CN.md](./CHANGELOG.CN.md "CHANGELOG.CN.md") `[omi-vscode 中文更新日志]`
>
>[CHANGELOG.md](./CHANGELOG.md "CHANGELOG.md") `[omi-vscode 英文更新日志]`
>
>[DEVELOP.CN.md](./DEVELOP.CN.md "DEVELOP.CN.md") `[omi-vscode 开发说明]`
>
>[jsconfig.json](./jsconfig.json "jsconfig.json") `[JavaScript 编译配置文件]`
>
>[LICENSE](./LICENSE "LICENSE") `[许可证]`
>
>[omi-\*.\*.\*.vsix](./ "omi-develop-\*.\*.\*.vsix") `[打包好的扩展文件]`
>
>[package.json](./package.json "package.json") `[omi-vscode 工程配置文件]`
>
>[package-lock.json](./package-lock.json "package-lock.json") `[omi-vscode 工程配置文件(自动生成)]`
>
>[README.CN.md](./README.CN.md "README.CN.md") `[omi-vscode 中文发行说明]`
>
>[README.md](./README.md "README.md") `[omi-vscode 英文发行说明]`
>
>tsconfig.json `[TypeScript编译文件(可用于TypeScript转JavaScript)(当前版本暂时删除)]`


