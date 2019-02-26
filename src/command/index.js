const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)

//zain自定义模块


module.exports = {
	commandOmiHelp
}


/** 
 * 查看omi帮助命令
*/
function commandOmiHelp() {
	vscode.window.showInformationMessage('Hi Omi.');
}



