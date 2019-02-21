const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)


module.exports = {
	showWebviewIndex
}


function showWebviewIndex() {
    // 创建webview
	const panel = vscode.window.createWebviewPanel(
		'testWebview', // viewType
		"WebView演示", // 视图标题
		vscode.ViewColumn.One, // 显示在编辑器的哪个部位
		{
			enableScripts: true, // 启用JS，默认禁用
			retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
		}
	);
	panel.webview.html = `<html><body>你好，我是Webview</body></html>`;
}