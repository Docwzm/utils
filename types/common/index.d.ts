/**
 * 根据ua判断是否为微信环境
 */
export const isWx: () => boolean;

/**
 * 用途: 根据ua判断是否为乐心运动APP环境
 * 返回值：true 是乐心运动APP环境 false 不是乐心运动APP环境
 */
export const isLxydApp: () => boolean;

/**
 * 用途: 根据location.href判断是否为Beta环境
 */
export const isBeta: () => boolean;

/**
 * 从UserAgent中获取APP版本(APP>=2.9版本在UserAgent添加APP版本信息)
 * @return string
 * 备注：版本的格式会有: lxyd/2.9 或 lxyd/2.9.3 或lxyd-dev/2.9.3 或 lxyd-dev/2.9.1(build12)
 * @param appName
 */
export const getAppVersionFromUserAgent: (appName?: string) => string;

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
export const compareVersion: (v1: string, v2: string) => number;

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
export const format: (fmt: string, timestamp: number, type?: number) => string;

/**
 * 截取获得页面url特定参数的值
 * 示例: 如url为：xxx?orderId=4fdc912cb
 * util.getQueryString('xxx?orderId=4fdc912cb','orderId') --> 4fdc912cb
 */
export const getQueryString: (url: string, name: string) => string;

/**
 * 获取cookie的值，不存在时返回空字符串
 * @param cname
 * @returns {string}
 */
export const getCookie: (cname: string) => string;

/**
 * 用于初始化小程序webview环境的登录态
 */
export const setLoginStatus: () => void;
