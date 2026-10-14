import { HashRouter, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProjectDetail } from "./pages/ProjectDetail";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}
