const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');

//zain自定义模块
const alg = require("../algorithm/index");  //算法模块
const hoverJson = require("./json");  //json文件内容提示
const hoverJavascript = require("./javascript");  //javascript文件内容提示


class omiHover {
	constructor() {
		this.objJson = new Object();
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
		let showText = "";

		showText += this.addHover(document, position, "omiu-hover.json");


		return { contents: [showText] };



		const fileName	= document.fileName;

		//json文件
		if(alg.strTailMatch(fileName, ".json", 2)) {
			return hoverJson.provideHoverJson(document, position, token);
		}
		//javascript文件
		if(alg.strTailMatch(fileName, ".js", 2)) {
			return null; //return hoverJavascript.provideHoverJavaScript(document, position, token);
		}
		
		// return new vscode.Hover(`zain`);

		return null;
	}

	addHover(document, position, fileName) {
		//const fileName	= document.fileName;
		//const workDir	= path.dirname(fileName);
		const line      = document.lineAt(position);
		const word		= document.getText(document.getWordRangeAtPosition(position));

		let showText = "";

		//此处导入json文件要写到函数外面
		if(JSON.stringify(this.objJson) == "{}") {  //如果omiu标签属性库为空，则从文件读取导入
			let data = fs.readFileSync(__dirname+'/hoverjson/'+fileName, 'utf8');  //同步获取json文件内容
			this.objJson = JSON.parse(data);  //字符串转json对象
		}
		
		for(let i in this.objJson) {
			if(this.objJson[i]["matchingMethod"] == "line") {  //整行匹配
				if(this.objJson[i]["ignoreAZ"]) {  //忽略大小写匹配
					if(alg.strInFindLP(line.text, this.objJson[i]["keyword"])) {
						showText += this.objJson[i]["markdownText"]+"\n\n";
					}
				} else {  //不忽略大小写
					if(line.text.indexOf(this.objJson[i]["keyword"]) != -1) {
						showText += this.objJson[i]["markdownText"]+"\n\n";
					}
				}
			} else if(this.objJson[i]["matchingMethod"] == "continuous") {  //光标所在连续字符串匹配(不包含空格等)
				if(this.objJson[i]["ignoreAZ"]) {
					if(alg.strInFindLP(word.text, this.objJson[i]["keyword"])) {
						showText += this.objJson[i]["markdownText"]+"\n\n";
					}
				} else {
					if(word.text.indexOf(this.objJson[i]["keyword"]) != -1) {
						showText += this.objJson[i]["markdownText"]+"\n\n";
					}
				}
			} else {
				vscode.window.showInformationMessage(`Unknown match mode!`);
			}
		}
		return showText;
	}

}
exports.omiHover = omiHover;


