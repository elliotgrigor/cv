import lume from "https://deno.land/x/lume@v2.2.1/mod.ts";
import inline from "https://deno.land/x/lume@v2.2.1/plugins/inline.ts";

import { minify } from "npm:html-minifier-terser@7.2.0";

const site = lume({
  src: "./src",
});

site.use(inline());

site.copy("robots.txt");
site.copy("static/favicon.ico", "favicon.ico");

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
