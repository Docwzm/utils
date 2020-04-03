/**
 * 记录单个打点
 * @param category
 * @param action
 */
export const logEvent: (category: string, action: string) => void;

/**
 * 记录曝光点
 * @param id dom元素id
 * @param category
 * @param action
 */
export const logExposure: (id: string, category: string, action: string) => void;

/**
 * 获取endMask和startMask之间的跨度
 * @param startMask
 * @param endMask
 * @returns {number}
 */
export const measureDuration: (startMask: string, endMask: string) => number;

/**
 * 新增埋点
 * @param key
 * @param value
 */
export const addMeasure: (key: string, value: string | number) => void;

/**
 * 上报埋点。只能上报一次
 * @param appName 应用名称，和codex保持一致
 * @param pageName 页面名称，默认为home
 * @param appType appType，默认为6
 */
export const reportMeasure: (appName: string, pageName: string, appType: number) => void;