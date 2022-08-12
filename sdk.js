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

function getEditorCurrentInfo(global) {
    const editor = document.querySelector('.editor-container').__vue__;
    const scope = document.querySelector('.editor-container').__vue__.$parent.$parent.$parent.$parent.$parent.$parent.$parent;

    const {
        currentElement,
        currentSubElement,
        currentLayout
    } = editor;
    const current = {
        scope,
        editor,
        currentElement,
        currentSubElement,
        currentLayout,
        tpl: scope.templet,
    }

    Object.assign(global, current);
    global.copy(scope.templet);
    
    console.log('current ====> ', current);
}

// 注入 window
Object.assign(window, {
    setTpl,
    crt: getEditorCurrentInfo
})
