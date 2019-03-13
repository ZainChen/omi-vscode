const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

const eco = require("./ecosystem/index");  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
const cpln = require("./completion/index");  //自动补全功能模块
const hover = require("./hover/index");  //鼠标悬停提示功能模块
const jump = require("./jump/index");  //跳转功能模块


const wv = require('./webview/index');  //Webview功能模块(test)


/**
 * 插件被激活时触发，所有代码总入口。
 * 激活扩展时调用此方法，您的扩展将在命令第一次执行时被激活。
 * @依赖文件 const vscode = require('vscode');
 * @param {vscode.ExtensionContext} context 扩展内容
 */
function activate(context) {
	const ecoProvider = new eco.EcoProvider(context);  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
	const omiCompletion = new cpln.OmiCompletion();  //自动补全功能
	const provideHover = hover.provideHover;  //鼠标悬停提示功能
	const provideDefinition = jump.provideDefinition;  //跳转功能

	context.subscriptions.push(
		//omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
		//vscode.window.registerTreeDataProvider('omi.view.ecosystem', ecoProvider);  //omi生态内容注册(无法添加showCollapseAll功能)
		//omi生态内容创建和注册(用此方法可添加showCollapseAll功能)，支持此功能的vscode最低版本为1.30.1
		vscode.window.createTreeView('omi.view.ecosystem', { treeDataProvider: ecoProvider, showCollapseAll: true }),
		vscode.commands.registerCommand('omi.cmd.ecoRefresh', () => ecoProvider.refreshAll()),  //刷新所有菜单节点
		vscode.commands.registerCommand('omi.cmd.ecoRefreshNode', offset => ecoProvider.refreshDesignation(offset)),  //刷新指定菜单节点
		vscode.commands.registerCommand('omi.cmd.openGithub', nodeLink => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(nodeLink))),

		//自动补全
		vscode.languages.registerCompletionItemProvider(['javascript'], omiCompletion, '<', ' '),  //代码提示功能注册
		
		//鼠标悬停提示功能
		vscode.languages.registerHoverProvider(['json', 'javascript', 'tex'], { provideHover }),  //鼠标悬停提示功能注册
	
		//跳转功能
		vscode.languages.registerDefinitionProvider(['html', 'json', 'javascript'], {provideDefinition}),  //跳转功能注册

		//Webview功能注册(命令:"omi wv")(实验)
		vscode.commands.registerCommand('omi.cmd.webview', wv.showWebviewIndex),  //Webview功能注册(命令:"omi wv")(实验)
	
		//其他命令，暂无特定功能
		vscode.commands.registerCommand('omi.cmd.help', commandOmiHelp)  //"omi.cmd.help"命令注册
	
	);
	
	require('./welcome/index')(context); //欢迎提示(未详细整理)
	
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


/** 
 * 查看omi帮助命令
*/
function commandOmiHelp() {
	vscode.window.showInformationMessage('Hi Omi.');
}
