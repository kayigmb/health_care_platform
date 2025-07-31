import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { APIRoutesNames, RoutesNames } from "../../utils/RoutesNames.ts";
import { useFormHandler } from "../../hooks/useFormHandler";
import type { LoginForm } from "../../types/Types.ts";
import PasswordInput from "../../components/PasswordInput.tsx";
import { useFetch } from "../../hooks/useFetch.ts";
import { useToast } from "../../contexts/ToastContext.tsx";
import { LocalStorageStores, setToLocalStorage } from "../../utils/manageLocalStorage.ts";
import { useUserContext } from "../../contexts/UserContext.tsx";

export function LoginPage() {
  const { fetchData, loading } = useFetch<string, LoginForm>();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { getUserData } = useUserContext();

  const { handleSubmit, errors } = useFormHandler<LoginForm>({
    validate: (values) => {
      const errors: Partial<Record<keyof LoginForm, string>> = {};

      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: async (values: LoginForm) => {
      const res = await fetchData({
        url: APIRoutesNames.LOGIN,
        method: "POST",
        body: values
      });

      if (res !== null) {
        showToast("Login successful", "success");
        setToLocalStorage(LocalStorageStores.TOKEN, res);
        navigate(RoutesNames.HOME, { replace: true });
        if (getUserData) {
          await getUserData();
        }
      }
    }
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%"
      }}
    >
      <Typography variant="h3" align="center">
        Login
      </Typography>

      <TextField
        label="Email"
        name="email"
        type="text"
        required
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
      />

      <PasswordInput
        name={"password"}
        label="Password"
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button type="submit" variant="contained" fullWidth loading={loading}>
        Sign In
      </Button>

      <Typography variant="subtitle1" align="center">
        Don't have an account yet?{" "}
        <Link component={RouterLink} to={RoutesNames.REGISTER} underline="hover">
          Register
        </Link>
      </Typography>
    </Box>
  );
}
