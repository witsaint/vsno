type TUrl = URL | string | {
  protocol: string
  host: string
  port: number
  path: string
}
/**
 *
 * @param url - The URL to fetch the HTML from.
 * @param opts - The options to pass to the fetch request.
 * @returns The HTML as a string.
 */
export function getHtmlByServer(url: TUrl, opts: RequestInit = {}): Promise<string> {
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

export function getHtmlByLocal(path: string): Promise<string> {
  return fetch(path).then(result => result.text())
}
