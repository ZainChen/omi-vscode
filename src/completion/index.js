const vscode = require('vscode');
const fs = require('fs');

const alg = require('../algorithm/index');

/**
 * omi自动补全功能实现类
 */
class OmiCompletion {
	constructor() {
		this.objJsonOmiu = new Object();
	}

	/**
	 *提供给定职位和文件的完成项目。
	 *
	 * @param document 调用命令的文档。
	 * @param position 调用命令的位置。
	 * @param token 取消令牌。
	 * @param context 如何触发完成。
	 * @return 一个完成数组，一个[补全列表]（＃CompletionList），或一个解析为其中任何一个的thenable。
	 *可以通过返回`undefined`，`null`或空数组来表示缺少结果。
	 */
	provideCompletionItems(document, position, token, context) {
		this.initData(document);
		let ctc = context.triggerCharacter;
		let glc = this.getLastChar(document, position);  //获取当前输入的字符或字符串
		let ch = ctc || glc;
		//console.log("\""+ctc+"\"\t\""+glc+"\"");
		if(ch != '-' && ch != ' ') {
			return this.omiuLabelCompletion();  //标签补全(准备将函数内循环放到函数外只载入一次数据，提高效率)
		} else if(ch == ' ') {
			return this.omiuAttributesCompletion(document, position);  //属性补全(准备将函数内循环放到函数外只载入一次数据，提高效率)
		} else {
			return [];
		}
	}

	/**
	 *给定完成项填写更多数据，如[doc-comment]（＃CompletionItem.documentation）
	 *或[详情]（＃CompletionItem.detail）。
	 *
	 *编辑器只会解析一次完成项目。
	 *
	 * @param item UI中当前处于活动状态的完成项。
	 * @param token 取消令牌。
	 * @return 已解决的完成项目或解析为此类的完成项目。 可以返回给定的
	 *`item`。 如果没有返回结果，将使用给定的`item`。
	 */
	resolveCompletionItem(item, token) {
		return item;
	}

	/**
	 * 初始化补全提示json数据
	 */
	initData(document) {
		// if(JSON.stringify(this.objJsonOmiu) !== "{}") {  //静态加载补全配置(需重启vscode更新补全配置)，注释该if可实现动态加载(动态加载效率低于静态加载，但可实现实时更新用户自定义补全配置)。
		// 	return false;
		// }
		this.objJsonOmiu = new Object();
		const completionfileName = document.fileName;
		const fileNames = alg.getfilePathNameAll(__dirname+"/config");  //递归获取指定路径下所有文件，包含子文件夹
		for(let i = 0; i < fileNames.length; i++) {
			const content = fs.readFileSync(fileNames[i], 'utf8');
			if(content === '') {
				continue;
			}
			let data = JSON.parse(content);  //同步获取json文件内容
			let k = false;
			for(let j = 0; typeof data["fileTypes"] !== "undefined" && j < data["fileTypes"].length; j++) {
				if(data["fileTypes"][j] == ".*") {
					k = true;
					break;
				}
				if(alg.strTailMatch(completionfileName, data["fileTypes"][j], 2)) {
					k = true;
					break;
				}
			}
			if(k) {
				this.objJsonOmiu[fileNames[i]] = data;
			}
		}
		return true;
	}

	/**
	 * 标签补全
	 */
	omiuLabelCompletion() {
		let retCom = new Array();
		for(let k in this.objJsonOmiu) {
			for(let i in this.objJsonOmiu[k]["completion"]) {
				let comp = new vscode.CompletionItem(this.objJsonOmiu[k]["completion"][i]['label'], this.objJsonOmiu[k]["completion"][i]['kind']);  //创建补全对象(初始化标签和类型)
				comp.detail = this.objJsonOmiu[k]["completion"][i]['detail'];  //提示信息
				comp.insertText = new vscode.SnippetString(this.objJsonOmiu[k]["completion"][i]['insertText']);  //插入的内容
				comp.documentation = new vscode.MarkdownString(this.objJsonOmiu[k]["completion"][i]['documentation']);  //Markdown说明
				comp.sortText = this.objJsonOmiu[k]["completion"][i]['sortText'];  //权值排序
				if(this.objJsonOmiu[k]["completion"][i]['cmd']) {
					comp.command = this.autoSuggestCommand();  //补全后立马开启新的补全提示
				}
				retCom.push(comp);
			}
		}
		return retCom;
	}

