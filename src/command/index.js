const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)

//zain自定义模块
const wvIndex = require('./webview/index');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)


module.exports = {
	commandOmi,
	commandOmiWebview
}


/** 
 * 查看omi帮助命令
*/
function commandOmi() {
	vscode.window.showInformationMessage('omi help');
}

function commandOmiWebview() {
	wvIndex.showWebviewIndex();  // 创建webview
}