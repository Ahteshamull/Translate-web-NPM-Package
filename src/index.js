import { initTranslator } from "./init";

const TranslateWeb = {
  init: initTranslator,
  switch(lang) {
    window.__TRANSLATE_WEB__.switchLanguage(lang);
  },
};

export default TranslateWeb;
