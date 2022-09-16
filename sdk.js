// message
window.addEventListener("message", (event) => {
    if (event.source != window || event.data.from !== 'editor-dbg-tool') {
        return;
    }

    const { type, name, tpl, format } = event.data;
    switch (type) {
        case 'current':
            getEditorCurrentInfo(name)
            break;
        case 'setTpl':
            setTpl(tpl)
            break;
        case 'editorExport':
            editorExport(format)
            break;
    }
}, false);

// handler
// 设置模板
function setTpl(tpl) {
    if (!tpl) {
        console.error(`templet is undefined`);
        return;
    }

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

// 编辑器当前状态信息
function getEditorCurrentInfo(name) {
    const editor = document.querySelector('.editor-container').__vue__;
    const scope = document.querySelector('.editor-container').__vue__?.$parent?.$parent?.$parent?.$parent?.$parent?.$parent?.$parent;

    const {
        currentElement,
        currentSubElement,
        currentLayout
    } = editor;
    const current = {
        scope,
        editor,
        currentElement,
        currentElements: currentElement && currentElement.elements,
        currentSubElement,
        currentLayout,
        templet: scope.templet,
    }

    Object.assign(window, current, { $crt: current[name] });
    console.log(`${name} ===> `, current[name])
}

// 编辑器出图
function editorExport(format) {
    const editor = document.querySelector('.editor-container').__vue__;
    console.log(format);

    switch (format) {
        case 'jpg':
        case 'png':
            exportImage(editor, format)
            break;
        case 'gif':
            exportGif(editor)
            break;
    }
}
function exportImage(editor, format = 'png') {
    editor
        .exportImage(editor.currentLayout, {}, 30000, false, true)
        .then((canvas) => {
            return new Promise(resolve => {
                canvas.toBlob(blob => resolve(blob), `image/${format}`);
                return;
            })
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        })
        .then((url) => {
            window.open(url);
        })
        .catch(console.error);
}
function exportGif(editor) {
    editor
        .renderGifLayouts(editor.currentLayout, {}, 10000, undefined)
        .then((canvas) => {
            return editor.exportGif(canvas);
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        })
        .then((url) => {
            window.open(url);
        });
}


// 全局注入sdk
Object.assign(window, {
    setTpl,
    crt: getEditorCurrentInfo
})
