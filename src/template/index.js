const vscode = require('vscode');
const path = require('path');

const ourl = require('./open-url');  //webview打开网页功能

class OmiTemplate {
    constructor(context) {
        this.context = context;
    }

    /**
     * 菜单树内容，每个子节点都分别刷新一次该函数
     * @param element 元素
     * @return element — 必须返回元素，否则菜单树不显示内容
     */
    getTreeItem(element) {
        return element;
        // let treeItem = new vscode.TreeItem("zain", vscode.TreeItemCollapsibleState.None);

        // return treeItem;
        
    }

    /**
     * 菜单树数据写入入口，生成子节点
     * @声明标识符 async 标识符标识当前函数是异步执行函数
     * @param element 菜单中单击选中的节点文本
     */
    getChildren(element) {
        if(element) {
            if(element.label == "Base") {
                let nodes = new Array();
                let node = new vscode.TreeItem("omio", vscode.TreeItemCollapsibleState.None);
                node.description = "兼容老浏览器的 Omi 版本(支持到IE8+和移动端浏览器)。";
                node.command = {
                    command: 'omi.cmd.templateShowProject',
                    title: '',
                    arguments: [this.context.extensionPath+"\\src\\template\\project\\omi\\index.html"]
                }
                nodes.push(node);
                return Promise.resolve(nodes);
            }
        } else {
            let nodes = new Array();
            let node = new vscode.TreeItem("Omi", vscode.TreeItemCollapsibleState.None);
            node.id = "0";
            node.description = "project creation overview";
            node.iconPath = {
                light: path.join(__filename, '..', '..', '..', 'assets', 'light', 'file.svg'),
                dark: path.join(__filename, '..', '..', '..', 'assets', 'dark', 'file.svg')
            }
            node.command = {
                command: 'omi.cmd.welcome',
                title: '',
                arguments: [this.context.extensionPath+"\\src\\template\\project\\omi\\index.html"]
            }
            nodes.push(node);
            node = new vscode.TreeItem("Base", vscode.TreeItemCollapsibleState.Expanded);
            node.id = "1";
            node.description = "base ecology";
            nodes.push(node);
            node = new vscode.TreeItem("Mini Program", vscode.TreeItemCollapsibleState.Expanded);
            node.id = "2";
            // node.description = "小程序生态";
            nodes.push(node);
            node = new vscode.TreeItem("Other", vscode.TreeItemCollapsibleState.Expanded);
            node.id = "3";
            // node.description = "其它";
            nodes.push(node);
            return Promise.resolve(nodes);
        }
    }

    OpenWebview(link) {
        new ourl("omi", link);
    }


}
exports.OmiTemplate = OmiTemplate;