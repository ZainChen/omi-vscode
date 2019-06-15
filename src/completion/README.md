English | [简体中文](https://github.com/ZainChen/omi-vscode/blob/master/src/completion/README.CN.md)

# Omi code completion function

(PS: Only support omi component completion)

Supported languages: `omi`, `vue`, `html`, `json`, `javascript`, `javascriptreact`, `typescript`, `typescriptreact`, `tex`, `c`, `cpp`, `css`, `markdown`, `php`, `python`, `jsonc`, `objective-c`, `xml`, `sql`, `java`, `swift`, `go`, `csharp`

## 1. structure

>config `[Code completion configuration library]`
>
>>test `[Store the code completion configuration file for testing]`
>>>
>>>test.json `[Custom code completion for testing]`
>>
>>omiu.json `[Omiu related completion]`
>>
>>omim.json `[Omim related completion]`
>>
>index.js `[Function implementation code]`
>
>README.CN.md `[Chinese documentation]`
>
>README.md `[English documentation]`

## 2. User-defined code completion information

(PS: This method is also suitable for adding code completion in the `omi-vscode` source code. Welcome everyone to contribute：https://github.com/ZainChen/omi-vscode)

### 2.1. After installing the `omi` extension, go to the `omi` extension installation directory.

```
C:\Users\[Your username]\.vscode-insiders[There are differences depending on the version of vscode]\extensions\zainchen.omi-*[* for omi version number]\src\completion\
```

Source code contribution directory

```
omi-vscode/tree/master/src/completion
```

### 2.2. Add a custom code completion profile

Create a new json file in the `config` folder. The file name is free. It can be configured according to the specified file structure. Any subfolder can be added.

(PS: If there are multiple prompts in the current row, the matching will be followed by a prompt.)

Configuration file structure description:

```js
{
  "fileTypes": [ ".*", '.js', 'zain.js' ],  // Supports the file type and specific file of the current configuration file code completion, '.*' is any type, '.js' is the specified suffix name, and 'zain.js' is the specified file
  "completion": {  // All completion information
    "o-button": {  // One label completion information configuration
      "label": "o-button",  // Match keyword
      "kind": 24,  // Completion type, determine the icon style on the left
      "detail": "...",  // Prompt message
      "insertText": "<o-button${1}>${2}</o-button>",  // Inserted content
      "documentation": "...",  // Markdown description
      "sortText": "a",  // Weight sort
      "cmd": false,  // Whether to open a new completion prompt immediately after completion
      "attribute": {  // Current tag all attribute completion information configuration
        "type": {  // An attribute completion information configuration
          "label": "type",  // Match keyword
          "kind": 22,  // Completion type, determine the icon style on the left
          "detail": "[omiu]o-button",  // Prompt message
          "insertText": "type='${1|primary,default,warn,vcode|}'",  // Inserted content
          "documentation": "...",  // Markdown description
          "sortText": "a",  // Weight sort
          "cmd": false  // Whether to open a new completion prompt immediately after completion
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