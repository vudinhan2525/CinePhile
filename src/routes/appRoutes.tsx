import LoadingOverlay from "@components/Loading"; // Import loading component bạn đã tạo
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import publicRoutes from "./publicRoutes";

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
              children={route.children && route.children.map((childRoute, j) => (
                <Route
                  key={`${i}-${j}`}
                  path={childRoute.path}
                  index={childRoute.index}
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