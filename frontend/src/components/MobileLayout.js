import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fab,
  Zoom,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Api as ApiIcon,
  QueryStats as QueryIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const MobileLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Connections', icon: <ApiIcon />, path: '/connections' },
    { text: 'Query Interface', icon: <QueryIcon />, path: '/query' },
    { text: 'History', icon: <HistoryIcon />, path: '/history' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        ApiFlexy
      </Typography>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              ApiFlexy
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 280,
              background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isMobile ? 1 : 3,
          pt: isMobile ? 8 : 3, // Account for mobile app bar
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#fafafa',
        }}
      >
        {children}
      </Box>

      {/* Mobile FAB for Quick Actions */}
      {isMobile && (
        <Zoom in={true}>
          <Fab
            color="primary"
            aria-label="add connection"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
            }}
            onClick={() => navigate('/connections')}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      )}
    </Box>
  );
};

export default MobileLayout; 