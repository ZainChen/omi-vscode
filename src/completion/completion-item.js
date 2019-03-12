const vscode = require('vscode');

class OmiCompletionItem extends vscode.CompletionItem {
    constructor(label, kind, detail, documentation, command) {
        super(label, kind);  //被继承类的超级调用，这里与被继承函数的构造函数保持相同
        this.label = label;  //补全主要内容
        this.kind = kind;  //补全类型
        this.detail = detail;
        this.documentation = documentation;  //markdown补全提示
        this.command = command;
    }

    // get zain() {
    //     if(this.label == 'zain')
    //         return "<zain>";
    // }

}
exports.OmiCompletionItem = OmiCompletionItem;
