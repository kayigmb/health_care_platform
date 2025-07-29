import * as React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import { RoutesNames } from "../utils/RoutesNames.ts";
import { getFromLocalStorage, LocalStorageStores } from "../utils/manageLocalStorage.ts";
import { useUserContext } from "../contexts/UserContext.tsx";

export function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAuthenticated = getFromLocalStorage(LocalStorageStores.TOKEN) !== null;
  const { user, logOut, roles } = useUserContext();

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    // Handle logout logic here
    handleMenuClose();
    if (logOut) {
      logOut();
    }
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleGotoDashboard() {
    handleMenuClose();
    if (roles.includes("admin")) {
      navigate(RoutesNames.PROTECTED_ADMIN());
    } else if (roles.includes("doctor")) {
      navigate(RoutesNames.PROTECTED_DOCTORS());
    } else if (roles.includes("user")) {
      navigate(RoutesNames.PROTECTED_USERS());
    } else {
      navigate(RoutesNames.HOME);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            <Link
              component={RouterLink}
              to={RoutesNames.HOME}
              underline="hover"
              sx={{ color: "white" }}
            >
              HealthConnect
            </Link>
          </Typography>

          <Button color="inherit" onClick={() => scrollToSection("home")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => scrollToSection("about")}>
            About
          </Button>

          {!isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate(RoutesNames.LOGIN)}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate(RoutesNames.REGISTER)}>
                Register
              </Button>
            </>
          ) : (
            <IconButton onClick={handleAvatarClick} color="inherit">
              <Avatar sx={{ backgroundColor: "secondary.main" }}>
                {user?.firstName?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Typography variant="subtitle1" sx={{ padding: 2 }}>
          Welcome, {user?.firstName}!
        </Typography>
        <MenuItem onClick={handleGotoDashboard}>Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
