import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 滚动位置由 ScrollRestoration 接管，关闭浏览器原生恢复，避免两套机制互相覆盖。
window.history.scrollRestoration = "manual";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
