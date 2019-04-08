const vscode = require('vscode');

class OmiTemplate {
    constructor() {

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
            if(element.label == "omip") {
                let nodes = new Array();
                let node = new vscode.TreeItem("npm", vscode.TreeItemCollapsibleState.None);
                node.description = "创建项目";
                nodes.push(node);
                return Promise.resolve(nodes);
            }
        } else {
            let nodes = new Array();
            let node = new vscode.TreeItem("Omi", vscode.TreeItemCollapsibleState.None);
            // node.description = "安装与项目创建总览";
            nodes.push(node);
            node = new vscode.TreeItem("Base", vscode.TreeItemCollapsibleState.Collapsed);
            // node.description = "基础生态";
            nodes.push(node);
            node = new vscode.TreeItem("Mini Program", vscode.TreeItemCollapsibleState.Collapsed);
            // node.description = "小程序生态";
            nodes.push(node);
            node = new vscode.TreeItem("Other", vscode.TreeItemCollapsibleState.Collapsed);
            // node.description = "其它";
            nodes.push(node);
            return Promise.resolve(nodes);
        }
    }
    



}
exports.OmiTemplate = OmiTemplate;