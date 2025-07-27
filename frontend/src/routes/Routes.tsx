import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RoutesNames } from "../utils/RoutesNames.ts";
import { RegisterPage } from "../views/AuthPages/RegisterPage.tsx";
import { LoginPage } from "../views/AuthPages/LoginPage.tsx";
import { ErrorPage } from "../views/ErrorPage/ErrorPage.tsx";
import { LayoutPage } from "../views/LayoutPage/LayoutPage.tsx";
import { ProtectedRoutes } from "./ProtectedRoutes.tsx";
import { MainPage } from "../views/MainPage/MainPage.tsx";
import { AuthLayoutPage } from "./AuthLayoutPage.tsx";
import { UsersPages } from "../views/UsersPages/UsersPages.tsx";
import { DoctorsPages } from "../views/DoctorsPages/DoctorsPages.tsx";
import { AdminPages } from "../views/AdminPages/AdminPages.tsx";

const Routes: React.FC = () => {
  const routers = createBrowserRouter(
    [
      {
        path: RoutesNames.HOME,
        element: <LayoutPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MainPage />
          },
          {
            element: <ProtectedRoutes />,
            path: RoutesNames.PROTECTED,
            children: [
              {
                path: RoutesNames.USERS,
                element: <UsersPages />
              },
              {
                path: RoutesNames.DOCTORS,
                element: <DoctorsPages />
              },
              {
                index: true,
                element: <AdminPages />
              }
            ]
          },
          {
            element: <AuthLayoutPage />,
            children: [
              {
                path: RoutesNames.REGISTER,
                element: <RegisterPage />
              },
              {
                path: RoutesNames.LOGIN,
                element: <LoginPage />
              }
            ]
          }
        ]
      }
    ],
    {
      basename: "/home"
    }
  );

  return <RouterProvider router={routers} />;
};

export default Routes;
