const CACHE_KEY = "__translate_web_cache__";

export function getCache() {
  return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
}

export function setCache(key, value) {
  const cache = getCache();
  cache[key] = value;
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
}
