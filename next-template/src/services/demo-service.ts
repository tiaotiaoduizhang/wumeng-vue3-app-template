/**
 * 如果有其他特殊请求，如启用、停用、下单等定制化的请求，那在 DemoService 类中定义即可。
 * @extends BaseService 让BaseService继承了 BaseService 的所有能力
 * @template Demo 告诉父类，我管理的数据是 Demo 类型的
 * @template DemoListReq 告诉父类，我查询列表时，支持的参数类型是 DemoListReq(包含keyword)
 * getPrefix 实现:
 * 必须实现这个抽象方法（还记得父类的“契约”吗？）。
 * 返回 'demo' ，意味着所有请求都会自动发往 /demo 、 /demo/123 等地址。
 */



import { BaseService } from './base-services.ts'
import type { PageReq } from '@/http/core/type.ts'
export interface Demo {
  id: number
  title: string
  content: string
  author: string
  status: boolean
  createdAt: string
  updatedAt: string
}
// Demo 列表请求参数
export interface DemoListReq extends PageReq {
  keyword?: string
}
export class DemoService extends BaseService<Demo, DemoListReq> {
  protected getPrefix(): string {
    return 'demo'
  }
}

export const demoService = new DemoService()
