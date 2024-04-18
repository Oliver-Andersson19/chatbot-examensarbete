import React from "react";

import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import App from "../App";

export const pages = [
  // {
  //   path: "*",
  //   label: "*",
  //   inNav: false,
  //   rightNav: false,
  //   element: <ErrorPage />,
  // },
  {
    path: "/",
    label: "Home",
    inNav: true,
    rightNav: false,
    element: <LandingPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: pages,
  },
]);
