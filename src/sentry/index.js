import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import { getCookie } from '../common/index'

const localHosts = ['static-qa2.lifesense.com', 'localhost', '0.0.0.0', '127.0.0.1'];

export const initSentry = (dsn) => {
  Sentry.setUser({
    id: getCookie('loginId2') || 0,
    appType: getCookie('appType2') || 0
  });

  Sentry.init({
    dsn,
    integrations: [ new Integrations.Vue({ Vue, attachProps: true })] ,
    logLevel: 'Error',
    environment: process.env.NODE_ENV,
    release: 'current_release',
    attachStacktrace: true,
    beforeSend(event) {
      // 本地环境不上报
      if (localHosts.indexOf(location.host) > -1) return null;

      let extra = event.extra;
      if (extra && extra.__serialized__) {
        let resp = extra.__serialized__;
        delete resp.config;
        delete resp.headers;
        resp.request && delete resp.request.__sentry_xhr__;
      }
      // 过滤breadcrumbs
      event.breadcrumbs = event.breadcrumbs.filter(breadcrumb => ['console', 'xhr'].indexOf(breadcrumb.category) < 0 );
      return event
    }
  });
};
