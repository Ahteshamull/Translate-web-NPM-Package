(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TranslateWeb = factory());
})(this, (function () { 'use strict';

  async function detectCountry() {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_code;
    } catch {
      return null;
    }
  }

  const countryLangMap = {
    BD: "bn",
    FR: "fr",
    US: "en",
    UK: "en",
    IN: "en",
  };

  const CACHE_KEY = "__translate_web_cache__";

  function getCache() {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  }

  function setCache(key, value) {
    const cache = getCache();
    cache[key] = value;
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  }

  async function googleTranslate(text, targetLang, apiKey) {
    const cacheKey = `${text}_${targetLang}`;
    const cache = getCache();

    if (cache[cacheKey]) return cache[cacheKey];

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          target: targetLang,
          format: "text",
        }),
      },
    );

    const data = await res.json();
    const translated = data.data.translations[0].translatedText;

    setCache(cacheKey, translated);
    return translated;
  }

  async function translateDOM(lang, config) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          if (node.parentElement?.closest("." + config.ignoreClass))
            return NodeFilter.FILTER_REJECT;
          if (
            ["SCRIPT", "STYLE", "INPUT", "TEXTAREA"].includes(
              node.parentElement?.tagName,
            )
          )
            return NodeFilter.FILTER_REJECT;

          return NodeFilter.FILTER_ACCEPT;
        },
      },
    );

    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    for (const node of nodes) {
      const original = node.nodeValue;
      try {
        const translated = await googleTranslate(original, lang, config.apiKey);
        node.nodeValue = translated;
      } catch {}
    }
  }

  async function initTranslator(options) {
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

  const TranslateWeb = {
    init: initTranslator,
    switch(lang) {
      window.__TRANSLATE_WEB__.switchLanguage(lang);
    },
  };

  return TranslateWeb;

}));
