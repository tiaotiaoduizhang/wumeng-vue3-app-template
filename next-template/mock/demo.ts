import Mock from 'mockjs'
import { ApiResp } from '../src/http/core/type'
// 引入 Mock 方法类型
import { MockMethod } from 'vite-plugin-mock'
const demoList = Mock.mock({
  // 生成一个名为 list 的数组，数组长度固定为 100
  'list|100': [
    {
      'id|+1': 1, // id 从 1 开始，每条数据自增 1（1,2,3...100）
      title: '@ctitle(5, 10)', // 标题：生成 5-10 个中文字符的标题（@ctitle 是 Mock 内置的中文标题占位符）
      content: '@cparagraph(1, 3)', // 内容：生成 1-3 段中文段落（@cparagraph 是中文段落占位符）
      author: '@name', // 作者：生成随机的英文姓名（@name 是 Mock 内置的姓名占位符）
      status: '@boolean', // 状态：生成布尔值（true/false）
      createdAt: '@datetime', // 创建时间：生成随机的日期时间字符串（格式如 2026-03-05 12:30:45）
      updatedAt: '@datetime',
    },
  ],
}).list // 取生成对象中的 list 数组，赋值给 demoList

// 统一成功响应封装：保持 data 的类型信息（T），便于调用方获得类型提示
function success<T>(data: T): ApiResp<T> {
  return {
    code: 0,
    message: 'success',
    data,
  }
}

// 统一失败响应封装：失败时 data 固定为 null
// _code 预留用于自定义错误码（当前返回值里固定为 1）
export function error(message: string, _code: number = 500): ApiResp<null> {
  return {
    code: 1,
    message,
    data: null,
  }
}
// CRUD 操作：分页查询、根据 ID 查询、新增、更新、删除
/**
 * Mock 的 timeout
 * 作用 : 假装服务器很慢。比如设置 3000 ，Mock 就会故意卡 3 秒钟再给你数据。
 * Axios 的 timeout (请求限时) :
 * 目的 : 防止请求无限等待，超过 3 秒没结果就直接报错“不玩了”。
 * 两个都设置成了 3000ms
 * Mock 发货的那一瞬间，Axios 刚好判定超时，直接抛出 timeout of 3000ms exceeded 错误
 */
const demoMock: MockMethod[] = [
  {
    // 接口地址：分页查询数据
    url: '/api/demo',
    method: 'get',
    timeout: 2000,
    // 响应处理函数：接收请求参数，返回模拟数据
    response: ({ query }) => {
      // 解析分页参数：页码，默认值 1
      const pageNum = parseInt(query.pageNum) || 1
      // 解析分页参数：每页条数，默认值 10
      const pageSize = parseInt(query.pageSize) || 10
      // 解析搜索关键词，默认值为空字符串
      const keyword = query.keyword || ''
      let filteredList = demoList
      if (keyword) {
        filteredList = demoList.filter(
          (item: any) =>
            item.title.includes(keyword) ||
            item.content.includes(keyword) ||
            item.author.includes(keyword),
        )
      }
      const start = (pageNum - 1) * pageSize
      const end = start + pageSize
      const list = filteredList.slice(start, end)
      return success({ list, total: filteredList.length })
    },
  },
  {
    // 接口地址：根据 ID 查询单条数据（:id 是动态路由参数）
    url: '/api/demo/:id',
    method: 'get',
    // timeout: 1000,
    response: ({ query }) => {
      console.log('query:', query)
      const item = demoList.find((item) => item.id === parseInt(query.id))
      if (item) {
        return success(item)
      } else {
        return error('Item not found')
      }
    },
  },
  {
    // 接口地址：新增数据
    url: '/api/demo',
    method: 'post',
    response: ({ body }) => {
      // 构造新数据：ID 自增 + 请求体数据 + 创建/更新时间
      const newItem = {
        id: demoList.length + 1,
        ...body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      demoList.push(newItem)
      return success(newItem)
    },
  },
  {
    // 接口地址：根据 ID 更新数据
    url: '/api/demo/:id',
    method: 'put',
    response: ({ query, body }) => {
      // 根据 ID 查找数据在列表中的索引
      const index = demoList.findIndex((item) => item.id === parseInt(query.id))
      // 找到则更新数据，未找到则返回错误
      if (index !== -1) {
        demoList[index] = {
          ...demoList[index], // 保留原有未修改的字段
          ...body,// 合并前端传入的更新数据
          updatedAt: new Date().toISOString(),// 更新时间为当前时间
        }
        return success(demoList[index])
      } else {
        return error('Item not found')
      }
    },
  },
  {
     // 接口地址：根据 ID 删除数据
    url: '/api/demo/:id',
    method: 'delete',
    response: ({ query }) => {
      const index = demoList.findIndex((item) => item.id === parseInt(query.id))
       // 找到则删除数据，未找到则返回错误
      if (index !== -1) {
        demoList.splice(index, 1)
        return success(null)
      } else {
        return error('Item not found')
      }
    },
  },
]
export default demoMock
