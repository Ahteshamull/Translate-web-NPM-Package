export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/translate-web.umd.js",
      format: "umd",
      name: "TranslateWeb",
    },
    {
      file: "dist/translate-web.esm.js",
      format: "esm",
    },
  ],
};
