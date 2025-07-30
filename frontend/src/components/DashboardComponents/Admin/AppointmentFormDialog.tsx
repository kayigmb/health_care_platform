import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import { useFetch } from "../../../hooks/useFetch";
import type { HospitalType, UserShortType } from "../../../types/Types";

interface AppointmentFormDialogProps {
  onClose: () => void;
  onSubmit?: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
}

export function AppointmentFormDialog({
  onClose,
  onSubmit,
  onSuccess
}: Readonly<AppointmentFormDialogProps>) {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    hospitalId: "",
    appointmentDate: "",
    service: "",
    reason: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData: fetchPatients } = useFetch<UserShortType[], void>();
  const { fetchData: fetchDoctors } = useFetch<UserShortType[], void>();
  const { fetchData: fetchHospitals } = useFetch<HospitalType[], void>();
  const { fetchData: submitData, loading: submitLoading } = useFetch<void, object>();

  const [patients, setPatients] = useState<UserShortType[]>([]);
  const [doctors, setDoctors] = useState<UserShortType[]>([]);
  const [hospitals, setHospitals] = useState<HospitalType[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<UserShortType[]>([]);

  useEffect(() => {
    fetchPatients({ url: `${APIRoutesNames.USERS}?role=user` }).then((data) => {
      setPatients(data ?? []);
    });
    fetchDoctors({ url: `${APIRoutesNames.USERS}?role=doctor` }).then((data) => {
      setDoctors(data ?? []);
    });
    fetchHospitals({ url: APIRoutesNames.HOSPITALS }).then((data) => {
      setHospitals(data ?? []);
    });
  }, []);

  useEffect(() => {
    if (!form.hospitalId) return;
    const hospital = hospitals.find((h) => h.id === form.hospitalId);
    if (!hospital) return;

    const scopedDoctorIds = hospital.rolesScopes?.map((s) => s.userId) || [];
    setFilteredDoctors(doctors.filter((doc) => scopedDoctorIds.includes(doc.id)));
  }, [form.hospitalId, hospitals, doctors]);

  useEffect(() => {
    if (!form.doctorId || form.hospitalId) return;

    const hospital = hospitals.find((h) => h.rolesScopes?.some((s) => s.userId === form.doctorId));
    if (hospital) {
      setForm((prev) => ({ ...prev, hospitalId: hospital.id }));
    }
  }, [form.doctorId, form.hospitalId, hospitals]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Converts datetime-local to full ISO string with timezone offset
  const toLocalISOStringWithOffset = (datetime: string) => {
    const date = new Date(datetime);
    const pad = (n: number) => n.toString().padStart(2, "0");

    const tzOffset = -date.getTimezoneOffset();
    const sign = tzOffset >= 0 ? "+" : "-";
    const offsetHours = pad(Math.floor(Math.abs(tzOffset) / 60));
    const offsetMinutes = pad(Math.abs(tzOffset) % 60);

    return (
      `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` +
      `${sign}${offsetHours}:${offsetMinutes}`
    );
  };

  const handleSubmit = async () => {
    if (
      !form.patientId ||
      !form.doctorId ||
      !form.hospitalId ||
      !form.appointmentDate ||
      !form.service
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setError(null);
      const formattedDate = toLocalISOStringWithOffset(form.appointmentDate);

      if (onSubmit) {
        setLoading(true);
        const formData = new FormData();
        formData.append("patientId", form.patientId);
        formData.append("doctorId", form.doctorId);
        formData.append("hospitalId", form.hospitalId);
        formData.append("appointmentDate", formattedDate);
        formData.append("service", form.service);
        formData.append("reason", form.reason);

        await onSubmit(formData);
        setLoading(false);
      } else {
        const payload = {
          patientId: form.patientId,
          doctorId: form.doctorId,
          hospitalId: form.hospitalId,
          appointmentDate: formattedDate,
          service: form.service,
          reason: form.reason
        };

        const res = await submitData({
          url: APIRoutesNames.APPOINTMENTS,
          method: "POST",
          body: payload
        });

        if (res !== undefined) {
          setForm({
            patientId: "",
            doctorId: "",
            hospitalId: "",
            appointmentDate: "",
            service: "",
            reason: ""
          });

          if (onSuccess) onSuccess();
          onClose();
        }
      }
    } catch (err) {
      console.error("Failed to submit appointment:", err);
      setError("Failed to submit appointment");
      if (onSubmit) setLoading(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(
      now.getHours()
    )}:${pad(now.getMinutes())}`;
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Appointment</DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth margin="normal">
          <InputLabel>Patient</InputLabel>
          <Select
            value={form.patientId}
            onChange={(e) => handleChange("patientId", e.target.value)}
            label="Patient"
          >
            {patients.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.firstName} {p.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Hospital</InputLabel>
          <Select
            value={form.hospitalId}
            onChange={(e) => handleChange("hospitalId", e.target.value)}
            label="Hospital"
          >
            {hospitals.map((h) => (
              <MenuItem key={h.id} value={h.id}>
                {h.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Doctor</InputLabel>
          <Select
            value={form.doctorId}
            onChange={(e) => handleChange("doctorId", e.target.value)}
            label="Doctor"
          >
            {(form.hospitalId ? filteredDoctors : doctors).map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.firstName} {d.lastName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Appointment Date & Time"
          type="datetime-local"
          value={form.appointmentDate}
          onChange={(e) => handleChange("appointmentDate", e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          inputProps={{ min: getMinDateTime() }}
        />

        <TextField
          label="Service"
          value={form.service}
          onChange={(e) => handleChange("service", e.target.value)}
          fullWidth
          margin="normal"
          placeholder="e.g., Consultation, Check-up, Surgery"
        />

        <TextField
          label="Reason"
          value={form.reason}
          onChange={(e) => handleChange("reason", e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          placeholder="Describe the reason for this appointment..."
        />

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading || submitLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading || submitLoading} variant="contained">
          {loading || submitLoading ? "Submitting..." : "Create Appointment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
