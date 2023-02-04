import type { Renderer, Reflection, UrlMapping, DeclarationReflection, PageEvent } from "typedoc";
import { MarkdownTheme } from "typedoc-plugin-markdown/dist/theme";
import { WikiJSThemeRenderContext } from "./theme-context";

export class WikiJSTheme extends MarkdownTheme {
  private _wikiJSRenderContext?: WikiJSThemeRenderContext;

  constructor(renderer: Renderer) {
    super(renderer);
  }

  render(page: PageEvent<Reflection>): string {
    page.filename = page.filename.replaceAll("_internal_", "INTERNAL").replaceAll("_", "/").replaceAll("INTERNAL", "_internal_").replaceAll("/md", ".md");
    return super.render(page);
  }

  getRenderContext() {
    if (!this._wikiJSRenderContext) {
      this._wikiJSRenderContext = new WikiJSThemeRenderContext(
        this,
        this.application.options,
      );
    }
    return this._wikiJSRenderContext;
  }

  getUrl(reflection: Reflection, relative?: Reflection, separator = "/"): string {
    const ret = super.getUrl(reflection, relative, separator);
    return ret;
  }
}
