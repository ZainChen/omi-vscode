English | [简体中文](https://github.com/ZainChen/omi-vscode/blob/master/src/completion/README.CN.md)

# Omi mouse hover prompt function

Supported languages: `omi`, `vue`, `html`, `json`, `javascript`, `javascriptreact`, `typescript`, `typescriptreact`, `tex`, `c`, `cpp`, `css`, `markdown`, `php`, `python`, `jsonc`, `objective-c`, `xml`, `sql`, `java`, `swift`, `go`, `csharp`

## 1. structure

>config `[Mouseover prompt information configuration library]`
>
>>other `[Store other prompt information profiles]`
>>>
>>>other.json `[Customize other prompts]`
>>
>>omi.json `[Omi related tips]`
>>
>>omiu.json `[Omiu related tips]`
>>
>>package.json `[package.json file related tips]`
>>
>
>index.js `[Function implementation code]`
>
>README.CN.md `[Chinese documentation]`
>
>README.md `[English documentation]`

## 2. User-defined prompt information

(PS:This method is also suitable for adding hints in the `omi-vscode` source code. Welcome everyone to contribute: https://github.com/ZainChen/omi-vscode)

### 2.1. After installing the `omi` extension, go to the `omi` extension installation directory.

```
C:\Users\[your user]\.vscode-insiders[There are differences depending on the version of vscode]\extensions\zainchen.omi-*[* for omi version number]\src\hover\
```

Source code contribution directory

```
omi-vscode/tree/master/src/hover
```

### 2.2. Add a custom prompt profile

Create a new json file in the `config` folder. The file name is free and can be configured according to the specified file structure, support for adding any subfolders.

(PS:There are multiple prompt information matches in the current line, which will be followed by a prompt)

Configuration file structure description:

```js
{
    "fileTypes": [ ".*", ".js", "zain.js" ],  //File type that supports mouse prompts, '.*' is any type, '.js' is the specified suffix name, and 'zain.js' is the specified file.
    "hovers": {  //All tips
        "o-button": {  //A prompt message configuration
            "keyword": "o-button",  //Keyword matching keyword
            "matchingMethod": "line",  //Match mode (the entire line of the line cursor matches; continuous string matches the continuous string without spaces)
            "ignoreAZ": false,  //Whether to ignore case (true ignore, false not ignore)
            "markdownText": "markdown text"  //Prompt text, support Markdown
        },
        "o-icon": {
            "keyword": "o-icon",
            "matchingMethod": "continuous",
            "ignoreAZ": true,
            "markdownText": "markdown text"
        }
}
```