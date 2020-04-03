///<reference path="./global.d.ts"/>
import { bridgeInit } from "./init";
import { pushWebviewController } from "./view-controller";

type RGB = { red: number, green: number, blue: number, alpha: number}

const setNavigationBarTitle = (title: string, subTitle?: string) => {
  window.LSJavascriptBridge.callHandler("setNavigationBarTitle", { title, subTitle })
};

const setNavigationBarColor = (rgb: RGB) => {
  window.LSJavascriptBridge.callHandler("setNavigationBarTitle", rgb)
};

const setWebViewTopPadding = (paddingTop: number) => {
  window.LSJavascriptBridge.callHandler("setWebViewTopPadding", paddingTop)
};

const setBarLineHidden = (hide: boolean = false) => {
  window.LSJavascriptBridge.callHandler("setWebViewTopPadding", hide ? 1 : 0)
};

interface NavigationBarConfig {
  autoResetToDefaultConfigWhtenOpenLink?: boolean // 打开链接是否恢复导航栏配置
  navigationBarHidden?: boolean; // 导航栏是否显示
  backButtonType?: number // 显示返回按钮，图标是一个"<"返回箭头  2:显示关闭按钮，图标是一个"X"关闭按钮
  barLineHidden?: boolean //是否显示导航栏下面的线
  title: string // 标题
  subTitle?: string // 副标题
  tintColorType?: number //1：导航栏文字图标显示白色 2：导航栏文字图标显示黑色
  topPadding?: number // webView距离屏幕顶部高度，只有当autoTopPadding设置为false才有效果
  autoTopPadding?: boolean // 会否自动适配webView距离屏幕顶部的高度
  color: RGB
}

const setNavigationBarConfig = (config: NavigationBarConfig) => {
  bridgeInit(() => {
    document.title = config.title;
    window.LSJavascriptBridge.callHandler("setNavigationBarConfig", config)
  })
};

interface NavigationBarTransitionConfig {
  finalColor: RGB // 滚动到一定距离之后的颜色
  finalTintColorType: number // 滚动时导航栏内容的颜色   1：白色   2：黑色
  scrollDistance: number // 导航栏过渡效果的滑动距离
}

const setNavigationBarScrollingTransition = (config: NavigationBarTransitionConfig) => {
  bridgeInit(() => {
    window.LSJavascriptBridge.callHandler("setNavigationBarScrollingTransition", config)
  })
};

interface ButtonConfig {
  imageUrl: string, // 按钮图片
  callback?: () => void
  title?: string
  buttonId?: string
  callbackHandlerName?: string
}

let buttonId = 0;
const setNavigationBarButtons = (buttonConfigs: ButtonConfig[]) => {
  bridgeInit(() => {
    buttonConfigs.forEach(buttonConfig => {
      // buttonConfig.title = ''; // title字段无效
      buttonConfig.buttonId = 'button' + (buttonId ++);
      buttonConfig.callbackHandlerName = 'buttonCallback' + buttonConfig.buttonId;
      window.LSJavascriptBridge.registerHandler(buttonConfig.callbackHandlerName, () => {
        buttonConfig.callback && buttonConfig.callback()
      })
    });
    window.LSJavascriptBridge.callHandler("setNavigationBarButtons", buttonConfigs)
  })
};

export {
  setNavigationBarConfig,
  setNavigationBarScrollingTransition,
  setNavigationBarButtons,
}
