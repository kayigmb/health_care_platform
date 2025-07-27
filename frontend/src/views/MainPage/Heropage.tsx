import { Box, Chip, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import { RoutesNames } from "../../utils/RoutesNames.ts";

export function HeroPage() {
  return (
    <Box
      id="home"
      sx={{
        py: { xs: 12, md: 20 },
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          opacity: 0.5
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          opacity: 0.7
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            mb: 3,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          Connecting Africa's Healthcare with{" "}
          <Box component="span" sx={{ color: "#FFD700" }}>
            Smart Technology
          </Box>
        </Typography>

        <Typography
          variant="h5"
          sx={{
            mb: 5,
            opacity: 0.95,
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: "800px",
            mx: "auto"
          }}
        >
          Millions of Africans face poor healthcare due to disconnected systems. Our platform
          bridges that gap, creating seamless connections between patients, healthcare providers,
          and medical data across the continent.
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Chip
            label="🏥 Unified Platform"
            sx={{
              mr: 2,
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold"
            }}
          />
          <Chip
            label="📋 Digital Records"
            sx={{
              mr: 2,
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold"
            }}
          />
          <Chip
            label="🔒 Secure Access"
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              fontWeight: "bold"
            }}
          />
        </Box>

        <Link
          component={RouterLink}
          to={RoutesNames.REGISTER}
          sx={{
            display: "inline-block",
            mt: 3,
            px: 4,
            py: 2,
            backgroundColor: "#FFD700",
            color: "#333",
            textDecoration: "none",
            borderRadius: 2,
            fontWeight: "bold",
            fontSize: "1.1rem",
            boxShadow: "0 4px 15px rgba(255,215,0,0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#FFC107",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(255,215,0,0.4)"
            }
          }}
        >
          Join the Platform →
        </Link>
      </Container>
    </Box>
  );
}