	/**
	 * 属性补全
	 * @param document 调用命令的文档。
	 * @param position 调用命令的位置。
	 */
	omiuAttributesCompletion(document, position) {
		let retCom = [];
		let objLabel = this.getPosOmiLabe(document, position);  //获取合法标签对象(包含标签、'<'和'>'的位置，如果标签和引号不合法，返回空对象)
		if(objLabel.label != '') {
			for(let k in this.objJsonOmiu) {
				if(typeof this.objJsonOmiu[k]["completion"][objLabel.label] === "undefined") {
					continue;
				}
				for(let i in this.objJsonOmiu[k]["completion"][objLabel.label]['attribute']) {
					if(this.labeHaveattributes(document, objLabel, this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['label'])) {  //标签内已有的属性值不添加(只支持光标在标签行)
						continue;
					}
					let comp = new vscode.CompletionItem(this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['label'], this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['kind']);
					comp.detail = this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['detail'];
					comp.insertText = new vscode.SnippetString(this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['insertText']);
					comp.documentation = new vscode.MarkdownString(this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['documentation']);
					comp.sortText = this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['sortText'];
					if(this.objJsonOmiu[k]["completion"][objLabel.label]['attribute'][i]['cmd']) {
						comp.command = this.autoSuggestCommand();
					}
					retCom.push(comp);
				}
			}
		}
		return retCom;
	}


	autoSuggestCommand() {
		return {
			command: 'editor.action.triggerSuggest',
			title: 'triggerSuggest'
		};
	}

	getLastChar(doc, pos) {
		return doc.getText(new vscode.Range(new vscode.Position(pos.line, pos.character - 1), pos));
	}
	
	/**
	 * 获取光标所在的标签名，
	 * 如果光标不在一个标签内，则返回空(支持单行和多行查找匹配，例:<>、<\n\n>)(匹配到<符号即可)
	 * @param doc 调用命令文档。
	 * @param pos 调用命令位置。
	 * @return Object Json 标签对象
	 */
	getPosOmiLabe(doc, pos) { //pos,当前光标所在位置(光标所在行:pos.line,光标所在列:pos.character)
		let objLabel = {
			"label": '',
			"posl": { "x": -1, "y": -1},
			"posr": { "x": -1, "y": -1}
		}
		let pl = { "x": -1, "y": -1 }  //'<'的位置
		let pr = { "x": -1, "y": -1 }  //'>'的位置
		//查找'<'位置
		let posl = { "x": pos.line, "y": pos.character };  //坐标扫描实时位置，查找'<'
		let findNotl = true;  //记录是否找到'<'
		while(posl.x >= 0 && findNotl) {
			let xstr = doc.lineAt(posl.x).text;  //获取当前行的整行内容
			if(posl.x != pos.line) {  //不在光标所在行时从当前行内容最后一列开始扫描
				posl.y = xstr.length;
			}
			for(let y = posl.y-1; y >= 0; y--) {
				if(xstr[y] == '>') {  //标注：如果标签内含有算法表达式且含有'>'符号，在'>'符号后不会触发属性补全
					return objLabel;
				} else if(xstr[y] == '<') {  //找到'<'后记录位置并不再查找
					pl.x = posl.x;
					pl.y = y;
					findNotl = false;
					break;
				}
			}
			posl.x -= 1;  //当前行没有，继续查找上一行
		}
		if(pl.x == -1) {  //未找到'<'
			return objLabel;
		}
		//console.log("<:"+pl.x+"\t"+pl.y);

		//查找'>'位置
		let posr = { x: pos.line, y: pos.character };  //坐标扫描实时位置，查找'>'
		let findNotr = true;  //记录是否找到'>'
		//console.log(doc.lineCount); //doc.lineCount为当前文档总行数
		while(posr.x < doc.lineCount && findNotr) {
			let xstr = doc.lineAt(posr.x).text;  //获取当前行的整行内容
			if(posr.x != pos.line) {  //不在光标所在行时从当前行内容最后一列开始扫描
				posr.y = 0;
			}
			for(let y = posr.y; y < xstr.length; y++) {
				if(xstr[y] == '<') {
					return objLabel;
				} else if(xstr[y] == '>') {  //找到'>'后记录位置并不再查找
					pr.x = posr.x;
					pr.y = y;
					findNotr = false;
					break;
				}
			}
			posr.x += 1;
		}
		if(pr.x == -1) {  //未找到'<'
			return objLabel;
		}
		//console.log(">:"+pr.x+"\t"+pr.y);

		if(!alg.strTailMatch(doc.fileName, ".html", 2)) {  //*.html 文件中的引号内属性支持补全
			//判断光标是否在引号中(''或"")，从而判断是否要给属性提示
			//算法：扫描'<'位置到光标当前位置，计算'或"数量，如果为双数则光标不在其中,如果为单数且光标右边还有'或"则光标在其中
			//记录单引号数量'character
			let on = this.findCharNum(doc, pl, pos, '\'');  //坐标区间查找字符出现数量，不包含坐标位置。
			if(on%2 != 0) {
				return objLabel;
			}
			//记录双引号数量"
			let en = this.findCharNum(doc, pl, pos, '\"');  //坐标区间查找字符出现数量，不包含坐标位置。
			if(en%2 != 0) {
				return objLabel;
			}
		}
		
		//获取标签值
		let strLabel = '';
		let strLine = doc.lineAt(pl.x).text;  //获取当前行的整行内容
		for(let y = pl.y+1; y < strLine.length; y++) {
			if(strLine[y] == ' ') {
				break;
			}
			strLabel += strLine[y];
		}
		
		//console.log(strLabel+": "+"<("+pl.x+","+pl.y+")|>("+pr.x+","+pr.y+")");

		//返回的标签对象
		objLabel.label = strLabel;
		objLabel.posl = pl;
		objLabel.posr = pr;
		
		return objLabel;
	}
	
