// ==UserScript==
// @name                dbgTools
// @namespace           https://www.gaoding.com/
// @description         该插件仅在稿定内部使用，用以提高团队之间的协作效率
// @license             BSD-3-Clause

// @author              yisen
// @version             0.0.22
// @include             *.gaoding.com*
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_addValueChangeListener

// @connect             x.gdm.gaoding.com
// @require             https://x.gdm.gaoding.com/artifacts/jquery.min.js
// @run-at              document-end
// ==/UserScript==

(function () {
    'use strict';
    const href = location.href;

    window.copyTemplet = function (scope) {
        const json = scope.templet
        window.copy(json);
    }
    window.setTpl = function (tpl) {
        fetch(tpl)
        .then((res) => res.json())
        .then((tpl) => {
            console.log(tpl);
            window.editor.setTemplet(tpl);
        });
    }

    window.showCurrentElement = function (e) {
        console.log('当前元素', window.editor.currentElement);
    }

    window.showCurrentLayout = function (e) {
        console.log('当前画布', window.editor.currentLayout);
    }
    window.showDropdown = function (e) {
        if (window.$$dropdown) {
            window.$$dropdown.style.display = 'block';
            const handleClick = () => {
                window.$$dropdown.style.display = 'none';
                document.body.removeEventListener('click', handleClick, true);
            }
            document.body.addEventListener('click', handleClick, true);
        }
    }



    setTimeout(() => {
        try {
            const editor = document.querySelector('.editor-container').__vue__;
            const scope = document.querySelector('.editor-container').__vue__.$parent.$parent.$parent.$parent.$parent.$parent.$parent.templet;
            window.editor = editor || window.editor;
            window.scope = scope || window.scope;

            const div = document.createElement('div');
            div.style.cssText = 'position: fixed; z-index: 1000; left: 50%; top: 0; background: #888; color: #fff; transform: translateX(-50%); display: flex';


            // 复制模板数据按钮
            const btnCopyTemplet = document.createElement('button');
            btnCopyTemplet.innerText = '复制';
            btnCopyTemplet.style.cssText = 'padding: 10px;';
            btnCopyTemplet.addEventListener('click', window.copyTemplet);
            div.appendChild(btnCopyTemplet);

            // 显示刷新按钮
            if (href === 'https://www.gaoding.com/design?mode=create') {
                const btnRefresh = document.createElement('button');
                btnRefresh.innerText = '刷新';
                btnRefresh.style.cssText = 'padding: 10px; border-left: 1px solid #fff;';
                btnRefresh.addEventListener('click', () => { location.replace(href) });
                div.appendChild(btnRefresh);
            }

            // 显示下拉菜单按钮
            const btnShowDropdown = document.createElement('button');
            btnShowDropdown.innerText = '▽';
            btnShowDropdown.style.cssText = 'padding: 10px; border-left: 1px solid #fff;';
            btnShowDropdown.addEventListener('click', window.showDropdown);
            div.appendChild(btnShowDropdown);

            // 下拉菜单
            const dropdown = document.createElement('div');
            window.$$dropdown = dropdown;
            dropdown.style.cssText = 'position: absolute; left: 0; top: 37px; background: #999; color: #fff width: 100%; display: none;';
            div.appendChild(dropdown);

            // 显示当前元素
            const btnShowElement = document.createElement('button');
            btnShowElement.innerText = '当前元素';
            btnShowElement.style.cssText = 'padding: 10px; border-bottom: 1px solid #fff; width: 100%;';
            btnShowElement.addEventListener('click', window.showCurrentElement);
            dropdown.appendChild(btnShowElement);

            // 显示当前画布
            const btnShowLayout = document.createElement('button');
            btnShowLayout.innerText = '当前画布';
            btnShowLayout.style.cssText = 'padding: 10px; border-bottom: 1px solid #fff; width: 100%;';
            btnShowLayout.addEventListener('click', window.showCurrentLayout);
            dropdown.appendChild(btnShowLayout);

             // 设置模板
             const setTplElement = document.createElement('button');
             setTplElement.innerText = '设置模板';
             setTplElement.style.cssText = 'padding: 10px; border-bottom: 1px solid #fff; width: 100%;';
             setTplElement.addEventListener('click', window.setTpl);
             dropdown.appendChild(setTplElement);


            document.body.appendChild(div);

        }
        catch (e) { }

    }, 5000)


})();