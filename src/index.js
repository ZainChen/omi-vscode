const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

const eco = require("./ecosystem/index");  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
const cpln = require("./completion/index");  //自动补全功能模块
const hover = require("./hover/index");  //鼠标悬停提示功能模块
const jump = require("./jump/index");  //跳转功能模块


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
		vscode.commands.registerCommand('omi.cmd.ecoHello', () => ecoProvider.commandOmiHello()),  //将omi生态切换到Tencent/omi
		vscode.commands.registerCommand('omi.cmd.ecoGithubSwitch', () => ecoProvider.githubSwitch()),  //切换github，生成新的菜单树
		vscode.commands.registerCommand('omi.cmd.ecoRefresh', () => ecoProvider.refreshAll()),  //刷新所有菜单节点
		vscode.commands.registerCommand('omi.cmd.ecoRefreshNode', node => ecoProvider.refreshDesignation(node)),  //刷新指定菜单节点
		vscode.commands.registerCommand('omi.cmd.ecoOpenGithub', node => ecoProvider.openGithub(node)),  //打开当前菜单树节点链接的GitHub页面
		vscode.commands.registerCommand('omi.cmd.ecoOpenGithubFile', nodeLink => ecoProvider.openGithubFile(nodeLink)),  //vscode打开github文件
		vscode.commands.registerCommand('omi.cmd.ecoClearCache', () => ecoProvider.clearCache()),  //清除缓存文件(查看文件时生成的)
		vscode.commands.registerCommand('omi.cmd.ecoGithubFileDownload', node => ecoProvider.githubFileDownload(node)),  //github文件下载(支持任意子文件和文件夹)
		
		//自动补全
		vscode.languages.registerCompletionItemProvider(['html', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact'], omiCompletion, ' '),  //代码提示功能注册
		
		//鼠标悬停提示功能
		vscode.languages.registerHoverProvider(['json', 'javascript', 'tex'], { provideHover }),  //鼠标悬停提示功能注册
	
		//跳转功能
		vscode.languages.registerDefinitionProvider(['html', 'json', 'javascript'], {provideDefinition}),  //跳转功能注册

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


