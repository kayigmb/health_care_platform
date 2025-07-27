import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: boolean;
  helperText?: string;
}

export default function PasswordInput({
  label = "Password",
  value,
  onChange,
  name,
  error = false,
  helperText = ""
}: Readonly<PasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <TextField
      fullWidth
      type={showPassword ? "text" : "password"}
      name={name}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      variant="outlined"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}
