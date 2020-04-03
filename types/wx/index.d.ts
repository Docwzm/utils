/**
 * 提供给微信环境中的H5页面调用的方法，保证能够在jweixin脚本加载完成后，
 * wechat异步调用wx[method]方法
 * mp异步调用wx.MiniProgram[method]方法
 */
export const wechat: {
  invoke: (method: string, callback?: any) => void;
};

export const mp: {
  invoke: (method: string, callback?: any) => void;
};