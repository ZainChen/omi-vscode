const vscode = require('vscode');

module.exports = {
    show
}

/**
 * 字符串尾部匹配(判断字符串后几位是否等于给定值,可用于文件后缀名判断)
 * @param str 待匹配的字符串
 */
function show(str) {
	vscode.window.showInformationMessage(str);
}
