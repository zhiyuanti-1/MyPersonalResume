import type { ExperienceItem, Profile, SkillGroup } from "./types";

export const profile: Profile = {
  name: "郑宇韬",
  role: "前端工程师",
  tagline: "以 React 为主线的前端开发实习生，擅长把产品原型落地为可交互、可维护的界面。",
  gender: "男",
  birth: "2004-11",
  city: "浙江省金华市",
  education: "浙江理工大学 · 数字媒体技术（本科）",
  email: "3208152881@qq.com",
  phone: "15988559813",
  photo: "images/photo.jpg",
  resumeFile: "resume.pdf",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "前端",
    items: ["React", "TypeScript", "Vue3", "Vite", "Ant Design", "Tailwind"],
  },
  {
    title: "移动 & 全栈",
    items: ["Java", "Android（MVVM、Room）", "Node.js", "REST", "WebSocket"],
  },
  {
    title: "AI 工具",
    items: [
      "Dify",
      "Claude Code",
      "Codex",
      "Trae",
      "本地大模型部署",
      "OpenClaw、AutoGLM 等开源 AI 项目",
    ],
  },
  {
    title: "GIS（了解）",
    items: ["CesiumJS", "Leaflet"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    period: "2026.08~至今",
    org: "中科星图",
    role: "前端开发实习",
    stack: "React 19 · TypeScript · Ant Design · Vite · npm workspaces",
    bullets: [
      "主导 3 个 React 子应用的可拆卸架构：基于 npm workspaces 独立构建与部署，开发态用 Vite /apps/<name> 反向代理打通主平台联调，生产态按路径交由 Nginx 托管，实现同源同标签页接入。",
      "实现跨应用路由级 Token 校验：路由变化即校验 token，失效 / 401 时清理会话并跳转登录；封装统一 HTTP 客户端，统一 Bearer 注入、业务码失败抛出、错误归一化与全局提示。",
      "推进组件化 / 模板化：沉淀 SearchTable、文件元数据列表、导入记录、回收站等模块，统一筛选、分页、列宽拖拽、操作列、pending 状态；页面 / 组件 / 请求 / 服务分层，降低子应用耦合。",
      "技术栈：React 19 + TypeScript + Ant Design + Vite；调研 CesiumJS / Leaflet 等 GIS 方案并本地化改造。",
    ],
  },
  {
    period: "2025.10~2026.05",
    org: "浙江辉驿网络科技有限公司",
    role: "信息部实习生",
    bullets: [
      "独立设计并开发 OKR 系统「任务」模块，覆盖数据库表设计到前后端全流程，上线后形成「目标-关键结果-任务」管理闭环。",
      "作为开发成员参与无线项目信息化系统建设，累计贡献 3000+ 行代码；独立开发 15 张业务报表与表单，支撑业务、工勘、仓管及管理层的日常使用与数据决策。",
      "设计多功能状态总览页：宏观统计 10+ 关键节点项目数量，支持报表 / 企微卡片多入口跳转详情页，直观展示超时、出错节点及原因，提升问题定位效率。",
      "重制 ERP 订单录入页，商务订单效率提升 70%，获公司奖金肯定。",
    ],
  },
  {
    period: "2026.03~2026.07",
    org: "像素生活（Pixel Life）",
    role: "全栈项目",
    stack: "Java · MVVM · Room · LiveData · Navigation Component · ViewBinding · RecyclerView",
    bullets: [
      "Android 本地库存管理与保质期提醒应用，含库存管理、智能采购、设置三个模块。",
      "集成百度 OCR 拍照识别保质期、百度语音识别录入、DeepSeek AI 生成购物清单，Canvas 自绘柱状图 / 折线图展示消耗趋势；AlarmManager 实现应用未打开也能准时发送过期提醒。",
      "技术栈：Java + MVVM（Fragment→ViewModel→Repository→DAO）+ Room（5 张表、6 次版本迁移）+ LiveData / 线程池 + Navigation Component + ViewBinding + RecyclerView + HTTPURLConnection。",
    ],
  },
];
