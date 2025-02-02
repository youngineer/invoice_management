import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Invoice from "./components/Invoice";
import Customers from "./components/Customers";
import Product from "./components/Product";
import { Provider } from "react-redux";
import {store} from "../src/store/store";

const AppLayout = () => {
  return (
    <Provider store={store}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
    </Provider>
  );
};

const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <Body /> },
        { path: "/invoices", element: <Invoice /> },
        { path: "/products", element: <Product /> },
        { path: "/customers", element: <Customers /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
