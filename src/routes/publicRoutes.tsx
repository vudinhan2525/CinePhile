import MainLayout from "@layouts/MainLayout";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@pages/HomePage"));
const LoginPage = lazy(() => import("@pages/LoginPage"));
const RegisterPage = lazy(() => import("@pages/RegisterPage"));
const MovieDetail = lazy(() => import("@pages/MovieDetail"));

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "movie/:id", element: <MovieDetail /> },
    ],
  },
];

export default publicRoutes;