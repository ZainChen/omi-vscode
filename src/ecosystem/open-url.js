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
                margin: 0; padding: 0; height: 100%;
              }
              .vscode-light {
                  background: #fff;
              }
          </style>
        </head>
        <body>
          <script src="${"http://gist-it.appspot.com/"+url}"></script>
        </body>
        </html>
          `;
    return html;
  }
}
module.exports = OpenURL;

{/* <iframe class="vscode-light" id= "iframe" width="100%" height="100%" src="${url}" frameborder="0"></iframe> */}