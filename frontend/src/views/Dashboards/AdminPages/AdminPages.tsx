import { Navigate, Route, Routes } from "react-router";
import {
  Add,
  CalendarToday,
  Dashboard,
  Event,
  Folder,
  Group,
  LocalHospital,
  PeopleAlt
} from "@mui/icons-material";
import { DashboardLayout } from "../DashboardLayout/DashboardLayout.tsx";
import { OverviewPage } from "../../../components/DashboardComponents/Admin/OverviewPage.tsx";

export function AdminPages() {
  const navItems = [
    { text: "Overview", icon: <Dashboard />, path: "overview" },
    { text: "Users", icon: <PeopleAlt />, path: "users" },
    { text: "Doctors", icon: <LocalHospital />, path: "doctors" },
    { text: "Patients", icon: <Group />, path: "patients" },
    { text: "Appointments", icon: <CalendarToday />, path: "appointments" },
    { text: "Medical Records", icon: <Folder />, path: "medical-records" }
  ];

  const quickActions = [
    { text: "Add Doctor", icon: <Add /> },
    { text: "Schedule Appointment", icon: <Event /> }
  ];

  return (
    <DashboardLayout sidebarItems={navItems} quickActions={quickActions}>
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="users" element={<OverviewPage />} />
      </Routes>
    </DashboardLayout>
  );
}
