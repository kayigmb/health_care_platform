import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from "@mui/material";
import {
  Calendar,
  CheckCircle,
  Clock,
  Stethoscope,
  TrendingUp as LucideTrendingUp,
  User,
  XCircle
} from "lucide-react";

const statsData = [
  { title: "Total Users", value: "1,245", icon: <User size={20} />, color: "#4361ee" },
  { title: "Doctors", value: "84", icon: <Stethoscope size={20} />, color: "#3a0ca3" },
  { title: "Today's Appointments", value: "48", icon: <Calendar size={20} />, color: "#7209b7" },
  { title: "Monthly Growth", value: "+12%", icon: <LucideTrendingUp size={20} />, color: "#f72585" }
];

const recentAppointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Smith",
    speciality: "Cardiology",
    date: "2023-06-15 10:00 AM",
    status: "Completed"
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Brown",
    speciality: "Dermatology",
    date: "2023-06-15 11:30 AM",
    status: "Upcoming"
  },
  {
    id: 3,
    patient: "Robert Johnson",
    doctor: "Dr. Emma Wilson",
    speciality: "Neurology",
    date: "2023-06-15 2:15 PM",
    status: "Cancelled"
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. James Taylor",
    speciality: "Ophthalmology",
    date: "2023-06-16 9:00 AM",
    status: "Upcoming"
  },
  {
    id: 5,
    patient: "William Miller",
    doctor: "Dr. Olivia Garcia",
    speciality: "Pediatrics",
    date: "2023-06-16 3:45 PM",
    status: "Upcoming"
  }
];

const getStatusChip = (status: string) => {
  switch (status) {
    case "Completed":
      return (
        <Chip icon={<CheckCircle size={16} />} label="Completed" size="small" color="success" />
      );
    case "Upcoming":
      return <Chip icon={<Clock size={16} />} label="Upcoming" size="small" color="primary" />;
    case "Cancelled":
      return <Chip icon={<XCircle size={16} />} label="Cancelled" size="small" color="error" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

export const OverviewPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  const filteredAppointments = recentAppointments.filter((appointment) => {
    if (tabValue === 1) return appointment.status === "Upcoming";
    if (tabValue === 2) return appointment.status === "Completed";
    return true;
  });

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {statsData.map((stat) => (
          <Grid
            sx={{
              xs: 12,
              sm: 6,
              md: 3
            }}
            key={stat.title}
          >
            <Card
              sx={{
                height: "100%",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                borderRadius: 2
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" mt={1}>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Avatar sx={{ backgroundColor: stat.color, width: 48, height: 48 }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Appointments */}
        <Grid sx={{ xs: 12 }}>
          <Card sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Recent Appointments
                </Typography>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="All" />
                  <Tab label="Upcoming" />
                  <Tab label="Completed" />
                </Tabs>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Patient</TableCell>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Speciality</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.patient}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>{appointment.speciality}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{getStatusChip(appointment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
