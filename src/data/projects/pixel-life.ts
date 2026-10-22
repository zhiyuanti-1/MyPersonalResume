import type { ProjectDetail } from "../types";

export const pixelLife: ProjectDetail = {
  slug: "pixel-life",
  title: "像素生活 · Android 全栈",
  subtitle: "本地库存与保质期提醒：OCR + 语音 + AI 三服务集成",
  tags: ["Java", "Android", "MVVM", "Room", "OCR", "AI"],
  cover: "",
  overview:
    "一款 Android 本地库存管理与保质期提醒应用，覆盖库存管理、智能采购与设置三大模块，集成 OCR、语音与 AI 能力，并通过后台定时通知保证过期提醒准时送达。",
  background: [
    "家庭食品与日用品的库存、保质期靠人工记忆，容易过期浪费，缺少统一的记录与提醒工具。",
    "采购决策缺乏数据支撑，消耗趋势不可见，而库存录入又依赖手动输入，效率低。",
  ],
  challenges: [
    {
      title: "智能采购与 AI 集成",
      detail:
        "集成百度 OCR 拍照识别保质期、百度语音识别录入库存、DeepSeek AI 生成购物清单，并用 Canvas 自绘柱状图 / 折线图展示消耗趋势。",
    },
    {
      title: "可靠的后台提醒",
      detail:
        "通过 AlarmManager 实现应用未打开时也能准时发送过期提醒通知，避免提醒随应用进程被回收而失效。",
    },
    {
      title: "数据一致性与版本演进",
      detail:
        "基于 Room 维护 5 张表，完成 6 次版本迁移；采用 MVVM（Fragment → ViewModel → Repository → DAO）与 LiveData + 线程池组织代码。",
    },
  ],
  metrics: [
    { label: "数据库表", value: "5 张" },
    { label: "版本迁移", value: "6 次" },
    { label: "核心模块", value: "3 个" },
    { label: "外部服务", value: "3 项" },
  ],
  architecture: [
    { label: "架构分层", nodes: ["Fragment", "ViewModel", "Repository", "DAO"], note: "MVVM" },
    { label: "数据", nodes: ["Room 数据库"], note: "5 张表 / 6 次版本迁移" },
    { label: "外部服务", nodes: ["百度 OCR", "百度语音", "DeepSeek API"] },
    { label: "提醒", nodes: ["AlarmManager 后台定时提醒"] },
  ],
  business: {
    caseLabel: "产品化验证 / CASE",
    scenarios: [
      {
        title: "家庭库存与保质期管理",
        detail:
          "面向家庭食品、日用品场景，OCR 拍照与语音录入降低录入门槛，适合作为 C 端效率工具或平台增值功能。",
      },
      {
        title: "轻量门店库存原型",
        detail:
          "可延展为社区团购、生鲜门店的轻量库存与临期提醒工具，本地存储适合隐私敏感、网络不稳定的场景。",
      },
      {
        title: "AI 能力集成演示",
        detail:
          "OCR、语音与大模型三类外部服务的集成方式，可作为 AI 应用落地与方案演示的技术样例。",
      },
    ],
    caseSnippet: {
      context: "家庭库存靠人工记忆，容易过期浪费；手动录入效率低，采购决策缺乏数据支撑。",
      action:
        "搭建库存、采购、设置三模块；集成 OCR 识别保质期、语音录入与 DeepSeek 生成清单；用 AlarmManager 保证后台提醒准时送达。",
      result:
        "形成录入、提醒、采购的闭环；完成 5 张表与 6 次版本迁移，验证了多外部服务集成与本地数据演进的稳定性。",
    },
    deliveryStandards: [
      "版本可追溯：APK 按版本号发布，保留变更说明与可回滚安装包。",
      "数据可迁移：导入导出格式兼容历史版本，升级前提示备份。",
      "外部服务降级：OCR / 语音 / AI 接口异常时回退手动录入，不阻塞主流程。",
      "隐私说明：以本地存储为主，明确权限用途与数据范围。",
      "回归清单：发布前覆盖录入、提醒、导出与图表等核心路径。",
    ],
  },
  gallery: [
    { src: "images/projects/pixel-life/inventory.png", caption: "库存管理主页" },
    { src: "images/projects/pixel-life/item-form.png", caption: "录入库存 · 拍照识别保质期" },
    { src: "images/projects/pixel-life/category-dialog.png", caption: "自定义分类 · 图标与颜色" },
    { src: "images/projects/pixel-life/templates.png", caption: "内置保质期系统模板" },
    { src: "images/projects/pixel-life/purchase.png", caption: "智能采购 · 使用统计" },
    { src: "images/projects/pixel-life/purchase-chart.png", caption: "消耗量柱状图 · Canvas 自绘" },
    { src: "images/projects/pixel-life/trend-line.png", caption: "单品每日使用趋势折线图" },
    { src: "images/projects/pixel-life/recipe-purchase.png", caption: "菜谱生成采购清单" },
  ],
};
