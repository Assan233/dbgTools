const menuImg = 'https://cdn.dancf.com/fe-assets/20220810/Users/assan/Downloads/5baa0291544760a64c0f4b737a74ce25.png'

// function renderMenuItem(menu, option) {
//     option.forEach(config => {
//         const menuItem = document.createElement('div');
//         menu.appendChild(menuItem);
//         wrap.style.cssText = `position: absolute; left: 0; top: 50px; width: 320px; background: #fff; cursor: pointer;`;
//     });
// }

// sdk注入
const script = document.createElement("script");
script.src = chrome.runtime.getURL("sdk.js");
document.body.appendChild(script);

// wrap
const wrap = document.createElement('div');
document.body.appendChild(wrap);
wrap.style.cssText = `position: fixed; z-index: 1000; left: 50%; top: 0; width: 64px; height: 64px; background-image: url(${menuImg}); cursor: pointer;`;

// menu
const menu = document.createElement('div');
wrap.appendChild(menu);
menu.style.cssText = `position: absolute; left: 0; top: 50px; width: 320px; background: #fff; cursor: pointer;`;

    // item
    // const menuItem = document.createElement('div');
    // wrap.appendChild(menu);

    // 复制模板数据按钮
    //    const btnCopyTemplet = document.createElement('button');
    //    btnCopyTemplet.innerText = '复制';
    //    btnCopyTemplet.style.cssText = 'padding: 10px;';
    //    btnCopyTemplet.addEventListener('click', window.copyTemplet);
    //    wrap.appendChild(btnCopyTemplet);

