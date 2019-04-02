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
		const hoverfileName	= document.fileName;
		const fileNames = alg.getfilePathName(__dirname+"/hoverjson");
		for(let i = 0; i < fileNames.length; i++) {
			//if(typeof(this.jsonData[fileNames[i]]) == "undefined") {  //支持配置文件动态加载需注释(效率比静态加载低)，用于实现用户自定义配置功能
				let data = JSON.parse(fs.readFileSync(__dirname+'/hoverjson/'+fileNames[i], 'utf8'));
				let k = false;
				for(let j = 0; j < data["fileTypes"].length; j++) {
					if(data["fileTypes"][j] == ".*") {
						k = true;
						break;
					}
					if(alg.strTailMatch(hoverfileName, data["fileTypes"][j], 2)) {
						k = true;
						break;
					}
				}
				if(k) {
					this.jsonData[fileNames[i]] = data;
				}
			//}
		}
	}

	/**
	 * 添加鼠标悬停提示
	 * @param {*} document 文档对象
	 * @param {*} position 可获取光标所在位置相关信息
	 */
	addHover(document, position) {
		//const fileName = document.fileName;
		//const workDir	= path.dirname(fileName);
		//const word = document.getText(document.getWordRangeAtPosition(position));
		const line = document.lineAt(position).text;
		const word = this.posDelSpaces(line, position);  //获取光标所在无空格的单词
		
		let showText = "";
		for(let k in this.jsonData) {
			for(let i in this.jsonData[k]["hovers"]) {
				if(this.jsonData[k]["hovers"][i]["matchingMethod"] == "line") {  //整行匹配
					if(this.jsonData[k]["hovers"][i]["ignoreAZ"]) {  //忽略大小写匹配
						if(alg.strInFindLP(line, this.jsonData[k]["hovers"][i]["keyword"])) {
							showText += this.jsonData[k]["hovers"][i]["markdownText"]+"\n\n";
						}
					} else {  //不忽略大小写
						if(line.indexOf(this.jsonData[k]["hovers"][i]["keyword"]) != -1) {
							showText += this.jsonData[k]["hovers"][i]["markdownText"]+"\n\n";
						}
					}
				} else if(this.jsonData[k]["hovers"][i]["matchingMethod"] == "continuous") {  //光标所在连续字符串匹配(不包含空格等)
					if(this.jsonData[k]["hovers"][i]["ignoreAZ"]) {
						if(alg.strInFindLP(word, this.jsonData[k]["hovers"][i]["keyword"])) {
							showText += this.jsonData[k]["hovers"][i]["markdownText"]+"\n\n";
						}
					} else {
						if(word.indexOf(this.jsonData[k]["hovers"][i]["keyword"]) != -1) {
							showText += this.jsonData[k]["hovers"][i]["markdownText"]+"\n\n";
						}
					}
				} else {
					vscode.window.showInformationMessage(`Unknown match mode!`);
				}
			}
		}
		return showText;
	}

	/**
	 * 获取光标所在无空格的单词
	 * @param {*} line 光标所在的整行文本串
	 * @param {*} position 光标位置
	 */
	posDelSpaces(line, position) {
		let word = "";
		let il = position.character;
		let ir = position.character;
		while(il >= 0 && line[il] != ' ') {
			il--;
		}
		while(ir < line.length && line[ir] != ' ') {
			ir++;
		}
		for(let i = il+1; i < ir; i++) {
			word += line[i];
		}
		return word;
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