// sdk注入 & 数据通信
const scriptDom = document.createElement("script");
scriptDom.src = chrome.runtime.getURL("sdk.js");
document.body.appendChild(scriptDom);

const menuOptions = [
    {
        class: 'get-current',
        html: `<label>获取当前编辑器状态</label>
        <div>
            <button class="editor">editor</button>
            <button class="scope">scope</button>
            <button class="templet">templet</button>
            <button class="currentElement">currentElement</button>
            <button class="currentSubElement">currentSubElement</button>
            <button class="currentElements">currentElements</button>
            <button class="currentLayout">currentLayout</button>
        </div>`
    },
    {
        class: 'set-tpl',
        html: `<label>设置模板</label>
        <div>
            <textarea type="text"></textarea>
            <button>设置模板</button>
        </div>`
    },

];

// wrap
const wrap = document.createElement('div');
wrap.classList.add('editor-dbg-tool')
document.body.appendChild(wrap);

// menu
const menu = document.createElement('div');
menu.classList.add('menu')
wrap.appendChild(menu);
renderMenu(menuOptions)
wrap.addEventListener('click', toggleMenu);
menu.addEventListener('click', (e) => e.stopPropagation());

// 获取当前编辑器状态
const currentDom = document.querySelector('.get-current');
currentDom.addEventListener('click', getEditorCurrentInfo);

// 设置模板
const setTplBtn = document.querySelector('.set-tpl button');
setTplBtn.addEventListener('click', setTpl);


// handler
function postMsg(data) {
    data.from = 'editor-dbg-tool';
    window.postMessage(data, "*");
}

function renderMenu(options) {
    options.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item', item.class);
        menuItem.innerHTML = item.html;
        menu.appendChild(menuItem);
    });
}

function toggleMenu(e) {
    e.stopPropagation();
    const isHidden = menu.style.display === 'none';
    menu.style.display = isHidden ? 'inline-block' : 'none'
}

function getEditorCurrentInfo(e) {
    const name = e.srcElement.innerText;
    postMsg({ type: 'current', name })
}

function setTpl() {
    let tpl = document.querySelector('.editor-dbg-tool .set-tpl textarea').value || '';
    if (tpl.length > 300) {
        tpl = JSON.parse(tpl);
    }

    postMsg({ type: 'setTpl', tpl })
}