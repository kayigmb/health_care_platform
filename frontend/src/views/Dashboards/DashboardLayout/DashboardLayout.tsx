import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {
  Logout as LogoutIcon,
  Search as SearchIcon,
  Settings as SettingsIcon
} from "@mui/icons-material";
import { useUserContext } from "../../../contexts/UserContext.tsx";
import { useNavigate } from "react-router";
import { clearLocalStorage } from "../../../utils/manageLocalStorage.ts";
import { RoutesNames } from "../../../utils/RoutesNames.ts";
import { RoleGuard } from "../../../components/RoleGuard.tsx";

const drawerWidth = 260;

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  quickActions?: SidebarItem[];
}

export function DashboardLayout({
  children,
  sidebarItems,
  quickActions = []
}: Readonly<DashboardLayoutProps>) {
  const { user } = useUserContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    clearLocalStorage();
    navigate(RoutesNames.LOGIN);
  };

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Box>
        <Toolbar>
          <Typography variant="h6" noWrap fontWeight={600}>
            HealthConnect
          </Typography>
        </Toolbar>
        <Divider />
        <Box px={2} mt={2}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Navigation
          </Typography>
          <List>
            {sidebarItems.map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {quickActions.length > 0 && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 3, mb: 1 }}>
                Quick Actions
              </Typography>
              <List>
                {quickActions.map(({ text, icon }) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>

      {/* User Info and Logout */}
      <Box px={2} py={2}>
        <Divider />
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Avatar>{user?.firstName?.[0]}</Avatar>
          <Box>
            <Typography variant="body1" fontWeight={600}>
              <RoleGuard allowed={["doctor"]}>Dr.</RoleGuard> {user?.firstName} {user?.lastName}
            </Typography>
          </Box>
          <IconButton onClick={handleLogout} sx={{ marginLeft: "auto" }} color="error">
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f8f9fb" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: "none",
          bgcolor: "#ffffff",
          color: "#000000",
          borderBottom: "1px solid #e0e0e0"
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <SettingsIcon />
            </IconButton>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f3f5",
              borderRadius: 2,
              px: 2,
              width: "100%",
              maxWidth: 400
            }}
          >
            <SearchIcon fontSize="small" sx={{ mr: 1 }} />
            <InputBase placeholder="Search..." fullWidth />
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <IconButton onClick={handleAvatarClick}>
              <Avatar>{user?.firstName?.[0]}</Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          overflowY: "auto",
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        {children}
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
