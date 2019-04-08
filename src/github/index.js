const vscode = require('vscode');  //导入模块并在下面的代码中使用别名vscode引用它(模块“vscode”包含VS代码可扩展性API)
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const request = require('request');
const rp = require('request-promise');  //同步获取网页模块
const https = require('https');  // http模块
const cheerio = require('cheerio');  // cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询

const tri = require("./tree-item");  //omi生态专用菜单树模块
const alg = require("../algorithm/index");  //算法模块

const ourl = require('./open-url');  //webview打开网页功能

/**
 * omi生态功能实现类
 */
class OmiGitHub {
    /**
     * omiGitHub 类的构造函数
     */
    constructor(context) {
        this.context = context;  //暂时没用到
        this.urlGitHub = 'https://github.com';  //要获取内容的初始网址
        this.urlGitHubUser = 'Tencent';
        this.urlGitHubRepositories = 'omi';
        this.urlGitBranch = 'master';  //分支
        this._onDidChangeTreeData = new vscode.EventEmitter();  //刷新菜单节点使用
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;

        this.wstream = fs.createWriteStream("");
        this.cacheNum = 0;  //记录缓存文件打开次数
        vscode.window.setStatusBarMessage("omi.coche:"+this.cacheNum.toString());  //状态栏显示缓存文件打开次数
        //下载统计和进度
        this.scheduleDown = {
            sum: 0,  //总数
            count: 0,  //已下载数量
        };
    }
    
    /**
     * 菜单树内容，每个子节点都分别刷新一次该函数
     * @param element 元素
     * @return element — 必须返回元素，否则菜单树不显示内容
     */
    getTreeItem(element) {
        return element;
    }

    /**
     * 菜单树数据写入入口，生成子节点
     * @声明标识符 async 标识符标识当前函数是异步执行函数
     * @param element 菜单中单击选中的节点文本
     */
    async getChildren(element) {
        let url = '';
        if(element) {
            url = element.filePathlink;
            let dataGitHub = await this.httpsGetGithubDataSyn(url);  //获取当前节点和当前节点下所有内容
            if(dataGitHub.branchVersionNow == '') {
                vscode.window.showInformationMessage('Ecosystem no data!');
                return Promise.resolve([]);
            } else {
                return this.addMenuNodeGitHubFile(dataGitHub);
            }
        } else {
            url = this.urlGitHub+"/"+this.urlGitHubUser+"/"+this.urlGitHubRepositories+"/tree/"+this.urlGitBranch;
            //await标识，等待一个异步函数执行完成后再执行下一步
            let dataGitHub = await this.httpsGetGithubDataSyn(url);  //获取当前节点和当前节点下所有内容
            if(dataGitHub.branchVersionNow == '') {
                vscode.window.showInformationMessage('Ecosystem no data!');
                return Promise.resolve([]);
            } else {
                return this.addMenuNodeGitHubBV(dataGitHub);
            }
        }
        // //await标识，等待一个异步函数执行完成后再执行下一步
        // let dataGitHub = await this.httpsGetGithubDataSyn(url);  //获取当前节点和当前节点下所有内容
        // if(dataGitHub.branchVersionNow == '') {
        //     vscode.window.showInformationMessage('Ecosystem no data!');
        //     return Promise.resolve([]);
        // } else {
        //     return this.addMenuNodeGitHubFile(dataGitHub);
        // }
        

    }

