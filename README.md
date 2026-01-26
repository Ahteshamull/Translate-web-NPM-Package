# translate-web

Auto translate your entire website using Google Translate API.
Supports IP based language detection and manual language switching.

## Install

npm install translate-web

## Usage

```js
import TranslateWeb from "translate-web";

TranslateWeb.init({
  apiKey: "YOUR_GOOGLE_API_KEY",
  autoDetect: true,
  supportedLangs: ["en", "bn", "fr"],
});
```

## Features

- Auto IP-based language detection
- Manual language switching
- Local caching for performance
- Optimized DOM traversal
- Configurable ignore classes

## API Reference

### init(options)

Initialize the translator with configuration options.

**Options:**

- `apiKey` (required): Google Translate API key
- `defaultLang` (optional): Default language, defaults to "en"
- `supportedLangs` (optional): Array of supported languages, defaults to ["en"]
- `autoDetect` (optional): Enable IP-based detection, defaults to true
- `ignoreClass` (optional): CSS class to ignore elements, defaults to "no-translate"

### switch(lang)

Manually switch to a different language.

**Parameters:**

- `lang`: Language code to switch to

## License

MIT || @ 2026 Ahteshamul Hasan
