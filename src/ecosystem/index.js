const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');
const json = require("jsonc-parser");
const { execFile } = require('child_process');
const request = require('request');
const rp = require('request-promise');  //同步获取网页模块
const https = require('https');  // http模块
const cheerio = require('cheerio');  // cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询

const trioe = require("./treeItemOmiEco");  //omi生态专用菜单树模块

/**
 * omi生态功能实现类
 */
class EcoProvider {
    /**
     * EcoProvider 类的构造函数
     */
    constructor() {
        
    }
    
    /**
     * 菜单树内容，()
     * @param element 元素
     * @return element — 必须返回元素，否则菜单树不显示内容
     */
    getTreeItem(element) {
        return element;
    }

    /**
     * 菜单树数据写入入口
     */
    getChildren(element) {
        //ecoZain();

        if (element) {
            let zain = {omi: "{dir}", omio: "[file]"};
            return this.addMenuNodeAll(zain);
            //return Promise.resolve([]);
        } else {
            this.httpsGetSyn('https://github.com/Tencent/omi');
            let zain1 = {omi: "{dir}", omio: "[file]"};
            return this.addMenuNodeAll(zain1);
        }

        

        // if(typeof(vscode.workspace.rootPath) == "undefined") {
        //     let zain1 = {omi: "{dir}", omio: "[file]"};
        //     return this.addMenuNodeAll(zain1);
        // } else {
        //     let zain = {omi: "[file]", omio: "{dir}"};
        //     return this.addMenuNodeAll(zain);
        // }

    }

    addMenuNodeAll(obj) {
        const toDep = (label, labelAdd, isDirectory) => {
            if (isDirectory.length > 0 &&  isDirectory[0] == "{") {
                return new trioe.TreeItemOmiEco(label, labelAdd, vscode.TreeItemCollapsibleState.Collapsed);
            } else {
                return new trioe.TreeItemOmiEco(label, labelAdd, vscode.TreeItemCollapsibleState.None, {
                    command: 'omi.cmd.openGithub',
                    title: '',
                    arguments: [label]
                });
            }
        };
        obj = Object.keys(obj).map(dep => toDep(dep, obj[dep], obj[dep][0]));
        return Promise.resolve(obj);
    }

    /**
     * 同步读取并解析网站内容(待实现)
     * @param url 网址
     */
    httpsGetSyn(url) {
        var options = {
            uri: url,
            transform: function (text) {
                return cheerio.load(text);
            }
        };
        rp(options).then(function ($) {
            // Process html like you would with jQuery...
            let html = $('a[class=js-navigation-open]').html()
            console.log(html);
        }).catch(function (err) {
            // Crawling failed or Cheerio choked...
            console.log(err);
        });
    }

    /**
     * 异步读取并解析网站内容
     * @param url 网址
     */
    httpsGetAsy(url) {
        // 定义网络爬虫的目标地址：自如友家的主页
        //var url = 'https://github.com/Tencent/omi/tree/master';
        //let url = 'https://www.zainzy.com/';
        //var url = "https://www.lagou.com/";
        //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  //防止部分网站无法访问(有是后会获取不到数据，原因暂不明)
        const ht = https.get(url, function (res) {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            htmlText = '';
            res.on("data", function(d) {  //每当我们从指定的url中得到数据的时候,就会触发res的data事件,事件中的chunk是每次得到的数据,data事件会触发多次,因为一个网页的源代码并不是一次性就可以下完的
                htmlText += d;
            });
            res.on("end", function() {  //当网页的源代码下载完成后, 就会触发end事件
                console.log("html complete.");
                console.log(htmlText);  //对下载的源代码进行处理
                return ht;
            });
        }).on("error", function(e) {
            console.error(e);
        });
    }

    /**
     * 异步克隆指定git仓库，例：this.gitClone('git@github.com:Tencent/omi.git');
     * @param str git 仓库链接
     */
    gitClone(str) {
        execFile('git', ['clone', str], {cwd: path.join(__dirname, '..', '..', 'assets')}, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log("clone complete."+stdout);
        });
    }

    /**
     * 判断路径是否存在
     * @param p 待判断的路径
     */
    pathExists(p) {
        try {
            fs.accessSync(p);
        }
        catch (err) {
            return false;
        }
        return true;
    }
}
exports.EcoProvider = EcoProvider;



function ecoZain() {
	vscode.window.showInformationMessage('No dependency in empty workspace');
}
exports.ecoZain = ecoZain;

