///<reference path="./global.d.ts"/>

import { bridgeInit } from "./init";

/**
 * 显示loading
 */
function showLoading() {
  window.LSJavascriptBridge && window.LSJavascriptBridge.callHandler("showLoading")
}

/**
 * 隐藏loading
 */
function hideLoading() {
  window.LSJavascriptBridge && window.LSJavascriptBridge.callHandler("hideLoading")
}

/**
 * 跳转push权限设置页，IOS同时还是步数数据授权页
 * 版本3.7.8可用
 */
function jumpToPermissionSetting() {
  if (window.LsPermission) { // 安卓
    window.LsPermission.jumpToPermissionSetting(2);
  } else {
    window.LSJavascriptBridge.callHandler("jumpToPermissionSetting", 1);
  }
}

/**
 * 设置onShow生命周期回调。当webview打开，返回或者重新进入前台时会被触发
 * 版本: >= 4.0
 * @param callback
 */
function onShow(callback: Callback) {
  bridgeInit(() => {
    window.LSJavascriptBridge.registerHandler("onShow", () => {
      callback && callback()
    });
  });

  window.addEventListener("hashchange", () => {
    if(location.hash.indexOf("#onshow") > -1) {
      history.go(-1);
      callback && callback();
    }
  })
}

interface AddPushConfig {
  identifier: any , //唯一标识
  title: string,  //标题
  subtitle: string, //副标题
  content? : string,  //内容
  timerRule: Array<string>,   //自定义时间数组
  remindStatus: number, //--提醒开启状态，0:未开启  1:开启自定义时间提醒   2,"开启间隔时间提醒"
}

/**
 * 添加本地通知
 * 版本: >= 4.1
 * @param addPushConfigs
 */
function addLocalPush(addPushConfigs: AddPushConfig[]) {
  window.LSJavascriptBridge.callHandler("addLocalPush", addPushConfigs)
}

interface RemovePushConfig {
  identifier: any , //唯一标识
  timerRule: Array<string>   //自定义时间数组
}
/**
 * 删除本地通知
 * 版本: >= 4.1
 * @param removePushConfigs
 */
function removeLocalPush(removePushConfigs: RemovePushConfig) {
  window.LSJavascriptBridge.callHandler("removeLocalPush", removePushConfigs)
}

interface SystemInfo {
  width: number, //屏幕宽
  height: number,  //屏幕高
  navigationBarHeight: number, //导航栏高度
  statusBarHeight: number, //状态栏高度
  tabBarHeight: number, //底部选项卡高度
  topBarSafeHeight: number, //顶部安全区域远离高度
  bottomSafeHeight: number //底部安全区域远离高度
}
/**
 * 获取app默认系统设置值
 * 版本 >= 4.5
 * 返回值
 */
export const getSystemInfos = (callback: Callback) => {
  bridgeInit(()=>{
    window.LSJavascriptBridge.callHandler("getNativeAppDefaultSize", "",(info: SystemInfo)=> {
      callback && callback(info);
    });
  });
};

/**
 * 分享小程序卡片
 * 版本>=4.3
 */
interface shareParams {
    title: string, //小程序标题 required
    desc: string,  //小程序描述 required
    thumbUrl: string, //兼容旧版本节点的图片，小于32KB，新版本优先使用WXMiniProgramObject的hdImageData属性
    webpageUrl: string,    //兼容低版本的网页链接 required
    userName: string,     //小程序的userName 乐心健康：gh_f526a0cdc00e,备注:小程序原始ID获取方法：登录小程序管理后台-设置-基本设置-帐号信息 required
    path: string,   //小程序的页面路径 required
    hdImageUrl: string,   //小程序新版本的预览图Url，6.5.9及以上版本微信客户端支持。备注：限制大小不超过128KB，自定义图片建议长宽比是 5:4。 required
    withShareTicket: boolean,   //是否使用带shareTicket的分享
    miniprogramType: number   //小程序的类型，默认正式版，1.8.1及以上版本开发者工具包支持分享开发版和体验版小程序。 1是正式版，2是测试版，3是体验版 required
}
function shareWxminiProgram(shareParams: shareParams) {
    window.LSJavascriptBridge.callHandler("shareWxminiProgram", shareParams)
}

export {
  showLoading,
  hideLoading,
  jumpToPermissionSetting,
  onShow,
  addLocalPush,
  removeLocalPush,
  shareWxminiProgram
}
