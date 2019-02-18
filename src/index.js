const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)

//zain自定义模块
const hover = require("./hover/index");  //鼠标悬停提示模块


module.exports = {
	activate,
	deactivate,
	commandOmi
}


/**
 * 插件被激活时触发，所有代码总入口。
 * 激活扩展时调用此方法，您的扩展将在命令第一次执行时被激活。
 * @依赖文件 const vscode = require('vscode');
 * @param {vscode.ExtensionContext} context 扩展内容
 */
function activate(context) {
	let provideHover = hover.provideHover;
	context.subscriptions.push(vscode.commands.registerCommand('command.omi', commandOmi));  //注册查看omi帮助命令
	context.subscriptions.push(vscode.languages.registerHoverProvider('json', { provideHover }));  //注册鼠标悬停提示(json)
	context.subscriptions.push(vscode.languages.registerHoverProvider('javascript', {provideHover}));  //注册鼠标悬停提示(javascript)
}
exports.activate = activate;

/**
 * 插件被释放时触发。
 * 当您的扩展被停用时，将调用此方法。
 */
function deactivate() {
	console.log('Your extension "omi" has been released');
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

