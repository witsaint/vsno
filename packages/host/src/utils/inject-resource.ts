import type { Uri, Webview } from 'vscode'
import { getNonce } from './get-nonce'
import { getUri } from './get-uri'

interface IInjectLinkSrc {
  src: string
  integrity: string
  crossOrigin: string
}
export function injectResource(htmlStr: string, paths: IInjectLinkSrc[], webview: Webview, extensionUri: Uri): string {
  const nonce = getNonce()
  let templateStr: string = htmlStr
    .replace(/\{\{nonce\}\}/g, nonce)
    .replace(/<script /g, `<script nonce="${nonce}" `)

  for (const path of paths) {
    const uri = getUri(webview, extensionUri, [path.src])
    templateStr = templateStr.replace(
      new RegExp(`${path.src}(\\?\\d+)?`),
      uri.toString(),
    )
  }
  return templateStr
}
