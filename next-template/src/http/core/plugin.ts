import type { AxiosInstance } from 'axios'
/**
 * 定义HTTP 插件接口
 * HttpPlugin 插件化的设计模式，用于扩展HttpClient 的功能
 * 核心思想：将所有的扩展功能（取消请求，日志记录，错误重试等）都视为插件，通过统一的接口挂载到Http客户端
 * vue中的app.use（）就是这样设计
 */
export interface HttpPlugin {
  /**
   * 应用插件到 Axios 实例
   * @param instance Axios 实例（插件拿到它，就可以为所欲为（比如添加拦截器、监听事件、修改配置等）
   * @void 返回值：插件只需执行操作（副作用），不需要返回任何值。
   */
  apply(instance: AxiosInstance): void
}
