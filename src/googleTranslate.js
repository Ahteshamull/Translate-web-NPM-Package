import { getCache, setCache } from "./cache";

export async function googleTranslate(text, targetLang, apiKey) {
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
