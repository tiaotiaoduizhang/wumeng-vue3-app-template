import { api } from '@/http'
import type { PageData, PageReq } from '@/http/core/type.ts'
/**
 * @abstract（抽象类） 不能直接new，只能被继承（动物是抽象类，你不能养一只动物，你只能养猫（子类））
 * @T （泛型 - 数据实体）（比如 User 、 Order ）
 * @Q （泛型 - 查询参数）（extends PageReq 约束了它必须包含 pageNum 和 pageSize 这两个基础分页参数 ）
 * @public 公共
 */
// 1. 父类（通用快递员）
export abstract class BaseService<T, Q extends PageReq> {
  /**
   * 获取资源名，由子类实现 （定义一个抽象方法）
   * 1.留白（父类知道怎么发请求，但不知道请求发给谁（定义getPrefix空壳方法）
   * 2.契约（强制子类必须填）
   * 3.受保护（protected）给 父类内部 调用的
   */
  // 留白：小区名字你们自己填
  protected abstract getPrefix(): string
  //   分页查询（  送货：我知道怎么送，只要你告诉我小区名）
  public getList(params: Q): Promise<PageData<T>> {
    // 自动拼装地址：/小区名/list
    // 禁用特定请求的防重
    return api.get(`/${this.getPrefix()}`, {
      params,
      // disableDedup: true,
    })
  }
  // 获取详情
  public getDetail(id: number): Promise<T> {
    return api.get(`/${this.getPrefix()}/${id}`)
  } // 创建
  public create(data: Partial<T>): Promise<T> {
    return api.post(`/${this.getPrefix()}`, data)
  }
  // 更新
  public update(id: number, data: Partial<T>): Promise<T> {
    return api.put(`/${this.getPrefix()}/${id}`, data)
  }
  //   删除
  public delete(id: number): any {
    return api.delete(`/${this.getPrefix()}/${id}`)
  }
}
