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
  TextField,
  Typography
} from "@mui/material";
import { APIRoutesNames } from "../../../utils/RoutesNames";
import { useFetch } from "../../../hooks/useFetch";
import type { HospitalType, UserShortType } from "../../../types/Types";

interface MedicalRecordFormDialogProps {
  onClose: () => void;
  onSubmit?: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
}

export function MedicalRecordFormDialog({
  onClose,
  onSubmit,
  onSuccess
}: Readonly<MedicalRecordFormDialogProps>) {
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    hospitalId: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    file: null as File | null
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
      if (data) {
        setPatients(data);
      } else {
        setPatients([]);
      }
    });
    fetchDoctors({ url: `${APIRoutesNames.USERS}?role=doctor` }).then((data) => {
      if (data) {
        setDoctors(data);
      } else {
        setDoctors([]);
      }
    });
    fetchHospitals({ url: `${APIRoutesNames.HOSPITALS}` }).then((data) => {
      if (data) {
        setHospitals(data);
      } else {
        setHospitals([]);
      }
    });
  }, []);

  // When hospital is selected, filter its doctors
  useEffect(() => {
    if (!form.hospitalId) return;

    const hospital = hospitals.find((h) => h.id === form.hospitalId);
    if (!hospital) return;

    const scopedDoctorIds = hospital.rolesScopes?.map((s) => s.userId) || [];
    const scopedDoctors = doctors.filter((doc) => scopedDoctorIds.includes(doc.id));
    setFilteredDoctors(scopedDoctors);
  }, [form.hospitalId, hospitals, doctors]);

  // When doctor is selected and hospital not selected, auto-assign hospital
  useEffect(() => {
    if (!form.doctorId || form.hospitalId) return;

    const hospital = hospitals.find((h) => h.rolesScopes?.some((s) => s.userId === form.doctorId));
    if (hospital) {
      setForm((prev) => ({ ...prev, hospitalId: hospital.id }));
    }
  }, [form.doctorId, form.hospitalId, hospitals]);

  const handleChange = (field: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.file) {
      setError("Please upload a file.");
      return;
    }

    if (!form.patientId || !form.doctorId || !form.hospitalId) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setError(null);

      // If onSubmit prop is provided, use FormData approach
      if (onSubmit) {
        setLoading(true);

        const formData = new FormData();
        formData.append("patientId", form.patientId);
        formData.append("doctorId", form.doctorId);
        formData.append("hospitalId", form.hospitalId);
        formData.append("diagnosis", form.diagnosis);
        formData.append("treatment", form.treatment);
        formData.append("notes", form.notes);

        // Handle file upload
        const reader = new FileReader();
        const fileContent = await new Promise<string>((resolve) => {
          reader.onloadend = () => {
            const fileData = reader.result as string;
            const base64Content = fileData.split(",")[1];
            resolve(base64Content);
          };
          reader.readAsDataURL(form.file!);
        });

        formData.append("medicalDocumentsName", form.file.name);
        formData.append("medicalDocumentsType", form.file.type);
        formData.append("medicalDocumentsContent", fileContent);

        await onSubmit(formData);
        setLoading(false);
      } else {
        // Use useFetch hook for submission
        const reader = new FileReader();
        const base64Content = await new Promise<string>((resolve) => {
          reader.onloadend = () => {
            const fileData = reader.result as string;
            const base64 = fileData.split(",")[1];
            resolve(base64);
          };
          reader.readAsDataURL(form.file!);
        });

        const payload = {
          patientId: form.patientId,
          doctorId: form.doctorId,
          hospitalId: form.hospitalId,
          diagnosis: form.diagnosis,
          treatment: form.treatment,
          notes: form.notes,
          medicalDocumentsName: form.file.name,
          medicalDocumentsContent: base64Content,
          medicalDocumentsType: form.file.type
        };

        const res = await submitData({
          url: APIRoutesNames.MEDICAL_RECORDS,
          method: "POST",
          body: payload
        });

        if (res !== undefined) {
          setForm({
            patientId: "",
            doctorId: "",
            hospitalId: "",
            diagnosis: "",
            treatment: "",
            notes: "",
            file: null
          });

          if (onSuccess) onSuccess();
          onClose();
        }
      }
    } catch (err) {
      console.error("Failed to submit record:", err);
      setError("Failed to submit record");
      if (onSubmit) {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Medical Record</DialogTitle>
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
          label="Diagnosis"
          value={form.diagnosis}
          onChange={(e) => handleChange("diagnosis", e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Treatment"
          value={form.treatment}
          onChange={(e) => handleChange("treatment", e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Notes"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload File
          <input
            type="file"
            hidden
            onChange={(e) => handleChange("file", e.target.files?.[0] ?? null)}
          />
        </Button>

        {form.file && (
          <div style={{ marginTop: 10 }}>
            <Typography variant="body2">
              <strong>Selected:</strong> {form.file.name}
            </Typography>
          </div>
        )}

        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading || submitLoading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading || submitLoading} variant="contained">
          {loading || submitLoading ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
