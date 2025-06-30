import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Avatar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  ExitToApp as ExitIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
            }}
            onClick={handleGoHome}
          >
            API Connector AI
          </Typography>
          <Box 
            sx={{ 
              ml: 2, 
              px: 1, 
              py: 0.5, 
              backgroundColor: 'secondary.light', 
              color: 'white', 
              borderRadius: 1, 
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            PRO
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<HelpIcon />}
            onClick={() => navigate('/docs')}
            sx={{ mr: 1 }}
          >
            Help
          </Button>

          <IconButton 
            color="inherit"
            onClick={() => navigate('/notifications')}
          >
            <Badge badgeContent={2} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton 
            color="inherit"
            onClick={() => navigate('/settings')}
          >
            <SettingsIcon />
          </IconButton>

          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                backgroundColor: 'primary.main',
                fontSize: '0.875rem',
              }}
            >
              U
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleGoHome}>
              <ExitIcon sx={{ mr: 1 }} />
              Exit to Home
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 