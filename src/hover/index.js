const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

//zain自定义模块
const alg = require("../algorithm/index");  //算法模块
const hoverJson = require("./json");  //json文件内容提示
const hoverJavascript = require("./javascript");  //javascript文件内容提示


module.exports = {
	provideHover
}

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
		return hoverJson.provideHoverJson(document, position, token);
	}
	//javascript文件
	// if(alg.strTailMatch(fileName, ".js", 2)) {
	// 	return hoverJavascript.provideHoverJavaScript(document, position, token);
	// }
	
	// return new vscode.Hover(`zain`);

	return null;
}
