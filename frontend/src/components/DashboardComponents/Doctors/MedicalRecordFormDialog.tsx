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
import { useUserContext } from "../../../contexts/UserContext.tsx";

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
  const { user } = useUserContext();

  const [form, setForm] = useState({
    patientId: "",
    doctorId: user?.id ?? "",
    hospitalId: "",
    diagnosis: "",
    treatment: "",
    notes: "",
    file: null as File | null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData: fetchPatients } = useFetch<UserShortType[], void>();
  const { fetchData: fetchHospitals } = useFetch<HospitalType[], void>();
  const { fetchData: submitData, loading: submitLoading } = useFetch<void, object>();

  const [patients, setPatients] = useState<UserShortType[]>([]);

  // Load patients
  useEffect(() => {
    fetchPatients({ url: `${APIRoutesNames.USERS}?role=user` }).then((data) => {
      setPatients(data ?? []);
    });
  }, []);

  // Automatically find and set hospitalId based on user
  useEffect(() => {
    const loadHospitalForUser = async () => {
      if (!user?.id || form.hospitalId) return;

      const hospitals = await fetchHospitals({ url: APIRoutesNames.HOSPITALS });

      if (hospitals) {
        for (const hospital of hospitals) {
          const match = hospital.rolesScopes?.some(
            (scope) => scope.userId === user.id && !scope.isDeleted
          );

          if (match) {
            setForm((prev) => ({ ...prev, hospitalId: hospital.id }));
            break;
          }
        }
      }
    };

    loadHospitalForUser();
  }, [user?.id, form.hospitalId]);

  // Handle form field changes
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

      const reader = new FileReader();
      const base64Content = await new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const fileData = reader.result as string;
          const base64 = fileData.split(",")[1];
          resolve(base64);
        };
        reader.readAsDataURL(form.file!);
      });

      if (onSubmit) {
        // Use FormData if custom submit handler provided
        setLoading(true);
        const formData = new FormData();
        formData.append("patientId", form.patientId);
        formData.append("doctorId", form.doctorId);
        formData.append("hospitalId", form.hospitalId);
        formData.append("diagnosis", form.diagnosis);
        formData.append("treatment", form.treatment);
        formData.append("notes", form.notes);
        formData.append("medicalDocumentsName", form.file.name);
        formData.append("medicalDocumentsType", form.file.type);
        formData.append("medicalDocumentsContent", base64Content);
        await onSubmit(formData);
        setLoading(false);
      } else {
        // Default API submission
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

        if (res !== undefined && onSuccess) {
          onSuccess();
          onClose();
        }
      }

      setForm({
        patientId: "",
        doctorId: user?.id ?? "",
        hospitalId: "",
        diagnosis: "",
        treatment: "",
        notes: "",
        file: null
      });
    } catch (err) {
      console.error("Failed to submit record:", err);
      setError("Failed to submit record");
      if (onSubmit) setLoading(false);
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
