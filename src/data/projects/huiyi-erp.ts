import type { ProjectDetail } from "../types";

export const huiyiErp: ProjectDetail = {
  slug: "huiyi-erp",
  title: "辉驿网络 · ERP 订单页重制",
  subtitle: "重新开发订单录入页，商务订单效率提升 70%",
  tags: ["ERP", "订单录入", "前后端联调", "流程优化"],
  cover: "",
  overview:
    "将原有 ERP 订单录入页重新开发，理顺字段与录入流程、收敛校验规则，商务订单处理效率提升 70%，并获得公司奖金肯定。",
  background: [
    "原订单录入页字段与流程臃肿，人工录入繁琐、易出错，商务侧处理订单耗时较长。",
    "页面与业务规则耦合，调整成本高，重制时需同步理顺校验与提交链路。",
  ],
  challenges: [
    {
      title: "重制录入流程",
      detail:
        "重新梳理订单字段与录入顺序，收敛必填与校验规则，减少无效操作与重复录入，让录入路径更短、更清晰。",
    },
    {
      title: "效率可量化验证",
      detail:
        "重制上线后商务订单处理效率提升 70%，得到好评，并由公司给予奖金肯定。",
    },
  ],
  metrics: [
    { label: "商务订单效率", value: "+70%" },
    { label: "范围", value: "订单录入页重制" },
    { label: "公司反馈", value: "奖金肯定" },
  ],
};
