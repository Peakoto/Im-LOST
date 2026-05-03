// routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "../pages/ItemsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemsPage />} />
      </Routes>
    </BrowserRouter>
  );
}