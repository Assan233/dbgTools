// sdk注入
const script = document.createElement("script");
script.src = chrome.runtime.getURL("sdk.js");
document.body.appendChild(script);

// wrap
const wrap = document.createElement('div');
wrap.className = 'editor-dbg-tool'
document.body.appendChild(wrap);

// menu
const menu = document.createElement('div');
wrap.appendChild(menu);
menu.className = 'menu'

    // 复制模板数据按钮
    //    const btnCopyTemplet = document.createElement('button');
    //    btnCopyTemplet.innerText = '复制';
    //    btnCopyTemplet.style.cssText = 'padding: 10px;';
    //    btnCopyTemplet.addEventListener('click', window.copyTemplet);
    //    wrap.appendChild(btnCopyTemplet);

