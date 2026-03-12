# wumeng-vue3-app-template

参考链接：https://mp.weixin.qq.com/s/keRHIku4AJ7q57cjL_qB4g

- pinia 官方状态管理
- pinia-plugin-persistedstate 状态管理持久化插件
- vueuse 常用的 vue 组合式 api 工具库
- unocss 原子 css 框架

# 需要了解的插件如下

- unplugin-vue-router 基于文件系统的路由插件
  > 约定大于配置，自动根据 `src/pages` 目录结构生成路由。无需手动维护 `router/index.ts` 中的路由表。
- unplugin-auto-import 自动引入插件
  > 自动导入 Vue、Vue Router、Pinia 等常用 API（如 `ref`, `computed`, `useRouter`），解放双手，无需在每个文件中手动 import。
- unplugin-vue-components 组件自动注册插件
  > 自动扫描并按需加载组件。在模板中直接使用 `src/components` 下的组件或 UI 库组件，无需手动 import 和注册。
- vite-plugin-vue-layouts 基于文件系统的布局插件
  > 配合文件路由使用，支持多种布局模式（如默认布局、空白布局）。通过在页面组件中添加 `<route lang="yaml">` 块来指定布局。

# pinia 状态管理

- storeToRefs 是 Pinia 提供的一个辅助函数，用于 解构 Store 中的状态（State）和计算属性（Getters）时保持其响应性 。
  > 如果不使用，解构出的变量会丢失响应性
  > 只用于状态（state，getters）不用于方法（actions\_函数）可以直接解构，不需要用 storeToRefs ，因为函数本身不需要响应性。
  > 错误用法 const { counter } = demoStore

# CSS 预处理器 - SCSS

常见的css构架模式:

- BEM 最通用的命名规范，核心解决
- ACSS （如tailwind）是高效开发模式，最小粒度互用，适合快速迭代的项目
- ITCSS/SMACSS 侧重文件 / 样式分类，适合超大型项目的长期维护
  > 核心思想：按 “特异性（Specificity）” 从低到高、“作用域” 从全局到局部的顺序组织 CSS 文件，形成倒三角结构，避免样式覆盖和优先级问题。
- OOCSS

  > 核心思想：将 CSS 样式视为可复用的 “对象”，核心是分离结构（Structure）和皮肤（Skin）、分离容器（Container）和内容（Content）。

- settings （设计令牌）
  > 样式变量的定义，如颜色值，尺寸，字体大小等基础变量
- base （全局通用的定制化样式）
  > 覆盖 Element Plus、VXE Table 的默认样式
  > 设置 html、body 的样式
- components （自定义的组件的样式，每个组件自行维护，不需要抽取到公共目录中）

  > 采用ACSS模式，具体实现使用 UnoCSS

- src/plugins/assets.ts

  > 为了保持 main.ts的简洁，创建一个专门的资源管理模块，统一处理所有静态资源的导入：

- 高性能、可定制的原子化 CSS 框架
  > 采用 UnoCSS ，无需手动编写 CSS 类名，直接在模板中使用原子类即可。

# CSS 图标依赖（4种方案）

- iconify-icon 图标库

  > 链接： https://icon-sets.iconify.design/

- 本地SVG图标

  > 本地 SVG 图标存储在 `src/assets/icons` 目录下，文件名作为图标名称。
  > 例如：`src/assets/icons/demo.svg` 对应的图标名称为 `demo`。

