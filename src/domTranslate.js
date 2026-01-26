import { googleTranslate } from "./googleTranslate";

export async function translateDOM(lang, config) {
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
