const path = require('path');
const fs = require('fs');


/**
 * zain算法模块
 */
module.exports = {
	writeFileSync,
	delDirFile,
	strTailMatch,
	strInFindLP,
	getfilePathName,
	getFileContent,
	strDelHtLineSpace,
	SplitStringChar
}

/**
 * 同步写入文件
 * @param {*} path 文件路径
 * @param {*} data 写入数据
 * @param {*} coding 文件编码
 * @param {*} mode 打开文件的方式
 * 'r' -   以读取模式打开文件。
 * 'r+' - 以读写模式打开文件。
 * 'rs' - 使用同步模式打开并读取文件。指示操作系统忽略本地文件系统缓存。
 * 'rs+' - 以同步的方式打开，读取 并 写入文件。
 * 'w' - 以读取模式打开文件，如果文件不存在则创建。
 * 'wx' - 和 ' w ' 模式一样，如果文件存在则返回失败。
 * 'w+' - 以读写模式打开文件，如果文件不存在则创建。
 * 'wx+' - 和 ' w+ ' 模式一样，如果文件存在则返回失败。
 * 'a' - 以追加模式打开文件，如果文件不存在则创建。
 * 'ax' - 和 ' a ' 模式一样，如果文件存在则返回失败。
 * 'a+' - 以读取追加模式打开文件，如果文件不存在则创建。
 * 'ax+' - 和 ' a+ ' 模式一样，如果文件存在则返回失败。
 */
function writeFileSync(path, data, coding, mode) {
	var fops = fs.openSync(path, mode);
	fs.writeSync(fops, data, coding);
	fs.close(fops, (err) =>{
		if (err) {
			console.log(err);
		}
	})
}


/**
 * 删除指定文件夹下所有文件(不包含子文件夹和文件)
 * @param {*} path 文件夹路径
 */
function delDirFile(path){
    if(fs.existsSync(path)){
		let files = fs.readdirSync(path);
		for(let i = 0; i < files.length; i++) {
			fs.unlinkSync(path+"/"+files[i]); //删除文件，多线程访问会报错
		}
    }
}

/**
 * 删除文件夹下所有文件(包含子文件夹和文件)，多线程访问会报错
 * @param {*} path 文件夹路径
 */
function delDirFileAll(path){
    let files = [];
    if(fs.existsSync(path)){
		files = fs.readdirSync(path);
		for(let i = 0; i < files.length; i++) {
			let curPath = path + "/" + files[i];
			if(fs.statSync(curPath).isDirectory()){  //此处判断文件夹是否存在，多线程访问会报错
                delDirFileAll(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件，多线程访问会报错
            }
		}
        fs.rmdirSync(path);
    }
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