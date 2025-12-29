import type { Webview } from 'vscode'
import * as fs from 'node:fs'
import { Uri } from 'vscode'
import { type IInjectResource, injectResource } from '../utils/inject-resource'

type ServerUrl = URL | string | {
  protocol: string
  host: string
  port: number
  path: string
}

interface BundleHtmlOptions {
  extensionUri: Uri
  webview: Webview
  htmlPath: string
  resources: IInjectResource[]
}
/**
 *
 * @param url - The URL to fetch the HTML from.
 * @param opts - The options to pass to the fetch request.
 * @returns The HTML as a string.
 */
export function getHtmlByServer(url: ServerUrl, opts: RequestInit = {}): Promise<string> {
  let _url: string
  if (url instanceof URL) {
    _url = url.toString()
  }
  else if (typeof url === 'object') {
    _url = `${url.protocol}://${url.host}:${url.port}${url.path}`
  }
  else {
    _url = url
  }
  return fetch(_url, opts).then(result => result.text())
}

/**
 *
 * @param opts - The options to pass to the get HTML by bundle request.
 * @returns The HTML as a string.
 */
export function getHtmlByBundle(opts: BundleHtmlOptions): Promise<string> | string {
  const { extensionUri, webview, htmlPath, resources } = opts
  try {
    const htmlStr = fs.readFileSync(
      Uri.joinPath(extensionUri, htmlPath).fsPath,
      'utf-8',
    )
    if (resources.length > 0) {
      return injectResource(htmlStr, resources, webview, extensionUri)
    }
    return Promise.resolve(htmlStr)
  }
  catch (error) {
    return Promise.reject(error)
  }
}
