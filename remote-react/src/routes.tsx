// NO BrowserRouter acá
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import "./index.css";
import { Layout } from "./components/Layout";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="stats" element={<AnalyticsPage />} />
      </Routes>
    </Layout>
  );
}
