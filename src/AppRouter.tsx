import { lazy, Suspense } from "react"; //Esto nos ayuda a que a la hora de construir el proyecto no se cree un solo archivo javaScript si no que lo divida
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

// import FavoritePage from "./views/FavoritePage"; Esta es la forma normal como se hace.
const FavoritePage = lazy(() => import("./views/FavoritePage")); //Esta es la forma ya mejorada
const IndexPage = lazy(() => import("./views/IndexPage")); //Esta es la forma ya mejorada

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Suspense fallback="Cargando...">
                  <IndexPage />
                </Suspense>
              }
              index
            />
            <Route
              path="/favoritos"
              element={
                <Suspense fallback="Cargando...">
                  <FavoritePage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
