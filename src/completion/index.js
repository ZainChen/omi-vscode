const vscode = require('vscode');

const alg = require('../algorithm/index');

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
	async provideCompletionItems(document, position, token, context) {
		let bbb = context.triggerCharacter;
		let aaa = this.getLastChar(document, position);
		let ch = bbb || aaa;
		switch(ch) {
			case '<': return this.labelCompletion();  //标签补全
			case ' ': return this.attributesCompletion();  //属性补全
			default: return [];
		}

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


	async labelCompletion() {
		let retCom = new Array();
		for(let i = 0; i < 25; i++) {
			let comp = new vscode.CompletionItem('o-button', vscode.CompletionItemKind.Field);
			comp.kind = vscode.CompletionItemKind.TypeParameter;
			comp.detail = "[omiu]";
			comp.insertText = new vscode.SnippetString(`o-button\${${1}}>\${${2}}</o-button>`);  //o-button${' '}\${${1}}>\${${2}}</o-button>
			comp.documentation = new vscode.MarkdownString(`## Button 按钮\n\n简介：点击或触摸触发一个操作的元素。响应用户点击操作，触发封装的逻辑。\n\n组件链接：[简体中文](https://tencent.github.io/omi/packages/omiu/examples/build/zh-cn.html#/button?index=1&subIndex=0 \'官网链接\') | [English](https://tencent.github.io/omi/packages/omiu/examples/build/index.html#/button?index=1&subIndex=0 \'官网链接\')\n\n---\n\n## 使用\n\n\`\`\`js\n<o-button>我是按钮</o-button>\n\`\`\`\n\n---\n\n## API\n\n|  **Name**  | **Type**        | **Defaults**  | **Details**  |\n|:-------------|:-------------|:-----|:-------------|\n| type  | string| primary |Options: primary, default, warn, vcode|\n| size | string   |   normal |Options: normal, small|\n| disabled | bool| false ||\n\n---\n\n## 样例\n\n![button](https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/omiu/button1.png \'button\')\n\n![button](https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/omiu/button2.png \'button\')\n\n![button](https://raw.githubusercontent.com/ZainChen/omi-vscode/master/assets/omiu/button3.png \'button\')\n`);
			comp.sortText = 'a';
			// comp.command = this.autoSuggestCommand();
			retCom.push(comp);
		}
		return retCom;
	}

	async attributesCompletion() {
		let retCom = [];
		let comp = new vscode.CompletionItem('type', vscode.CompletionItemKind.Field);
		comp.kind = vscode.CompletionItemKind.Event;
		comp.detail = "[omiu]o-button";
		comp.insertText = new vscode.SnippetString("type=\'${1|primary,default,warn,vcode|}\'");
		comp.documentation = new vscode.MarkdownString(`## type\n\n**string**\n\nOptions: primary, default, warn, vcode`);
		comp.sortText = 'a';
		comp.command = this.autoSuggestCommand();
		retCom.push(comp);
		comp = new vscode.CompletionItem('size', vscode.CompletionItemKind.Field);
		comp.kind = vscode.CompletionItemKind.Event;
		comp.detail = "[omiu]o-button";
		comp.insertText = new vscode.SnippetString("size=\'${1|normal,small|}\'");
		comp.documentation = new vscode.MarkdownString(`## size\n\n**string**\n\nOptions: normal, small`);
		comp.sortText = 'a';
		comp.command = this.autoSuggestCommand();
		retCom.push(comp);
		comp = new vscode.CompletionItem('disabled', vscode.CompletionItemKind.Field);
		comp.kind = vscode.CompletionItemKind.Event;
		comp.detail = "[omiu]o-button";
		comp.insertText = new vscode.SnippetString("disabled=\'${1|false,true|}\'");
		comp.documentation = new vscode.MarkdownString(`## disabled\n\n**bool**\n\nOptions: false, true`);
		comp.sortText = 'a';
		comp.command = this.autoSuggestCommand();
		retCom.push(comp);
		return retCom;
	}


	autoSuggestCommand() {
		return {
			command: 'editor.action.triggerSuggest',
			title: 'triggerSuggest'
		};
	}

	getLastChar(doc, pos) {
		return doc.getText(new vscode.Range(new vscode.Position(pos.line, pos.character - 1), pos));
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