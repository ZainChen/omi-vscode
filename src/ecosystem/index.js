const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');

//zain自定义模块
// const alg = require("../algorithm/index");  //算法模块
const ourl = require('./open-url');  //webview打开网页功能

class OmiEcosystem {
    constructor(context) {
        this.context = context;
        this.text = new Object();  //模板功能所有文本ID对应文本
        this._onDidChangeTreeData = new vscode.EventEmitter();  //刷新菜单节点使用
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;  //刷新菜单节点使用

        this.terminal = vscode.window.createTerminal({name: "omi-ecosystem"});  //创建终端命令执行窗口
        this.output = vscode.window.createOutputChannel("omi-ecosystem");  //创建终端输出消息窗口

        this.initText();  //初始化模板语言文本

        this.initViewShow();  //初始判断 omi 菜单视图是否显示

        this.onDidConfigTemplateLanguage();  //监听模板语言设置
        this.onDidConfigViewShow();  //监听 omi 菜单视图显示设置
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
        let nodes;
        let node;
        if(element) {
            switch(element.id) {
                case '1':
                    nodes = new Array();
                    node = new vscode.TreeItem(this.text['menu']['omi.base.template'], vscode.TreeItemCollapsibleState.None);
                    node.id = "1.1";
                    //node.description = this.text['menu']['omi.base.template'];
                    node.command = {
                        command: 'omi.cmd.ecosystemOpenWebview',
                        title: 'base-template',
                        arguments: [this.context.extensionPath+"\\src\\ecosystem\\page\\build\\index.html"]
                    }
                    nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['10'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.2";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['11'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.3";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['12'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.4";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['13'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.5";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['14'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.6";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['15'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.7";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['16'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "1.8";
                    // nodes.push(node);
                    return Promise.resolve(nodes);
                case '2':
                    nodes = new Array();
                    node = new vscode.TreeItem(this.text['menu']['omi.docs'], vscode.TreeItemCollapsibleState.None);
                    node.id = "2.1";
                    node.description = this.text['menu']['omi.official.document'];
                    node.command = {
                        command: 'omi.cmd.ecosystemOpenWebview',
                        title: '',
                        arguments: [this.context.extensionPath+"\\src\\ecosystem\\packages\\omi-docs\\index.html", "omi-docs"]
                        // arguments: ["https://tencent.github.io/omi/site/docs/cn.html"]
                    }
                    nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['omi.omio.one'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.2";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['18'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.3";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['19'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.4";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['20'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.5";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['21'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.6";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['22'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.7";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['23'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "2.8";
                    // nodes.push(node);
                    return Promise.resolve(nodes);
                case '3':
                    nodes = new Array();
                    // node = new vscode.TreeItem(this.text['menu']['24'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.1";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['25'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.2";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['26'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.3";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['27'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.4";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['28'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.5";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['29'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.6";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['30'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.7";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['31'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "3.8";
                    // nodes.push(node);
                    return Promise.resolve(nodes);
                case '4':
                    nodes = new Array();
                    // node = new vscode.TreeItem(this.text['menu']['32'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.1";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['33'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.2";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['34'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.3";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['35'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.4";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['36'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.5";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['37'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.6";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['38'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.7";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['39'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.8";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['40'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.9";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['41'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.10";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['42'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.11";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['43'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.12";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['44'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.13";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['45'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.14";
                    // nodes.push(node);
                    // node = new vscode.TreeItem(this.text['menu']['46'], vscode.TreeItemCollapsibleState.None);
                    // node.id = "4.15";
                    // nodes.push(node);
                    return Promise.resolve(nodes);
                default:
                    break;
            }
        } else {
            nodes = new Array();
            node = new vscode.TreeItem(this.text['menu']['omi.one'], vscode.TreeItemCollapsibleState.None);
            node.id = "0";
            node.description = this.text['menu']['omi.description.one'];
            node.iconPath = {
                light: path.join(__filename, '..', '..', '..', 'assets', 'light', 'omi-eco.svg'),
                dark: path.join(__filename, '..', '..', '..', 'assets', 'dark', 'omi-eco.svg')
            }
            node.command = {
                command: 'omi.cmd.ecosystemOpenWebview',
                title: 'omi-ecosystem',
                arguments: [this.context.extensionPath+"\\src\\ecosystem\\page\\build\\index.html", "omi-ecosystem"]
            }
            nodes.push(node);
            node = new vscode.TreeItem(this.text['menu']['omi.project.template'], vscode.TreeItemCollapsibleState.Expanded);
            node.id = "1";
            //node.description = this.text['menu']['4'];
            nodes.push(node);
            node = new vscode.TreeItem(this.text['menu']['5'], vscode.TreeItemCollapsibleState.Expanded);
            node.id = "2";
            //node.description = this.text['menu']['5'];
            nodes.push(node);
            // node = new vscode.TreeItem(this.text['menu']['6'], vscode.TreeItemCollapsibleState.Expanded);
            // node.id = "3";
            // //node.description = this.text['menu']['6'];
            // nodes.push(node);
            // node = new vscode.TreeItem(this.text['menu']['7'], vscode.TreeItemCollapsibleState.Expanded);
            // node.id = "4";
            // //node.description = this.text['menu']['7'];
            // nodes.push(node);
            return Promise.resolve(nodes);
        }
    }

    /**
     * 初始化模板语言文本
     */
    initText() {
        const language = vscode.workspace.getConfiguration().get('omi.language.ecosystem');
        //console.log(language);
        //vscode.workspace.getConfiguration().update('omi.language.ecosystem', '简体中文', true);
        switch(language) {
            case "English":
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-ecosystem-en.json', 'utf8'));
                break;
            case "简体中文":
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-ecosystem-cn.json', 'utf8'));
                break;
            case "한국어":
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-ecosystem-kr.json', 'utf8'));
                break;
            default:
                this.text = JSON.parse(fs.readFileSync(__dirname+'/text/omi-ecosystem-en.json', 'utf8'));
                break;
        }
    }

    /**
     * 监听模板语言设置
     */
    onDidConfigTemplateLanguage() {
        vscode.workspace.onDidChangeConfiguration((element) => {
            if(element.affectsConfiguration('omi.language.ecosystem') === true) {
                this.initText();
                this._onDidChangeTreeData.fire();  //刷新所有模板菜单节点
            }
        })
    }

    /**
     * 打开 webview
     * @param {*} link webview 视图链接
     */
    OpenWebview(link, title) {
        if(typeof title === "undefined") {
            new ourl("omi", link);
        } else {
            new ourl(title, link);
        }
        // const terminal = vscode.window.createTerminal({
        //     name: "omi"
        // });
        // terminal.show(true);
        // terminal.sendText("ls", true);
        // const output = vscode.window.createOutputChannel("zain");
        // output.show(true);
        // output.append("aaaaaagweagaaaa");
        //this.gitClone('git@github.com:ZainChen/vscode-json.git');
    }

    /**
     * 异步克隆指定git仓库，例：this.gitClone('git@github.com:Tencent/omi.git');
     * child_process库中的方法，不采用，不能在终端显示过程
     * @param str git 仓库链接
     */
    gitClone(str) {
        execFile('git', ['clone', str], {cwd: path.join(__dirname, '..', '..', 'assets')}, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log("clone complete."+stdout);
        });
    }

    /**
     * 初始判断 omi 菜单视图是否显示
     */
    initViewShow() {
        if(vscode.workspace.getConfiguration().get('omi.views.setShow')) {
            vscode.commands.executeCommand('setContext', 'omi.views.show', true);  // 设置when
        } else {
            vscode.commands.executeCommand('setContext', 'omi.views.show', false);  // 设置when
        }
    }

    /**
     * 开启或关闭 omi views
     */
    setViewShow() {
        if(vscode.workspace.getConfiguration().get('omi.views.setShow')) {
            vscode.workspace.getConfiguration().update('omi.views.setShow', false, true);
            vscode.commands.executeCommand('setContext', 'omi.views.show', false);  // 设置when
        } else {
            vscode.workspace.getConfiguration().update('omi.views.setShow', true, true);
            vscode.commands.executeCommand('setContext', 'omi.views.show', true);  // 设置when
        }
    }

    /**
     * 监听 omi 菜单视图显示设置
     */
    onDidConfigViewShow() {
        vscode.workspace.onDidChangeConfiguration((element) => {
            if(element.affectsConfiguration('omi.views.setShow') === true) {
                if(vscode.workspace.getConfiguration().get('omi.views.setShow')) {
                    vscode.commands.executeCommand('setContext', 'omi.views.show', true);  // 设置when
                } else {
                    vscode.commands.executeCommand('setContext', 'omi.views.show', false);  // 设置when
                }
            }
        })
    }

}
exports.OmiEcosystem = OmiEcosystem;