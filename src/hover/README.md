English | [简体中文](https://github.com/ZainChen/omi-vscode/blob/master/src/hover/README.CN.md)

# Omi mouse hover prompt function

Supported languages: `html`, `json`, `javascript`, `javascriptreact`, `typescript`, `typescriptreact`, `tex`, `c`, `cpp`, `css`, `markdown`, `php`, `python`, `jsonc`, `objective-c`, `xml`, `sql`, `java`, `swift`, `go`, `csharp`

## 1.structure

>hoverjson `[Mouseover prompt information configuration library]`
>
>>hover-omi.json `[omi]`
>>
>>hover-omiu.json `[omiu]`
>>
>>hover-package.json.json `[Prompt configuration of the package.json file]`
>>
>>hover-zain.json `[zain customize]`
>
>index.js `[Function implementation code]`

## 2.User-defined prompt information

(PS:This method is also suitable for adding hints in the `omi-vscode` source code. Welcome everyone to contribute: https://github.com/ZainChen/omi-vscode)

### 2.1.After installing the `omi` extension, go to the `omi` extension installation directory.

```
C:\Users\[your user]\.vscode-insiders[There are differences depending on the version of vscode]\extensions\zainchen.omi-*[* for omi version number]\src\hover\
```

Source code contribution directory

```
omi-vscode/tree/master/src/hover
```

### 2.2.Add a custom prompt profile

Create a new json file in the `hoverjson` folder. The file name is free and can be configured according to the specified file structure.

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