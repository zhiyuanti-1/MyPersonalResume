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
};
