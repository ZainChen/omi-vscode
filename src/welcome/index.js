const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class OmiWelcome {
    constructor(context) {
        this.context = context;
        //存放所有消息回调函数，根据 message.cmd 来决定调用哪个方法
        this.messageHandler = {
            getConfig(global, message) {
                const result = vscode.workspace.getConfiguration().get(message.key);
                this.invokeCallback(global.panel, message, result);
            },
            setConfig(global, message) {
                // 写入配置文件，注意，默认写入工作区配置，而不是用户配置，最后一个true表示写入全局用户配置
                vscode.workspace.getConfiguration().update(message.key, message.value, true);
                vscode.window.showInformationMessage('Configuration modification successful!');
            }
        };

        // 如果设置里面开启了欢迎页显示，启动欢迎页
        if (vscode.workspace.getConfiguration().get('omi.start.welcome')) {
            vscode.commands.executeCommand('omi.cmd.welcome');
        }

    }

    /**
     * 欢迎界面入口
     */
    mainWelcome() {
        const panel = vscode.window.createWebviewPanel(
            'omiWelcome', //viewType
            "Omi welcome", //视图标题
            vscode.ViewColumn.One, //显示在编辑器的哪个部位
            {
                enableScripts: true, //启用JS，默认禁用
            }
        );
        panel.webview.html = this.getWebViewContent();
        panel.webview.onDidReceiveMessage(message => {
            if (this.messageHandler[message.cmd]) {
                this.messageHandler[message.cmd]({ panel}, message);
            } else {
                vscode.window.showInformationMessage(`未找到名为 ${message.cmd} 回调方法!`);
            }
        }, undefined, this.context.subscriptions);
    }

    /**
     * 从某个HTML文件读取能被Webview加载的HTML内容
     * @a param {*} context 上下文
     * @a param {*} templatePath 相对于插件根目录的html文件相对路径
     */
    getWebViewContent() {
        //const resourcePath = util.getExtensionFileAbsolutePath(context, templatePath);
        const resourcePath = path.join(__dirname, 'web-welcome', "index.html");
        const dirPath = path.dirname(resourcePath);
        let html = fs.readFileSync(resourcePath, 'utf-8');
        // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
        html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
        return html;
    }

    /**
     * 执行回调函数
     * @param {*} panel 
     * @param {*} message 
     * @param {*} resp 
     */
    invokeCallback(panel, message, resp) {
        console.log('callback message:', resp);
        // 错误码在400-600之间的，默认弹出错误提示
        if (typeof resp == 'object' && resp.code && resp.code >= 400 && resp.code < 600) {
            vscode.window.showInformationMessage('发生未知错误！');
        }
        panel.webview.postMessage({cmd: 'vscodeCallback', cbid: message.cbid, data: resp});
    }

}
exports.OmiWelcome = OmiWelcome;
