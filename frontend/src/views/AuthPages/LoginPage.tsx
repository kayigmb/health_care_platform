import {Box, Button, Link, TextField, Typography} from "@mui/material";
import React from "react";
import {Link as RouterLink} from "react-router";
import {RoutesNames} from "../../utils/RoutesNames.ts";

export function LoginPage() {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Login form submitted");
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
            }}
        >
            <Typography variant="h3" align="center">
                Login
            </Typography>

            <TextField label="Email" type="email" required fullWidth/>

            <TextField label="Password" type="password" required fullWidth/>

            <Button type="submit" variant="contained" fullWidth>
                Sign In
            </Button>

            <Typography variant="subtitle1" align="center">
                Don't have an account yet? {" "}
                <Link component={RouterLink} to={RoutesNames.REGISTER} underline="hover">
                    Register
                </Link>
            </Typography>
        </Box>
    );
}
