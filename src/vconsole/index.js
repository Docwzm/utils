import { getCookie, getQueryString } from "../common";

export const initVConsole = () => {
  if (getQueryString(location.href, 'tn')) { // 有租户名称
    let userIdStr = getCookie("loginId2");
    if (!userIdStr || parseInt(userIdStr) > 73) return; // 没有登录态或者不是内部员工，不展示vconsole
  }

  let script = document.createElement('script');
  script.src = 'https://cdn.lifesense.com/common/vconsole/3.3.2/vconsole.min.js';
  script.setAttribute('language', 'JavaScript');

  document.head.appendChild(script);

  script.onload = () => {
    let vc = new VConsole();
    //自定义插件
    let sessionPlugin = new VConsole.VConsolePlugin('session_plugin', '乐心Session');

    sessionPlugin.on('renderTab', callback => callback(''));

    sessionPlugin.on('addTool', function(callback) {
      // 删除session
      let clearBtn = {
        name: 'Clear',
        onClick: function(event) {
          document.cookie="session=;domain=.lifesense.com;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
          alert("清理成功")
        }
      };
      // reload
      let reloadBtn = {
        name: 'Reload',
        onClick: function(event) {
          location.reload(true);
        }
      };

      callback([clearBtn, reloadBtn]);
    });

    vc.addPlugin(sessionPlugin);
  };
};