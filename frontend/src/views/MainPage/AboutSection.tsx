import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography
} from "@mui/material";

export function AboutSection() {
  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            gutterBottom
            fontWeight="bold"
            color="primary.main"
            sx={{ mb: 2 }}
          >
            About Our Platform
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: "600px", mx: "auto", lineHeight: 1.6 }}
          >
            A revolutionary healthcare access platform designed to transform healthcare delivery
            across Africa
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: "100%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white"
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight="bold">
                🌍 Our Mission
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                We are building a self-contained healthcare platform that acts as an intermediary
                layer between patients, healthcare providers, and health institutions. Our goal is
                to enable seamless data exchange and service access across the African continent,
                breaking down the barriers that prevent quality healthcare delivery.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={3} sx={{ p: 4, height: "100%" }}>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
                🏥 What We Do
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                Our modular web system integrates hospitals, clinics, and healthcare providers into
                a unified platform. We facilitate appointment booking, electronic health record
                sharing, and comprehensive patient profile management, creating a connected
                healthcare ecosystem that serves millions across Africa.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={2} sx={{ p: 5, mb: 6, backgroundColor: "primary.light", color: "white" }}>
          <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center">
            Key Platform Features
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Avatar
                  sx={{
                    backgroundColor: "white",
                    color: "primary.main",
                    mx: "auto",
                    mb: 2,
                    width: 60,
                    height: 60
                  }}
                >
                  <Typography variant="h4">🏥</Typography>
                </Avatar>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Hospital Integration
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Secure sharing and access of patient records across healthcare facilities
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Avatar
                  sx={{
                    backgroundColor: "white",
                    color: "primary.main",
                    mx: "auto",
                    mb: 2,
                    width: 60,
                    height: 60
                  }}
                >
                  <Typography variant="h4">📅</Typography>
                </Avatar>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Appointment Booking
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Easy scheduling with doctors and healthcare services across the platform
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box textAlign="center">
                <Avatar
                  sx={{
                    backgroundColor: "white",
                    color: "primary.main",
                    mx: "auto",
                    mb: 2,
                    width: 60,
                    height: 60
                  }}
                >
                  <Typography variant="h4">📋</Typography>
                </Avatar>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Digital Health Records
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Comprehensive patient profile management and medical history tracking
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Card elevation={3}>
          <CardContent sx={{ p: 5 }}>
            <Typography
              variant="h5"
              gutterBottom
              fontWeight="bold"
              color="primary.main"
              textAlign="center"
            >
              🔗 Seamless Integration
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ lineHeight: 1.8 }}
            >
              Our platform is designed to integrate with existing hospital management systems,
              insurance platforms, and national health databases through robust APIs. This ensures
              that healthcare providers can adopt our solution without disrupting their current
              workflows, while patients benefit from a unified healthcare experience.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
