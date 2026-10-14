import type { ProjectDetail, ProjectSummary } from "../types";
import { huiyiErp } from "./huiyi-erp";
import { huiyiOkr } from "./huiyi-okr";
import { pixelLife } from "./pixel-life";
import { zhongkeXingtu } from "./zhongke-xingtu";

export const projectsBySlug: Record<string, ProjectDetail> = {
  "zhongke-xingtu": zhongkeXingtu,
  "huiyi-erp": huiyiErp,
  "huiyi-okr": huiyiOkr,
  "pixel-life": pixelLife,
};

export const projectSummaries: ProjectSummary[] = [
  zhongkeXingtu,
  huiyiErp,
  huiyiOkr,
  pixelLife,
];
