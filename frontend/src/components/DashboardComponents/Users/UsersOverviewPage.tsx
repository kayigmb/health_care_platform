import React, { useEffect, useState } from "react";
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
  TrendingUp as LucideTrendingUp,
  XCircle
} from "lucide-react";
import { useFetch } from "../../../hooks/useFetch";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import type { AppointmentType } from "../../../types/Types";
import { useUserContext } from "../../../contexts/UserContext.tsx";

const getStatusChip = (status: string) => {
  switch (status) {
    case "completed":
      return (
        <Chip icon={<CheckCircle size={16} />} label="Completed" size="small" color="success" />
      );
    case "confirmed":
      return <Chip icon={<Clock size={16} />} label="Confirmed" size="small" color="primary" />;
    case "cancelled":
      return <Chip icon={<XCircle size={16} />} label="Cancelled" size="small" color="error" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

export function UserOverviewPage() {
  const { user } = useUserContext();
  const [tabValue, setTabValue] = useState(0);
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const { fetchData } = useFetch<any, void>();

  const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
    async function fetchDoctorAppointments() {
      if (!user?.id) return;

      const allAppointments = await fetchData({
        url: `${APIRoutesNames.APPOINTMENTS}?user=${user.id}`
      });

      if (allAppointments) {
        setAppointments(allAppointments);
      }
    }

    fetchDoctorAppointments();
  }, [user?.id]);

  const filteredAppointments = appointments.filter((appointment) => {
    if (tabValue === 1) return appointment.status === "confirmed";
    if (tabValue === 2) return appointment.status === "completed";
    return true;
  });

  const statsData = [
    {
      title: "Your Appointments",
      value: appointments.length,
      icon: <Calendar size={20} />,
      color: "#7209b7"
    },
    {
      title: "Monthly Growth",
      value: "+8%",
      icon: <LucideTrendingUp size={20} />,
      color: "#f72585"
    }
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Welcome Back {user?.firstName.toUpperCase()} {user?.lastName.toUpperCase()}!
      </Typography>

      <Grid container spacing={3} mb={4}>
        {statsData.map((stat) => (
          <Grid sx={{ xs: 12, sm: 6, md: 4 }} key={stat.title}>
            <Card sx={{ height: "100%", borderRadius: 2 }}>
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
        <Grid sx={{ xs: 12 }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Your Appointments
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
                      <TableCell>Service</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No appointments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.slice(0, 5).map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell>
                            {appointment.patient.firstName} {appointment.patient.lastName}
                          </TableCell>
                          <TableCell>{appointment.service}</TableCell>
                          <TableCell>
                            {new Date(appointment.appointmentDate).toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusChip(appointment.status)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
