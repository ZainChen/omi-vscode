# omi-vscode 开发

# 1.安装node_modules

```cpp
npm install
```

# 2.结构说明

>.vscode `vscode调试配置`
>>[extensions.json](./.vscode/extensions.json "extensions.json") `(具体作用暂未知)`
>>
>>[launch.json](./.vscode/launch.json "launch.json") `运行调试具体配置`
>
>assets `资源文件`
>>
>>...
>
>node_modules `nodejs模块库`
>>
>>...
>
>src `omi-vscode所有功能实现代码`
>>
>>...
>
>test `vscode测试环境调试配置`
>>
>>...
>
>[.eslintrc.json](./.eslintrc.json ".eslintrc.json") `匹配的工具，代码一致性，避免错误(具体作用暂未知)`
>
>[.gitignore](./.gitignore ".gitignore") `git忽略指定文件配置`
>
>[.vscodeignore](./.vscodeignore ".vscodeignore") `vscode忽略文件(具体作用暂未知)`
>
>[CHANGELOG.md](./CHANGELOG.md "CHANGELOG.md") `omi-vscode更新日志`
>
>[DEVELOP.CN.md](./DEVELOP.CN.md "DEVELOP.CN.md") `omi-vscode开发文档`
>
>[jsconfig.json](./jsconfig.json "jsconfig.json") `JavaScript编译配置文件`
>
>[LICENSE](./LICENSE "LICENSE") `许可证`
>
>[omi-\*.\*.\*.vsix](./ "omi-develop-\*.\*.\*.vsix") `打包好的扩展文件`
>
>[package.json](./package.json "package.json") `omi-vscode工程配置文件`
>
>[package-lock.json](./package-lock.json "package-lock.json") `omi-vscode工程配置文件(默认)`
>
>[README.md](./README.md "README.md") `omi-vscode发行说明`
>
>[tsconfig.json](./tsconfig.json "tsconfig.json") `TypeScript编译文件(可用于TypeScript转JavaScript)`

# 3.Pending upgrade...

