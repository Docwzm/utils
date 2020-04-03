import { getCookie, isLxydApp } from '../common'
import axios from 'axios';

declare class MobileDetect {
  phone(): string
  version(phone: string): number
  constructor(agent: string)
}

let mdScript = document.createElement('script');
mdScript.src = 'https://cdn.lifesense.com/common/mobile-detect/1.4.4/mobile-detect.min.js';
mdScript.setAttribute('language', 'JavaScript');
setTimeout(() => document.head.appendChild(mdScript), 1000);

let reported = false; // 是否已经收集完上报数据
let loaded = false; // 脚本是否加载完成

mdScript.onload = function () {
  const md = new MobileDetect(window.navigator.userAgent);
  // 维度
  addMeasure("dimensions_keys", ["phone_type", "os_version", "platform"].join(','));
// addMeasure("user_id", getCookie("loginId2"));
  addMeasure("phone_type", md.phone());
  addMeasure("os_version", md.version(md.phone()));
  addMeasure("platform", isLxydApp() ? "lx" : 'wx');

  loaded = true;
  report()
};

/**
 * 完成数据收集和脚本加载后，上报数据
 */
function report() {
  if (reported && loaded) {
    axios.get("https://beta-beast.lifesense.com/m/metrics", {
      params: measures
    })
  }
}

/**
 * 获取endMask和startMask之间的跨度
 * @param startMask
 * @param endMask
 * @returns {number}
 */
export const measureDuration = (startMask: string, endMask: string) => {
  const measureName = startMask + '_' + endMask;
  performance.measure(measureName, startMask, endMask);
  let entries = performance.getEntriesByName(measureName);
  return entries && entries.length ? entries[0].duration : 0;
};

let measures = {};
let metrics_keys = [];
let metrics_values = [];

/**
 * 新增埋点
 * @param key
 * @param value
 */
export const addMeasure = (key: string, value: string | number) => {
  value = typeof(value) === 'number' ? Math.floor(value) : value;
  measures[key] = value;
};

export const addMetric = (key, value) => {
  metrics_keys.push(key);
  metrics_values.push(value)
};

/**
 * 上报埋点。只能上报一次
 * @param appName 应用名称，和codex保持一致
 * @param pageName 页面名称，默认为home
 * @param appType appType，默认为6
 */
export const reportMeasure = (appName: string, pageName: string = "home", appType: number = 6) => {
  if (reported) return;
  reported = true;

  let timing =  window.performance.timing;
  addMeasure("source", appType);
  addMeasure("app_name", appName);
  addMeasure("biz_name", pageName);
  addMeasure("category", "performance");

  addMetric("dns_lookup", timing.domainLookupEnd  - timing.domainLookupStart);
  addMetric("tcp_connect", timing.connectEnd - timing.connectStart);
  addMetric("first_byte", timing.responseEnd - timing.requestStart);
  addMetric("dom_load", timing.domComplete - timing.domLoading);
  addMetric("window_onload", timing.domComplete - timing.domainLookupStart);

  addMeasure("metrics", metrics_keys.join(','));
  addMeasure("data", metrics_values.join(','));

  report()
};
