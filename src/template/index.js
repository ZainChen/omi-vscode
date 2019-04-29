const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

//zain自定义模块
// const alg = require("../algorithm/index");  //算法模块
const ourl = require('./open-url');  //webview打开网页功能

class OmiTemplate {
    constructor(context) {
        this.context = context;
        this.text = new Object();
        this._onDidChangeTreeData = new vscode.EventEmitter();  //刷新菜单节点使用
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;  //刷新菜单节点使用

        this.initText();  //初始化模板语言文本
        this.onDidConfigTemplateLanguage();  //监听模板语言设置
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
     * @param element 菜单中单击选中的节点
     */
    getChildren(element) {
        return this.createNodeAll(element);
    }

    /**
     * 创建所有菜单节点
     * @param {*} element 菜单中单击选中的节点
     */
    createNodeAll(element) {
        if(element) {
            let nodes;
            let node;
            switch(element.id) {
                case '1':
                    nodes = new Array();
                    node = new vscode.TreeItem(this.text['menu']['2'], vscode.TreeItemCollapsibleState.None);
                    node.description = this.text['menu']['8'];
                    node.command = {
                        command: 'omi.cmd.templateShowProject',
                        title: '',
                        arguments: [this.context.extensionPath+"\\src\\template\\project\\omi\\index.html"]
                    }
                    nodes.push(node);
                    return Promise.resolve(nodes);
                case '2':
                    nodes = new Array();
                    node = new vscode.TreeItem(this.text['menu']['2'], vscode.TreeItemCollapsibleState.None);
                    node.description = this.text['menu']['8'];
                    node.command = {
                        command: 'omi.cmd.templateShowProject',
                        title: '',
                        arguments: [this.context.extensionPath+"\\src\\template\\project\\omi\\index.html"]
                    }
                    nodes.push(node);
                    return Promise.resolve(nodes);
                default:
                    break;
            }
        } else {
            let nodes = new Array();
            let node = new vscode.TreeItem(this.text['menu']['0'], vscode.TreeItemCollapsibleState.None);
            node.id = "0";
            node.description = this.text['menu']['3'];
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
            //
            node = new vscode.TreeItem(this.text['menu']['4'], vscode.TreeItemCollapsibleState.Expanded);
            node.id = "1";
            node.description = this.text['menu']['4'];
            nodes.push(node);
            node = new vscode.TreeItem(this.text['menu']['5'], vscode.TreeItemCollapsibleState.Expanded);
            node.id = "2";
            node.description = this.text['menu']['5'];
            nodes.push(node);
            node = new vscode.TreeItem(this.text['menu']['6'], vscode.TreeItemCollapsibleState.Expanded);
            node.id = "3";
            node.description = this.text['menu']['6'];
            nodes.push(node);
            node = new vscode.TreeItem(this.text['menu']['7'], vscode.TreeItemCollapsibleState.Expanded);
            node.id = "4";
            node.description = this.text['menu']['7'];
            nodes.push(node);
            return Promise.resolve(nodes);
        }
    }

    /**
     * 初始化模板语言文本
     */
    initText() {
        const language = vscode.workspace.getConfiguration().get('omi.language.template');
        //console.log(language);
        //vscode.workspace.getConfiguration().update('omi.language.template', '简体中文', true);
        switch(language) {
            case "English":
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-template-en.json', 'utf8'));
                break;
            case "简体中文":
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-template-cn.json', 'utf8'));
                break;
            case "한국어":
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-template-kr.json', 'utf8'));
                break;
            default:
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-template-en.json', 'utf8'));
                break;
        }
    }

    /**
     * 监听模板语言设置
     */
    onDidConfigTemplateLanguage() {
        vscode.workspace.onDidChangeConfiguration((element) => {
            if(element.affectsConfiguration('omi.language.template') === true) {
                this.initText();
                this._onDidChangeTreeData.fire();  //刷新所有模板菜单节点
            }
        })
    }

    /**
     * 打开webview
     * @param {*} link webview视图链接
     */
    OpenWebview(link) {
        new ourl("omi", link);
    }

}
exports.OmiTemplate = OmiTemplate;