// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * 插件被激活时触发，所有代码总入口
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "omi" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('command.omi-init', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('omi init!');
	});

	// 注册命令
	context.subscriptions.push(disposable);

	
	//zain自定义激活功能
	context.subscriptions.push(vscode.commands.registerCommand('command.omi', commandOmi));  //注册查看omi帮助命令
	context.subscriptions.push(vscode.languages.registerHoverProvider('json', {provideHover}));  //注册鼠标悬停提示(json)
	context.subscriptions.push(vscode.languages.registerHoverProvider('javascript', {provideHover}));  ////注册鼠标悬停提示(javascript)

}
exports.activate = activate;

// this method is called when your extension is deactivated
/**
 * 插件被释放时触发
 */
function deactivate() {
	console.log('Your extension "omi" has been released');
}

module.exports = {
	activate,
	deactivate,
	commandOmi,
	provideHover
}



//==============================================================================================================================
//=====命令功能=====
//==============================================================================================================================

/** 
 * 查看omi帮助命令
*/
function commandOmi() {
	vscode.window.showInformationMessage('omi help');
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
 * @参数 document — 调用命令的文档。
 * @参数 position — 调用命令的位置。
 * @参数 token — 取消令牌。
 * @参数 悬停或可解决的问题。可以通过返回“undefined”或“null”来表示缺少结果。
 */
function provideHover(document, position, token) {
	const fileName	= document.fileName;

	//json文件
	if(strTailMatch(fileName, ".json", 2)) {
		return provideHoverJson(document, position, token);
	}
	//javascript文件
	if(strTailMatch(fileName, ".js", 2)) {
		return provideHoverJavaScript(document, position, token);
	}
	
	return new vscode.Hover(`zain`);
}

/**
 * json文件鼠标悬停提示配置
 * @参数 document — 调用命令的文档。
 * @参数 position — 调用命令的位置。
 * @参数 token — 取消令牌。
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
 * @参数 document — 调用命令的文档。
 * @参数 position — 调用命令的位置。
 * @参数 token — 取消令牌。
 */
function provideHoverJavaScript(document, position, token) {
	//return new vscode.Hover(`zain`);
	return {
		contents: ['Hover Content']
	};
}







//==============================================================================================================================
//=====zain算法函数=====
//==============================================================================================================================

/**
 * 字符串尾部匹配(判断字符串后几位是否等于给定值,可用于文件后缀名判断)
 * @param {*} str 待匹配的字符串
 * @param {*} value 待匹配的值
 * @param {*} mode 1:匹配大小写;2:忽略大小写
 */
function strTailMatch(str, value, mode) {
	let ls = str.length;
	let lv = value.length;
	if(ls < lv) {
		return false;
	}
	let strNew = "";
	for(let i = ls-lv; i < ls; i++) {
		strNew += str[i];
	}
	if(mode == 2) {
		strNew = strNew.toUpperCase();  //字符串转换为大写(toLowerCase():字符串转换为小写)
		value = value.toUpperCase();
	}
	if(strNew == value) {
		return true;
	} else {
		false;
	}
}

