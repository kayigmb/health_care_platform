import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import type { HospitalType, UserShortType } from "../../../types/Types";
import { APIRoutesNames } from "../../../utils/RoutesNames";
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
import { useUserContext } from "../../../contexts/UserContext.tsx";

interface AppointmentFormDialogProps {
  onClose: () => void;
  onSubmit?: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
}

export function AppointmentDoctorFormDialog({
  onClose,
  onSubmit,
  onSuccess
}: Readonly<AppointmentFormDialogProps>) {
  const { user } = useUserContext();

  const [form, setForm] = useState({
    patientId: "",
    doctorId: user?.id ?? "",
    hospitalId: "",
    appointmentDate: "",
    service: "",
    reason: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData: fetchPatients } = useFetch<UserShortType[], void>();
  const { fetchData: fetchHospitals } = useFetch<HospitalType[], void>();
  const { fetchData: submitData, loading: submitLoading } = useFetch<void, object>();

  const [patients, setPatients] = useState<UserShortType[]>([]);

  useEffect(() => {
    fetchPatients({ url: `${APIRoutesNames.USERS}?role=user` }).then((data) =>
      setPatients(data ?? [])
    );
  }, []);

  useEffect(() => {
    if (!user?.id || form.hospitalId) return;

    fetchHospitals({ url: APIRoutesNames.HOSPITALS }).then((hospitals) => {
      const matchedHospital = hospitals?.find((hospital) =>
        hospital.rolesScopes?.some((scope) => scope.userId === user.id && !scope.isDeleted)
      );

      if (matchedHospital) {
        setForm((prev) => ({
          ...prev,
          doctorId: user.id,
          hospitalId: matchedHospital.id
        }));
      }
    });
  }, [user?.id, form.hospitalId]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
    const { patientId, doctorId, hospitalId, appointmentDate, service } = form;

    if (!patientId || !doctorId || !hospitalId || !appointmentDate || !service) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setError(null);
      const formattedDate = toLocalISOStringWithOffset(appointmentDate);

      if (onSubmit) {
        setLoading(true);
        const formData = new FormData();
        formData.append("patientId", patientId);
        formData.append("doctorId", doctorId);
        formData.append("hospitalId", hospitalId);
        formData.append("appointmentDate", formattedDate);
        formData.append("service", form.service);
        formData.append("reason", form.reason);

        await onSubmit(formData);
        setLoading(false);
      } else {
        const payload = {
          patientId,
          doctorId,
          hospitalId,
          appointmentDate: formattedDate,
          service,
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
            doctorId: user?.id ?? "",
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
      setError("Failed to submit appointment.");
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
