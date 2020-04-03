///<reference path="./global.d.ts"/>
import { isWx, getQueryString } from "../common";
import { wechat, mp } from "../wx";
import {bridgeInit} from "./init";
/**
 * 原生页面枚举
 */
enum ViewType {
  addDeviceAction = 'addDeviceAction', // 添加设备页面
  showMyChallengeView = 'showMyChallengeView', // 唤起挑战页面
  showGroupListView = 'showGroupListView', // 唤起老的群组
  showFeedbackView = 'showFeedbackView', // 唤起意见反馈
  showUrlContent = 'showUrlContent', // 打开新的Webview
  showAddBodyLengthView = 'showAddBodyLengthView', // 唤起添加体围页面
  showAddWeightView = 'showAddWeightView', // 唤起添加体重页面
  showWeightStatisticsView = 'showWeightStatisticsView', // 唤起体重统计页面
  showUnknownWeight = 'showUnknownWeight', // 唤起未知体重页面
  showUserinfo = 'userinfo' // 跳转个人信息页
}

interface ViewControllerConfig {
  shouldCloseWebViewControllerAfterPush?: boolean,
  data: any,
  viewType: ViewType
}

/**
 * 打开原生页面
 * 版本 > 3.7.8
 * @param viewType
 * @param replace 是否替换当前view
 */
export function pushViewTypeController(viewType: ViewType, replace: boolean = false): void {
  let config: ViewControllerConfig = {
    shouldCloseWebViewControllerAfterPush: replace,
    data: {
      url: `lswearable://${viewType}`
    },
    viewType
  };

  pushViewController(config)
}

/**
 * 打开原生页面
 * @param config
 */
export function pushViewController(config: ViewControllerConfig): void {
  if (window.LsSkipView) { //安卓
    window.LsSkipView.pushViewController(JSON.stringify(config))
  } else { //IOS
    window.LSJavascriptBridge.callHandler("pushViewController", config)
  }
}

/**
 * 打开webview
 * @param url
 * @param replace 是否替换当前view
 * @param notitlebar 是否有导航栏
 */
export const pushWebviewController = (url: string, replace: boolean = false, notitlebar: boolean = false) => {
  if (!window.LSJavascriptBridge && !window.LsSkipView) {
    // 判断当前tn租户环境，组装新url
    let tn = getQueryString(location.href, 'tn');
    let newUrl = null;
    if (tn) {
      if (url.indexOf('?') > -1) {
        newUrl = url + '&tn=' + tn;
      } else {
        newUrl = url + "?tn=" + tn;
      }
    } else {
      newUrl = url;
    }

    if (!isWx()) {//说明不在微信中
      // 走不在微信的逻辑
      location.href = newUrl;
    } else {//在微信环境中
      mp.invoke('getEnv', (res) => {
        if (res.miniprogram) {
          // 走在小程序的逻辑
          if (replace) {
            mp.invoke('redirectTo', {
              url: `/pages/h5/common/main?originUrl=${encodeURIComponent(newUrl)}`
            })
          } else {
            mp.invoke('navigateTo', {
              url: `/pages/h5/common/main?originUrl=${encodeURIComponent(newUrl)}`
            })
          }
        } else {
          // 走在微信公众号的逻辑
          location.href = newUrl;
        }
      })
    }

    return
  }

  let urlEncode = encodeURIComponent(url);
  let schema = notitlebar ? `lswearable://web?url=${urlEncode}&notitlebar=true` : `lswearable://web?url=${urlEncode}`;
  pushViewController({
    shouldCloseWebViewControllerAfterPush: replace,
    data: { url: schema },
    viewType: ViewType.showUrlContent //该参数值为showUrlContent时表示跳转的是webview
  })
};

/**
 * 退出当前webview
 */
export const popViewController = () => {
  if (!isWx()) {//说明不在微信中
    // 走不在小程序的逻辑
    window.LSJavascriptBridge.callHandler("popViewController")
  } else {
    mp.invoke('getEnv', (res) => {
      if (res.miniprogram) {
        // 走在小程序的逻辑，history.back只改变指针位置，不改变history.length
        window.history.back()
        setTimeout(() => {
          mp.invoke('navigateBack')
        }, 50)
      } else {
        // 走不在小程序的逻辑
        window.LSJavascriptBridge.callHandler("popViewController")
      }
    })
  }
};

/**
 * 退出到根级webview
 */
export const popToRootViewController = () => {
  window.LSJavascriptBridge.callHandler("popToRootViewController")
};

/**
 * 设置下拉刷新，同时刷新业务数据
 * @param refreshType 0:不做处理 1 步数 2 有氧 3 睡眠 4 心率 5 锻炼 6 体重 7 ecg 8血压 9 血糖 10 ppg
 * @param reload: 0-触发页面重新加载，1-触发onShow
 */
export const setWebViewPullToRefresh = (refreshType: number, reload = 0) => {
  bridgeInit(() => {
    window.LSJavascriptBridge.callHandler("setWebViewPullToRefresh", {
      enabled: true,
      enable: true,
      reload,
      refreshType
    })
  })
};
