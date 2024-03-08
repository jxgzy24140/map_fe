import React, { Suspense } from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { AppLayouts } from "@/components/Layout/Router/router.config";
import ProtectedRoute from "@/components/Layout/Router/ProtectedRoute";
import Header from "@/components/Header";
const { Content } = Layout;
const AppLayout = () => {
  return (
    <Layout className="w-full h-full">
      <Layout.Header
        style={{
          background: "transparent",
          padding: 0,
          width: "100%",
          height: "auto",
        }}
      >
        <Header />
      </Layout.Header>
      <Content>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Object.keys(AppLayouts).map((route: any, key: any) => {
              const Component = AppLayouts[route]?.component;
              return (
                <Route
                  key={key}
                  path={AppLayouts[route].path}
                  element={
                    <ProtectedRoute>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default AppLayout;
