import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "../context/SearchContext";
import "./App.css";
import useUserRoutes from "../components/Routes/UserRoutes";
import useAdminRoutes from "../components/Routes/AdminRoutes";
import NotFound from "../components/Layout/NotFound/NotFound";

const App = () => {
  const UserRoutes = useUserRoutes();
  const AdminRoutes = useAdminRoutes();
  return (
    <SearchProvider>
      <BrowserRouter>
        <Header />
        <div className="app-container bg-gradient-to-br from-[#7E9BB2] via-[#1f3a5f95] to-[#1F3A5F]">
          <Toaster position="top-center" />
          <div className="">
            <Routes>
              {UserRoutes}
              {AdminRoutes}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
