import { createI18n } from 'vue-i18n';
import translation from './assets/locale/zh-CN';
// import router from './router'
// import { Notify } from 'quasar'

console.log(translation);

export const availableLocales = ['zh-CN', 'en-US'] as const;

export type availLangs = (typeof availableLocales)[number];

// export const quasarZhCn = translation.quasar

const i18n = createI18n({
  allowComposition: true,
  // globalInjection: true,
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  // availableLocales,
  messages: {
    'zh-CN': translation,
    'en-US': {} as Obj
  }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const t = i18n.global.t;
i18n.global.t = (keyPath, ...args: any[]) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  t.call(i18n.global, ((keyPath as string).startsWith('el.') ? 'el.' : 'app.') + keyPath, ...args);

export default i18n;
