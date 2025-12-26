import type { Webview, WebviewPanel } from 'vscode'

export interface WebviewContext {
  panel: WebviewPanel
  webview: Webview
  disposables: Disposable[]
  sendAsyncMessage: (msg: any) => Promise<any>
  getLanguage: () => string
  getTheme: () => number
  // 你可以继续挂更多“hook”能力
}

export interface FlatWebviewOptions {
  moduleName: string
  onMount?: (ctx: WebviewContext) => void | Promise<void>
  onDispose?: (ctx: WebviewContext) => void | Promise<void>
  onShow?: (ctx: WebviewContext) => void | Promise<void>
  onHide?: (ctx: WebviewContext) => void | Promise<void>
  methods?: Record<string, (ctx: WebviewContext, args: any) => any>
}
