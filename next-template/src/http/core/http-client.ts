/**
 *类的封装模式：
 * 1.多实例支持
 * 2. 依赖倒置
 */
import { Env } from '@/utils/env.ts'
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { Interceptors } from './interceptors'
import type { HttpClientConfig, InterceptorConfig } from './type'
// HTTP请求客户端的默认配置
const defaultConfig: HttpClientConfig = {
  baseURL: Env.get('VITE_API_BASE_URL', '/api'),
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}

/**
 * HttpClient 基础 HTTP 客户端类
 * 负责创建 Axios 实例和封装基础请求方法
 * @constructor   （受保护） 对外封装细节，对内开发扩展
 */
export class HttpClient {
  protected instance: AxiosInstance
  protected config: HttpClientConfig
  private readonly interceptors: Interceptors
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
    // 设置拦截器
    this.setInterceptors()
  }
  private setInterceptors() {
    this.interceptors.applyInterceptors(this.instance)
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
