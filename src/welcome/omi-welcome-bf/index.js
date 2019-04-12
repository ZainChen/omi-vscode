const vscode = acquireVsCodeApi();
const callbacks = {};

/**
 * 调用vscode原生api
 * @param data 可以是类似 {cmd: 'xxx', param1: 'xxx'}，也可以直接是 cmd 字符串
 * @param cb 可选的回调函数
 */
function callVscode(data, cb) {
    if (typeof data === 'string') {
        data = { cmd: data };
    }
    if (cb) {
        // 时间戳加上5位随机数
        const cbid = Date.now() + '' + Math.round(Math.random() * 100000);
        callbacks[cbid] = cb;
        data.cbid = cbid;
    }
    vscode.postMessage(data);
}

window.addEventListener('message', event => {
    const message = event.data;
    switch (message.cmd) {
        case 'vscodeCallback':
            console.log(message.data);
            (callbacks[message.cbid] || function () { })(message.data);
            delete callbacks[message.cbid];
            break;
        default: break;
    }
});

new Vue({
    el: '#app',
    data: {
        userName: '',
        time: '',
        show: true,
    },
    mounted() {
        this.time = this.getTime();
        callVscode({cmd: 'getConfig', key: 'omi.user.name'}, userName => this.userName = userName);
        callVscode({cmd: 'getConfig', key: 'omi.open.welcome'}, show => this.show = show);
    },
    watch: {
        show(nv, ov) {
            callVscode({cmd: 'setConfig', key: 'omi.open.welcome', value: nv}, null);
        }
    },
    methods: {
        toggleShowTip() {
            this.show = !this.show;
            
        },
        getTime() {
            const hour = new Date().getHours();
            if (hour <= 8) return 'good morning';
            else if (hour < 12) return 'good morning';
            else if (hour < 14) return 'good afternoon';
            else if (hour < 18) return 'good afternoon';
            return 'good evening';
        }
    }
});