


module.exports = {
    provideHoverJavaScript
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
