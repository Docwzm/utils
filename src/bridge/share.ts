///<reference path="./global.d.ts"/>

/**
 * 分享链接到微信
 * @param title 分享标题
 * @param desc 分享描述
 * @param imgUrl 分享图片
 * @param url 分享链接
 */
export const shareUrl = (title: string, desc: string, imgUrl: string, url: string) => {
  window.LSJavascriptBridge.callHandler("shareUrl", { title, desc, imgUrl, url })
};

/**
 * 分享图片到微信
 * @param imageUrl
 */
export const shareImage = (imageUrl: string) => {
  window.LSJavascriptBridge.callHandler("shareImage", imageUrl)
};

/**
 * 分享webview截图
 * 版本 > 3.7.8
 * @param callback
 */
export const shareScreenshot = (callback: (shareResult: number) => void) => {
  window.LSJavascriptBridge.callHandler("shareScreenshot");
  window.LSJavascriptBridge.registerHandler("shareCallback", callback)
};