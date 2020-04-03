/**
 * 用途: 根据ua判断是否为微信环境
 * 返回值：true 是微信环境 false 不是微信环境
 */
const isWx = function() {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') > -1;
};

/**
 * 用途: 根据ua判断是否为乐心运动APP环境
 * 返回值：true 是乐心运动APP环境 false 不是乐心运动APP环境
 */
const isLxydApp = function() {
  let ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('lxyd') > -1;
};

/**
 * 判断是否为beta环境
 * @returns {boolean}
 */
const isBeta = function () {
  return location.href.indexOf('-qa') > -1 ||
    location.href.indexOf('localhost') > -1 ||
    location.href.indexOf('0.0.0.0') > -1 ||
    location.href.indexOf('127.0.0') > -1
};

/**
 * 从UserAgent中获取APP版本(APP>=2.9版本在UserAgent添加APP版本信息)
 * @return string
 * 备注：版本的格式会有: lxyd/2.9 或 lxyd/2.9.3 或lxyd-dev/2.9.3 或 lxyd-dev/2.9.1(build12)
 * @param appName
 */
const getAppVersionFromUserAgent = function(appName = "lxyd") {
  let ua = navigator.userAgent;
  let startIndex = ua.indexOf(appName);
  if (startIndex === -1) {
    return undefined;
  }

  let endIndex = ua.indexOf(" ", startIndex);
  let lxydUa = "";
  if (endIndex > -1) {
    lxydUa = ua.substr(startIndex, endIndex - startIndex);
  } else {
    lxydUa = ua.substr(startIndex);
  }

  startIndex = lxydUa.indexOf("/");
  endIndex = lxydUa.indexOf("(");

  let lxyd_version = "";
  if (endIndex > -1) {
    lxyd_version = lxydUa.substr(startIndex + 1, endIndex - startIndex - 1);
  } else {
    lxyd_version = lxydUa.substr(startIndex + 1);
  }
  return String(lxyd_version);
};

/**
 * 用途：版本号大小比较函数
 * v1比较新时返回正数,v1和v2相同是返回0,v2比较新时返回负数;
 * 测试用例
 *    v1       v2    （结果)
 * "2.2.3"  "2.2.4.16" (负数)
 * "2.2"    "2.2.5.6"  (负数)
 * "2.3.1"   "2.2.3"   (正数)
 * "2.0.0"   "2.0"     (0)
 */
const compareVersion = function(v1, v2) {
  let versions1 = v1.trim().split('.');
  let versions2 = v2.trim().split('.');

  let len = Math.max(versions1.length, versions2.length);

  for (let i = 0; i < len; i++) {
    let n1 = parseInt(versions1[i] || 0);
    let n2 = parseInt(versions2[i] || 0);

    if (n1 !== n2) return n1 - n2;
  }

  return 0;
};

/**
 * 时间戳转换成日期工具函数
 * @param fmt 必填 目标日期显示格式
 * @param timestamp 必填 时间戳
 * @param type 选填 输出时间是否跟随当前时区，1表示输出结果为当前时区时间，2表示输出结果为北京时区时间， 默认值为1
 *
 * 示例:
 * 当前时区为GMT+0800 (中国标准时间)，format('yyyy-MM-dd hh:mm', 1537174760000) ---> 2018-09-17 16:59
 * 当前时区为GMT+0800 (中国标准时间)，format('yyyy-MM-dd hh:mm:ss', 1537174760000) ---> 2018-09-17 16:59:20
 * 当前时区为GMT+0900 (日本标准时间)，format('yyyy-MM-dd hh:mm:ss', 1537174760000) ---> 2018-09-17 17:59:20
 * 当前时区为GMT+0900 (日本标准时间)，format('yyyy-MM-dd hh:mm:ss', 1537174760000, 2) ---> 2018-09-17 16:59:20
 */
const format = function(fmt, timestamp, type = 1) {
  const t = type === 1 ? timestamp : timestamp + new Date().getTimezoneOffset() * 60000 + 8 * 3600000;
  const date2 = new Date(t);

  const o = {
    "M+": date2.getMonth() + 1, //月份
    "d+": date2.getDate(), //日
    "h+": date2.getHours(), //小时
    "m+": date2.getMinutes(), //分
    "s+": date2.getSeconds(), //秒
    "q+": Math.floor((date2.getMonth() + 3) / 3), //季度
    S: date2.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
        RegExp.$1,
        (date2.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }

  return fmt;
};

/**
 * 截取获得页面url特定参数的值
 * 示例: 如url为：xxx?orderId=4fdc912cb
 * util.getQueryString('xxx?orderId=4fdc912cb','orderId') --> 4fdc912cb
 */
const getQueryString = function(url, name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = url
      .substring(url.lastIndexOf("?"))
      .substr(1)
      .match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 获取cookie的值，不存在时返回空字符串
 * @param cname
 * @returns {string}
 */
const getCookie = function(cname) {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split("; ");
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split("=");
    if (cname === arr[0]) {
      return arr[1];
    }
  }
  return "";
};

/**
 * 用于初始化小程序webview环境的登录态
 * 向下兼容登录态 accessToken+userId > session
 */
const setLoginStatus = function() {
  //url不含session&&accessToken参数 app环境下，不执行后面逻辑
  if ((location.href.indexOf("session=") < 0 && location.href.indexOf("accessToken=") < 0) || isLxydApp()) return;

  let accessToken = encodeURIComponent(getQueryString(location.href, 'accessToken'))
  let userId = encodeURIComponent(getQueryString(location.href, 'userId'))
  let sessionStr = encodeURIComponent(getQueryString(location.href, 'session'))
  let sessionObj = JSON.parse(decodeURIComponent(sessionStr))
  let accessToken2 = sessionObj? sessionObj.accessToken : undefined;
  let userType2 = sessionObj? sessionObj.userType : undefined;
  let loginId2 = sessionObj? sessionObj.loginId : undefined;
  let appType2 = sessionObj? sessionObj.appType : undefined;
  let expireAt2 = sessionObj? sessionObj.expireAt : undefined;

  document.cookie = `session=${sessionStr};domain=.lifesense.com;path=/;`;
  document.cookie = `accessToken2=${accessToken2};domain=.lifesense.com;path=/;`;
  document.cookie = `userType2=${userType2};domain=.lifesense.com;path=/;`;
  document.cookie = `loginId2=${loginId2};domain=.lifesense.com;path=/;`;
  document.cookie = `appType2=${appType2};domain=.lifesense.com;path=/;`;
  document.cookie = `expireAt2=${expireAt2};domain=.lifesense.com;path=/;`;
  document.cookie = `accessToken=${accessToken};domain=.lifesense.com;path=/;`;
  document.cookie = `userId=${userId};domain=.lifesense.com;path=/;`;
}

export {
  isWx,
  isLxydApp,
  isBeta,
  getAppVersionFromUserAgent,
  compareVersion,
  format,
  getQueryString,
  getCookie,
  setLoginStatus
}
