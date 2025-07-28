import { DashboardLayout } from "../DashboardLayout/DashboardLayout.tsx";
import { CalendarToday, Dashboard, Folder } from "@mui/icons-material";

export function UsersPages() {
  const navItems = [
    { text: "Overview", icon: <Dashboard /> },
    { text: "Appointments", icon: <CalendarToday /> },
    { text: "Medical Records", icon: <Folder /> }
  ];

  return (
    <DashboardLayout sidebarItems={navItems}>
      <p>This is the users pages section.</p>
      <p>Here you can find information about users, their profiles, and more.</p>
    </DashboardLayout>
  );
}
