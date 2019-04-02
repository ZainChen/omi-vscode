const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

//zain自定义模块
const alg = require("../algorithm/index");  //算法模块


module.exports = {
    provideHoverJson
}

/**
 * json文件鼠标悬停提示配置
 * @param document — 调用命令的文档。
 * @param position — 调用命令的位置。
 * @param token — 取消令牌。
 * @return 提示内容
 */
function provideHoverJson(document, position, token) {
	const fileName	= document.fileName;
	const workDir	= path.dirname(fileName);
	const line      = document.lineAt(position);
	const word		= document.getText(document.getWordRangeAtPosition(position));
	
	//指定omi-vscode/package.json配置文件提示内容
	if (alg.strTailMatch(fileName, "omi-vscode\\package.json", 2)) {
		return hoverVomiPackage(document, position, token);
	}

	//package.json配置文件提示内容
	if (alg.strTailMatch(fileName, "package.json", 2)) {
		return hoverVomiPackage(document, position, token);
	}


	

	return new vscode.Hover(`zain`);

}

/**
 * 指定omi-vscode/package.json配置文件提示内容
 * @param document — 调用命令的文档。
 * @param position — 调用命令的位置。
 * @param token — 取消令牌。
 * @return 提示内容
 */
function hoverVomiPackage(document, position, token) {
	const fileName	= document.fileName;
	const workDir	= path.dirname(fileName);
	const line      = document.lineAt(position);
	const word		= document.getText(document.getWordRangeAtPosition(position));

	let showText = ``;
	let bHaveText = 0;

	if(line.text.indexOf("\"name\"") != -1)                                  { bHaveText += 1; showText += `\n\n* [键] "name"：扩展包名称，vsce package 命令打包后的文件名。`; }
	if(line.text.indexOf("\"displayName\"") != -1)                           { bHaveText += 1; showText += `\n\n* [键] "displayName"：扩展发布显示名称。`; }
	if(line.text.indexOf("\"description\"") != -1)                           { bHaveText += 1; showText += `\n\n* [键] "description"：描述内容，可以帮助人们发现您的包，因为它被列在“npm搜索引擎”中。`; }
	if(line.text.indexOf("\"version\"") != -1)                               { bHaveText += 1; showText += `\n\n* [键] "version"：扩展包版本号，版本必须能够被node-semver解析，它作为依赖项与npm绑定在一起。`; }
	if(line.text.indexOf("\"publisher\"") != -1)                             { bHaveText += 1; showText += `\n\n* [键] "publisher"：VS Code 扩展发布者。`; }
	if(line.text.indexOf("\"icon\"") != -1)                                  { bHaveText += 1; showText += `\n\n* [键] "icon"：扩展logo，网上浏览，128 x 128 像素图标。`; }
	if(line.text.indexOf("\"homepage\"") != -1)                              { bHaveText += 1; showText += `\n\n* [键] "homepage"：项目主页(必须为网址url)，*.md(Markdown)文件。`; }
	if(line.text.indexOf("\"repository\"") != -1)                            { bHaveText += 1; showText += `\n\n* [键] "repository"：代码储存库，指定源码所在的位置，这对那些想要做出贡献的人是有帮助的。`; }
	if(line.text.indexOf("\"type\"") != -1)                                  { bHaveText += 1; showText += `\n\n* [键] "type"：类型。`; }
	if(line.text.indexOf("\"url\"") != -1)                                   { bHaveText += 1; showText += `\n\n* [键] "url"：网址。`; }
	if(line.text.indexOf("\"keywords\"") != -1)                              { bHaveText += 1; showText += `\n\n* [键] "keywords"：扩展包的关键字，有助于人们发现你的包，它是列在“npm搜索引擎”中。`; }
	if(line.text.indexOf("\"engines\"") != -1)                               { bHaveText += 1; showText += `\n\n* [键] "engines"：引擎兼容性，插件需要vscode版本的最低限制。`; }
	if(line.text.indexOf("\"vscode\"") != -1)                                { bHaveText += 1; showText += `\n\n* [键] "vscode"：对于 VS Code 扩展，指定与其兼容的 VS Code 版本。不能为 *。 例如: ^0.10.5 表示最低兼容 VS Code 版本 0.10.5。`; }
	if(line.text.indexOf("\"categories\"") != -1)                            { bHaveText += 1; showText += `\n\n* [键] "categories"：VS Code 库用于对扩展进行分类的类别。`; }
	if(line.text.indexOf("\"activationEvents\"") != -1)                      { bHaveText += 1; showText += `\n\n* [键] "activationEvents"：VS Code 扩展的激活事件。`; }
	
	if(alg.strInFindLP(line.text, "omi-develop"))                            { bHaveText += 1; showText += `\n\n* [值] "omi-develop"：omi的vscode扩展(开发版)`; }
	if(alg.strInFindLP(line.text, "ZainChen"))                               { bHaveText += 1; showText += `\n\n* [值] "ZainChen"：帅气程序猿^_^，中文名"志银"，个人网站-[https://zainzy.com/](https://zainzy.com/ "志银")，GitHub-[https://github.com/ZainChen](https://github.com/ZainChen "志银GitHub")`; }
	if(alg.strInFindLP(line.text, "志银"))                                    { bHaveText += 1; showText += `\n\n* [值] "志银"：帅气程序猿^_^，英文名"ZainChen"，个人网站-[https://zainzy.com/](https://zainzy.com/ "志银")，GitHub-[https://github.com/ZainChen](https://github.com/ZainChen "志银GitHub")`; }
	if(alg.strInFindLP(line.text, "zain"))                                   { bHaveText += 1; showText += `\n\n* [值] "zain"：帅气程序猿^_^，中文名"志银"，个人网站-[https://zainzy.com/](https://zainzy.com/ "志银")，GitHub-[https://github.com/ZainChen](https://github.com/ZainChen "志银GitHub")`; }
	if(alg.strInFindLP(line.text, "https://github.com/ZainChen/omi-vscode")) { bHaveText += 1; showText += `\n\n* [值] "[https://github.com/ZainChen/omi-vscode](https://github.com/ZainChen/omi-vscode "omi-vscode")"：omi-vscode源码网址`; }
	if(alg.strInFindLP(line.text, "omi"))                                    { bHaveText += 1; showText += `\n\n* [值] "omi"：开发者-[dntzhang](https://github.com/dntzhang "张磊的GitHub")，项目储存库-[https://github.com/Tencent/omi](https://github.com/Tencent/omi "omi GitHub")，下一代 Web 框架，去万物糟粕，合精华为一点点 JS。`; }
	



	if(bHaveText) {
		showText = `【omi-vscode 配置文件 package.json 说明】`+showText;
	}

	return { contents: [showText] };

	


}