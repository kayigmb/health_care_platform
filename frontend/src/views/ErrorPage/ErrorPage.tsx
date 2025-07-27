import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { RoutesNames } from "../../utils/RoutesNames.ts";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" color="error" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          We couldn’t find the page you were looking for.
        </Typography>

        <Stack direction="row" spacing={2} mt={4}>
          <Button variant="contained" color="primary" onClick={() => navigate(RoutesNames.HOME)}>
            Go Home
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