	/**
	 * 查找标签内是否存在attr属性，如果存在，返回true，否则返回false
	 * @param doc 调用命令文档。
	 * @param ol 标签对象
	 * @param attr 待查找的属性
	 * @return true | false
	 */
	labeHaveattributes(doc, ol, attr) {
		//属性串的合法格式
		let attrs = [
			" "+attr+" ",
			" "+attr+"=",
			"\""+attr+" ",
			"\""+attr+"=",
			"\'"+attr+" ",
			"\'"+attr+"=",
			" "+attr+">",
			"\""+attr+">",
			"\'"+attr+">",
			"}"+attr+" ",
			"}"+attr+"=",
			"}"+attr+">"
		];
		for(let x = ol.posl.x; x <= ol.posr.x; x++ ) {
			let strLine = doc.lineAt(x).text;  //获取当前行的整行内容
			let slLen = strLine.length;
			let findStr = '';  //待查找的字符串
			if(x == ol.posl.x) {
				for(let y = ol.posl.y; y < slLen; y++) {
					findStr += strLine[y];
				}
			} else if(x == ol.posr.x) {
				for(let y = 0; y <= ol.posr.y; y++) {
					findStr += strLine[y];
				}
			} else {
				findStr = strLine;
			}
			findStr += " ";
			for(let i = 0; i < attrs.length; i++) {
				if(findStr.indexOf(attrs[i]) != -1) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 坐标区间查找字符出现数量，不包含坐标位置。
	 * @param {*} doc 调用命令文档
	 * @param {*} pStart 起始坐标
	 * @param {*} pEnd 结束坐标
	 */
	findCharNum(doc, pStart, pEnd, ch) {
		let num = 0;
		for(let x = pStart.x; x <= pEnd.line; x++) {
			let xstr = doc.lineAt(x).text;  //获取当前行的整行内容
			let y = 0;
			if(x == pStart.x) {
				y = pStart.y;
			}
			let ymax = xstr.length;
			if(x == pEnd.line) {
				ymax = pEnd.character-1;
			}
			while(y < ymax) {
				if(xstr[y] == ch) {
					num += 1;
				}
				y++;
			}
		}
		return num;
	}


}
exports.OmiCompletion = OmiCompletion;
