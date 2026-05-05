import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Quasar, {
  Notify,
  type QNotifyAction,
  type QNotifyCreateOptions,
  type QNotifyUpdateOptions,
  type QuasarLanguage
} from 'quasar';

import vant from 'vant';

import router from './router';
import i18n from './i18n';
import App from './App.vue';
import components from '@/components';

const app = createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(Quasar, {
    config: {
      dark: 'auto'
    }
  })
  .use(vant);

// Quasar默认显示en-US，手动设置成zh-CN
Quasar.lang.set(i18n.global.messages.value['zh-CN'].quasar as QuasarLanguage);
Notify.setDefaults({
  position: 'top'
  // actions: [{ icon: 'close' }]
});

app.config.globalProperties.notify = (
  opts: QNotifyCreateOptions,
  closeBtn: QNotifyAction | boolean = true
) => {
  const noti = Notify.create({
    ...opts,
    actions: [
      ...(opts.actions || []),
      ...(closeBtn ? [{ icon: 'close', ...(typeof closeBtn !== 'object' ? null : closeBtn) }] : [])
    ]
  });
  return (opts?: QNotifyUpdateOptions, closeBtn: QNotifyAction | boolean = true) =>
    noti(
      opts
        ? {
            ...opts,
            actions: [
              ...(opts.actions || []),
              ...(closeBtn
                ? [{ icon: 'close', ...(typeof closeBtn !== 'object' ? null : closeBtn) }]
                : [])
            ]
          }
        : undefined
    );
};

components.forEach(e => {
  app.component(e.name as string, e);
});

app.mount('#app');
