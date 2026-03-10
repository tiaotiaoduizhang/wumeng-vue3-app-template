import type { HttpPlugin } from './plugin'
import type { AxiosInstance } from 'axios'
/**
 * 插件管理器
 * 负责管理和应用 HTTP 插件
 */
export class PluginManager {
  //1.私有的插件仓库（数组）
  private plugins: HttpPlugin[] = []
  /**
   * 2.注册插件（入库）就像往书本里放一本书
   * @param plugin HTTP 插件
   */
  public register(plugin: HttpPlugin): void {
    this.plugins.push(plugin)
  } /**
   * 应用所有插件到 Axios 实例（批量激活）
   * @param instance Axios 实例
   * 3.就像遍历书包里的每本书，把它们拿出来，一个一个放到 Axios 实例里
   */
  public applyAll(instance: AxiosInstance): void {
    this.plugins.forEach((plugin) => plugin.apply(instance))
  } /**
   * 清除所有插件（清空仓库）
   */
  public clear(): void {
    this.plugins = []
  }
}
