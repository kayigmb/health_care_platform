import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch.ts";
import { APIRoutesNames } from "../../../utils/RoutesNames.ts";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  TextField,
  Typography
} from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface AddHospitalDTO {
  name: string;
  address: string;
  phoneNumber: string;
}

export function AddHospitalDialog({
  open,
  onClose,
  onSuccess
}: Readonly<{
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}>) {
  const [form, setForm] = useState<Omit<AddHospitalDTO, "phoneNumber">>({
    name: "",
    address: ""
  });

  const [phoneValue, setPhoneValue] = useState<string>("");
  const [errors, setErrors] = useState<{ phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const { fetchData: submitData } = useFetch<void, AddHospitalDTO>();

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneValue(value ?? "");
    if (!value) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const isDisabled = !form.name || !form.address || !phoneValue || !!errors.phone || loading;

  const handleSubmit = async () => {
    if (!phoneValue) {
      setErrors({ phone: "Phone number is required" });
      return;
    }

    setLoading(true);
    try {
      const res = await submitData({
        url: APIRoutesNames.HOSPITALS,
        method: "POST",
        body: {
          ...form,
          phoneNumber: phoneValue
        }
      });

      if (res !== undefined) {
        onSuccess();
        onClose();
        setForm({ name: "", address: "" });
        setPhoneValue("");
        setErrors({});
      }
    } catch (error) {
      alert("Failed to add hospital. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Hospital</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Address"
          value={form.address}
          onChange={handleChange("address")}
          margin="normal"
          required
        />

        <FormControl fullWidth error={!!errors.phone} margin="normal">
          <FormLabel>Phone Number</FormLabel>
          <PhoneInput
            defaultCountry="RW"
            country="RW"
            countries={["RW"]}
            international
            value={phoneValue}
            onChange={handlePhoneChange}
            className="mui-phone-input"
          />
          <input type="hidden" name="phone" value={phoneValue} readOnly />
          {errors.phone && (
            <Typography color="error" fontSize="0.75rem" mt={0.5}>
              {errors.phone}
            </Typography>
          )}
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isDisabled} variant="contained">
          {loading ? <CircularProgress size={20} /> : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
