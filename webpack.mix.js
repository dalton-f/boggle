/* eslint-disable no-undef */
import mix from "laravel-mix";
import tailwindcss from "@tailwindcss/postcss";

mix.webpackConfig({
  watchOptions: {
    ignored: /node_modules|static|mix-manifest.json/,
  },
});

mix
  .js("src/js/app.js", "static/js")
  .postCss("src/css/app.pcss", "static/css", [tailwindcss]);

mix.copyDirectory("src/data", "static/data");

mix.disableNotifications();
