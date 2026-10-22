import type { ProjectDetail } from "../types";

export const zhongkeXingtu: ProjectDetail = {
  slug: "zhongke-xingtu",
  title: "中科星图 · 可拆卸子应用架构",
  subtitle: "云海平台前端主导开发：3 个 React 子应用独立构建、独立部署与同源接入",
  tags: ["React 19", "TypeScript", "Ant Design", "Vite", "npm workspaces", "GIS"],
  cover: "images/projects/zhongke-xingtu/login.jpg",
  overview:
    "主导云海平台前端开发：面向主平台与多个业务子应用的解耦需求，搭建可拆卸架构，子应用独立构建、独立部署、按需接入，主平台与子应用在开发态与生产态都能同源打通。",
  background: [
    "主平台承载多个业务线，子应用与主平台代码耦合，构建与上线相互牵制，难以按需交付。",
    "子应用之间的登录态与请求规范不统一，跨应用 token 校验缺失，接口错误处理分散，问题定位成本高。",
  ],
  challenges: [
    {
      title: "可拆卸的构建与部署边界",
      detail:
        "基于 npm workspaces 让 3 个 React 子应用独立构建、独立部署；开发态用 Vite 按 /apps/<name> 反向代理打通主平台联调，生产态按路径交由 Nginx / 网关托管，实现同源同标签页接入。",
    },
    {
      title: "跨应用路由级 Token 校验",
      detail:
        "路由变化即校验 token，失效或 401 时清理会话并跳转登录；封装统一 HTTP 客户端，统一 Bearer 注入、业务码失败抛出、错误归一化与全局提示。",
    },
    {
      title: "组件化与分层治理",
      detail:
        "沉淀 SearchTable、文件元数据列表、导入记录、回收站等模块，统一筛选、分页、列宽拖拽、操作列与 pending 状态；页面、组件、请求、服务分层，降低子应用耦合，满足可拆卸要求。",
    },
  ],
  metrics: [
    { label: "可拆卸子应用", value: "3 个" },
    { label: "接入方式", value: "同源同标签页" },
    { label: "统一 HTTP 客户端", value: "1 套" },
  ],
  architecture: [
    {
      label: "接入",
      nodes: ["主平台 Shell", "3 个 React 子应用"],
      note: "npm workspaces 独立构建 / 独立部署，同源同标签页接入",
    },
    { label: "开发态", nodes: ["Vite 反向代理 /apps/<name>"], note: "打通主平台联调" },
    { label: "生产态", nodes: ["Nginx 网关", "按路径托管"] },
    { label: "横切能力", nodes: ["统一 HTTP 客户端", "路由级 Token 校验"] },
  ],
  business: {
    caseLabel: "平台落地片段 / CASE",
    scenarios: [
      {
        title: "多业务线统一门户",
        detail:
          "客户希望一个入口访问多条业务线，新增业务按子应用独立上线，不影响主平台既有功能与版本节奏。",
      },
      {
        title: "GIS / 空天信息演示",
        detail:
          "CesiumJS / Leaflet 地图能力可作为客户演示入口，按项目加载图层、任务与业务数据，直观呈现业务价值。",
      },
      {
        title: "分阶段交付与报价",
        detail:
          "按子应用拆分范围与报价，先上线核心业务，再逐步接入，降低客户一次性投入与决策风险。",
      },
    ],
    caseSnippet: {
      context: "主平台承载多业务线，子应用与主平台代码耦合，构建与上线相互牵制，新业务接入周期不可控。",
      action:
        "以 npm workspaces 拆分 3 个 React 子应用；开发态用 Vite 反向代理联调，生产态由 Nginx / 网关按路径托管；统一 HTTP 客户端与路由级 Token 校验。",
      result:
        "3 个子应用可独立构建、独立部署、按需接入，主平台与子应用同源同标签页访问，新增业务无需改动主平台。",
    },
    deliveryStandards: [
      "接入清单：明确子应用名称、路径、权限与负责人，双方确认后实施。",
      "环境一致：测试与生产的域名、证书、反向代理路径保持一致，避免上线返工。",
      "回滚可执行：按路径切换回退，保留上一版本静态资源与配置。",
      "联调留痕：接口、鉴权与跨域问题形成问题清单并逐项闭环。",
      "交付文档：提供子应用接入指南、路由与权限矩阵。",
    ],
  },
  gallery: [
    { src: "images/projects/zhongke-xingtu/login.jpg", caption: "云海平台登录页" },
    { src: "images/projects/zhongke-xingtu/task.jpg", caption: "任务处理页" },
    { src: "images/projects/zhongke-xingtu/data.jpg", caption: "数据管理页" },
    { src: "images/projects/zhongke-xingtu/log.jpg", caption: "日志页" },
    { src: "images/projects/zhongke-xingtu/service.jpg", caption: "服务发布" },
  ],
};
