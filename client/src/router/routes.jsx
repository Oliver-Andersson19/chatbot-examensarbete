import React from "react";

import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CreateChatbotPage from "../pages/CreateChatbotPage";
import ListChatbotsPage from "../pages/ListChatbotsPage";

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
    right: false,
    element: <LandingPage />,
  },
  {
    path: "/login",
    label: "Login",
    right: true,
    element: <LoginPage />,
  },
  {
    path: "/register",
    label: "Register",
    right: true,
    element: <RegisterPage />,
  },
  {
    path: "/create",
    label: "Build Chatbot",
    right: false,
    element: <CreateChatbotPage/>,
  },
  {
    path: "/chatbots",
    label: "My Bots",
    right: true,
    element: <ListChatbotsPage/>,
  }
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: pages,
  },
]);
