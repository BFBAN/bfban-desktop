import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { storage } from "./assets/js/index"
import lang from "../../resources/conf/languages.json"
import store from './store'

import zh_bfban from './lang/zh.json' // 中文

Vue.use(VueI18n)
Vue.locale = () => {};

const i18n = new VueI18n({
  locale: store.state.$lang || navigator.language,
  fallbackLocale: lang.default,
  messages:{
    'zh-CN': Object.assign(zh_bfban), // 中文
  },
  silentTranslationWarn: true,
});

// 我们已經加載的语言
const loadedLanguages = []
function setI18nLanguage (lang) {
  i18n.locale = lang
  store.commit('res_lang',lang);
  return lang
}

/**
 * 延迟加载
 * @param lang
 * @returns {Promise<*>|Promise<unknown>}
 */
let loadLanguageAsync = (lang) => {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(`@/lang/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs)
        loadedLanguages.push(lang)

        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

i18n.loadLanguageAsync = loadLanguageAsync;
i18n.setI18nLanguage = setI18nLanguage;
export default i18n;
