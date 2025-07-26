import {Box, Button, Link, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {Link as RouterLink} from "react-router";

export function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Form Data Submitted:", formData);

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
                Register
            </Typography>

            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
            />

            <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
            />

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
