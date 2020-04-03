export type RGB = { red: number, green: number, blue: number, alpha: number}

/**
 * 设置Bridge初始化回调，支持多次调用。
 * @param callback
 * @param callback
 * @param ✖
 */
export function bridgeInit(callback: () => void): void

/**
 * 分享链接到微信
 * @param title 分享标题
 * @param desc 分享描述
 * @param imgUrl 分享图片
 * @param url 分享链接
 */
export function shareUrl(title: string, desc: string, imgUrl: string, url: string): void;

/**
 * 分享图片到微信
 * @param imageUrl
 */
export function shareImage(imageUrl: string): void

/**
 * 分享webview截图
 * 版本 > 3.7.8
 * @param callback
 */
export function shareScreenshot(callback: (shareResult: number) => void): void

/**
 * 原生页面枚举
 */
export enum ViewType {
  addDeviceAction = 'addDeviceAction', // 添加设备页面
  showMyChallengeView = 'showMyChallengeView', // 唤起挑战页面
  showGroupListView = 'showGroupListView', // 唤起老的群组
  showFeedbackView = 'showFeedbackView', // 唤起意见反馈
  showUrlContent = 'showUrlContent', // 打开新的Webview
  showAddBodyLengthView = 'showAddBodyLengthView', // 唤起添加体围页面
  showAddWeightView = 'showAddWeightView', // 唤起添加体重页面
  showWeightStatisticsView = 'showWeightStatisticsView', // 唤起体重统计页面
  showUnknownWeight = 'showUnknownWeight', // 唤起未知体重页面
  userinfo = 'userinfo' // 跳转个人信息页
}

export interface ViewControllerConfig {
  shouldCloseWebViewControllerAfterPush?: boolean,
  data: any,
  viewType: ViewType
}

/**
 * 打开原生页面
 * @param param 页面枚举参考ViewType
 * @param replace 是否替换当前view
 */
export function pushViewController(param: ViewType | ViewControllerConfig, replace?: boolean): void

/**
 * 打开原生页面
 * 版本 > 3.7.8
 * @param viewType
 * @param replace 是否替换当前view
 */
export function pushViewTypeController(viewType: ViewType, replace?: boolean): void

/**
 * 打开webview
 * @param url
 * @param replace 是否替换当前view
 * @param notitlebar 是否有导航栏
 */
export function pushWebviewController(url: string, replace?: boolean, notitlebar?: boolean): void

/**
 * 退出当前webview
 */
export function popViewController(): void

/**
 * 退出到根级webview
 */
export function popToRootViewController(): void

/**
 * 设置下拉刷新，同时刷新业务数据
 * @param refreshType 0 不做处理 1 步数 2 有氧 3 睡眠 4 心率 5 锻炼 6 体重 7 ecg 8血压 9 血糖 10 ppg
 * @param reload: 0-触发页面重新加载，1-触发onShow， 默认0
 */
export function setWebViewPullToRefresh(refreshType: number, reload: number): void

export interface NavigationBarConfig {
  autoResetToDefaultConfigWhtenOpenLink?: boolean // 打开链接是否恢复导航栏配置
  navigationBarHidden?: boolean; // 导航栏是否显示
  backButtonType?: number // 显示返回按钮，图标是一个"<"返回箭头  2:显示关闭按钮，图标是一个"X"关闭按钮
  barLineHidden?: boolean //是否显示导航栏下面的线
  title: string // 标题
  subTitle?: string // 副标题
  tintColorType?: number //1：导航栏文字图标显示白色 2：导航栏文字图标显示黑色
  topPadding?: number // webView距离屏幕顶部高度，只有当autoTopPadding设置为false才有效果
  autoTopPadding?: boolean // 会否自动适配webView距离屏幕顶部的高度
  color: RGB;
}

/**
 * 设置导航栏。导航类桥接口内部都用bridgeInit包了一层，所以可以直接调用。
 * @param config
 */
export function setNavigationBarConfig(config: NavigationBarConfig): void;

export interface NavigationBarTransitionConfig {
  finalColor: RGB // 滚动到一定距离之后的颜色
  finalTintColorType: number // 滚动时导航栏内容的颜色   1：白色   2：黑色
  scrollDistance: number // 导航栏过渡效果的滑动距离
}

/**
 * 设置页面滚动时的导航栏渐变效果。导航类桥接口内部都用bridgeInit包了一层，所以可以直接调用。
 * @param config
 */
export function setNavigationBarScrollingTransition(config: NavigationBarTransitionConfig): void;

export interface ButtonConfig {
  imageUrl: string, // 按钮图片
  callback?: () => void
  title?: string
  buttonId?: string
  callbackHandlerName?: string
}

/**
 * 设置导航栏右侧按钮。导航类桥接口内部都用bridgeInit包了一层，所以可以直接调用。
 * @param buttonConfigs
 */
export function setNavigationBarButtons(buttonConfigs: ButtonConfig[]): void

/**
 * 显示loading
 */
export function showLoading(): void;

/**
 * 隐藏loading
 */
export function hideLoading(): void;

/**
 * 跳转push权限设置页，IOS同时还是步数数据授权页
 */
export function jumpToPermissionSetting(): void;

/**
 * 设置onShow生命周期回调，当webview打开，返回或者重新进入前台时会被触发
 */
export function onShow(callback: () => void): void;
/**
 * 用于获取系统默认设置
 * 版本>=4.5
 */
export interface SystemInfo {
  width: number, //屏幕宽
  height: number,  //屏幕高
  navigationBarHeight: number, //导航栏高度
  statusBarHeight: number, //状态栏高度
  tabBarHeight: number, //底部选项卡高度
  topBarSafeHeight: number, //顶部安全区域远离高度
  bottomSafeHeight: number //底部安全区域远离高度
}
export function getSystemInfos(callback: (info: SystemInfo)=>void): void;
