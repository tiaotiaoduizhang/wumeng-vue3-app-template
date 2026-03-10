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
  enableCancel?: boolean // 是否开启请求取消
}
