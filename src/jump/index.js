const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

const alg = require("../algorithm/index");  //算法模块


module.exports = {
	provideDefinition
}


/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
function provideDefinition(document, position, token) {
    const fileName    = document.fileName;
    const workDir     = path.dirname(fileName);
    const word        = document.getText(document.getWordRangeAtPosition(position));
    const line        = document.lineAt(position);

    // console.log(word, line.text);
    
    // 只处理package.json文件
    if (/package\.json$/.test(fileName)) {
        
        const json = document.getText();
        if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
            //let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
            let destPath = `${workDir}/README.md`;
            if (fs.existsSync(destPath)) {
                // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
                return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
            }
        }
    }

    //test
    // if(alg.strInFindLP(line.text, "define")) {
    //     let destPath = `${workDir}/omi.js`;
    //     if (fs.existsSync(destPath)) {
    //         // new vscode.Position(0, 0) 表示跳转到某个文件的第一行第一列
    //         return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0));
    //     }
    // }
	

}