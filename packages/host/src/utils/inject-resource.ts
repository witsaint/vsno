import type { Uri, Webview } from 'vscode'
import { getNonce } from './get-nonce'
import { getUri } from './get-uri'

export interface IInjectResource {
  src: string
  sourcePath: string
}
/**
 *
 * @param htmlStr - The HTML string to inject resources into.
 * @param paths - The paths to inject resources from.
 * @param webview - The webview to inject resources into.
 * @param extensionUri - The extension URI to inject resources from.
 * @returns The HTML string with resources injected.
 */
export function injectResource(htmlStr: string, paths: IInjectResource[], webview: Webview, extensionUri: Uri): string {
  const nonce = getNonce()
  let templateStr: string = htmlStr
    .replace(/\{\{nonce\}\}/g, nonce)
    .replace(/<script /g, `<script nonce="${nonce}" `)

  for (const path of paths) {
    const uri = getUri(webview, extensionUri, [path.sourcePath])
    templateStr = templateStr.replace(
      new RegExp(`${path.src}(\\?\\d+)?`),
      uri.toString(),
    )
  }
  return templateStr
}
