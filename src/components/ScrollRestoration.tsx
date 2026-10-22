import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type ScrollRestorationProps = {
  pathname: string;
};

const STORAGE_PREFIX = "resume:scroll:";

function readPosition(pathname: string) {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + pathname);
    const value = raw === null ? 0 : Number(raw);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function writePosition(pathname: string, scrollY: number) {
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + pathname, String(scrollY));
  } catch {
    // 隐私模式下 sessionStorage 可能不可用，忽略即可。
  }
}

/**
 * 会话内按路由记住滚动位置：新页面从顶部开始，返回访问过的页面则回到原位置。
 * 必须放在路由过渡动画的子节点内，页面挂载后才定位，避免先闪过顶部再跳到中间。
 */
export function ScrollRestoration({ pathname }: ScrollRestorationProps) {
  const { pathname: activePathname } = useLocation();
  const isActive = activePathname === pathname;
  const isActiveRef = useRef(isActive);

  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

  // 与页面同批挂载，在浏览器绘制前完成定位。
  useLayoutEffect(() => {
    window.scrollTo(0, readPosition(pathname));
  }, [pathname]);

  useEffect(() => {
    let mounted = true;

    // 持续记录，不依赖卸载时机：退场动画期间旧页面仍挂着，那时读到的位置已不可靠。
    const record = () => {
      // 过渡期间本页已不是当前路由，浏览器会因文档高度变化触发滚动（clamp），
      // 此时若继续记录会用被夹住的值覆盖真实位置。
      if (mounted && isActiveRef.current) writePosition(pathname, window.scrollY);
    };

    record();
    window.addEventListener("scroll", record, { passive: true });
    return () => {
      mounted = false;
      window.removeEventListener("scroll", record);
    };
  }, [pathname]);

  return null;
}
