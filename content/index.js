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
            <textarea type="text" placeholder="支持 content对象 和 content url" ></textarea>
            <button>设置模板</button>
        </div>`
    },
    {
        class: 'editor-export',
        html: `<label>编辑器出图</label>
        <div>
            <button class="png">PNG</button>
            <button class="jpg">JPG</button>
            <button class="ppt">PPT</button>
            <button class="gif">GIF</button>
            <button class="mp4">MP4</button>
            <button class="back-png">后端出图-PNG</button>
            <button class="back-mp4">后端出图-MP4</button>
            <button class="back-pdf">后端出图-PDF</button>
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
renderMenu(menuOptions);

wrap.addEventListener('click', toggleMenu);
menu.addEventListener('click', (e) => e.stopPropagation());
document.body.addEventListener('click', () => toggleMenu(null, false));

// 获取当前编辑器状态
const currentDom = document.querySelector('.get-current');
currentDom.addEventListener('click', getEditorCurrentInfo);

// 设置模板
const setTplBtn = document.querySelector('.set-tpl button');
setTplBtn.addEventListener('click', setTpl);

// 编辑器出图
const exportBtn = document.querySelector('.editor-export');
exportBtn.addEventListener('click', handleExport);




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

function toggleMenu(e, enable) {
    if (typeof enable === "boolean") {
        menu.style.display = enable ? 'inline-block' : 'none'
        return
    }

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

function handleExport(e) {
    const format = e.target.className;
    postMsg({ type: 'editorExport', format })
}