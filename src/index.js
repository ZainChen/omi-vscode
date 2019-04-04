const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)

const tp = require("./template/index")  //omi项目模板更新、下载、项目创建(创建项目包含在线(在线分为npm拉取和github拉取)和离线(离线为直接从omi-vscode扩展中数据拉取)两种方式)
const gh = require("./github/index");  //github菜单树，实时浏览，下载任意文件和子文件夹，切换任意github项目
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
	const omiTemplate = new tp.OmiTemplate();  //omi项目模板
	const omiGithub = new gh.OmiGitHub(context);  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
	const omiCompletion = new cpln.OmiCompletion();  //自动补全功能
	const omiHover = new hover.OmiHover();  //鼠标悬停提示功能
	const provideDefinition = jump.provideDefinition;  //跳转功能

	context.subscriptions.push(

		//omi项目模板更新、下载、项目创建(创建项目包含在线(在线分为npm拉取和github拉取)和离线(离线为直接从omi-vscode扩展中数据拉取)两种方式)
		vscode.window.createTreeView('omi.view.template', { treeDataProvider: omiTemplate, showCollapseAll: true }),

		//github菜单树，实时浏览，下载任意文件和子文件夹，切换任意github项目
		//vscode.window.registerTreeDataProvider('omi.view.github', omiGithub);  //github菜单树注册(无法添加showCollapseAll功能)
		//github菜单树创建和注册(用此方法可添加showCollapseAll功能)，支持此功能的vscode最低版本为1.30.1
		vscode.window.createTreeView('omi.view.github', { treeDataProvider: omiGithub, showCollapseAll: true }),
		vscode.commands.registerCommand('omi.cmd.ghOmi', () => omiGithub.commandShowOmi()),  //github菜单树切换到Tencent/omi
		vscode.commands.registerCommand('omi.cmd.ghGithubSwitch', () => omiGithub.githubSwitch()),  //切换github，生成新的菜单树
		vscode.commands.registerCommand('omi.cmd.ghRefresh', () => omiGithub.refreshAll()),  //刷新所有菜单节点
		vscode.commands.registerCommand('omi.cmd.ghRefreshNode', node => omiGithub.refreshDesignation(node)),  //刷新指定菜单节点
		vscode.commands.registerCommand('omi.cmd.ghOpenGithub', node => omiGithub.openGithub(node)),  //打开当前菜单树节点链接的GitHub页面
		vscode.commands.registerCommand('omi.cmd.ghOpenGithubFile', nodeLink => omiGithub.openGithubFile(nodeLink)),  //vscode打开github文件
		vscode.commands.registerCommand('omi.cmd.ghClearCache', () => omiGithub.clearCache()),  //清除缓存文件(查看文件时生成的)
		vscode.commands.registerCommand('omi.cmd.ghGithubFileDownload', node => omiGithub.githubFileDownload(node)),  //github文件下载(支持任意子文件和文件夹)
		
		//自动补全
		vscode.languages.registerCompletionItemProvider(['html', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact'], omiCompletion, ' '),  //代码提示功能注册
		
		//鼠标悬停提示功能
		vscode.languages.registerHoverProvider(['html', 'json', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'tex', 'c', 'cpp', 'css', 'markdown', 'php', 'python', 'jsonc', 'objective-c', 'xml', 'sql', 'java', 'swift', 'go', 'csharp'], omiHover),  //鼠标悬停提示功能注册
	
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


