const vscode = require('vscode');
const path = require('path');

class OpenURL {
    constructor(selectedMenuItem, url) {
        const panel = vscode.window.createWebviewPanel(
        'webPage',
        selectedMenuItem,
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
        );
        panel.webview.html = this.getWebviewContent(url);
    }
    getWebviewContent(url) {
        let html = `
            <!DOCTYPE html >
            <html lang="en">
                <head>
                    <style>
                    html, body {
                        position: relative;
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                    }
                    iframe {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                    }
                    </style>
                </head>
                <body>
                    <iframe class="vscode-light" id= "iframe" src="${url}" frameborder="0"></iframe>
                </body>
            </html>
        `;
        if(url.length >= 4 && (url[0] === "h" || url[0] === "H") && (url[1] === "t" || url[1] === "T") && (url[2] === "t" || url[2] === "T") && (url[3] === "p" || url[3] === "P")) {
            return html;
        }
        //vscode不支持直接加载本地资源，需要替换成其专有路径格式，将样式、JS、iframe的路径替换
        return html.replace(/(<link.+?href="|<script.+?src="|<img.+?src="|<iframe.+?src=")(.+?)"/g, (m, $1, $2) => {
            return $1 + vscode.Uri.file(path.resolve(url, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
        });
    }
}
module.exports = OpenURL;

{/* <img src="${url}" alt="${url}" /> */}
{/* <script src="${"http://gist-it.appspot.com/"+url}"></script> */}
{/* <iframe class="vscode-light" id= "iframe" width="100%" height="100%" src="${url}" frameborder="0"></iframe> */}