    /**
     * 将GitHub获取到的分支和版本及链接添加到菜单中
     * @param dataGitHub GitHub获取到的数据
     */
    addMenuNodeGitHubBV(dataGitHub) {
        let bvnToLink = {};  //分支和版本名对应链接
        let bvnToFOD = {};  //文件名对应"文件或文件夹"标记
        let bnsLen = dataGitHub.branchNames.length;
        let bnlsLen = dataGitHub.branchLinks.length;
        let vnsLen = dataGitHub.versionNames.length
        let vnlsLen = dataGitHub.versionLinks.length;
        let url = this.urlGitHub+"/"+this.urlGitHubUser+"/"+this.urlGitHubRepositories;
        if(bnsLen != bnlsLen || vnsLen != vnlsLen) {
            vscode.window.showInformationMessage(`Branch Or Version Error!!!`);
            return Promise.resolve([]);
        }
        bvnToLink[url] = url;
        bvnToFOD[url] = '';
        bvnToLink['[Branches]'] = url;
        bvnToFOD['[Branches]'] = 'branches';
        for(let i = 0; i < bnsLen; i++) {
            bvnToLink[dataGitHub.branchNames[i]] = dataGitHub.branchLinks[i];
            bvnToFOD[dataGitHub.branchNames[i]] = 'directory';
        }
        bvnToLink['[Tags]'] = url;
        bvnToFOD['[Tags]'] = 'tags';
        for(let i = 0; i < vnsLen; i++) {
            bvnToLink[dataGitHub.versionNames[i]] = dataGitHub.versionLinks[i];
            bvnToFOD[dataGitHub.versionNames[i]] = 'directory';
        }
        const toDep = (label, labelAdd, filePathlink, fileType) => {
            if (fileType == "directory") {
                return new tri.OmiTreeItem(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.Collapsed, fileType);
            } else if(fileType == 'file') {
                return new tri.OmiTreeItem(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.None, fileType, {
                    command: 'omi.cmd.ghOpenGithubFile',
                    title: '',
                    arguments: [filePathlink]
                });
            } else {
                return new tri.OmiTreeItem(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.None, fileType);
            }
        };
        let retObj = Object.keys(bvnToLink).map(dep => toDep(dep, '', bvnToLink[dep], bvnToFOD[dep]));
        return Promise.resolve(retObj);
    }

    /**
     * 将GitHub获取到的文件和文件名及链接添加到菜单中
     * @param dataGitHub GitHub获取到的数据
     */
    addMenuNodeGitHubFile(dataGitHub) {
        let fileNameToStatus = {};  //文件名对应更新状态
        let fileNameToFOD = {};  //文件名对应"文件或文件夹"标记
        let fileNameToLink = {};  //文件名对应文件或文件夹内容所在网址
        let fodLen = dataGitHub.fileOrDir.length;
        let fpnLen = dataGitHub.filePathsNames.length;
        let fpslen = dataGitHub.filePathStatus.length;
        let fnplkLen = dataGitHub.filePathlinks.length;
        if(fodLen != fpnLen || fnplkLen != fpnLen) {
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
        const toDep = (label, labelAdd, filePathlink, fileType) => {
            if (fileType == "directory") {
                return new tri.OmiTreeItem(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.Collapsed, fileType);
            } else if(fileType == 'file') {
                return new tri.OmiTreeItem(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.None, fileType, {
                    command: 'omi.cmd.ghOpenGithubFile',
                    title: '',
                    arguments: [filePathlink]
                });
            } else {
                return new tri.OmiTreeItem(label, labelAdd, filePathlink, vscode.TreeItemCollapsibleState.None, fileType);
            }
        };
        let retObj = Object.keys(fileNameToStatus).map(dep => toDep(dep, fileNameToStatus[dep], fileNameToLink[dep], fileNameToFOD[dep]));
        return Promise.resolve(retObj);
    }

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
            return new _structGithubDataOne();
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
            data.getBvLink = 'https://github.com'+$('.select-menu-modal.position-absolute').attr('src');  //此处必须用'https://github.com'，调用不到外部类的成员变量
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
                //文件名特殊情况"examples/simple"
                let strPath = fpnls.eq(i).find('span').html();
                if(strPath) {
                    data.filePathsNames.push(fpnls.eq(i).text());
                } else {
                    data.filePathsNames.push(fpnls.eq(i).html());
                }
                data.filePathlinks.push('https://github.com'+fpnls.eq(i).attr('href'));
            }

