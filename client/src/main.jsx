import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router/routes";
import { RouterProvider } from "react-router-dom";
import "./styling/index.css";

ReactDOM.createRoot(document.querySelector("#root")).render(
    <RouterProvider router={router} />
);