- 封装强大图标组件，支持4种方式
  - Iconify Icon
  - UnoCSS Icon （本质上也是 Iconify Icon）
  - 本地 svg 图标
  - 本地或在线的 Iconfont

  # 路由配置 （ unplugin-vue-router ：基于文件系统的自动路由解决方案） 还需具体案例使用多布局情况
  - 官方钦定的 “路由增强套件”，覆盖路由全生命周期
  - 跨构建工具（Vite/Rollup/esbuild/webpack）
  - 支持 TypeScript 类型系统
  - 文档地址：https://uvr.esm.is/
  - 2026/3/2目前不支持vue-router@5版本需要进行降级 pnpm add vue-router@4.6.2
  - 好基友：vite-plugin-vue-layouts
  - vite-plugin-vue-layouts 存在兼容版本问题 且没有更新
    替代方案：vue-router-layouts，unplugin-vue-layouts

  # 自动导入插件（unplugin-auto-import）

  > 自动导入 Vue、Vue Router、Pinia 等常用 API（如 `ref`, `computed`, `useRouter`），解放双手，无需在每个文件中手动 import。

  # 集成 vueuse （常用的 vue 组合式 api 工具库）
  - 提供大量的hooks
  - git链接：https://v4-11-2.vueuse.org/

  # unplugin-vue-components 组件自动注册插件

  git链接：https://github.com/unplugin/unplugin-vue-components

  # 环境变量 （vite 环境变量和模式）
  - 安全性：一些敏感信息不适合硬编码到代码中
  - 灵活性：不同的环境（开发、测试、生产）常常要使用不同的配置
  - 可维护性：配置集中管理
  - 默认 vite 有两种模式
    - (dev 命令) 运行在 development (开发) 模式
    - (build 命令) 运行在 production (生产) 模式
      真实的企业项目中，环境不止一套
    - sit 测试环境 sit≈test，但流程更规范
    - uat 验收环境（用户测试版本） uat≈prod，但流程更规范
  - package.json 解释 "build:uat": "run-p type-check \"build-only {@} --mode uat\" --", - run-p 并行运行多个任务 - 复用逻辑：build-only 只负责调用 Vite 构建，不需要关心是哪个环境。- 统一检查：所有构建命令都强制带上 type-check ，防止“能运行但类型错误”的代码混入生产环境。- 灵活传参 : 通过 {@} 机制，你甚至可以在命令行临时覆盖参数，比如 npm run build -- --sourcemap ， 这个 --sourcemap` 会被透传给 Vite。
    - 优先级依次为：
      1）.env.[mode].local
      2）.env.[mode]
      3）.env.local
      4）.env
  - vite.config.ts 中获取环境变量
    - 根据不同环境加载不同插件
    - 该文件中不能使用 import.meta.env 获取环境变量
    - 1.vite.config.ts 是在 Node.js 环境中运行的，默认使用 CommonJS 模块规范
    - 2.import.meta.nev 是 ES 模块的内置变量，运行在浏览器环境。
    - 3.vite.config.ts 是在 Vite启动的早期阶段执行，此时 Vite 还没有完全加载和处理环境变量
    - 4.import.meta.env 是 Vite 在构建过程中注入到最终代码中的，只能在构建后的代码中可以使用

# 国际化（vue i18n）

- 地址：https://vue-i18n.intlify.dev
- src/i18n/
      |- index.ts        # 国际化配置文件
     |- locales/        # 语言包目录
        |- zh-CN.ts     # 通用中文语言包
        |- en-US.ts     # 通用英文语言包
        |- modules/      # 模块语言包
          |- en-US/     # 模块英文语言包
             |- demo.ts    # 测试模块
             |- ... 其他模块的英文
          |- zh-CN/     # 模块中文语言包
             |- demo.ts    # 测试模块
             |- ... 其他模块的中文
  在template中可以使用 $t 函数进行翻译

# 国际化 企业级开发 插件

@intlify/unplugin-vue-i18n

- 路由级别的懒加载：
  - 根据当前路由动态加载对应的语言模块。
- 实现语言的动态切换和持久化并实现语言包的动态懒加载和路由级别的按需加载

# 网络请求

- 封装架构设计
- 搭建mock服务
- axios和拦截器封装
- 实现取消请求和请求防重
- 实现请求重试
- useRequest封装
- Alova 和 Axios对比
  - Alova
  - 链接：https://alova.vscing.com/examples
  - 总结：前端专属库，聚焦前端业务场景，内置hooks，适配现在前端框架，主要适配浏览器端
  - Axios
    |- mock //1.Mock服务:模拟后端接口
    |-demo.ts
    |- src
    |-http //3.项目配置层 （导出具体axios实例对象和CRUD函数，service层通过它调用后端接口）
    |- core //2.请求核心封装 （拦截器、取消请求、请求去重、重试，每个功能都是一个独立类）
    |- http-clicent.ts
    |- http-interceptors.ts
    |- index.ts
    |- types.ts
    |- index.ts
    |-services //server层 （调用具体接口）
    |- base-service.ts
    +---------------------+
    | service层 (API 定义) |
    +---------------------+
              ↑
              | 调用
    +---------------------+
    | 项目配置层 (自定义)    |
    +---------------------+
              ↑
              | 实例化
    +---------------------+
    | 请求核心封装 (通用功能) |
    +---------------------+
              ↑
              | 依赖
    +---------------------+
    |  Axios 原生库        |
    +---------------------+

# 使用mockjs搭建mock服务

- 指令:pnpm add mockjs @types/mockjs vite-plugin-mock -D
- [核心模拟数据库](http://mockjs.com/)
- [MockJS 的 TypeScript 类型定义](https://github.com/nuysoft/Mock/wiki/Getting-Started)
- [Vite 适配的 Mock 插件](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)
- 验证：http://192.168.30.77:5174/api/demo
  看见分页数据，mock服务成功

#axios二次封装
[中文网链接](https://axios-http.com/zh/docs/req_config)

service层封装
很多开源项目里面的api，这个模块只负责封装接口调用，没有业务逻辑 和api调用一样
包含了响应解析的处理或其他逻辑，这一层为 service- 服务层，包含其他逻辑处理，不仅仅是调用接口

# 实现取消请求（兜底方案）（核心机制：后浪推前浪，喜新厌旧）

思考：

- 防抖 / 节流和取消请求有什么区别：
  - 防抖 / 节流（请求前） + 取消请求（请求后：兜底方案）
  - 防抖/节流 ：主要为了 减轻服务器压力 和 防止前端函数频繁执行 。它们是**“预防”**措施。
  - RequestCanceler ：主要为了 保证数据一致性 （解决竞态问题）。它是**“补救”**措施。
  - 大厂技术规范通用最佳实践

- 页面跳转时之前的请求还未完成，需要取消这些请求
  - 浏览器默认并不会在页面跳转时自动取消正在进行的 Ajax/Fetch 请求 （除非是页面刷新或跳转到全新的 URL，导致整个 JS 运行环境被销毁）。
  - vue是单页面应用，路由切换是假的，只是js改变了url，并卸载旧组件，挂载新组件
  - 网络请求是独立的，发出的请求是泼出去的水，组件卸载，请求依然在后台跑
- 搜索框输入时，需要取消之前的搜索请求，只保留最新的
- 用户操作取消时，需要终止正在进行的请求

# 核心层 -插件化构架

- 定义插件接口
  所有网络请求相关功能（取消，防重，重试等）都将作为插件，实现该接口
  - Axios 支持取消请求 （https://axios-http.com/zh/docs/cancellation）
    在 v0.22.0 之前，使用 CancelToken，但之后的版本已弃用该 API，而是使用 AbortController方式来实现取消：
  - AbortController 是浏览器原生 API，用于取消网络请求等异步操作，是处理请求取消的标准方案
    （https://developer.mozilla.org/en-US/docs/Web/API/AbortController）

# 请求防重（核心机制：先到先得拒绝插队 ）

- 疑问：请求防重和取消请求的区别：
  请求防重”就是“取消请求”机制的一个具体应用场景

1. 取消请求 (Manual Cancellation) 底层能力

- 场景 ：页面跳转时，取消所有正在进行中的请求 ( cancelAll )。
- 目的 ：避免“幽灵请求”在已经销毁的组件中回调，或者浪费资源。

2. 自动防重 (Automatic Deduplication) 利用底层能力的策略

- 场景 ：用户连续点击同一个按钮，或者快速输入搜索关键词。
- 机制 ： add() 方法里会自动检测重复 Key，如果发现重复，就自动执行一次“取消旧请求”的操作。
- 目的 ：确保只处理最后一次请求的结果。

- 请求防重适用环节：后端接口，全局loading，按钮状态控制，axios拦截器
- axios实现请求防重的方案：
  - 请求队列
  - 重写request
  - 订阅-发布者模式
  - 拦截器

请求防重功能，防重功能与取消请求功能可以同时使用，它们之间不会相互影响：
防重：防止重复请求的发送
取消请求：主动终止正在进行的请求。
但不要依赖局部处理，某些场景一定要添加全链路防重，防抖节流处理。

# 请求重试 （作者观点：弊大于利 建议关闭自动重试）

- 移动端：网络issue（网络问题，网络故障，网络异常），服务端吞吐量等因素都可能会导致请求失败，在有些项目中可能就需要请求重试功能。
- 核心思路： 指定的错误类型，指定的状态码，指定时间间隔（指数退避），重新发送不超过指定次数内的请求
- 实现思路：
  - 可配置：上面4个指定需要支持配置（配置可以提供默认值）
  - 有限范围：不能任何错误类型、任何响应状态码都重试（401 未认证，主动取消请求，重试次数避免无限）
  - 指数退避：避免短时间内重复请求导致服务器压力大增（被后端喷）

  - exponentialBackoff（指数退避学习）
    开启指数退避：delay 为 2000 （即 2s）
    第 1 次重试间隔: 2^(1-1) _ 2000 = 2000ms;
    第 2 次重试间隔: 2^(2-1) _ 2000 = 4000ms;
    第 3 次重试间隔: 2^(3-1) \* 2000 = 8000ms;
    关闭指数退避：每次重试的时间间隔都是 2000ms

# 实现useRequest hook（统一维护请求状态，代码更加简洁）

无论是react 的ahooks提供的useRequest函数还是vue的 vueuseuseFetch函数很大程度简化网络请求的状态管理
ahooks：https://ahooks.js.org/hooks/use-request/index
vueuse：https://vueuse.nodejs.cn/core/useFetch/
网络请求涉及到很多状态，如loading状态的控制，错误信息的判断等，而这些逻辑几乎在每个请求中都涉及。该函数将这些逻辑进行抽离，在组件中直接使用
- 自动状态管理： loading、error、data等响应式状态
  const { loading, error, data } = useRequest(reqService, config)
- 自动请求：
组件自动挂载是，自动发请求
- 手动触发：
提供手动执行请求run 方法
- 依赖追踪
当响应式依赖发生变化时，自动重新请求

还需要优化其他点：
- API 调用逻辑封装到服务层（demo-service.ts），也就是其他开源项目中的api,组件中使用 useRequest直接调用服务层方法，这样可以更好地分离关注点
- 继续扩展和优化：如缓存，轮询，防抖节流

# 构建优化配置