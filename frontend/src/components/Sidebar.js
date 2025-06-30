import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Link as LinkIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  Description as DocsIcon,
  Extension as IntegrationIcon,
  Explore as ExploreIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

const navigationSections = [
  {
    title: 'Main',
    items: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', badge: null },
      { text: 'API Explorer', icon: <ExploreIcon />, path: '/explorer', badge: 'New' },
      { text: 'Connections', icon: <LinkIcon />, path: '/connections', badge: null },
      { text: 'Query Interface', icon: <SearchIcon />, path: '/query', badge: null },
      { text: 'History', icon: <HistoryIcon />, path: '/history', badge: null },
    ]
  },
  {
    title: 'Integration',
    items: [
      { text: 'SDK & Integration', icon: <IntegrationIcon />, path: '/integration', badge: null },
      { text: 'Documentation', icon: <DocsIcon />, path: '/docs', badge: null },
    ]
  }
];

const featureHighlights = [
  {
    icon: <SpeedIcon />,
    title: '134+ APIs',
    subtitle: '27+ Industries',
    color: '#6366f1'
  },
  {
    icon: <CloudIcon />,
    title: 'Zero Setup',
    subtitle: 'HTML Integration',
    color: '#10b981'
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure',
    subtitle: 'Enterprise Ready',
    color: '#f59e0b'
  }
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        },
      }}
    >
      <Box sx={{ 
        overflow: 'auto', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Logo Section */}
        <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            API Connector AI
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Universal API Management Platform
          </Typography>
        </Box>

        {/* Navigation Sections */}
        {navigationSections.map((section, sectionIndex) => (
          <Box key={section.title} sx={{ py: 1 }}>
            <Typography 
              variant="overline" 
              sx={{ 
                px: 3, 
                py: 1, 
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {section.title}
            </Typography>
            <List dense sx={{ px: 1 }}>
              {section.items.map((item) => (
                <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard')}
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText',
                        },
                        '&:hover': {
                          backgroundColor: 'primary.main',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: (location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard')) ? 'primary.contrastText' : 'primary.main',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: (location.pathname === item.path || (location.pathname === '/' && item.path === '/dashboard')) ? 600 : 500,
                      }}
                    />
                    {item.badge && (
                      <Chip 
                        label={item.badge} 
                        size="small"
                        color="secondary"
                        sx={{ 
                          height: 20, 
                          fontSize: '0.7rem',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            {sectionIndex < navigationSections.length - 1 && (
              <Divider sx={{ my: 1, mx: 2 }} />
            )}
          </Box>
        ))}

        {/* Feature Highlights */}
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              color: 'text.secondary',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
          >
            Platform Highlights
          </Typography>
          
          {featureHighlights.map((feature, index) => (
            <Box 
              key={index}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 1.5,
                p: 1.5,
                backgroundColor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  backgroundColor: feature.color,
                  color: 'white',
                  mr: 1.5,
                }}
              >
                {React.cloneElement(feature.icon, { sx: { fontSize: 16 } })}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  {feature.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                  {feature.subtitle}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar; 