import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router";
import {RoutesNames} from "../utils/RoutesNames.ts";
import {RegisterPage} from "../views/AuthPages/RegisterPage.tsx";
import {LoginPage} from "../views/AuthPages/LoginPage.tsx";
import {ErrorPage} from "../views/ErrorPage/ErrorPage.tsx";
import {LayoutPage} from "../views/LayoutPage/LayoutPage.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {MainPage} from "../views/MainPage/MainPage.tsx";
import {AuthLayoutPage} from "./AuthLayoutPage.tsx";

const Routes: React.FC = () => {
    const routers = createBrowserRouter(
        [
            {
                path: RoutesNames.HOME,
                element: <LayoutPage/>,
                errorElement: <ErrorPage/>,
                children: [
                    {
                        element: <ProtectedRoute/>,
                        children: [
                            {
                                index: true,
                                element: <MainPage/>
                            }
                        ]
                    },
                    {
                        element: <AuthLayoutPage/>,
                        children: [
                            {
                                path: RoutesNames.REGISTER,
                                element: <RegisterPage/>
                            },
                            {
                                path: RoutesNames.LOGIN,
                                element: <LoginPage/>
                            }
                        ]
                    },
                ]
            }
        ],
        {
            basename: "/home"
        }
    );

    return <RouterProvider router={routers}/>;
};

export default Routes;
