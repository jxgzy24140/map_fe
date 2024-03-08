import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "@/components/Layout/AppLayout";
import AccountLayouts from "@/components/Layout/AccountLayout";
const Router = () => {
  return (
    <Routes>
      <Route path="/*" element={<AppLayout />} />
      <Route path="/auth/*" element={<AccountLayouts />} />
    </Routes>
  );
};

export default Router;
