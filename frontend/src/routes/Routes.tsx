import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RoutesNames } from "../utils/RoutesNames.ts";
import { ErrorPage } from "../views/ErrorPage/ErrorPage.tsx";
import { LayoutPage } from "../views/LayoutPage/LayoutPage.tsx";
import { ProtectedRoutes } from "./ProtectedRoutes.tsx";
import { MainPage } from "../views/MainPage/MainPage.tsx";
import { UsersPages } from "../views/Dashboards/UsersPages/UsersPages.tsx";
import { DoctorsPages } from "../views/Dashboards/DoctorsPages/DoctorsPages.tsx";
import { DashboardLayout } from "../views/Dashboards/DashboardLayout/DashboardLayout.tsx";
import {
  Add,
  Apartment,
  CalendarToday,
  Dashboard,
  Event,
  Folder,
  Group,
  LocalHospital,
  PeopleAlt
} from "@mui/icons-material";
import { OverviewPage } from "../components/DashboardComponents/Admin/OverviewPage.tsx";
import { UsersAdminPage } from "../components/DashboardComponents/Admin/UsersPage.tsx";
import { DoctorsAdminPage } from "../components/DashboardComponents/Admin/DoctorsPage.tsx";
import { PatientsAdminPage } from "../components/DashboardComponents/Admin/PatientsPage.tsx";
import { AuthLayoutPage } from "./AuthLayoutPage.tsx";
import { RegisterPage } from "../views/AuthPages/RegisterPage.tsx";
import { LoginPage } from "../views/AuthPages/LoginPage.tsx";
import { HospitalsAdminPage } from "../components/DashboardComponents/Admin/HospitalAdminPage.tsx";

const Routes: React.FC = () => {
  const adminNavs = {
    adminNavItems: [
      { text: "Overview", icon: <Dashboard />, path: "overview" },
      { text: "Users", icon: <PeopleAlt />, path: "users" },
      { text: "Doctors", icon: <LocalHospital />, path: "doctors" },
      { text: "Patients", icon: <Group />, path: "patients" },
      { text: "Appointments", icon: <CalendarToday />, path: "appointments" },
      { text: "Medical Records", icon: <Folder />, path: "medical-records" },
      { text: "Hospital", icon: <Apartment />, path: "hospital" } // <-- Added hospital nav item
    ],
    quickActions: [
      {
        text: "Add Doctor",
        icon: <Add />,
        onClick: () => {
          console.log("Add Doctor clicked");
        }
      },
      {
        text: "Schedule Appointment",
        icon: <Event />,
        onClick: () => {
          console.log("Schedule Appointment clicked");
        }
      }
    ]
  };

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
                path: RoutesNames.ADMIN,
                element: (
                  <DashboardLayout
                    sidebarItems={adminNavs.adminNavItems}
                    quickActions={adminNavs.quickActions}
                  />
                ),
                children: [
                  {
                    index: true,
                    element: <OverviewPage />
                  },
                  {
                    path: "overview",
                    element: <OverviewPage />
                  },
                  {
                    path: "users",
                    element: <UsersAdminPage />
                  },
                  {
                    path: "doctors",
                    element: <DoctorsAdminPage />
                  },
                  {
                    path: "patients",
                    element: <PatientsAdminPage />
                  },
                  {
                    path: "appointments",
                    element: <div>Appointments Management Page</div>
                  },
                  {
                    path: "medical-records",
                    element: <div>Medical Records Page</div>
                  },
                  {
                    path: "hospital",
                    element: <HospitalsAdminPage />
                  }
                ]
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
