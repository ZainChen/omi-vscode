const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

const eco = require("./ecosystem/index");  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
const hover = require("./hover/index");  //鼠标悬停提示功能模块
const jump = require("./jump/index");  //跳转功能模块


const wv = require('./webview/index');  //Webview功能模块(test)
const cmd = require("./command/index");  //命令模块(test)


/**
 * 插件被激活时触发，所有代码总入口。
 * 激活扩展时调用此方法，您的扩展将在命令第一次执行时被激活。
 * @依赖文件 const vscode = require('vscode');
 * @param {vscode.ExtensionContext} context 扩展内容
 */
function activate(context) {

	// context.subscriptions.push();

	//omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
	const ecoProvider = new eco.EcoProvider(context);
	//context.subscriptions.push(vscode.window.registerTreeDataProvider('omi.view.ecosystem', ecoProvider));  //omi生态内容注册(无法添加showCollapseAll功能)
	//omi生态内容创建和注册(用此方法可添加showCollapseAll功能)
	context.subscriptions.push(vscode.window.createTreeView('omi.view.ecosystem', { treeDataProvider: ecoProvider, showCollapseAll: true }));
	context.subscriptions.push(vscode.commands.registerCommand('omi.cmd.ecoRefresh', () => ecoProvider.refreshAll()));  //刷新所有菜单节点
	context.subscriptions.push(vscode.commands.registerCommand('omi.cmd.ecoRefreshNode', offset => ecoProvider.refreshDesignation(offset)));  //刷新指定菜单节点
	context.subscriptions.push(vscode.commands.registerCommand('omi.cmd.openGithub', nodeLink => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(nodeLink))));
	
	//鼠标悬停提示功能
	const provideHover = hover.provideHover;
	context.subscriptions.push(vscode.languages.registerHoverProvider(['json', 'javascript', 'tex'], { provideHover }));  //鼠标悬停提示功能注册
	
	//跳转功能
	const provideDefinition = jump.provideDefinition;
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(['html', 'json', 'javascript'], {provideDefinition}));  //跳转功能注册



	
	require('./welcome/index')(context); //欢迎提示(未详细整理)
	//Webview功能注册(命令:"omi wv")(实验)
	context.subscriptions.push(vscode.commands.registerCommand('omi.cmd.webview', wv.showWebviewIndex));  //Webview功能注册(命令:"omi wv")(实验)
	//其他命令，暂无特定功能
	context.subscriptions.push(vscode.commands.registerCommand('omi.cmd.help', cmd.commandOmiHelp));  //"omi.cmd.help"命令注册
	
    
    //自动补全
	//context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['json', 'javascript'], {provideCompletionItems, resolveCompletionItem}, '.'));  //代码提示功能注册(未出效果，待解决...)
	


}
exports.activate = activate;  //插件被激活触发(函数接口)


/**
 * 插件被释放时触发。
 * 当您的扩展被停用时，将调用此方法。
 */
function deactivate() {
	console.log('Your extension "omi" has been released');
}
exports.deactivate = deactivate;  //插件被释放触发(函数接口)








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
// function provideCompletionItems(document, position, token, context) {
//     const line        = document.lineAt(position);
//     const projectPath = __dirname;

//     // 只截取到光标位置为止，防止一些特殊情况
//     const lineText = line.text.substring(0, position.character);
//     // 简单匹配，只要当前光标前的字符串为`this.dependencies.`都自动带出所有的依赖
//     if(/(^|=| )\w+\.dependencies\.$/g.test(lineText)) {
//         const json = require(`${projectPath}/package.json`);
// 		const dependencies = Object.keys(json.dependencies || {}).concat(Object.keys(json.devDependencies || {}));
// 		//return new vscode.CompletionItem(dependencies[0], vscode.CompletionItemKind.Field);
//         return dependencies.map( (dep) => {
//             // vscode.CompletionItemKind 表示提示的类型
//             return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
//         })
//     }
// }

// /**
//  * 光标选中当前自动补全item时触发动作，一般情况下无需处理
//  * @param {*} item 
//  * @param {*} token 
//  */
// function resolveCompletionItem(item, token) {
//     return item;
// }