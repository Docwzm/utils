//友盟统计，根据域名区分统计账号。
let _umId = {
  'qa': 1260948329,
  'online': 1260952126
};

let _host = location.hostname;
let _hostType = 'dev';
if (_host.indexOf('cdn') !== -1) {
  _hostType = 'online'
} else {
  _hostType = 'qa'
}

let umIdByHost = _umId[_hostType];
let umScript = document.createElement('script');
umScript.src = 'https://s95.cnzz.com/z_stat.php?id=' + umIdByHost + '&web_id=' + umIdByHost;
umScript.setAttribute('language', 'JavaScript');
setTimeout(() => document.head.appendChild(umScript), 1000);

let loaded = false;
let events = [];

umScript.onload = function () {
  //声明_czc对象
  window._czc = window._czc || [];
  //绑定siteid
  _czc.push(["_setAccount", umIdByHost]);
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器

  if (isAndroid) {
    _czc.push(["_setCustomlet", "安卓用户", "是"]);
  } else {
    _czc.push(["_setCustomlet", "苹果用户", "是"]);
  }
  loaded = true;
  events.forEach(e => {
    _czc.push(e)
  });
};

/**
 * 记录单个打点
 * @param category
 * @param action
 */
export default (category, action) => {
  if(loaded) _czc.push(["_trackEvent", category, action]);
  else events.push(["_trackEvent", category, action])
};