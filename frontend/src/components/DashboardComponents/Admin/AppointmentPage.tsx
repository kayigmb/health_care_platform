import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Calendar, Hospital, Plus, Stethoscope, User, X } from "lucide-react";
import { Table } from "../../Table/Table";
import { useFetch } from "../../../hooks/useFetch";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import type { AppointmentStatus, AppointmentType, ColumnProps } from "../../../types/Types";
import { AppointmentFormDialog } from "./AppointmentFormDialog";

export function AppointmentsAdminPage() {
  const { fetchData, loading } = useFetch<AppointmentType[], void>();
  const { fetchData: updateStatus } = useFetch<void, void>();
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [filtered, setFiltered] = useState<AppointmentType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "">("");
  const [selected, setSelected] = useState<AppointmentType | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  async function fetchAppointments() {
    const res = await fetchData({ url: APIRoutesNames.APPOINTMENTS });
    if (res) {
      setAppointments(res);
      setFiltered(res);
    } else {
      setAppointments([]);
      setFiltered([]);
    }
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let filteredList = appointments;

    if (debouncedSearchTerm) {
      const lower = debouncedSearchTerm.toLowerCase();
      filteredList = filteredList.filter(
        (a) =>
          a.service.toLowerCase().includes(lower) ||
          `${a.doctor.firstName} ${a.doctor.lastName}`.toLowerCase().includes(lower) ||
          a.hospital.name.toLowerCase().includes(lower) ||
          `${a.patient.firstName} ${a.patient.lastName}`.toLowerCase().includes(lower)
      );
    }

    if (statusFilter) {
      filteredList = filteredList.filter((a) => a.status === statusFilter);
    }

    setFiltered(filteredList);
  }, [debouncedSearchTerm, appointments, statusFilter]);

  const columns: ColumnProps<AppointmentType>[] = [
    {
      title: "Patient",
      value: "patient",
      renderCell: (a) => (
        <Box display="flex" alignItems="center" gap={1}>
          <User size={16} />
          {`${a.patient.firstName} ${a.patient.lastName}`}
        </Box>
      )
    },
    {
      title: "Service",
      value: "service",
      renderCell: (a) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Stethoscope size={16} />
          {a.service}
        </Box>
      )
    },
    {
      title: "Doctor",
      value: "doctor",
      renderCell: (a) => (
        <Box display="flex" alignItems="center" gap={1}>
          <User size={16} />
          {`${a.doctor.firstName} ${a.doctor.lastName}`}
        </Box>
      )
    },
    {
      title: "Hospital",
      value: "hospital",
      renderCell: (a) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Hospital size={16} />
          {a.hospital.name}
        </Box>
      )
    },
    {
      title: "Status",
      value: "status",
      renderCell: (a) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Calendar size={16} />
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: "0.75rem",
              fontWeight: "medium",
              textTransform: "capitalize",
              bgcolor:
                a.status === "completed"
                  ? "success.light"
                  : a.status === "confirmed"
                    ? "info.light"
                    : a.status === "cancelled"
                      ? "error.light"
                      : "warning.light",
              color:
                a.status === "completed"
                  ? "success.contrastText"
                  : a.status === "confirmed"
                    ? "info.contrastText"
                    : a.status === "cancelled"
                      ? "error.contrastText"
                      : "warning.contrastText"
            }}
          >
            {a.status}
          </Box>
        </Box>
      )
    },
    {
      title: "Created At",
      value: "createdAt",
      renderCell: (a) => new Date(a.createdAt).toLocaleString()
    }
  ];

  if (loading) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Appointments</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setShowCreateDialog(true)}
        >
          Create Appointment
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="Search by patient, service, doctor or hospital"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus)}
          >
            <MenuItem value="">All</MenuItem>
            {["pending", "confirmed", "cancelled", "completed"].map((status) => (
              <MenuItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Table<AppointmentType>
        data={filtered}
        columns={columns}
        pagination
        onRowClick={(row) => setSelected(row)}
      />

      <Dialog open={!!selected} onClose={() => setSelected(null)} fullWidth maxWidth="sm">
        <DialogTitle>
          Appointment Details
          <IconButton
            onClick={() => setSelected(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selected && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography>
                <strong>Appointment ID:</strong> {selected.id}
              </Typography>
              <Typography>
                <strong>Patient:</strong>{" "}
                {`${selected.patient.firstName} ${selected.patient.lastName}`}
              </Typography>
              <Typography>
                <strong>Patient Email:</strong> {selected.patient.email}
              </Typography>
              {selected.patient.phone && (
                <Typography>
                  <strong>Patient Phone:</strong> {selected.patient.phone}
                </Typography>
              )}
              <Typography>
                <strong>Service:</strong> {selected.service}
              </Typography>
              <Typography>
                <strong>Doctor:</strong>{" "}
                {`${selected.doctor.firstName} ${selected.doctor.lastName}`}
              </Typography>
              <Typography>
                <strong>Doctor Email:</strong> {selected.doctor.email}
              </Typography>
              {selected.doctor.phone && (
                <Typography>
                  <strong>Doctor Phone:</strong> {selected.doctor.phone}
                </Typography>
              )}
              <Typography>
                <strong>Hospital:</strong> {selected.hospital.name}
              </Typography>
              <Typography>
                <strong>Hospital Address:</strong> {selected.hospital.address}
              </Typography>
              <Typography>
                <strong>Hospital Phone:</strong> {selected.hospital.phoneNumber}
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Update Status</InputLabel>
                <Select
                  label="Update Status"
                  value={selected.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value as AppointmentStatus;
                    if (!selected) return;
                    const url = `${APIRoutesNames.APPOINTMENTS}/${selected.id}/status?status=${newStatus}`;
                    try {
                      await updateStatus({ url, method: "PATCH" });
                      setSelected({ ...selected, status: newStatus });
                      fetchAppointments();
                    } catch (err) {
                      console.error("Failed to update status", err);
                    }
                  }}
                >
                  {["pending", "confirmed", "cancelled", "completed"].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography>
                <strong>Created At:</strong> {new Date(selected.createdAt).toLocaleString()}
              </Typography>
              <Typography>
                <strong>Updated At:</strong> {new Date(selected.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {showCreateDialog && (
        <AppointmentFormDialog
          onClose={() => setShowCreateDialog(false)}
          onSuccess={() => {
            fetchAppointments();
            setShowCreateDialog(false);
          }}
        />
      )}
    </Box>
  );
}
