<template>
  <div class="">
    <h1>Demo列表</h1>
    <div v-if="loading">加载中</div>
    <div v-else-if="error">错误:{{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="item in data" :key="item.id">
          <span
            class="text-xl font-bold text-primary cursor-pointer"
            @click="onTitleClick(item.id)"
          >
            {{ item.title }}
          </span>
          <button class="ml-2 text-danger cursor-pointer" @click="deleteItem(item.id)">删除</button>
        </li>
      </ul>
      <div>
        <button @click="fetchData({ pageNum: currentPage - 1 })" :disabled="currentPage === 1">
          上一页
        </button>
        <span>{{ currentPage }}/{{ totalPages }}</span>
        <button
          @click="fetchData({ pageNum: currentPage + 1 })"
          :disabled="currentPage === totalPages"
        >
          下一页
        </button>
      </div>
    </div>
    <!-- 测试按钮 -->
    <div class="mt-4">
      <button @click="onTestCancelAllRequests" class="ml-2">测试取消全部请求</button>
      <button ref="refreshBtnRef" @click="onRefreshBtnClick">刷新数据</button>
      <button @click="onTestDeduplication" class="ml-2">测试请求防重</button>
      <button @click="onTestRetry" class="ml-2">测试请求重试</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { api } from '@/http'
import { type Demo, type DemoListReq, demoService } from '@/services/demo-service.ts'
const loading = ref(false)
const error = ref<Error | null>(null)
const data = ref<Demo[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const refreshBtnRef = useTemplateRef('refreshBtnRef') //新写法
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
// 获取数据
const fetchData = async (params?: Partial<DemoListReq>) => {
  loading.value = true
  error.value = null
  try {
    const response = await demoService.getList({
      pageNum: params?.pageNum || currentPage.value,
      pageSize: pageSize.value,
    })

    data.value = response.list
    total.value = response.total
    currentPage.value = params?.pageNum || currentPage.value
  } catch (err) {
    error.value = err as Error
  } finally {
    loading.value = false
  }
}
const onTitleClick = async (id: number) => {
  const resp = await demoService.getDetail(id)
  console.log(resp)
}
// 删除项目
const deleteItem = async (id: number) => {
  await demoService.delete(id) // 重新获取数据
  await fetchData()
}
const onTestCancelAllRequests = async () => {
  console.log('开始测试取消全部请求')
  // 发送多个请求
  for (let i = 0; i < 3; i++) {
    fetchData({ pageNum: i + 1 })
  }
  // 1秒后取消所有请求
  setTimeout(() => {
    console.log('所有请求已取消', api)
    api.cancelAll()
  }, 1000)
}
const onRefreshBtnClick = async () => {
  console.log('点击刷新按钮')
  fetchData({ pageNum: 1 })
}
const onTestDeduplication = async () => {
  console.log('开始测试请求防重')
  for (let i = 0; i < 10; i++) {
    refreshBtnRef.value?.click()
  }
}
const onTestRetry = async () => {
  console.log('开始测试请求重试')
  try {
    const response = await demoService.getList({ pageNum: 1, pageSize: 10 })
    console.log('请求成功，返回数据:', response)
  } catch (error) {
    console.error('请求失败:', error)
  }
}
// 组件挂载时获取数据
onMounted(() => {
  fetchData()
})
</script>
