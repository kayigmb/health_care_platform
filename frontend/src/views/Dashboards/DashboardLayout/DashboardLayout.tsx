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
import { Outlet, useLocation, useNavigate } from "react-router";
import { RoutesNames } from "../../../utils/RoutesNames.ts";
import { RoleGuard } from "../../../components/RoleGuard.tsx";

const drawerWidth = 260;

interface SidebarItem {
  text: string;
  icon: React.ReactNode;
  path?: string;
  onClick?: () => void;
}

interface DashboardLayoutProps {
  sidebarItems: SidebarItem[];
  quickActions?: SidebarItem[];
}

export function DashboardLayout({
  sidebarItems,
  quickActions = []
}: Readonly<DashboardLayoutProps>) {
  const { user, logOut } = useUserContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    if (logOut) {
      logOut();
    }
    navigate(RoutesNames.LOGIN);
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }

    if (isMobile) {
      setMobileOpen(false);
    }
  };

  // Check if current path matches the item path
  const isActiveItem = (item: SidebarItem) => {
    if (!item.path) return false;

    const currentPath = location.pathname;
    const adminBasePath = RoutesNames.ADMIN;
    const itemFullPath = `${adminBasePath}/${item.path}`;

    if (currentPath === itemFullPath) return true;

    if (item.path === "overview" && currentPath === adminBasePath) return true;

    if (currentPath.startsWith(itemFullPath + "/")) return true;

    return false;
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
            {sidebarItems.map((item) => {
              const isActive = isActiveItem(item);
              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    onClick={() => handleSidebarItemClick(item)}
                    selected={isActive}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark
                        },
                        "& .MuiListItemIcon-root": {
                          color: "white"
                        }
                      },
                      // Add hover effect for non-selected items
                      "&:hover": {
                        backgroundColor: !isActive ? theme.palette.action.hover : undefined
                      }
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {quickActions.length > 0 && (
            <>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 3, mb: 1 }}>
                Quick Actions
              </Typography>
              <List>
                {quickActions.map((item) => (
                  <ListItem key={item.text} disablePadding>
                    <ListItemButton
                      onClick={() => handleSidebarItemClick(item)}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover
                        }
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
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
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{
                maxWidth: "150px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "inline-block",
                verticalAlign: "bottom"
              }}
            >
              {" "}
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
              <Avatar>{user?.firstName?.[0]?.toUpperCase()}</Avatar>
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
        <Outlet />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
