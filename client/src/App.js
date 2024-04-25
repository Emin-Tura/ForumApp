import React from "react";
import Loading from "./components/Loading";
import Notification from "./components/Notification";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ConfirmHelper from "./components/ConfirmHelper";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Loading />
      <Notification />
      <ConfirmHelper />
    </div>
  );
};

export default App;
