import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  Tabs,
  Tab,
  Badge,
  Card,
  CardContent,
  Grid,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Clear as ClearIcon,
  Schedule as ScheduleIcon,
  Api as ApiIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

function Notifications() {
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'API Connection Successful',
      message: 'Successfully connected to OpenAI API',
      timestamp: '2 minutes ago',
      read: false,
      category: 'connection'
    },
    {
      id: 2,
      type: 'error',
      title: 'Query Failed',
      message: 'Failed to execute query: "Get weather data" - API rate limit exceeded',
      timestamp: '5 minutes ago',
      read: false,
      category: 'query'
    },
    {
      id: 3,
      type: 'warning',
      title: 'API Key Expiring Soon',
      message: 'Your GitHub API key will expire in 7 days',
      timestamp: '1 hour ago',
      read: true,
      category: 'security'
    },
    {
      id: 4,
      type: 'info',
      title: 'New Feature Available',
      message: 'API Explorer is now available with real-time testing capabilities',
      timestamp: '2 hours ago',
      read: true,
      category: 'feature'
    },
    {
      id: 5,
      type: 'success',
      title: 'Query Completed',
      message: 'Successfully retrieved 150 records from Stripe API',
      timestamp: '3 hours ago',
      read: true,
      category: 'query'
    },
    {
      id: 6,
      type: 'warning',
      title: 'High API Usage',
      message: 'You have used 85% of your monthly API quota',
      timestamp: '1 day ago',
      read: false,
      category: 'usage'
    },
    {
      id: 7,
      type: 'error',
      title: 'Connection Lost',
      message: 'Lost connection to Twitter API - authentication failed',
      timestamp: '2 days ago',
      read: true,
      category: 'connection'
    },
    {
      id: 8,
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '3 days ago',
      read: true,
      category: 'system'
    }
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    handleMenuClose();
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    handleMenuClose();
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'info':
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'connection':
        return <ApiIcon />;
      case 'query':
        return <ScheduleIcon />;
      case 'security':
        return <SecurityIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 1:
        return notifications.filter(n => !n.read);
      case 2:
        return notifications.filter(n => n.type === 'error' || n.type === 'warning');
      case 3:
        return notifications.filter(n => n.category === 'query');
      case 4:
        return notifications.filter(n => n.category === 'connection');
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const errorCount = notifications.filter(n => n.type === 'error' || n.type === 'warning').length;

  const stats = [
    { label: 'Total', value: notifications.length, color: 'primary' },
    { label: 'Unread', value: unreadCount, color: 'secondary' },
    { label: 'Alerts', value: errorCount, color: 'error' },
    { label: 'This Week', value: notifications.filter(n => 
      new Date() - new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) < new Date()
    ).length, color: 'success' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stay updated with your API connections, queries, and system alerts.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<CheckCircleIcon />}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<ClearIcon />}
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            Clear All
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 2 }}>
                <Typography variant="h4" color={`${stat.color}.main`}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            label={
              <Badge badgeContent={notifications.length} color="primary" max={99}>
                All
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={unreadCount} color="secondary" max={99}>
                Unread
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={errorCount} color="error" max={99}>
                Alerts
              </Badge>
            } 
          />
          <Tab label="Queries" />
          <Tab label="Connections" />
        </Tabs>

        <Box sx={{ maxHeight: '600px', overflow: 'auto' }}>
          {getFilteredNotifications().length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <NotificationsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No notifications found
              </Typography>
              <Typography variant="body2" color="text.disabled">
                {activeTab === 1 ? 'All notifications have been read' : 'No notifications match the current filter'}
              </Typography>
            </Box>
          ) : (
            <List>
              {getFilteredNotifications().map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    sx={{
                      backgroundColor: notification.read ? 'transparent' : 'action.hover',
                      '&:hover': { backgroundColor: 'action.selected' },
                    }}
                  >
                    <ListItemIcon>
                      {getIcon(notification.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight={notification.read ? 400 : 600}>
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <Chip label="New" size="small" color="primary" sx={{ height: 20 }} />
                          )}
                          <Chip 
                            icon={getCategoryIcon(notification.category)}
                            label={notification.category}
                            size="small"
                            variant="outlined"
                            sx={{ height: 20, textTransform: 'capitalize' }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="text.disabled">
                            {notification.timestamp}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={(e) => handleMenuOpen(e, notification)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < getFilteredNotifications().length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      </Paper>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedNotification && !selectedNotification.read && (
          <MenuItem onClick={() => markAsRead(selectedNotification.id)}>
            <CheckCircleIcon sx={{ mr: 1 }} />
            Mark as Read
          </MenuItem>
        )}
        <MenuItem onClick={() => deleteNotification(selectedNotification?.id)}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Notifications; 