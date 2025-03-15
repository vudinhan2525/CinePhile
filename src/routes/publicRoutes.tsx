import MainLayout from "@layouts/MainLayout";
import MovieDetail from "@pages/MovieDetail";
import RegisterPage from "@pages/RegisterPage";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const HomePage = lazy(() => import("@pages/HomePage"));
const LoginPage = lazy(() => import("@pages/LoginPage"));

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "movie-detail", element: <MovieDetail /> },
    ],
  },
];

export default publicRoutes;
