// message
window.addEventListener("message", (event) => {
    if (event.source != window || event.data.from !== 'editor-dbg-tool') {
        return;
    }

    const { type, name, tpl } = event.data;
    switch (type) {
        case 'current':
            getEditorCurrentInfo(name)
            break;
        case 'setTpl':
            setTpl(tpl)
            break;
    }
}, false);

// handler
function setTpl(tpl) {
    const setTemplet = document.querySelector('.editor-container').__vue__.setTemplet;

    if (typeof tpl !== 'string') {
        return setTemplet(tpl)
    }
    fetch(tpl)
        .then((res) => res.json())
        .then((tpl) => {
            setTemplet(tpl);
        });
}

function getEditorCurrentInfo(name) {
    const editor = document.querySelector('.editor-container').__vue__;
    const scope = document.querySelector('.editor-container').__vue__.$parent.$parent.$parent.$parent.$parent.$parent.$parent;

    const {
        selector,
        currentElement,
        currentSubElement,
        currentLayout
    } = editor;
    const current = {
        scope,
        editor,
        currentElement,
        currentElements: selector.elements,
        currentSubElement,
        currentLayout,
        templet: scope.templet,
    }

    Object.assign(window, current);
    console.log(`${name} ===> `, current[name])
}

// 全局注入sdk
Object.assign(window, {
    setTpl,
    crt: getEditorCurrentInfo
})
