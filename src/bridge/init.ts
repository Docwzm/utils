///<reference path="./global.d.ts"/>

let callbacks: Function[] = [];
let initialized = false;

/**
 * 设置Bridge初始化回调，支持多次调用。
 * @param callback
 */
export const bridgeInit = (callback: () => void): void => {
  if (window.LSJavascriptBridge) {
      callback();
  } else {
    if (initialized) callback();
    else {
      // 缓存回调
      callbacks.push(callback);
      window.LSJavascriptBridgeDidSetUp = (bridge) => {
        initialized = true;
        callbacks.forEach(cb => cb());
      }
    }
  }
};