            let fpsl = $('td[class=message]').find('a');  //获取状态和状态链接节点
            for(let i = 0; i < fpsl.length; i++) {
                data.filePathStatus.push(fpsl.eq(i).text());
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
            return new _structGithubDataOne();
        });
        let bvfc = await this.httpsGetGithubBvAllSyn(bvfContent.getBvLink);
        bvfContent.branchNames = bvfc.branchNames;
        bvfContent.branchLinks = bvfc.branchLinks;
        bvfContent.versionNames = bvfc.versionNames;
        bvfContent.versionLinks = bvfc.versionLinks;
        return bvfContent;
    }

    /** 
     * 将github切换到Tencent/omi
    */
    commandShowOmi() {
        //vscode.window.showInformationMessage('Hi Omi.');
        this.urlGitHubUser = 'Tencent';
        this.urlGitHubRepositories = 'omi';
        this.refreshAll();  //刷新所有菜单节点
    }

    /**
     * 切换github，生成新的菜单树
     */
    async githubSwitch() {
        const githubUrl = await vscode.window.showInputBox({  //此功能准备加入omi生态系统功能中
            prompt: "Please enter the url of GitHub.",
            validateInput: (s) => s && s.trim() ? undefined : "GitHub url must not be empty!",
        });
        if (!githubUrl) {
            //vscode.window.showInformationMessage('GitHub url must not be empty!');
            return;
        }
        if(!alg.strInFindLP(githubUrl, "github.com")) {
            vscode.window.showInformationMessage('Not a GitHub URL!');
            return;
        }
        let guleng = githubUrl.length;
        let k = githubUrl.indexOf('github.com', 0)+10;
        while(k < guleng && (githubUrl[k] == '/' || githubUrl[k] == '\\' || githubUrl[k] == ':')) {
            k += 1;
        }
        let ls = '';
        while(k < guleng && !(githubUrl[k] == '/' || githubUrl[k] == '\\' || githubUrl[k] == ':')) {
            ls += githubUrl[k];
            k += 1;
        }
        this.urlGitHubUser = ls;
        while(k < guleng && (githubUrl[k] == '/' || githubUrl[k] == '\\' || githubUrl[k] == ':')) {
            k += 1;
        }
        ls = '';
        if(githubUrl[guleng-1] == 't' && githubUrl[guleng-2] == 'i' && githubUrl[guleng-3] == 'g' && githubUrl[guleng-4] == '.') {
            guleng -= 3;
        }
        while(k < guleng && !(githubUrl[k] == '/' || githubUrl[k] == '\\' || githubUrl[k] == ':')) {
            ls += githubUrl[k];
            k += 1;
        }
        this.urlGitHubRepositories = ls;
        this.refreshAll();  //刷新所有菜单节点
    }

    /**
     * 刷新所有菜单节点
     */
    async refreshAll() {
        this._onDidChangeTreeData.fire();
    }

    /**
     * 刷新指定节点内容，参数为空时刷新全部节点
     * @param node 获取到的当前节点对象，为空时刷新全部节点
     */
    async refreshDesignation(node) {
        if (node) {
            this._onDidChangeTreeData.fire(node);
        } else {
            this._onDidChangeTreeData.fire();
        }
    }

    /**
     * 打开当前菜单树节点链接的GitHub页面
     * @param {*} node 当前节点对象
     */
    openGithub(node) {
        if(node.filePathlink != "") {
            vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(node.filePathlink));
        } else {
            vscode.window.showInformationMessage(`github url null.`);
        }
    }

    /**
     * 本地缓存并打开GitHub文件
     * @param {*} nodeLink github文件链接
     */
    async openGithubFile(nodeLink) {
        let rawPath = this.toGithubDownLink(nodeLink);  //将github文件链接转换为github下载链接
        let fileName = alg.urlGetLastStr(nodeLink);  //从链接获取文件名
        let cph = __dirname+"/cache/";
        if(fs.existsSync(cph) == false) {  //判断文件夹是否存在
            fs.mkdirSync(cph);  //创建文件夹
        }
        let url = cph+fileName;
        let bimgOk = true;
        if(alg.strTailMatch(fileName, ".png", 2) ||
           alg.strTailMatch(fileName, ".jpg", 2) ||
           alg.strTailMatch(fileName, ".gif", 2) ||
           alg.strTailMatch(fileName, ".ico", 2)) {
            this.wstream.end();
            this.wstream = fs.createWriteStream(url);
            vscode.window.showInformationMessage("file loading...");
            let req = request(rawPath, (err) => {
                if(err) {
                    vscode.window.showInformationMessage("open failure!\n"+err.stack);
                    this.wstream.end();
                    bimgOk = false;
                    this.cacheNum += 1;  //记录缓存文件打开次数
                    vscode.window.setStatusBarMessage("omi.coche:"+this.cacheNum.toString());  //状态栏显示缓存文件打开次数
                }
            });
            req.pipe(this.wstream).on("close", () => {
                if(bimgOk) {
                    new ourl(fileName, rawPath);  //webview方式打开图片相关文件
                    vscode.window.showInformationMessage(fileName+" ok.");
                    //console.log(fileName+" ok.");
                    this.cacheNum += 1;  //记录缓存文件打开次数
                    vscode.window.setStatusBarMessage("omi.coche:"+this.cacheNum.toString());  //状态栏显示缓存文件打开次数
                }
            });
        } else {
            this.cacheNum += 1;  //记录缓存文件打开次数
            vscode.window.setStatusBarMessage("omi.coche:"+this.cacheNum.toString());  //状态栏显示缓存文件打开次数
            alg.writeFileSync(url, "file loading...", "utf-8", 'w+');
            vscode.window.showTextDocument(vscode.Uri.file(url));  //vscode编辑窗口打开文件await async
            await rp(rawPath).then((html) => {
                alg.writeFileSync(url, html, "utf-8", 'w+');
            }).catch((err) => {
                alg.writeFileSync(url, "open failure!\n"+err.stack, "utf-8", 'w+');
            });
        }


        //webview方式打开github文件(不好，除非可以直接打开github网页)
        // vscode.window.showInformationMessage(`open github file.`);
        // let fileName = "";
        // let nl = nodeLink.length;
        // let k = nl;
        // while(k >= 0 && nodeLink[k] != '/' && nodeLink[k] != '\\') {
        //     k--;
        // }
        // for(let i = k+1; i < nl; i++) {
        //     fileName += nodeLink[i];
        // }
        // new ourl("/"+fileName, nodeLink);
    }

    /**
     * 清除缓存文件(查看文件时生成的)
     */
    clearCache() {
        this.wstream.end();
        let ph = __dirname+"/cache/";
        if(this.cacheNum > 0) {  //判断方式需要优化(这样只能打开最少一个文件才能清除缓存)
            alg.delDirFile(ph);  //删除指定文件夹下所有文件(不实时清除缓存)
            fs.rmdirSync(ph);
            this.cacheNum = 0;  //记录缓存文件打开次数
            vscode.window.setStatusBarMessage("omi.coche:"+this.cacheNum.toString());  //状态栏显示缓存文件打开次数
            vscode.window.showInformationMessage("clear success.(omi:0)");
        }
    }

    /**
     * github文件下载(支持任意子文件和文件夹)
     * @param node 当前节点对象
     */
    async githubFileDownload(node) {
        // vscode.window.showInformationMessage("github file download.");
        let dialog = await vscode.window.showOpenDialog({
            canSelectFiles: false,
            canSelectFolders: true,
            canSelectMany: false
        });
        if(typeof(dialog) == "undefined") {
            return;
        }
        this.scheduleDown.sum = 0;
        this.scheduleDown.count = 0;
        //console.log(dialog);
        vscode.window.showInformationMessage("start download...");
        if(node.fileType == "file") {
            this.scheduleDown.sum = 1;
            this.downGithubFileOne(this.toGithubDownLink(node.filePathlink), dialog[0].fsPath);
            vscode.window.showInformationMessage("download completed.");
        } else if(node.fileType == "directory") {
            let dirName = dialog[0].fsPath+"\\"+alg.urlGetLastStr(node.filePathlink);
            if(fs.existsSync(dirName) == false) {  //判断文件夹是否存在
                fs.mkdirSync(dirName);  //创建文件夹
            }
            let spfn = 0;
            for(let i = 0; i < node.filePathlink.length; i++) {
                if(node.filePathlink[i] == '/') {
                    spfn += 1;
                }
            }
            await this.downGithubFileDirAllDFS(node.filePathlink, node.fileType, spfn, dirName);
            vscode.window.showInformationMessage("download completed.");
        } else {
            vscode.window.showInformationMessage("err: unknown file type!");
        }
    }

    /**
     * 下载单个指定文件到指定目录
     * @param {*} downUrl 待下载文件的路径
     * @param {*} savePath 储存目录
     */
    downGithubFileOne(downUrl, savePath) {
        vscode.window.setStatusBarMessage("omi.down:"+this.scheduleDown.sum+"/"+this.scheduleDown.count);  //下载进度
        let bOk = true;
        let fileName = alg.urlGetLastStr(downUrl);  //从链接获取文件名
        let wst = fs.createWriteStream(savePath+"\\"+fileName);
        request(downUrl, (err) => {
            if(err) {
                vscode.window.showInformationMessage(downUrl+"\ndownload failure!\n"+err.stack);
                wst.end();
                bOk = false;
            }
        }).pipe(wst).on("close", () => {
            if(bOk) {
                this.scheduleDown.count += 1;
                vscode.window.setStatusBarMessage("omi.down:"+this.scheduleDown.sum+"/"+this.scheduleDown.count);  //下载进度
                //vscode.window.showInformationMessage(fileName+" download completed.");
            }
        });
    }

    /**
     * 深搜遍历获取所有文件链接
     * @param {*} nodeLink 文件或文件夹链接
     */
    async downGithubFileDirAllDFS(nodeLink, nodeType, spfn, starSavePath) {
        if(nodeType == "file") {
            //按需求创建子文件夹
            let strPath = "";
            let k = 0;
            let addOk = false;
            for(let i = 0; i < nodeLink.length; i++) {
                if(k == spfn+1) {
                    addOk = true;
                }
                if(addOk) {
                    strPath += nodeLink[i];
                }
                if(nodeLink[i] == '/') {
                    k++;
                }
            }
            let hPth = "";
            let t = strPath.length;
            while(t >= 0 && strPath[t] != '/' && strPath[t] != '\\') {
                t--;
            }
            for(let i = 0; i < t; i++) {
                hPth += strPath[i];
            }
            let savePath = starSavePath+"\\"+hPth;
            alg.mkdirsSync(savePath);
            this.scheduleDown.sum += 1;
            this.downGithubFileOne(this.toGithubDownLink(nodeLink), savePath);
            return;
        } else if(nodeType == "directory") {
            let dataGitHub = await this.httpsGetGithubDataSyn(nodeLink);  //获取当前节点和当前节点下所有内容
            for(let i = 0; i < dataGitHub.filePathlinks.length; i++) {
                await this.downGithubFileDirAllDFS(dataGitHub.filePathlinks[i], dataGitHub.fileOrDir[i], spfn, starSavePath);
            }
        } else {
            vscode.window.showInformationMessage("err: unknown file type!");
        }
    }

    /**
     * 将github文件链接转换为github下载链接
     * @param {*} url github文件链接
     */
    toGithubDownLink(url) {
        let rl = "https://raw.githubusercontent.com/";
        let t = 0;  //记录遍历遇到的'/'符号数量
        let addOk = false;  //标记是否添加字符
        for(let i = 0; i < url.length; i++) {
            if(t == 3 || t == 6) {
                addOk = true;
            } else if(t == 5) {
                addOk = false;
            }
            if(addOk) {
                rl += url[i];
            }
            if(url[i] == '/') {
                t++;
            }
        }
        return rl;
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
            let htmlText = '';
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
exports.OmiGitHub = OmiGitHub;



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





function ghZain() {
	vscode.window.showInformationMessage('No dependency in empty workspace');
}
exports.ghZain = ghZain;

