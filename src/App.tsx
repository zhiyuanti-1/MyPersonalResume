import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { ScrollRestoration } from "./components/ScrollRestoration";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProjectDetail } from "./pages/ProjectDetail";

/** 路由切换过渡：整页淡入淡出。`initial={false}` 避免首帧二次入场。 */
function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
      >
        <ScrollRestoration pathname={location.pathname} />
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}
