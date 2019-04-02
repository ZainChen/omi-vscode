const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

//zain自定义模块
const alg = require("../algorithm/index");  //算法模块

/**
 * omi鼠标悬停对象
 */
class omiHover {
	constructor() {
		this.jsonData = new Object();
	}

	/**
	 * 鼠标悬停提示入口函数。
	 * 为给定的位置和文档提供悬停提示。
	 * 编辑器将合并多个位于同一位置的悬停。
	 * 悬停的范围可以默认为省略时位置的单词范围。
	 * @依赖文件 const vscode = require('vscode');
	 * @依赖文件 const path = require('path');
	 * @依赖文件 const fs = require('fs');
	 * @param document — 调用命令的文档。
	 * @param position — 调用命令的位置。
	 * @param token — 取消令牌。
	 * @return 悬停或可解决的问题。可以通过返回“undefined”或“null”来表示缺少结果。
	 */
	provideHover(document, position, token) {
		this.initData(document);
		return { contents: [this.addHover(document, position)] };
	}

	/**
	 * 初始化鼠标悬停json数据
	 */
	initData(document) {
		const fileName	= document.fileName;
		console.log(this.jsonData["hover-omi"]);
		//javascript文件(示例：指定文件类型提示)
		if(alg.strTailMatch(fileName, ".json", 2) && typeof(this.jsonData["hover-omi"]) == "undefined") {
			let data = fs.readFileSync(__dirname+'/hoverjson/hover-omi.json', 'utf8');
			this.jsonData["hover-omi"] = JSON.parse(data);
		}
		if(typeof(this.jsonData["hover-omiu"]) == "undefined") {  //如果omiu标签属性库为空，则从文件读取导入(JSON.stringify(this.jsonData) == "{}")
			let data = fs.readFileSync(__dirname+'/hoverjson/hover-omiu.json', 'utf8');  //同步获取json文件内容
			this.jsonData["hover-omiu"] = JSON.parse(data);  //字符串转json对象
		}
	}

	/**
	 * 添加鼠标悬停提示
	 * @param {*} document 文档对象
	 * @param {*} position 可获取光标所在位置相关信息
	 */
	addHover(document, position) {
		//const fileName	= document.fileName;
		//const workDir	= path.dirname(fileName);
		const line      = document.lineAt(position).text;
		const word		= document.getText(document.getWordRangeAtPosition(position));
		let showText = "";
		for(let k in this.jsonData) {
			for(let i in this.jsonData[k]) {
				if(this.jsonData[k][i]["matchingMethod"] == "line") {  //整行匹配
					if(this.jsonData[k][i]["ignoreAZ"]) {  //忽略大小写匹配
						if(alg.strInFindLP(line, this.jsonData[k][i]["keyword"])) {
							showText += this.jsonData[k][i]["markdownText"]+"\n\n";
						}
					} else {  //不忽略大小写
						if(line.indexOf(this.jsonData[k][i]["keyword"]) != -1) {
							showText += this.jsonData[k][i]["markdownText"]+"\n\n";
						}
					}
				} else if(this.jsonData[k][i]["matchingMethod"] == "continuous") {  //光标所在连续字符串匹配(不包含空格等)
					if(this.jsonData[k][i]["ignoreAZ"]) {
						if(alg.strInFindLP(word, this.jsonData[k][i]["keyword"])) {
							showText += this.jsonData[k][i]["markdownText"]+"\n\n";
						}
					} else {
						if(word.indexOf(this.jsonData[k][i]["keyword"]) != -1) {
							showText += this.jsonData[k][i]["markdownText"]+"\n\n";
						}
					}
				} else {
					vscode.window.showInformationMessage(`Unknown match mode!`);
				}
			}
		}
		return showText;
	}

}
exports.omiHover = omiHover;


//方法示例
// if(line.text.indexOf("\"name\"") != -1) {
// 	//return new vscode.Hover(`扩展包名称：\`vsce package\`命令打包后的文件名`);
// 	let show = {
// 		contents: [`扩展包名称：\`vsce package\`命令打包后的文件名。`]
// 	}
// 	return show;
// }
// if(line.text.indexOf("\"displayName\"") != -1) {
// 	return new vscode.Hover(`VS Code库中使用的扩展名称。`);
// }

// //当鼠标停在package.json的dependencies或者devDependencies时，自动显示对应包的名称、版本号和许可协议。
// if (/package\.json$/.test(fileName)) {
// 	//console.log('provideHover');
// 	const json = document.getText();
// 	if (new RegExp(`"(dependencies|devDependencies)":\\s*?\\{[\\s\\S]*?${word.replace(/\//g, '\\/')}[\\s\\S]*?\\}`, 'gm').test(json)) {
// 		let destPath = `${workDir}/node_modules/${word.replace(/"/g, '')}/package.json`;
// 		if (fs.existsSync(destPath)) {
// 			const content = require(destPath);
// 			//console.log('hover');
// 			// hover内容支持markdown语法
// 			//return new vscode.Hover(`\`\`\`志银\`\`\`\n * **名称**：${content.name}\n * **版本**：${content.version}\n * **许可协议**：${content.license}`);
// 			let sss = ` * **名称**：${content.name}\n * **版本**：${content.version}\n * **许可协议**：${content.license}`;
// 			return {
// 				contents: [sss]
// 			};
// 		}
// 	}
// }