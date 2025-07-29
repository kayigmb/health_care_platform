import { DashboardLayout } from "../DashboardLayout/DashboardLayout.tsx";
import { CalendarToday, Dashboard, Event, Folder, Group } from "@mui/icons-material";

export function DoctorsPages() {
  const navItems = [
    { text: "Overview", icon: <Dashboard /> },
    { text: "Patients", icon: <Group /> },
    { text: "Appointments", icon: <CalendarToday /> },
    { text: "Medical Records", icon: <Folder /> }
  ];

  const quickActions = [{ text: "Schedule Appointment", icon: <Event /> }];

  return (
    <DashboardLayout sidebarItems={navItems} quickActions={quickActions}>
      <p>This is the users pages section.</p>
      <p>Here you can find information about users, their profiles, and more.</p>
    </DashboardLayout>
  );
}
