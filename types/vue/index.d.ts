

type TenantConfig = {
  hiddenComponents: string[],
  configMap?: { [key: string]: string }
}
export const TenantPlugin: (Vue, options: { [tenantName: string]: TenantConfig}) => void;

export const TenantShowDirective: any;

export const TenantHideDirective: any;

export const TenantClassDirective: any;
