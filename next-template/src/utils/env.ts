//导出 Env 类,让其他文件可以引入使用

export class Env {
  /**
   * 获取环境变量
   * @param key 环境变量名
   * @param defaultValue 默认值
   */
  static get<T>(key: keyof ImportMetaEnv, defaultValue?: T): T | string {
    const value = import.meta.env[key]
    return value ?? (defaultValue as T)
  }
  /**
   * 获取数字类型的环境变量
   */
  static getNumber(key: keyof ImportMetaEnv, defaultValue?: number): number {
    const value = Number(import.meta.env[key])
    return Number.isNaN(value) ? (defaultValue ?? 0) : value
  }
  /**
   * 获取布尔类型的环境变量
   */
  static getBoolean(key: keyof ImportMetaEnv, defaultValue?: boolean): boolean {
    const value = import.meta.env[key]
    if (value === undefined) {
      return defaultValue as boolean
    }
    return value === 'true' || value === '1'
  }
  /** 获取当前环境
   * : 'dev' | 'uat' | 'prod' ts类型限定
   *  静态方法    static getEnv（）{}   Env.getEnv() 需要传参、执行复杂逻辑时用
   *  静态访问器  static get env() {}   Env.env      无需传参、像 “读属性” 一样简洁
   *
   */
  static get env(): 'dev' | 'uat' | 'test' {
    return this.get('VITE_ENV', 'dev') as 'dev' | 'uat' | 'test'
  }
  /** 是否为开发环境 */
  static get isDev(): boolean {
    return this.env === 'dev'
  }
  /** 是否为测试环境 */
  static get isTest(): boolean {
    return this.env === 'test'
  } /** 是否为UAT环境 */
  static get isUat(): boolean {
    return this.env === 'uat'
  }
}
