import { detectCountry } from "./ipDetect";
import { countryLangMap } from "./langMap";
import { translateDOM } from "./domTranslate";

export async function initTranslator(options) {
  const config = {
    apiKey: options.apiKey,
    defaultLang: options.defaultLang || "en",
    supportedLangs: options.supportedLangs || ["en"],
    autoDetect: options.autoDetect ?? true,
    ignoreClass: options.ignoreClass || "no-translate",
  };

  let currentLang = config.defaultLang;

  if (config.autoDetect) {
    const country = await detectCountry();
    if (countryLangMap[country]) {
      currentLang = countryLangMap[country];
    }
  }

  window.__TRANSLATE_WEB__ = {
    async switchLanguage(lang) {
      if (!config.supportedLangs.includes(lang)) return;
      currentLang = lang;
      await translateDOM(lang, config);
    },
  };

  await translateDOM(currentLang, config);
}
