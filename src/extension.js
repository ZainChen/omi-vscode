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
	context.subscriptions.push(vscode.commands.registerCommand('command.omi', commandOmi));  //查看omi帮助命令
	context.subscriptions.push(vscode.languages.registerHoverProvider('json', {provideHover}));  // 注册鼠标悬停提示
	
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



/** 
 * 查看omi帮助命令
*/
function commandOmi() {
	vscode.window.showInformationMessage('omi help');
}



/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 自动显示对应包的名称、版本号和许可协议
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideHover(document, position, token) {
	return new vscode.Hover(`zain`);
	const fileName	= document.fileName;
	const workDir	 = path.dirname(fileName);
	const word		= document.getText(document.getWordRangeAtPosition(position));

	if (/package\.json$/.test(fileName)) {
		console.log('进入provideHover方法');
		const json = document.getText();
		if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
			let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
			if (fs.existsSync(destPath)) {
				const content = require(destPath);
				console.log('hover已生效');
				// hover内容支持markdown语法
				return new vscode.Hover(`* **名称**：${content.name}\n* **版本**：${content.version}\n* **许可协议**：${content.license}`);
			}
		}
	}
}




