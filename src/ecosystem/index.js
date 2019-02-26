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
const alg = require("../algorithm/index");  //算法模块

/**
 * omi生态功能实现类
 */
class EcoProvider {
    /**
     * EcoProvider 类的构造函数
     */
    constructor() {
        this.urlGitHub = 'https://github.com';  //要获取内容的初始网址
        this.urlGitHubUser = 'ZainChen';
        this.urlGitHubRepositories = 'vscode-omi';
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    
    /**
     * 菜单树内容，()
     * @param element 元素
     * @return element — 必须返回元素，否则菜单树不显示内容
     */
    getTreeItem(element) {
        return element;
    }

    async refresh(offset) {
        //this.getChildren();

        if (offset) {
            this._onDidChangeTreeData.fire(offset);
        }
        else {
            this._onDidChangeTreeData.fire();
        }
    }

    /**
     * 菜单树数据写入入口
     * @声明标识符 async 标识符标识当前函数是异步执行函数
     * @param element 菜单中单击选中的节点文本
     */
    async getChildren(element) {
        let url = '';
        if(element) {
            url = element.filePathlink;
        } else {
            url = this.urlGitHub+"/"+this.urlGitHubUser+"/"+this.urlGitHubRepositories+"/tree/dev";
        }
        //await标识，等待一个异步函数执行完成后再执行下一步
        let dataGitHub = await this.httpsGetGithubDataSyn(url);  //获取当前节点和当前节点下所有内容
        if(dataGitHub.branchVersionNow == '') {
            vscode.window.showInformationMessage('Ecosystem no data!');
            return Promise.resolve([]);
        } else {
            return this.addMenuNodeGitHub(dataGitHub);
        }

        // if (element) {
        //     let zain = {omi: "{dir}", omio: "[file]"};
        //     return this.addMenuNodeAll(zain);
        //     //return Promise.resolve([]);
        // } else {
        //     let zain1 = {omi: "{dir}", omio: "[file]"};
        //     return this.addMenuNodeAll(zain1);
        // }

    }

    addMenuNodeGitHub(dataGitHub) {
        let fileNameToStatus = {};  //文件名对应更新状态
        let fileNameToFOD = {};  //文件名对应"文件或文件夹"标记
        let fileNameToLink = {};  //文件名对应文件或文件夹内容所在网址
        let fodLen = dataGitHub.fileOrDir.length;
        let fpnLen = dataGitHub.filePathsNames.length;
        let fpslen = dataGitHub.filePathStatus.length;
        let fnplkLen = dataGitHub.filePathlinks.length;
        if(fodLen != fpnLen && fnplkLen != fpnLen) {
            vscode.window.showInformationMessage(`FileOrDir Or filePathlinks Error!!!`);
            return Promise.resolve([]);
        }
        for(let i = 0; i < fpnLen; i++) {
            if(i < fpslen) {
                fileNameToStatus[dataGitHub.filePathsNames[i]] = dataGitHub.filePathStatus[i]+"  【"+dataGitHub.timesMode1[i]+"】"; // 新增文件名对应更新状态键值对
            } else {
                fileNameToStatus[dataGitHub.filePathsNames[i]] = '';
            }
        }
        for(let i = 0; i < fodLen; i++) {
            fileNameToFOD[dataGitHub.filePathsNames[i]] = dataGitHub.fileOrDir[i];   //新增文件名对应"文件或文件夹"标记
        }
        for(let i = 0; i < fodLen; i++) {
            fileNameToLink[dataGitHub.filePathsNames[i]] = dataGitHub.filePathlinks[i];   //新增文件名对应"文件或文件夹"标记
        }
        const toDep = (label, labelAdd, filePathlink, isDirectory) => {
            if (isDirectory == "directory") {
                return new trioe.TreeItemOmiEco(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.Collapsed);
            } else {
                return new trioe.TreeItemOmiEco(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.None, {
                    command: 'omi.cmd.openGithub',
                    title: '',
                    arguments: [label]
                });
            }
        };
        let retObj = Object.keys(fileNameToStatus).map(dep => toDep(dep, fileNameToStatus[dep], fileNameToLink[dep], fileNameToFOD[dep]));
        return Promise.resolve(retObj);
    }

    /**
     * 向菜单添加节点。
     * 样例：let zain = {omi: "{dir}", omio: "[file]"}; return this.addMenuNodeAll(zain);
     * @param obj obj的对象值不能为空
     */
    // addMenuNodeAll(obj) {
    //     const toDep = (label, labelAdd, isDirectory) => {
    //         if (isDirectory.length > 0 &&  isDirectory[0] == "{") {
    //             return new trioe.TreeItemOmiEco(label, labelAdd, vscode.TreeItemCollapsibleState.Collapsed);
    //         } else {
    //             return new trioe.TreeItemOmiEco(label, labelAdd, vscode.TreeItemCollapsibleState.None, {
    //                 command: 'omi.cmd.openGithub',
    //                 title: '',
    //                 arguments: [label]
    //             });
    //         }
    //     };
    //     obj = Object.keys(obj).map(dep => toDep(dep, obj[dep], obj[dep][0]));
    //     return Promise.resolve(obj);
    // }


    /**
     * 获取并解析Github所有分支和版本
     * @param url 网址
     * @return 解析后的内容(_structGithubDataOne结构)
     */
    async httpsGetGithubBvAllSyn(url) {
        var options = {
            uri: url,
            transform: function (text) {
                return cheerio.load(text);
            }
        };
        let bvfContent = await rp(options).then(function ($) {
            let data = new _structGithubDataOne();
            let divs = $('div[class=select-menu-list]');
            if(divs.length != 2) {  //只支持分支、版本，两大块
                vscode.window.showInformationMessage(`Branch Version Error!!!`);
                return data;
            }
            //分支储存
            let bras = divs.eq(0).find('a');
            let brsps = divs.eq(0).find('span');
            if(bras.length != brsps.length) {
                vscode.window.showInformationMessage(`Branch Error!!!`);
                return data;
            }
            for(let i = 0; i < bras.length; i++) {
                data.branchNames.push(alg.strDelHtLineSpace(brsps.eq(i).html()));
                data.branchLinks.push(bras.eq(i).attr('href'));
            }
            //版本储存
            let vas = divs.eq(1).find('a');
            let vsps = divs.eq(1).find('span');
            if(vas.length != vsps.length) {
                vscode.window.showInformationMessage(`Version Error!!!`);
                return data;
            }
            for(let i = 0; i < vas.length; i++) {
                data.versionNames.push(alg.strDelHtLineSpace(vsps.eq(i).html()));
                data.versionLinks.push(vas.eq(i).attr('href'));
            }
            return data;
        }).catch(function (err) {
            // Crawling failed or Cheerio choked...
            vscode.window.showInformationMessage(`Network Error!!!`);
            console.log(err);
        });
        return bvfContent;
    }

    /**
     * 获取并解析Github相关数据(在异步函数中同步读取并解析网站内容)
     * @声明标识符 async 标识符标识当前函数是异步执行函数
     * @param url 网址
     * @return 解析后的内容(_structGithubDataOne结构)
     */
    async httpsGetGithubDataSyn(url) {
        //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';  //防止部分网站无法访问(有是后会获取不到数据，原因暂不明)
        var options = {
            uri: url,
            transform: function (text) {
                return cheerio.load(text);
            }
        };
        //await标识，等待一个异步函数执行完成后再执行下一步
        let bvfContent = await rp(options).then(function ($) {
            //Process html like you would with jQuery...
            let data = new _structGithubDataOne();
            data.getBvLink = 'https://github.com'+$('.select-menu-modal.position-absolute').attr('src');
            data.branchVersionNow = $('span[class=css-truncate-target]').html();
            data.dirFileName = $('strong[class=final-path]').html();  //当前所在目录名(值为空说明在根目录)
            let fodir = $('td[class=icon]').find('svg');  //获取标记文件或文件夹节点
            for(let i = 0; i < fodir.length; i++) {
                let stb = fodir.eq(i).attr('aria-label');
                if(typeof(stb) != "undefined") {
                    data.fileOrDir.push(fodir.eq(i).attr('aria-label'));
                }
            }
            //let fpnls = $('a[class=js-navigation-open]');
            let fpnls = $('td[class=content]').find('a');  //获取文件名和文件链接节点
            for(let i = 0; i < fpnls.length; i++) {
                data.filePathsNames.push(fpnls.eq(i).html());
                data.filePathlinks.push('https://github.com'+fpnls.eq(i).attr('href'));
            }
            let fpsl = $('td[class=message]').find('a');  //获取状态和状态链接节点
            for(let i = 0; i < fpsl.length; i++) {
                data.filePathStatus.push(fpsl.eq(i).html());
                data.filePathStatusLinks.push(fpsl.eq(i).attr('href'));
            }
            let times = $('td[class=age]').find('time-ago');  //获取更新时间节点
            for(let i = 0; i < times.length; i++) {
                data.timesMode1.push(times.eq(i).html());
                data.timesMode2.push(times.eq(i).attr('datetime'));
                //data.timesMode3.push(times.eq(i).attr('title'));
            }
            return data;
        }).catch(function (err) {
            // Crawling failed or Cheerio choked...
            vscode.window.showInformationMessage(`Network Error!!!`);
            console.log(err);
        });
        let bvfc = await this.httpsGetGithubBvAllSyn(bvfContent.getBvLink);
        bvfContent.branchNames = bvfc.branchNames;
        bvfContent.branchLinks = bvfc.branchLinks;
        bvfContent.versionNames = bvfc.versionNames;
        bvfContent.versionLinks = bvfc.versionLinks;
        return bvfContent;
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



/**
 * Github数据储存结构体(单个分支或版本的当前目录下所有内容)
 */
function _structGithubDataOne() {
    this.getBvLink = '';  //获取所有储存库名和版本名的链接
    this.branchNames = [];  //储存所有分支名
    this.branchLinks = [];  //储存所有分支链接
    this.versionNames = [];  //储存所有版本名
    this.versionLinks = [];  //储存所有版本链接

    this.branchVersionNow = '';  //当前分支名或版本名(版本处理原理类似分支)
    this.dirFileName = '';  //当前所在目录名
    this.fileOrDir = [];  //标记相应下标下的文件是文件还是文件夹。(当前分支或版本下的当前目录下)
    this.filePathsNames = [];  //所有文件或文件夹名。(当前分支或版本下的当前目录下)
    this.filePathlinks = [];  //所有文件或文件夹链接。(当前分支或版本下的当前目录下)
    this.filePathStatus = [];  //所有文件或文件夹更新状态及说明。(当前分支或版本下的当前目录下)
    this.filePathStatusLinks = [];  //所有文件或文件夹更新状态及说明链接。(当前分支或版本下的当前目录下)
    this.timesMode1 = [];  //所有文件或文件更新时间，描述1。(当前分支或版本下的当前目录下)
    this.timesMode2 = [];  //所有文件或文件更新时间，描述2。(当前分支或版本下的当前目录下)
    this.timesMode3 = [];  //所有文件或文件更新时间，描述3。(当前分支或版本下的当前目录下)
    //this.children = new _structGithubDataOne();  //当前文件夹里的所有文件或文件夹
}





function ecoZain() {
	vscode.window.showInformationMessage('No dependency in empty workspace');
}
exports.ecoZain = ecoZain;

