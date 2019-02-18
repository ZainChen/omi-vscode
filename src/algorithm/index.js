/**
 * zain算法模块
 */
module.exports = {
    strTailMatch
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
