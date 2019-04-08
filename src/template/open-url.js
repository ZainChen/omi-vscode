const vscode = require('vscode');

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
    const html = `
          <!DOCTYPE html >
          <html lang="en">
          <head>
          <head>
          <style>
            body, html
              {
                margin: 0; padding: 0; height: 100%; width: 100%;
              }
              .vscode-light {
                  background: #282C34;
              }
          </style>
        </head>
        <body>
          <iframe class="vscode-light" id= "iframe" width="100%" height="100%" src="${url}" frameborder="0"></iframe>
        </body>
        </html>
          `;
    return html;
  }
}
module.exports = OpenURL;

{/* <img src="${url}" alt="${url}" /> */}
{/* <script src="${"http://gist-it.appspot.com/"+url}"></script> */}
{/* <iframe class="vscode-light" id= "iframe" width="100%" height="100%" src="${url}" frameborder="0"></iframe> */}