/* eslint-disable no-undef */
const mix = require("laravel-mix");

mix.webpackConfig({
  watchOptions: {
    ignored: /node_modules|static|mix-manifest.json/,
  },
});

mix
  .js("src/js/app.js", "static/js")
  .postCss("src/css/app.pcss", "static/css", [require("@tailwindcss/postcss")]);

mix.copyDirectory("src/data", "static/data");

mix.disableNotifications();
