import LoadingOverlay from "@components/Loading";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import publicRoutes from "./publicRoutes";
import userRoutes from "./userRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingOverlay isLoading={true} />}>
        <Routes>
          {publicRoutes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={route.element}
              children={route.children?.map((childRoute, j) => (
                <Route
                  key={`${i}-${j}`}
                  path={childRoute.path}
                  index={childRoute.index}
                  element={childRoute.element}
                />
              ))}
            />
          ))}
          {userRoutes.map((route, i) => (
            <Route
              key={`user-${i}`}
              path={route.path}
              element={route.element}
            />
          ))}
          {adminRoutes.map((route, i) => (
            <Route
              key={`admin-${i}`}
              path={route.path}
              element={route.element}
              children={route.children?.map((childRoute, j) => (
                <Route
                  key={`admin-${i}-${j}`}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;