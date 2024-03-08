import { lazy } from "react";
export const AppLayouts: any = {
  homePage: {
    path: "/home",
    component: lazy(() => import("@/scenes/home")),
  },
  detailPage: {
    path: "/detail/:id",
    component: lazy(() => import("@/scenes/home/Detail")),
  },
  settingPage: {
    path: "/setting",
    component: lazy(() => import("@/scenes/setting")),
  },
  createMapPage: {
    path: "/create-map",
    component: lazy(() => import("@/scenes/home/Create")),
  },
};

export const AccountLayouts: any = {
  login: {
    path: "/login",
    component: lazy(() => import("@/scenes/accounts")),
  },
};
