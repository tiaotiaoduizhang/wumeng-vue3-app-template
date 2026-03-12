/**
 *类的封装模式：
 * 1.多实例支持
 * 2. 依赖倒置
 */
import { Env } from '@/utils/env.ts'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { Interceptors } from './interceptors'
import type { HttpClientConfig, InterceptorConfig } from './type'
import { PluginManager } from './plugin-manager'
import { RequestCanceler } from './request-canceler'
//导入防重插件
import { RequestDedup } from './request-dedup'
//导入重试插件
import { RequestRetry } from './request-retry'
// HTTP请求客户端的默认配置
const defaultConfig: HttpClientConfig = {
  baseURL: Env.get('VITE_API_BASE_URL', '/api'),
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  enableDedup: true, // 默认开启防重功能
  enableCancel: true, // 默认开启请求取消功能
  enableRetry: true, // 默认开启请求重试功能
}

/**
 * HttpClient 基础 HTTP 客户端类
 * 负责创建 Axios 实例和封装基础请求方法
 * @constructor   （受保护） 对外封装细节，对内开发扩展
 * @private 私有
 */
export class HttpClient {
  protected instance: AxiosInstance
  protected config: HttpClientConfig
  private readonly interceptors: Interceptors
  // 插件管理器
  private readonly pluginManager: PluginManager
  // 请求取消器
  private readonly requestCanceler: RequestCanceler
  // 请求防重器
  private readonly requestDedup: RequestDedup
  // 请求重试器
  private readonly requestRetry: RequestRetry
  /**
   * 构造函数
   * @param config 配置选项
   * @constructor 是类的构造函数，new HttpClient（）时会被自动调用
   */

  constructor(config: HttpClientConfig = {}, interceptorConfig: InterceptorConfig = {}) {
    // 1.合并配置
    this.config = { ...defaultConfig, ...config }
    // 实例化拦截器对象
    this.interceptors = new Interceptors(this.config.interceptor ?? {})
    // 请求取消器
    // this.requestCanceler = new RequestCanceler()
    // 2.创建 Axios 实例
    this.instance = this.createInstance()
    // 插件管理器
    this.pluginManager = new PluginManager()
    // 请求取消器
    this.requestCanceler = new RequestCanceler()
    // 请求防重器
    this.requestDedup = new RequestDedup()
    // 请求重试器
    this.requestRetry = new RequestRetry(this.config.retryConfig)
    this.registerPlugins()
    // 设置拦截器
    this.setInterceptors()
  }
  private registerPlugins() {
    // 根据配置注册插件enableCancel和enableDedup是互斥，防重优先
    // 1. 先注册 Cancel (它会后执行)
    if (this.config.enableCancel) {
      this.pluginManager.register(this.requestCanceler)
    }
    // 2. 后注册 Dedup (它会先执行)
    // 这样可以保证当 Dedup 拦截到重复请求时，直接取消新请求，
    // 从而阻止请求进入 Cancel 插件，避免 Cancel 误杀旧请求。
    if (this.config.enableDedup) {
      this.pluginManager.register(this.requestDedup)
    }
    // 3.重试配置
    if (this.config.enableRetry) {
      this.pluginManager.register(this.requestRetry)
    }
    // 应用所有插件
    this.pluginManager.applyAll(this.instance)
  }
  private setInterceptors() {
    this.interceptors.applyInterceptors(this.instance)
  }
  /**
   * 取消所有请求
   */
  public cancelAll(): void {
    console.log('取消所有请求9999')
    this.requestCanceler.clear()
  }
  /**
   * 获取插件管理器
   * 便于后续动态添加或移除插件
   */
  public getPluginManager(): PluginManager {
    return this.pluginManager
  }
  /**
   * 创建 Axios 实例
   * @AxiosInstance （） 充当axios实例的工厂
   * @private 私有
   */
  private createInstance(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: this.config.headers,
    })
  } /**
   * 封装 GET 请求
   * @param url 请求地址
   * @param config 请求配置
   * @public 公共方法，外部可以调用
   */

  public get(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.get(url, config)
  } /**
   * 封装 POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */

  public post(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.post(url, data, config)
  } /**
   * 封装 PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */

  public put(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.put(url, data, config)
  } /**
   * 封装 DELETE 请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns Promise<T>
   */

  public delete(url: string, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.delete(url, config)
  } /**
   * 封装 PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */

  public patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    return this.instance.patch(url, data, config)
  } /**
   * 获取 Axios 实例
   * @returns AxiosInstance
   */

  public getInstance(): AxiosInstance {
    return this.instance
  }
}
