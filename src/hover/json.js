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
	
	//指定vscode-omi/package.json配置文件提示内容
	if (alg.strTailMatch(fileName, "vscode-omi\\package.json", 2)) {
		return hoverVomiPackage(document, position, token);
	}


	

	return new vscode.Hover(`zain`);

}

/**
 * 指定vscode-omi/package.json配置文件提示内容
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
	let bHaveText = false;

	if(line.text.indexOf("\"name\"") != -1)        { bHaveText = true; showText += `\n\n* [键] "name"：扩展包名称，vsce package 命令打包后的文件名。`; }
	if(line.text.indexOf("\"displayName\"") != -1) { bHaveText = true; showText += `\n\n* [键] "displayName"：扩展发布显示名称。`; }
	if(line.text.indexOf("\"description\"") != -1) { bHaveText = true; showText += `\n\n* [键] "description"：描述内容，可以帮助人们发现您的包，因为它被列在“npm搜索引擎”中。`; }
	if(line.text.indexOf("\"version\"") != -1)     { bHaveText = true; showText += `\n\n* [键] "version"：扩展包版本号，版本必须能够被node-semver解析，它作为依赖项与npm绑定在一起。`; }
	if(line.text.indexOf("\"publisher\"") != -1)   { bHaveText = true; showText += `\n\n* [键] "publisher"：VS Code 扩展发布者。`; }
	if(line.text.indexOf("\"icon\"") != -1)        { bHaveText = true; showText += `\n\n* [键] "icon"：扩展logo，网上浏览，128 x 128 像素图标。`; }
	if(line.text.indexOf("\"homepage\"") != -1)    { bHaveText = true; showText += `\n\n* [键] "homepage"：项目主页(必须为网址url)，*.md(Markdown)文件。`; }
	if(line.text.indexOf("\"repository\"") != -1)  { bHaveText = true; showText += `\n\n* [键] "repository"：代码储存库，指定源码所在的位置，这对那些想要做出贡献的人是有帮助的。`; }
	if(line.text.indexOf("\"type\"") != -1)  { bHaveText = true; showText += `\n\n* [键] "type"：类型。`; }
	if(line.text.indexOf("\"url\"") != -1)  { bHaveText = true; showText += `\n\n* [键] "url"：网址。`; }
	if(line.text.indexOf("\"keywords\"") != -1)  { bHaveText = true; showText += `\n\n* [键] "keywords"：扩展包的关键字，有助于人们发现你的包，它是列在“npm搜索引擎”中。`; }
	
	if(alg.strInFindLP(line.text, "omi-develop"))  { bHaveText = true; showText += `\n\n* [值] "omi-develop"：omi的vscode扩展(开发板)`; }
	if(alg.strInFindLP(line.text, "ZainChen"))     { bHaveText = true; showText += `\n\n* [值] "ZainChen"：帅气程序猿^_^，中文名"志银"，个人网站-[https://zainzy.com/](https://zainzy.com/ "志银")，GitHub-[https://github.com/ZainChen](https://github.com/ZainChen "志银GitHub")`; }
	if(alg.strInFindLP(line.text, "志银"))     { bHaveText = true; showText += `\n\n* [值] "志银"：帅气程序猿^_^，英文名"ZainChen"，个人网站-[https://zainzy.com/](https://zainzy.com/ "志银")，GitHub-[https://github.com/ZainChen](https://github.com/ZainChen "志银GitHub")`; }
	if(alg.strInFindLP(line.text, "zain"))     { bHaveText = true; showText += `\n\n* [值] "zain"：帅气程序猿^_^，中文名"志银"，个人网站-[https://zainzy.com/](https://zainzy.com/ "志银")，GitHub-[https://github.com/ZainChen](https://github.com/ZainChen "志银GitHub")`; }
	if(alg.strInFindLP(line.text, "https://github.com/ZainChen/vscode-omi"))     { bHaveText = true; showText += `\n\n* [值] "[https://github.com/ZainChen/vscode-omi](https://github.com/ZainChen/vscode-omi "vscode-omi")"：vscode-omi源码网址`; }
	if(alg.strInFindLP(line.text, "omi"))  { bHaveText = true; showText += `\n\n* [值] "omi"：开发者-[dntzhang](https://github.com/dntzhang "张磊的GitHub")，项目储存库-[https://github.com/Tencent/omi](https://github.com/Tencent/omi "omi GitHub")，下一代 Web 框架，去万物糟粕，合精华为一点点 JS。`; }
	



	if(bHaveText) {
		showText = `【vscode-omi 配置文件 package.json 说明】`+showText;
	}

	return { contents: [showText] };

	// if(line.text.indexOf("\"name\"") != -1) {
	// 	//return new vscode.Hover(`扩展包名称：\`vsce package\`命令打包后的文件名`);
	// 	let show = {
	// 		contents: [`扩展包名称：\`vsce package\`命令打包后的文件名。`]
	// 	}
	// 	return show;
	// }
	// if(line.text.indexOf("\"displayName\"") != -1) {
	// 	return new vscode.Hover(`VS Code库中使用的扩展名称。`);
	// }





	// //当鼠标停在package.json的dependencies或者devDependencies时，自动显示对应包的名称、版本号和许可协议。
	// if (/package\.json$/.test(fileName)) {
	// 	//console.log('provideHover');
	// 	const json = document.getText();
	// 	if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
	// 		let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
	// 		if (fs.existsSync(destPath)) {
	// 			const content = require(destPath);
	// 			//console.log('hover');
	// 			// hover内容支持markdown语法
	// 			//return new vscode.Hover(`\`\`\`志银\`\`\`\n * **名称**：${content.name}\n * **版本**：${content.version}\n * **许可协议**：${content.license}`);
	// 			let sss = ` * **名称**：${content.name}\n * **版本**：${content.version}\n * **许可协议**：${content.license}`;
	// 			return {
	// 				contents: [sss]
	// 			};
	// 		}
	// 	}
	// }


}