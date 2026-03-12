<template>
  <div class="">
    <div>---------基础模式---------</div>
    <div v-if="loading">加载中....</div>
    <div v-else-if="error">错误: {{ error.message }}</div>
    <div v-else>
      <ul>
        <li v-for="item in data?.list" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>
    <button class="p-2 bg-blue-500 text-white mt-1" @click="run">刷新</button>
    <div>---------使用 computed 做视图层转换--------</div>
    <div>
      <ul>
        <li v-for="item in tabData" :key="item.id">{{ item.title }}</li>
      </ul>
    </div>

    <div>---------带依赖追踪---------</div>
    <h1>Demo 详情</h1>
    <select v-model="demoId">
      <option value="1">Demo 1</option>
      <option value="2">Demo 2</option>
      <option value="3">Demo 3</option>
    </select>
    <div v-if="detailLoading">加载中...</div>
    <div v-else-if="detailError">错误: {{ detailError.message }}</div>
    <div v-else>
      <h2>{{ detailData?.title }}</h2>
      <p>{{ detailData?.content }}</p>
    </div>
    <div>---------手动触发---------</div>
    <div>
      <h1>创建 Demo</h1>
      <input v-model="title" placeholder="标题" />
      <input v-model="content" placeholder="内容" />
      <button class="p-2 bg-blue-500 text-white mt-1" @click="handleCreate" :disabled="loadingManual">
        {{ loadingManual ? '创建中...' : '创建' }}
      </button>
      <div v-if="errorManual">错误: {{ errorManual.message }}</div>
      <div v-if="dataManual">创建成功: {{ dataManual.title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from '@/hooks/useRequest'
import { type Demo, demoService } from '@/services/demo-service.ts'
import type { PageData } from '@/http/core/type.ts'
const demoId = ref(1)
const demoIdRef = computed(() => demoId.value)
const title = ref('')
const content = ref('')
const { loading, error, data, run } = useRequest<PageData<Demo>>(() =>
  demoService.getList({
    pageNum: 1,
    pageSize: 2,
  }),
)
const {
  data: detailData,
  loading: detailLoading,
  error: detailError,
} = useRequest<Demo>(() => demoService.getDetail(Number(demoId.value)), {
  deps: [demoIdRef],
  auto: true,
})
const tabData = computed(() => {
  return (
    data.value?.list.map((item) => ({
      id: item.id,
      title: '视图变更---' + item.title,
    })) || []
  )
})
const {
  data: dataManual,
  loading: loadingManual,
  error: errorManual,
  run: runManual,
} = useRequest<Demo>(
  () =>
    demoService.create({
      title: title.value,
      content: content.value,
      author: 'User',
      status: true,
      id: 0,
      createdAt: '',
      updatedAt: '',
    }),
  {
    auto: false, // 禁用自动请求
    onSuccess: (res) => {
      console.log(res, '创建成功')
      // 成功后刷新列表（调用第一个 useRequest 的 run 方法）
      run()
    },
  },
)

const handleCreate = () => {
  runManual()
}
</script>
