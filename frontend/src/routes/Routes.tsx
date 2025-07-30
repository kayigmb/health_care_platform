import { createBrowserRouter, RouterProvider } from "react-router";
import { RoutesNames } from "../utils/RoutesNames.ts";
import { ErrorPage } from "../views/ErrorPage/ErrorPage.tsx";
import { LayoutPage } from "../views/LayoutPage/LayoutPage.tsx";
import { ProtectedRoutes } from "./ProtectedRoutes.tsx";
import { MainPage } from "../views/MainPage/MainPage.tsx";
import { DashboardLayout } from "../views/Dashboards/DashboardLayout/DashboardLayout.tsx";
import {
  Add,
  Apartment,
  CalendarToday,
  Dashboard,
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
import { MedicalRecordsPage } from "../components/DashboardComponents/Admin/MedicalRecordPage.tsx";
import { AppointmentsAdminPage } from "../components/DashboardComponents/Admin/AppointmentPage.tsx";
import { DoctorOverviewPage } from "../components/DashboardComponents/Doctors/DoctorOverviewPage.tsx";
import { UserOverviewPage } from "../components/DashboardComponents/Users/UsersOverviewPage.tsx";
import { MedicalRecordsDoctorPage } from "../components/DashboardComponents/Doctors/MedicalRecordsDoctorPage.tsx";
import { AppointmentsUsersPage } from "../components/DashboardComponents/Users/AppointmentsUsersPage.tsx";
import { MedicalRecordsUserPage } from "../components/DashboardComponents/Users/MedicalRecordsUserPage.tsx";

function AppointmentsDoctorPage() {
  return null;
}

const Routes: React.FC = () => {
  const adminNavs = {
    adminNavItems: [
      { text: "Overview", icon: <Dashboard />, path: "overview" },
      { text: "Users", icon: <PeopleAlt />, path: "users" },
      { text: "Doctors", icon: <LocalHospital />, path: "doctors" },
      { text: "Patients", icon: <Group />, path: "patients" },
      { text: "Appointments", icon: <CalendarToday />, path: "appointments" },
      { text: "Medical Records", icon: <Folder />, path: "medical-records" },
      { text: "Hospital", icon: <Apartment />, path: "hospital" }
    ],
    quickActions: [
      {
        text: "Add Doctor",
        icon: <Add />,
        onClick: () => {
          console.log("Add Doctor clicked");
        }
      }
    ]
  };

  const doctorNavs = {
    sidebarItems: [
      { text: "Overview", icon: <Dashboard />, path: "overview" },
      { text: "Patients", icon: <Group />, path: "patients" },
      { text: "Appointments", icon: <CalendarToday />, path: "appointments" },
      { text: "Medical Records", icon: <Folder />, path: "medical-records" }
    ]
  };

  const userNavItems = [
    { text: "Overview", icon: <Dashboard />, path: "overview" },
    { text: "Appointments", icon: <CalendarToday />, path: "appointments" },
    { text: "Medical Records", icon: <Folder />, path: "medical-records" }
  ];

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
                element: <DashboardLayout sidebarItems={userNavItems} />,
                children: [
                  {
                    index: true,
                    element: <UserOverviewPage />
                  },
                  {
                    path: "overview",
                    element: <UserOverviewPage />
                  },
                  {
                    path: "appointments",
                    element: <AppointmentsUsersPage />
                  },
                  {
                    path: "medical-records",
                    element: <MedicalRecordsUserPage />
                  }
                ]
              },
              {
                path: RoutesNames.DOCTORS,
                element: <DashboardLayout sidebarItems={doctorNavs.sidebarItems} />,
                children: [
                  {
                    index: true,
                    element: <DoctorOverviewPage />
                  },
                  {
                    path: "overview",
                    element: <DoctorOverviewPage />
                  },
                  {
                    path: "patients",
                    element: <PatientsAdminPage />
                  },
                  {
                    path: "appointments",
                    element: <AppointmentsDoctorPage />
                  },
                  {
                    path: "medical-records",
                    element: <MedicalRecordsDoctorPage />
                  }
                ]
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
                    element: <AppointmentsAdminPage />
                  },
                  {
                    path: "medical-records",
                    element: <MedicalRecordsPage />
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
