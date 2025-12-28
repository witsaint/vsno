import type { Disposable, WebviewPanel } from 'vscode'
import type { WebviewContext, WebviewOptions } from '../types'
import process from 'node:process'
import { env, EventEmitter, ViewColumn, window } from 'vscode'

export interface VSNoWebviewDeps {
  createPanel: () => WebviewPanel
}

export interface VSNoWebviewInstance {
  /** 渲染 webview 面板 */
  render: () => void
  /** 刷新 webview 内容 */
  refresh: () => void
  /** 销毁 webview 面板 */
  dispose: () => void
  /** 设置生产环境 html */
  setHtml: (html: string) => void
  /** 设置开发环境 html */
  setDevHtml: (html: string) => void
  /** 发送消息到 webview */
  postMessage: (msg: any) => Thenable<boolean>
  /** 监听 webview 消息 */
  onMessage: (listener: (msg: any) => void) => Disposable
  /** LLM 事件总线 */
  llmEventEmit: EventEmitter<any>
  /** webview 上下文 */
  ctx: WebviewContext
  /** 是否为开发环境 */
  isDev: boolean
}

export function createVSNoWebview(deps: VSNoWebviewDeps, opts: WebviewOptions): VSNoWebviewInstance {
  const disposables: Disposable[] = []
  let panel: WebviewPanel | undefined
  const llmEventEmit = new EventEmitter<any>()
  let devHtml: string | undefined
  let prodHtml: string | undefined
  // 判断是否为开发环境，可根据 opts 或 NODE_ENV
  const isDev = Boolean((opts as any).isDev ?? process.env.NODE_ENV === 'development')

  // 生命周期事件
  const lifecycle = {
    onMount: opts.onMount,
    onShow: opts.onShow,
    onHide: opts.onHide,
    onDispose: opts.onDispose,
  }

  const ctx: WebviewContext = {
    get panel() {
      return panel!
    },
    get webview() {
      return panel!.webview
    },
    disposables,
    postMessage: (msg: any) => {
      if (panel)
        return panel.webview.postMessage(msg)
      return Promise.resolve(false)
    },
    getLanguage: () => env.language,
    getTheme: () => window.activeColorTheme.kind,
  } as any

  function setHtml(html: string): void {
    prodHtml = html
    if (panel)
      panel.webview.html = html
  }

  function setDevHtml(html: string): void {
    devHtml = html
    if (panel)
      panel.webview.html = html
  }

  function postMessage(msg: any): Thenable<boolean> {
    if (panel)
      return panel.webview.postMessage(msg)
    return Promise.resolve(false)
  }

  function onMessage(listener: (msg: any) => void): Disposable {
    // 只注册一次
    if (!panel)
      return { dispose() {} }
    return panel.webview.onDidReceiveMessage(listener, null, disposables)
  }

  function render(): void {
    if (panel) {
      panel.reveal(ViewColumn.One)
      return
    }
    panel = deps.createPanel()
    // 注入 html
    if (devHtml)
      panel.webview.html = devHtml
    else if (prodHtml)
      panel.webview.html = prodHtml
    // 消息监听
    // TODO: 消息监听
    // 生命周期
    lifecycle.onMount?.(ctx)
    panel.onDidChangeViewState((e) => {
      if (e.webviewPanel.visible)
        lifecycle.onShow?.(ctx)
      else lifecycle.onHide?.(ctx)
    }, null, disposables)
    panel.onDidDispose(() => {
      lifecycle.onDispose?.(ctx)
      llmEventEmit.dispose()
      while (disposables.length) disposables.pop()?.dispose()
      panel = undefined
    }, null, disposables)
  }

  function refresh(): void {
    if (panel) {
      // 重新注入 html
      if (devHtml)
        panel.webview.html = devHtml
      else if (prodHtml)
        panel.webview.html = prodHtml
    }
  }

  function dispose(): void {
    panel?.dispose()
  }

  return {
    render,
    refresh,
    dispose,
    setHtml,
    setDevHtml,
    postMessage,
    onMessage,
    llmEventEmit,
    ctx,
    isDev,
  }
}
