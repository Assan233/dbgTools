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

// 注入 window
Object.assign(window, {
    setTpl
})
