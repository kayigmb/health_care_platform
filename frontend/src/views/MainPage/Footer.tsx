import { Box, Container, Typography } from "@mui/material";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        py: 3,
        backgroundColor: "#2c3e50",
        color: "white"
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {currentYear} Made by Health Connect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
