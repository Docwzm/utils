import { getQueryString } from "../common";

type TenantConfig = {
  hiddenComponents: string[],
  configMap?: { [key: string]: string }
}

let install = (Vue, tc: { [tenantName: string]: TenantConfig} ) => {
  // 获取租户名称
  let tn = getQueryString(location.href, 'tn');
  if (!tn) tn = "default";

  let hideComponent = (componentName) => {
    return tc[tn] && tc[tn].hiddenComponents && tc[tn].hiddenComponents.indexOf(componentName) > -1
  };

  /**
   * 根据租户配置隐藏组件
   * @param componentName
   * @param componentOptions
   */
  Vue.prototype.$wrapComp = (componentName, componentOptions) => {
    return hideComponent(componentName) ? { render: () => {} } : componentOptions;
  };

  /**
   * 根据configMap获取配置值
   * @param key
   */
  Vue.prototype.$tConfig = (key: string) => {
    return tc[tn] && tc[tn].configMap ? tc[tn].configMap[key] : null;
  };
};

export default { install }