import { Box, Container, Typography } from "@mui/material";

export function ContactSection() {
  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: "#f8f9fa"
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            color="primary.main"
            sx={{ mb: 4 }}
          >
            Contact Us
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            📍 Kigali, Rwanda
            <br />
            📞 +250 788 123 456
            <br />
            📧 contact@healthplatform.africa
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
