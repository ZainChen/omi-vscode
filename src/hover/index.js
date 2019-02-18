const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

//zain自定义模块
const alg = require("../algorithm/index");  //算法模块


module.exports = {
    provideHover,
    provideHoverJson,
    provideHoverJavaScript
}

//==============================================================================================================================
//=====鼠标悬停提示=====
//==============================================================================================================================

/**
 * 鼠标悬停提示入口函数。
 * 为给定的位置和文档提供悬停提示。
 * 编辑器将合并多个位于同一位置的悬停。
 * 悬停的范围可以默认为省略时位置的单词范围。
 * @依赖文件 const vscode = require('vscode');
 * @依赖文件 const path = require('path');
 * @依赖文件 const fs = require('fs');
 * @param document — 调用命令的文档。
 * @param position — 调用命令的位置。
 * @param token — 取消令牌。
 * @return 悬停或可解决的问题。可以通过返回“undefined”或“null”来表示缺少结果。
 */
function provideHover(document, position, token) {
	const fileName	= document.fileName;

	//json文件
	if(alg.strTailMatch(fileName, ".json", 2)) {
		return provideHoverJson(document, position, token);
	}
	//javascript文件
	if(alg.strTailMatch(fileName, ".js", 2)) {
		return provideHoverJavaScript(document, position, token);
	}
	
	return new vscode.Hover(`zain`);
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
	const workDir	 = path.dirname(fileName);
	const word		= document.getText(document.getWordRangeAtPosition(position));

	//当鼠标停在package.json中
	if (/package\.json$/.test(fileName)) {
		console.log('provideHover');
		const json = document.getText();
		if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
			let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
			if (fs.existsSync(destPath)) {
				const content = require(destPath);
				console.log('hover');
				// hover内容支持markdown语法
				return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
			}
		}
	}

	return new vscode.Hover(`zain`);

}

/**
 * JavaScript文件鼠标悬停提示配置
 * @param document — 调用命令的文档。
 * @param position — 调用命令的位置。
 * @param token — 取消令牌。
 * @return 提示内容
 */
function provideHoverJavaScript(document, position, token) {
	//return new vscode.Hover(`zain`);
	return {
		contents: ['Hover Content']
	};
}

