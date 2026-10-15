import type { ProjectDetail, ProjectSummary } from "../types";
import { huiyiQiqiao } from "./huiyi-qiqiao";
import { pixelLife } from "./pixel-life";
import { zhongkeXingtu } from "./zhongke-xingtu";

export const projectsBySlug: Record<string, ProjectDetail> = {
  "zhongke-xingtu": zhongkeXingtu,
  "huiyi-qiqiao": huiyiQiqiao,
  "pixel-life": pixelLife,
};

export const projectSummaries: ProjectSummary[] = [zhongkeXingtu, huiyiQiqiao, pixelLife];
