const path = require('path');
const fs = require('fs');


/**
 * zain算法模块
 */
module.exports = {
	strTailMatch,
	strInFindLP,
	getfilePathName,
	getFileContent,
	strDelHtLineSpace,
	SplitStringChar
}


/**
 * 字符串尾部匹配(判断字符串后几位是否等于给定值,可用于文件后缀名判断)
 * @param str 待匹配的字符串
 * @param value 待匹配的值
 * @param mode 1:匹配大小写;2:忽略大小写
 */
function strTailMatch(str, value, mode) {
	let ls = str.length;
	let lv = value.length;
	if(ls < lv) {
		return false;
	}
	let strNew = "";
	for(let i = ls-lv; i < ls; i++) {
		strNew += str[i];
	}
	if(mode == 2) {
		strNew = strNew.toUpperCase();  //字符串转换为大写(toLowerCase():字符串转换为小写)
		value = value.toUpperCase();
	}
	if(strNew == value) {
		return true;
	} else {
		false;
	}
}

/**
 * 字符串查找，忽略大小写
 * @param strO 待查找的字符串
 * @param strF 需要查找的字符串
 * @return true|false：找到|未找到
 */
function strInFindLP(strO, strF) {
	let bso = strO.toUpperCase();  //字符串转换为大写(toLowerCase():字符串转换为小写)
	let bsf = strF.toUpperCase();
	if(bso.indexOf(bsf) != -1) {
		return true;
	}
	return false;
}

/**
 * 获取指定路径下所有文件夹名或文件名（不包含子文件夹）
 * @param {*} strPath 文件路径，不能带有文件名
 */
function getfilePathName(strPath) {
	//当前文件夹下所有文件内容读取
	return fs.readdirSync(path.join(strPath));  //获取当前文件夹下所有文件名
	// console.log(__dirname);  // 当前文件所在的绝对路径。
	// console.log(__filename);  // 当前文件的文件名,包括全路径。  __dirname和__filename都是全局对象。
}

/**
 * 获取指定文件所有内容
 * @param {*} strFileNamePath 文件名及路径（一定要带有文件名）
 */
function getFileContent(strFileNamePath) {
	let file = path.join(strFileNamePath); //文件路径，__dirname为当前运行js文件的目录
	let data = fs.readFileSync(file);  //同步读取文件内容
	return data.toString();
	// 异步读取
	// fs.readFile(file, function (err, data) {
	// 	if (err) {
	// 		return console.error(err);
	// 	}
	// 	console.log("异步读取: " + data.toString());
	// });
	// console.log(__dirname);  // 当前文件所在的绝对路径。
	// console.log(__filename);  // 当前文件的文件名,包括全路径。  __dirname和__filename都是全局对象。
}

/**
 * 去除字符串中首部和尾部的空格和换行符
 * @param str 待处理字符串
 */
function strDelHtLineSpace(str) {
	let reStr = '';
	let l = 0, r = str.length-1;
	while(l <= r) {
		if(str[l] != ' ' && str[l] != '\n') {
			break;
		}
		l++;
	}
	while(r > 0 && r >= l) {
		if(str[r] != ' ' && str[r] != '\n') {
			break;
		}
		r--;
	}
	for(let i = l; i <= r; i++) {
		reStr += str[i];
	}
	return reStr;
}

/*
按指定字符拆分指定string字符串到容器中
头文件:
#include<vector>
#include<string>
#include<iostream>
using namespace std;
参数:
string str:  待拆分的字符串
string sk:  用来判断的拆分符
返回值:
拆分后的N个字符串
例子:
vector<string> sn = SplitStringChar("1	*INFINITI EX35 Camp:P8202	J50	2008	NULL	VI_202	2	NULL1	NULL2", '\t');
for(int i = 0; i < sn.size(); i++) cout << sn[i] << endl;
*/
function SplitStringChar(str, ck) {
	let sr = [];
	let s = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] == ck) {
			sr.push(s);
			s = '';
		}
		else {
			s += str[i];
		}
	}
	if (s != '') {
		sr.push(s);
	}
	return sr;
}