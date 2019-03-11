const vscode = require('vscode');

const oci = require('./completion-item');

/**
 * omi自动补全功能实现类
 */
class OmiCompletion {

	/**
	 *提供给定职位和文件的完成项目。
	 *
	 * @param document 调用命令的文档。
	 * @param position 调用命令的位置。
	 * @param token 取消令牌。
	 * @param context 如何触发完成。
	 * @return 一个完成数组，一个[补全列表]（＃CompletionList），或一个解析为其中任何一个的thenable。
	 *可以通过返回`undefined`，`null`或空数组来表示缺少结果。
	 */
	provideCompletionItems(document, position, token, context) {
		const line = document.lineAt(position);
		//const lineText = line.text.substring(0, position.character);  //只截取到光标位置，防止一些特殊情况
		const dependencies = ['zain', 'jane'];
		return dependencies.map( (dep) => {
			//return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);  //vscode.CompletionItemKind 表示提示类型
			return new oci.OmiCompletionItem(dep, vscode.CompletionItemKind.Field, 'omiomiomi',new vscode.MarkdownString(`# gfaweuihgilawehl\n\n---\n\n[![VisualStudioMarketplace](https://img.shields.io/badge/VisualStudioMarketplace-v1.0.5-orange.svg)](https://marketplace.visualstudio.com/items?itemName=ZainChen.omi)`));
		})
	}

	/**
	 *给定完成项填写更多数据，如[doc-comment]（＃CompletionItem.documentation）
	 *或[详情]（＃CompletionItem.detail）。
	 *
	 *编辑器只会解析一次完成项目。
	 *
	 * @param item UI中当前处于活动状态的完成项。
	 * @param token 取消令牌。
	 * @return 已解决的完成项目或解析为此类的完成项目。 可以返回给定的
	 *`item`。 如果没有返回结果，将使用给定的`item`。
	 */
	resolveCompletionItem(item, token) {
		return item;
	}


}
exports.OmiCompletion = OmiCompletion;





//样例
// /**
//  * (未出效果，待解决...)
//  * 自动提示实现，这里模拟一个很简单的操作
//  * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
//  * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
//  * @param {*} document 
//  * @param {*} position 
//  * @param {*} token 
//  * @param {*} context 
//  */
// provideCompletionItems(document, position, token, context) {
// 	const line        = document.lineAt(position);
// 	const projectPath = __dirname;

// 	// 只截取到光标位置为止，防止一些特殊情况
// 	const lineText = line.text.substring(0, position.character);
// 	// 简单匹配，只要当前光标前的字符串为`this.dependencies.`都自动带出所有的依赖
// 	if(/(^|=| )\w+\.dependencies\.$/g.test(lineText)) {
// 		const json = require(`${projectPath}/package.json`);
// 		const dependencies = Object.keys(json.dependencies || {}).concat(Object.keys(json.devDependencies || {}));
// 		//return new vscode.CompletionItem(dependencies[0], vscode.CompletionItemKind.Field);
// 		return dependencies.map( (dep) => {
// 			// vscode.CompletionItemKind 表示提示的类型
// 			return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
// 		})
// 	}
// }

// /**
//  * 光标选中当前自动补全item时触发动作，一般情况下无需处理
//  * @param {*} item 
//  * @param {*} token 
//  */
// resolveCompletionItem(item, token) {
// 	return item;
// }