const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

const trioe = require("./treeItemOmiEco");  //omi生态专用菜单树模块

/**
 * omi生态功能实现类
 */
class EcoProvider {
    constructor() {

    }
    
    getTreeItem(element) {
        return element;
    }

    /**
     * 
     */
    getChildren() {
        //ecoZain();

        const filePath = path.join(vscode.workspace.rootPath, 'package.json');
        const file = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const toDep = (moduleName, version) => {
            //if (this.pathExists(path.join(vscode.workspace.rootPath, 'node_modules', moduleName))) {
                return new trioe.TreeItemOmiEco(moduleName, version, vscode.TreeItemCollapsibleState.Collapsed);
            //}
            // else {
            //     return new trioe.TreeItemOmiEco(moduleName, version, vscode.TreeItemCollapsibleState.None, {
            //         command: 'extension.openPackageOnNpm',
            //         title: '',
            //         arguments: [moduleName]
            //     });
            // }
        };
        const zain = Object.keys(file.devDependencies).map(dep => toDep(dep, file.devDependencies[dep]));
        let zain1 = {jane: "love zain", zain: "okokok"};
        zain1 = Object.keys(zain1).map(dep => toDep(dep, zain1[dep]))
        return Promise.resolve(zain1);
    }
    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (err) {
            return false;
        }
        return true;
    }
}
exports.EcoProvider = EcoProvider;



function ecoZain() {
	vscode.window.showInformationMessage('No dependency in empty workspace');
}
exports.ecoZain = ecoZain;

