import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * 通用响应结构（ code、data、message）
 * 1. 统一返回结构
 * 2. 混合返回结构（成功裸数据，失败错误结构）
 * 个人看法不推荐2
 * T 泛值参数T是ts中用于创建可复用组件的工具（占位）
 * T ：代表“某种类型”（单数）。
 * T[] ：代表“某种类型的数组”（复数）。
 */
export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}
/**
 * 分页请求结构
 */
export interface PageReq {
  pageNum: number
  pageSize: number
}
/**
 * 分页响应数据结构
 */
export interface PageData<T = any> {
  total: number
  list: T[]
}
/**
 * 拦截器配置  （InterceptorConfig）
 */
export interface InterceptorConfig {
  request?: {
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>
    onRejected?: (error: AxiosError) => any
  }
  response?: {
    onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>
    onRejected?: (error: AxiosError) => any
  }
}

/**
 * HTTP请求客户端配置
 * @baseURL 请求基础路径
 * @timeout 请求超时时间（毫秒）
 * @headers 请求头配置
 * @interceptor 拦截器配置
 * @enableCancel 是否开启请求取消
 * @enableDedup 是否开启请求防重
 * @enableRetry 是否开启请求重试
 * @retryConfig 重试配置
 *
 * 个人看法不推荐2
 * Record Record<K, V> 是 TS 内置类型，表示「键为 K 类型、值为 V 类型的对象」
 * { "Content-Type": "application/json", "Authorization": "Bearer token123" }
 */
export interface HttpClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  interceptor?: InterceptorConfig
  enableCancel?: boolean
  enableDedup?: boolean
  enableRetry?: boolean
  retryConfig?: RetryConfig
}
/**
 * HTTP错误类型常量（重试类型定义和常量）
 * as const 把属性值锁定为具体的字面量类型而不是字符串
 */
export const HttpErrorType = {
  // 网络错误（例如：DNS解析失败、TCP连接失败、无网络连接等）
  NETWORK_ERROR: 'ERR_NETWORK',
  // 请求中止（例如：请求超时、用户手动取消）
  CONNECTION_ABORTED: 'ECONNABORTED',
  // 请求无效（400 Bad Request，参数格式错误等）
  BAD_REQUEST: 'ERR_BAD_REQUEST',
  // 未授权（401 Unauthorized，未登录或Token过期）
  UNAUTHORIZED: 'ERR_UNAUTHORIZED',
  // 禁止访问（403 Forbidden，无权限访问该资源）
  FORBIDDEN: 'ERR_FORBIDDEN',
  // 资源未找到（404 Not Found）
  NOT_FOUND: 'ERR_NOT_FOUND',
  // 服务器错误（500 Internal Server Error，服务端代码异常）
  SERVER_ERROR: 'ERR_BAD_RESPONSE',
} as const
/**
 * 「索引访问类型」，作用是「通过键名的联合类型，获取对应值的联合类型」
 * typeof： TypeScript 中是类型操作符，作用是「获取变量的类型」（键值对：{key：value}）
 * keyof :索引类型操作符 (获取键：key)
 */
export type HttpErrorTypeValue = (typeof HttpErrorType)[keyof typeof HttpErrorType]
/**
 * 重试配置
 */
export interface RetryConfig {
  maxAttempts?: number // 最大重试次数
  delay?: number // 间隔多久重试
  exponentialBackoff?: boolean // 是否开启指数退避
  retryableStatusCodes?: number[] //允许重试的HTTP响应状态码数组
  retryableErrorTypes?: ((string & {}) | HttpErrorTypeValue)[] // 允许重试的错误类型数组
}
