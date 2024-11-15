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
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="app-container bg-brand flex-grow">
          <Toaster position="top-center" />
        
            <Routes>
              {UserRoutes}
              {AdminRoutes}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        <Footer />
      </div>
      </BrowserRouter>
    </SearchProvider>
  );
};

export default App;
