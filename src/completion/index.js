const vscode = require('vscode');
const fs = require('fs');

//const alg = require('../algorithm/index');

/**
 * omi自动补全功能实现类
 */
class OmiCompletion {
	constructor() {
		this.objJson = new Object();
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
	async provideCompletionItems(document, position, token, context) {
		let ch = context.triggerCharacter || this.getLastChar(document, position);
		switch(ch) {
			case '<': return this.omiuLabelCompletion();  //标签补全
			case '\'':
			case '\"':
			case ' ': return this.omiuAttributesCompletion(document, position);  //属性补全
			default: return [];
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

	omiuLabelCompletion() {
		let retCom = new Array();
		let data = fs.readFileSync(__dirname+'/comjson/omiu-com.json', 'utf8');  //同步获取json文件内容
		this.objJson = JSON.parse(data);
		for(let i in this.objJson) {
			let comp = new vscode.CompletionItem(this.objJson[i]['label'], this.objJson[i]['kind']);
			comp.detail = this.objJson[i]['detail'];
			comp.insertText = new vscode.SnippetString(this.objJson[i]['insertText']);
			comp.documentation = new vscode.MarkdownString(this.objJson[i]['documentation']);
			comp.sortText = this.objJson[i]['sortText'];
			if(this.objJson[i]['cmd']) {
				comp.command = this.autoSuggestCommand();
			}
			retCom.push(comp);
		}
		return retCom;
	}

	omiuAttributesCompletion(document, position) {
		let retCom = [];
		const lineStr = document.lineAt(position).text;
		let lineLen = lineStr.length;
		let ip = position.character;
		let label = this.getPosOmiLabe(lineStr, lineLen, ip);
		if(label) {
			for(let i in this.objJson[label]['attribute']) {
				if(this.labeHaveattributes(lineStr, lineLen, ip, this.objJson[label]['attribute'][i]['label'])) {  //标签内已有的属性值不添加
					continue;
				}
				let comp = new vscode.CompletionItem(this.objJson[label]['attribute'][i]['label'], this.objJson[label]['attribute'][i]['kind']);
				comp.detail = this.objJson[label]['attribute'][i]['detail'];
				comp.insertText = new vscode.SnippetString(this.objJson[label]['attribute'][i]['insertText']);
				comp.documentation = new vscode.MarkdownString(this.objJson[label]['attribute'][i]['documentation']);
				comp.sortText = this.objJson[label]['attribute'][i]['sortText'];
				if(this.objJson[label]['attribute'][i]['cmd']) {
					comp.command = this.autoSuggestCommand();
				}
				retCom.push(comp);
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
	 * 如果光标不在一个完整标签内，则返回空(完整标签:<>)
	 * @param lineStr 整行字符串
	 * @param lineLen 整行字符串长度
	 * @param ip 当前光标所在位置
	 * @return null | string
	 */
	getPosOmiLabe(lineStr, lineLen, ip) {
		let retStr = '';
		let il = 0;  //'<'的位置
		for(let i = ip-1; i >= 0; i--) {  //从光标位置往左查找，找到'<'位置,先找到'>'或未找到'<'都表示光标不在完整标签内
			if(lineStr[i] == '>') {
				return '';
			} else if(lineStr[i] == '<') {
				il = i;
				break;
			}
		}
		if(il == 0 && lineStr[0] != '<') {  //未找到'<'
			return '';
		}
		//判断光标是否在引号中(''或"")，从而判断是否要给属性提示
		//算法：在标签内从左往右数'或"的数量，如果为双数则光标不在其中,如果为单数且光标右边还有'或"则光标在其中
		//判断单引号'
		let ldyn = 0;
		for(let i = il+1; i < ip; i++) {
			if(lineStr[i] == '\'') {
				ldyn += 1;
			}
		}
		if(ldyn%2 != 0) {
			return '';
		}
		//判断双引号"
		let lsyn = 0;
		for(let i = il+1; i < ip; i++) {
			if(lineStr[i] == '\"') {
				lsyn += 1;
			}
		}
		if(lsyn%2 != 0) {
			return '';
		}
		for(let i = il+1; i < lineLen; i++) {
			if(lineStr[i] == ' ') {
				break;
			}
			retStr += lineStr[i];
		}
		return retStr;
	}
	
	/**
	 * 查找标签内是否存在attr属性，如果存在，返回true，否则返回false
	 * @param {*} lineStr 整行字符串
	 * @param {*} lineLen 整行字符串长度
	 * @param {*} ip 当前光标所在位置
	 * @param {*} attr 待查找的属性
	 */
	labeHaveattributes(lineStr, lineLen, ip, attr) {
		let il = 0;  //'<'的位置
		for(let i = ip-1; i >= 0; i--) {  //从光标位置往左查找，找到'<'位置,先找到'>'或未找到'<'都表示光标不在完整标签内
			if(lineStr[i] == '>') {
				return false;
			} else if(lineStr[i] == '<') {
				il = i;
				break;
			}
		}
		if(il == 0 && lineStr[0] != '<') {  //未找到'<'
			return false;
		}
		let findStr = ' ';
		for(let i = il+1; i < lineLen; i++) {
			findStr += lineStr[i];
		}
		//属性串的合法格式
		let sf = [
			" "+attr+" ",
			" "+attr+"=",
			"\""+attr+" ",
			"\""+attr+"=",
			"\'"+attr+" ",
			"\'"+attr+"="
		];
		for(let i = 0; i < sf.length; i++) {
			if(findStr.indexOf(sf[i]) != -1) {
				return true;
			}
		}
		return false;
	}


}
exports.OmiCompletion = OmiCompletion;
