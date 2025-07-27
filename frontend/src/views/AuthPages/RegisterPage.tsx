import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PasswordInput from "../../components/PasswordInput.tsx";
import { useFormHandler } from "../../hooks/useFormHandler";
import "./RegisterPage.css";
import type { LoginForm, RegisterForm } from "../../types/Types.ts";
import { useFetch } from "../../hooks/useFetch.ts";
import { useToast } from "../../contexts/ToastContext.tsx";
import { APIRoutesNames, RoutesNames } from "../../utils/RoutesNames.ts";

function isRwandanPhone(phone: string): boolean {
  return /^\+2507[2-9]\d{7}$/.test(phone);
}

export function RegisterPage() {
  const [phoneValue, setPhoneValue] = useState<string>("");
  const { fetchData } = useFetch<string, LoginForm>();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { handleSubmit, errors } = useFormHandler<RegisterForm>({
    validate: (values) => {
      const errors: Partial<Record<keyof RegisterForm, string>> = {};

      if (!values.firstName) errors.firstName = "First name is required";
      if (!values.lastName) errors.lastName = "Last name is required";
      if (!values.email) errors.email = "Email is required";
      if (!values.password || values.password.length < 6)
        errors.password = "Password must be at least 6 characters";
      if (!values.phone) {
        errors.phone = "Phone number is required";
      } else if (!isRwandanPhone(values.phone)) {
        errors.phone = "Phone number must be a valid Rwandan number (+2507...)";
      }
      return errors;
    },
    onSubmit: async (values: RegisterForm) => {
      console.log("Submitting registration with values:", values);

      const res = await fetchData({
        url: APIRoutesNames.REGISTER,
        method: "POST",
        body: values
      });

      if (res !== null) {
        showToast("Registration successful", "success");
        return navigate(RoutesNames.LOGIN, { replace: true });
      }
    }
  });

  const handlePhoneChange = (value?: string) => {
    setPhoneValue(value || "");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto"
      }}
    >
      <Typography variant="h4" align="center">
        Register
      </Typography>

      <TextField
        label="First Name"
        name="firstName"
        error={!!errors.firstName}
        helperText={errors.firstName}
        fullWidth
      />

      <TextField
        label="Last Name"
        name="lastName"
        error={!!errors.lastName}
        helperText={errors.lastName}
        fullWidth
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <PasswordInput
        label="Password"
        name="password"
        error={!!errors.password}
        helperText={errors.password}
      />

      <FormControl fullWidth error={!!errors.phone}>
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

      <Button type="submit" variant="contained" fullWidth>
        Create Account
      </Button>

      <Typography variant="subtitle1" align="center">
        Already have an account?{" "}
        <Link component={RouterLink} to="/login" underline="hover">
          Login
        </Link>
      </Typography>
    </Box>
  );
}
