
 # 颜色变量
 - @use "sass:color"导入 sass 的颜色模块
 - @sass变量  （$）开头  css变量是声明性 scss是命令式
 - @each 遍历指令 变量组织成一个 Map (映射) ，然后遍历生成样式
 - @color.mix() 函数生成不同亮度的颜色色阶
 - #{...} 样式规则/属性声明/插值语法 
 > CSS变量声明中，Sass 有时会把表达式当作纯字符串处理，而不进行计算
 > 使用 #{} 包裹可以 强制 Sass 先执行里面的运算,然后把结果作为字符串输出到css中。


 # sass api变化：
 - 1. sass 3.6 版本开始，@use 指令取代了 @import 指令。
 - 2. 颜色混合函数从 mix()变为 color.mix()

# ui尺寸规范
  - xs (Extra Small / 特小号 )
  > 用于极紧凑的布局，如小标签内部间距、图标与文字的微小间隔。
  - sm (Small / 小号 )
  > 基准单位 。用于紧凑的组件间距，如按钮组之间、表单控件内部。
  - md (Medium / 中号 )
  > 用于常规间距，如卡片内的小分区、紧凑列表项之间。
  - lg (Large / 大号 )
  > 最常用的默认间距 。用于组件之间、段落之间、卡片内边距 (padding)。
  - xl (Extra Large / 特大号 )
  > 用于较大区块的分隔，如标题与正文之间、卡片之间的间距。
  - 2xl (Extra Extra Large / 超特大号 )
  > 用于页面级布局分隔，如不同功能模块之间、页眉页脚与内容的间距。

  # 系统字体栈配置
  - 用途：现代 Web 应用的“标配”，避免“土味”默认字体，性能最佳，原生体验
 - -apple-system
 >针对旧版ios和macOS（Safari）
 - BlinkMacSystemFont
 >针对新版 macOS（Chrome/Opera），通常会调用 San Francisco 字体
 - 'Segoe UI'
 >针对 Windows 系统。这是 Windows Vista/7/8/10/11 的标准系统字体。
 - Roboto
 > 针对 Android 系统。这是 Android 设备的默认字体。
 - 'Helvetica Neue'
 > 针对旧版 macOS（10.10 之前）的备用字体。
 - Arial
 > 经典的无衬线字体，作为所有操作系统的通用保底字体。
 - sans-serif
 > 经典的无衬线字体，作为所有操作系统的通用保底字体。
 - Hiragino Sans GB
 > Mac 下的苹方字体
 - Microsoft YaHei
 > Mac 下的冬青黑体
 - sans-serif
 > Windows 下的微软雅黑字体
