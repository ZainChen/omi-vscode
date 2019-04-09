const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class OmiWelcome {
    constructor(context) {
        this.context = context;
        this.initWelcom();
    }

    /**
     * 初始化函数
     */
    initWelcom() {
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
        panel.webview.onDidReceiveMessage(
            message => {
                if(message.cmd == "getConfig") {
                    this.getConfig(panel, message);
                } else if(message.cmd == "setConfig") {
                    this.setConfig(message);
                } else {
                    vscode.window.showInformationMessage(`未找到名为 ${message.cmd} 回调方法!`);
                }
            },
            undefined,
            this.context.subscriptions
        );
    }

    /**
     * HTML文件读内容并将本地资源链接转换为vscode支持的链接
     */
    getWebViewContent() {
        //const resourcePath = path.join(__dirname, 'omi-welcome', 'build', 'index.html');
        const resourcePath = path.join(this.context.extensionPath, 'src', 'welcome', 'omi-welcome-bf', 'index.html');
        const dirPath = path.dirname(resourcePath);
        let html = fs.readFileSync(resourcePath, 'utf-8');
        //vscode不支持直接加载本地资源，需要替换成其专有路径格式，将样式、JS、iframe的路径替换
        html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src="|<iframe.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
        return html;
    }

    /**
     * 获取扩展设置中的配置信息，传递到webview的window.addEventListener('message', event => { ... })中
     * @param {*} panel 
     * @param {*} message 
     */
    getConfig(panel, message) {
        const result = vscode.workspace.getConfiguration().get(message.key);
        this.invokeCallback(panel, message, result);
    }

    /**
     * 获取webview中的配置信息，传递到扩展中
     * @param {*} message 
     */
    setConfig(message) {
        // 写入配置文件，注意，默认写入工作区配置，而不是用户配置，最后一个true表示写入全局用户配置
        vscode.workspace.getConfiguration().update(message.key, message.value, true);
        vscode.window.showInformationMessage('Configuration modification successful!');
    }

    /**
     * 传递信息到webview中
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
