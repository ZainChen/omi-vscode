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
        let nodes = new Array();
        for(let i = 0; i < 10; i++) {
            let node = new vscode.TreeItem("zain"+i.toString(), vscode.TreeItemCollapsibleState.None);
            node.description = "jane"+i.toString();
            nodes.push(node);
        }
        return Promise.resolve(nodes);
    }
    



}
exports.OmiTemplate = OmiTemplate;