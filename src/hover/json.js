const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

//zain自定义模块
const alg = require("../algorithm/index");  //算法模块


module.exports = {
    provideHoverJson
}

/**
 * json文件鼠标悬停提示配置
 * @param document — 调用命令的文档。
 * @param position — 调用命令的位置。
 * @param token — 取消令牌。
 * @return 提示内容
 */
function provideHoverJson(document, position, token) {
	const fileName	= document.fileName;
	const workDir	= path.dirname(fileName);
	const line      = document.lineAt(position);
	const word		= document.getText(document.getWordRangeAtPosition(position));

	//指定vscode-omi/package.json配置文件提示内容
	if (alg.strTailMatch(fileName, "vscode-omi\\package.json", 2)) {
		if(line.text.indexOf("\"name\"") != -1) {
			//return new vscode.Hover(`扩展包名称：\`vsce package\`命令打包后的文件名`);
			let show = {
				contents: [`扩展包名称：\`vsce package\`命令打包后的文件名。`]
			}
			return show;
		} else if(line.text.indexOf("\"displayName\"") != -1) {
			return new vscode.Hover(`VS Code库中使用的扩展名称。`);
		}
	}



	//当鼠标停在package.json的dependencies或者devDependencies时，自动显示对应包的名称、版本号和许可协议。
	if (/package\.json$/.test(fileName)) {
		//console.log('provideHover');
		const json = document.getText();
		if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
			let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
			if (fs.existsSync(destPath)) {
				const content = require(destPath);
				//console.log('hover');
				// hover内容支持markdown语法
				//return new vscode.Hover(`\`\`\`志银\`\`\`\n * **名称**：${content.name}\n * **版本**：${content.version}\n * **许可协议**：${content.license}`);
				let sss = ` * **名称**：${content.name}\n * **版本**：${content.version}\n * **许可协议**：${content.license}`;
				return {
					contents: [sss]
				};
			}
		}
	}

	return new vscode.Hover(`zain`);

}
