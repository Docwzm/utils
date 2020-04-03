declare interface Window {
  LSJavascriptBridge: Bridge
  LSJavascriptBridgeDidSetUp: (bridge: Bridge) => void;
  LsPermission?: { jumpToPermissionSetting: (type: number) => void },
  LsSkipView: { pushViewController: (jsonParam: string) => void }
}

declare type Callback = (response?: any) => any;

declare interface Bridge {
  callHandler: (handlerName: String, params?: any, callback?: Callback) => void;
  registerHandler: (handlerName: String, callback: Callback) => void
}
