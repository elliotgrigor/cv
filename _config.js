import lume from "https://deno.land/x/lume@v3.0.4/mod.ts";
import inline from "https://deno.land/x/lume@v3.0.4/plugins/inline.ts";

import { minify } from "npm:html-minifier-terser@7.2.0";

const site = lume({
  src: "./src",
});

site.use(inline());

site.add("robots.txt");
site.add("static/favicon.svg", "favicon.svg");

const minifyHTML = async function(pages) {
  for (const page of pages) {
    page.content = await minify(page.content, {
      html5: true,
      quoteCharacter: '"',
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeComments: true,
    });
  }
}

site.process([".html"], minifyHTML);

export default site;
