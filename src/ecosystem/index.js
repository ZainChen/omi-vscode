"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const json = require("jsonc-parser");
const path = require("path");



class ecoProvider {
    constructor(context) {
		this.context = context;
		vscode.window.onDidChangeActiveTextEditor();
	}
    getChildren(offset) {
        if (offset) {
            const path = json.getLocation(this.text, offset).path;
            const node = json.findNodeAtLocation(this.tree, path);
            return Promise.resolve(this.getChildrenOffsets(node));
        }
        else {
            return Promise.resolve(this.tree ? this.getChildrenOffsets(this.tree) : []);
        }
	}
	getChildrenOffsets(node) {
        const offsets = [];
        for (const child of node.children) {
            const childPath = json.getLocation(this.text, child.offset).path;
            const childNode = json.findNodeAtLocation(this.tree, childPath);
            if (childNode) {
                offsets.push(childNode.offset);
            }
        }
        return offsets;
    }
}
exports.ecoProvider = ecoProvider;


function ecoZain() {
	vscode.window.showInformationMessage('geagerabhrrensrt');
}
exports.ecoZain = ecoZain;
