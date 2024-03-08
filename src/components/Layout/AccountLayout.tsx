import React, { Suspense } from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { AccountLayouts } from "@/components/Layout/Router/router.config";
const { Content } = Layout;
const AccountLayout = () => {
  return (
    <Layout className="w-full h-full">
      <Content>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {Object.keys(AccountLayouts).map((route: any, key: any) => {
              const Component = AccountLayouts[route]?.component;
              return (
                <Route
                  key={key}
                  path={AccountLayouts[route].path}
                  element={<Component />}
                />
              );
            })}
          </Routes>
        </Suspense>
      </Content>
    </Layout>
  );
};

export default AccountLayout;
