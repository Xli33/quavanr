import { defineStore } from 'pinia';
import { Lang, LoadingBar, Notify, type QuasarLanguage } from 'quasar';
import { Emitter, StoreSimply } from 'utils-where';
import i18n, { availableLocales, type availLangs } from './i18n';

type GlobalConfig = {
  // 对应 Quasar.Dark.set 的参数类型，false 表示 日间模式，true 为夜间模式
  theme: 'auto' | 'light' | 'dark';
  lang: availLangs;
};

const Setting = new StoreSimply<GlobalConfig>(null, {
  theme: 'auto',
  lang: 'zh-CN'
});

// 用户信息及相关设置
export const useUserStore = defineStore('user', {
  state: () => ({
    UserData: Setting.data // 持久化存储
  }),
  actions: {
    // 更改用户设置
    changeSetting<T extends keyof GlobalConfig>(key: T, val: GlobalConfig[T]) {
      this.UserData[key] = val;
      Setting.setVal(key, val);
    }
  }
});

// 语言切换
export const useLangStore = defineStore('locale', {
  getters: {
    locale() {
      return useUserStore().UserData.lang;
    }
  },
  actions: {
    changeLocale(lang: availLangs, quasarMsg: QuasarLanguage) {
      const User = useUserStore();
      // Quasar因为默认显示en-US，故不重复引入其en-US语言，当参数为 undefined 时，Quasar.Lang 会设置成 en-US
      Lang.set(lang !== 'en-US' ? quasarMsg : (undefined as unknown as QuasarLanguage));
      User.changeSetting('lang', lang);
      i18n.global.locale.value = lang;
      document.documentElement.lang = lang;
    },
    // 获取语言
    async loadLocale(lang: availLangs) {
      const res = await import(`./assets/locale/${lang}/index.ts`).catch(err => {
        Notify.create({
          type: 'warning',
          caption: 'failed to fetch the locale: ' + lang,
          message: err,
          actions: [
            {
              icon: 'close'
            }
          ]
        });
        return false;
      });
      console.log(res);
      return res.default as {
        quasar: QuasarLanguage;
        app: Obj;
      } | void;
    },
    // 设置有效语言
    async setLocale(lang: availLangs) {
      // 若传入语言就是当前在使用的语言，则直接跳过切换步骤
      if (i18n.global.locale.value === lang) return;
      if (!lang || !availableLocales.includes(lang)) {
        this.changeLocale('zh-CN', i18n.global.messages.value['zh-CN'].quasar);
        return;
      }
      if (i18n.global.messages.value[lang].app) {
        this.changeLocale(lang, i18n.global.messages.value[lang].quasar);
        return;
      }
      LoadingBar.start();
      const msgs = await this.loadLocale(lang);
      if (msgs) {
        i18n.global.setLocaleMessage(lang, msgs);
        this.changeLocale(lang, msgs.quasar);
      }
      LoadingBar.stop();
    }
  }
});

export const globalEmitter = Emitter<{
  changeLang: [(item: GlobalConfig['lang']) => void];
}>();
