import type { Options, DeclarationReflection, SignatureReflection, ProjectReflection } from "typedoc";
import { MarkdownThemeRenderContext } from "typedoc-plugin-markdown";
import { unEscapeChars } from "typedoc-plugin-markdown/dist/support/utils";
import { WikiJSTheme } from "./theme";

export class WikiJSThemeRenderContext extends MarkdownThemeRenderContext {
  constructor(theme: WikiJSTheme, options: Options) {
    super(theme, options);

    // HACK to fix visible &gt; in table of contents
    const oldToc = this.partials["toc"];
    this.partials["toc"] = (reflection: DeclarationReflection | ProjectReflection): string => {
        const rendered = oldToc(reflection);
        return unEscapeChars(rendered);
    }

    // HACK to prevent excessive file edits in wiki.js
    const oldSources = this.partials["sources"];
    this.partials["sources"] = (reflection: DeclarationReflection | SignatureReflection): string => {
        if (reflection.sources) {
            for (let source of reflection.sources) {
                if (source.url) source.url = source.url?.replace(/\/blob\/[^\/]*\//, "/blob/-/")
            }
        }
        return oldSources(reflection);
    }
  }

  relativeURL = (url: string | undefined): string | null => {
    const ret = super.getRelativeUrl(url)?.replace(".md", "")?.replaceAll("_internal_", "INTERNAL")?.replaceAll("_", "/")?.replaceAll("_internal_", "INTERNAL") || null;
    return ret;
  }
}
