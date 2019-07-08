const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)

const welcome = require("./welcome/index");  //欢迎界面
const ecosystem = require("./ecosystem/index");  //omi项目模板更新、下载、项目创建(创建项目包含在线(在线分为npm拉取和github拉取)和离线(离线为直接从omi-vscode扩展中数据拉取)两种方式)
const github = require("./github/index");  //github菜单树，实时浏览，下载任意文件和子文件夹，切换任意github项目
const completion = require("./completion/index");  //自动补全功能模块
const hover = require("./hover/index");  //鼠标悬停提示功能模块
const jump = require("./jump/index");  //跳转功能模块


/**
 * 插件被激活时触发，所有代码总入口。
 * 激活扩展时调用此方法，您的扩展将在命令第一次执行时被激活。
 * @依赖文件 const vscode = require('vscode');
 * @param {vscode.ExtensionContext} context 扩展内容
 */
function activate(context) {
	const omiWelcome =  new welcome.OmiWelcome(context);  //欢迎界面
	const omiEcosystem = new ecosystem.OmiEcosystem(context);  //omi生态更新、下载、项目创建(创建项目包含在线和离线两种方式)
	const omiGithub = new github.OmiGitHub(context);  //omi github
	const omiCompletion = new completion.OmiCompletion();  //自动补全功能
	const omiHover = new hover.OmiHover();  //鼠标悬停提示功能
	const provideDefinition = jump.provideDefinition;  //跳转功能

	context.subscriptions.push(

		//欢迎界面
		vscode.commands.registerCommand('omi.cmd.welcome', () => omiWelcome.mainWelcome()),  //欢迎界面入口

		//omi项目模板更新、下载、项目创建(创建项目包含在线(在线分为npm拉取和github拉取)和离线(离线为直接从omi-vscode扩展中数据拉取)两种方式)
		vscode.window.createTreeView('omi.view.ecosystem', { treeDataProvider: omiEcosystem, showCollapseAll: true }),
		vscode.commands.registerCommand('omi.cmd.ecosystemOpenWebview', link => omiEcosystem.OpenWebview(link)),

		//快捷键开启或关闭 omi views
		vscode.commands.registerCommand('omi.cmd.viewsShow', () => omiEcosystem.keyViewShow()),

		//github菜单树，实时浏览，下载任意文件和子文件夹，切换任意github项目
		//vscode.window.registerTreeDataProvider('omi.view.github', omiGithub);  //github菜单树注册(无法添加showCollapseAll功能)
		//github菜单树创建和注册(用此方法可添加showCollapseAll功能)，支持此功能的vscode最低版本为1.30.1
		vscode.window.createTreeView('omi.view.github', { treeDataProvider: omiGithub, showCollapseAll: true }),  //创建github菜单树视图
		vscode.commands.registerCommand('omi.cmd.githubOmi', () => omiGithub.commandShowOmi()),  //github菜单树切换到Tencent/omi
		vscode.commands.registerCommand('omi.cmd.githubSwitch', () => omiGithub.githubSwitch()),  //切换github，生成新的菜单树
		vscode.commands.registerCommand('omi.cmd.githubRefresh', () => omiGithub.refreshAll()),  //刷新所有菜单节点
		vscode.commands.registerCommand('omi.cmd.githubRefreshNode', node => omiGithub.refreshDesignation(node)),  //刷新指定菜单节点
		vscode.commands.registerCommand('omi.cmd.githubOpenBrowser', node => omiGithub.openGithub(node)),  //打开当前菜单树节点链接的GitHub页面
		vscode.commands.registerCommand('omi.cmd.githubOpenFile', nodeLink => omiGithub.openGithubFile(nodeLink)),  //vscode打开github文件
		vscode.commands.registerCommand('omi.cmd.githubClearCache', () => omiGithub.clearCache()),  //清除缓存文件(查看文件时生成的)
		vscode.commands.registerCommand('omi.cmd.githubFileDownload', node => omiGithub.githubFileDownload(node)),  //github文件下载(支持任意子文件和文件夹)
		
		//语言标示值参考：https://code.visualstudio.com/docs/languages/identifiers

		//自动补全
		vscode.languages.registerCompletionItemProvider(['omi', 'vue', 'html', 'json', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'tex', 'c', 'cpp', 'css', 'markdown', 'php', 'python', 'jsonc', 'objective-c', 'xml', 'sql', 'java', 'swift', 'go', 'csharp'], omiCompletion, ' '),  //代码提示功能注册
		
		//鼠标悬停提示功能
		vscode.languages.registerHoverProvider(['omi', 'vue', 'html', 'json', 'javascript', 'javascriptreact', 'typescript', 'typescriptreact', 'tex', 'c', 'cpp', 'css', 'markdown', 'php', 'python', 'jsonc', 'objective-c', 'xml', 'sql', 'java', 'swift', 'go', 'csharp'], omiHover),  //鼠标悬停提示功能注册
	
		//跳转功能
		vscode.languages.registerDefinitionProvider(['html', 'json', 'javascript'], {provideDefinition})  //跳转功能注册

	);
	
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



