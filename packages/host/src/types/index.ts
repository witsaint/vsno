import type { Webview, WebviewPanel } from 'vscode'

export interface WebviewContext {
  panel: WebviewPanel
  webview: Webview
  disposables: Disposable[]
  postMessage: (msg: any) => Thenable<boolean>
  getLanguage: () => string
  getTheme: () => number
  // 你可以继续挂更多"hook"能力
}

export interface WebviewOptions {
  moduleName: string
  onMount?: (ctx: WebviewContext) => void | Promise<void>
  onDispose?: (ctx: WebviewContext) => void | Promise<void>
  onShow?: (ctx: WebviewContext) => void | Promise<void>
  onHide?: (ctx: WebviewContext) => void | Promise<void>
  methods?: Record<string, (ctx: WebviewContext, args: any) => any>
}

/**
 * Webview 消息类型标识
 */
export type WebviewMessageType = 'request' | 'response'

/**
 * Webview 发送给 Host 的请求消息
 * @template T - 请求数据的类型
 */
export interface WebviewMessageRequest<T = any> {
  /** 消息类型标识 */
  type: 'request'
  /** 唯一标识符，用于关联请求和响应 */
  hash: string
  /** 要调用的函数名 */
  method: string
  /** 传递给函数的数据 */
  data: T
}

/**
 * Host 返回给 Webview 的响应消息（成功）
 * @template T - 响应数据的类型
 */
export interface WebviewMessageResponseSuccess<T = any> {
  /** 消息类型标识 */
  type: 'response'
  /** 请求时的 hash，用于关联请求和响应 */
  hash: string
  /** 是否成功 */
  success: true
  /** 返回的数据 */
  data: T
}

/**
 * Host 返回给 Webview 的响应消息（失败）
 */
export interface WebviewMessageResponseError {
  /** 消息类型标识 */
  type: 'response'
  /** 请求时的 hash，用于关联请求和响应 */
  hash: string
  /** 是否成功 */
  success: false
  /** 错误信息 */
  error: {
    /** 错误代码 */
    code?: string
    /** 错误消息 */
    message: string
    /** 错误堆栈（可选） */
    stack?: string
  }
}

/**
 * Host 返回给 Webview 的响应消息（成功或失败）
 * @template T - 响应数据的类型
 */
export type WebviewMessageResponse<T = any>
  = | WebviewMessageResponseSuccess<T>
    | WebviewMessageResponseError

/**
 * Webview 和 Host 之间的消息类型
 * @template TRequest - 请求数据的类型
 * @template TResponse - 响应数据的类型
 */
export type WebviewMessage<TRequest = any, TResponse = any>
  = | WebviewMessageRequest<TRequest>
    | WebviewMessageResponse<TResponse>

/**
 * 类型守卫：判断是否为请求消息
 */
export function isWebviewMessageRequest(
  msg: any,
): msg is WebviewMessageRequest {
  return msg && msg.type === 'request' && typeof msg.hash === 'string' && typeof msg.method === 'string'
}

/**
 * 类型守卫：判断是否为响应消息
 */
export function isWebviewMessageResponse(
  msg: any,
): msg is WebviewMessageResponse {
  return msg && msg.type === 'response' && typeof msg.hash === 'string' && typeof msg.success === 'boolean'
}

/**
 * 类型守卫：判断是否为成功响应
 */
export function isWebviewMessageResponseSuccess<T = any>(
  msg: any,
): msg is WebviewMessageResponseSuccess<T> {
  return isWebviewMessageResponse(msg) && msg.success === true
}

/**
 * 类型守卫：判断是否为错误响应
 */
export function isWebviewMessageResponseError(
  msg: any,
): msg is WebviewMessageResponseError {
  return isWebviewMessageResponse(msg) && msg.success === false
}
