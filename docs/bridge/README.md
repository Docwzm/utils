### 引入
```javascript
import { pushWebviewController } from '@ls/utils'
```

### 接口说明
#### 初始化
* bridgeInit: 设置桥接口初始化回调，可以多次设置。

#### 分享
* shareUrl: 分享链接
* shareImage: 分享图片
* shareScreenshot: 分享截图

#### 跳转
* pushWebviewController: 打开webview
* pushViewController: 跳转原生页面
* pushViewTypeController: 根据类型跳转原生页面
* popViewControl: 退出当前webview
* popToRootViewController: 退出到首页

#### 导航栏
导航类桥接口内部都用bridgeInit包了一层，所以可以直接调用。
* setNavigationBarConfig: 设置导航栏
* setNavigationBarButtons: 设置导航栏按钮
* setNavigationBarScrollingTransition: 设置导航栏渐变

### 通用
* showLoading: 展示loading
* hideLoading: 隐藏loading
* jumpToPermissionSetting: 跳转push权限设置页，IOS同时还是步数数据授权页
* onShow: 设置onShow生命周期回调，内部已经用bridgeInit包了一层。当webview打开，返回或者重新进入前台时会被触发。
* addLocalPush: 添加本地通知
* removeLocalPush: 删除本地通知
* getSystemInfos: 获取系统默认设置(版本>=4.5)
* shareWxminiProgram: 分享小程序卡片(版本>=4.3)

