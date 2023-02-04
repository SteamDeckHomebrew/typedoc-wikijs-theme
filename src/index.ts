import type { Application } from "typedoc";
import { MarkdownPluginOptionsReader, load as loadMarkdownPlugin } from "typedoc-plugin-markdown";
import { WikiJSTheme } from "./theme";

export function load(app: Application) {
  loadMarkdownPlugin(app);
  app.renderer.defineTheme("wiki-js", WikiJSTheme);
  app.options.addReader(
    new MarkdownPluginOptionsReader({
      symbolsWithOwnFile: "none",
      githubPages: false,
      enableFrontmatter: true,
      frontmatterGlobals: {
        editor: "markdown",
        published: true
      },
      hideBreadcrumbs: true
    })
  );
}
