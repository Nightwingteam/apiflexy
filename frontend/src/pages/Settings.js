import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  CircularProgress,
  Snackbar,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Key as KeyIcon,
  CloudSync as CloudSyncIcon,
  Add as AddIcon,
  Science as TestIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../utils/api';

// API functions
const fetchSettings = async () => {
  const { data } = await api.get('/api/settings');
  return data;
};

const saveSettings = async (settings) => {
  const { data } = await api.post('/api/settings', settings);
  return data;
};

const fetchApiKeys = async () => {
  const { data } = await api.get('/api/api-keys');
  return data;
};

const createApiKey = async (keyData) => {
  const { data } = await api.post('/api/api-keys', keyData);
  return data;
};

const updateApiKey = async ({ id, ...keyData }) => {
  const { data } = await api.put(`/api/api-keys/${id}`, keyData);
  return data;
};

const deleteApiKey = async (id) => {
  const { data } = await api.delete(`/api/api-keys/${id}`);
  return data;
};

const testApiKey = async (id) => {
  const { data } = await api.post(`/api/api-keys/${id}/test`);
  return data;
};

function Settings() {
  const queryClient = useQueryClient();
  const [localSettings, setLocalSettings] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addKeyDialogOpen, setAddKeyDialogOpen] = useState(false);
  const [editKeyDialogOpen, setEditKeyDialogOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const [keyToEdit, setKeyToEdit] = useState(null);
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    service: '',
    key_value: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Queries
  const { isLoading: settingsLoading, error: settingsError } = useQuery(
    'settings',
    fetchSettings,
    {
      onSuccess: (data) => {
        setLocalSettings(data);
      }
    }
  );

  const { data: apiKeys = [], isLoading: keysLoading } = useQuery(
    'apiKeys',
    fetchApiKeys
  );

  // Mutations
  const saveSettingsMutation = useMutation(saveSettings, {
    onSuccess: () => {
      setHasUnsavedChanges(false);
      toast.success('Settings saved successfully!');
      queryClient.invalidateQueries('settings');
    },
    onError: (error) => {
      toast.error('Failed to save settings: ' + error.response?.data?.error);
    },
  });

  const createKeyMutation = useMutation(createApiKey, {
    onSuccess: () => {
      setAddKeyDialogOpen(false);
      setNewKeyData({ name: '', service: '', key_value: '' });
      toast.success('API key added successfully!');
      queryClient.invalidateQueries('apiKeys');
    },
    onError: (error) => {
      toast.error('Failed to add API key: ' + error.response?.data?.error);
    },
  });

  const updateKeyMutation = useMutation(updateApiKey, {
    onSuccess: () => {
      setEditKeyDialogOpen(false);
      setKeyToEdit(null);
      toast.success('API key updated successfully!');
      queryClient.invalidateQueries('apiKeys');
    },
    onError: (error) => {
      toast.error('Failed to update API key: ' + error.response?.data?.error);
    },
  });

  const deleteKeyMutation = useMutation(deleteApiKey, {
    onSuccess: () => {
      setDeleteDialogOpen(false);
      setKeyToDelete(null);
      toast.success('API key deleted successfully!');
      queryClient.invalidateQueries('apiKeys');
    },
    onError: (error) => {
      toast.error('Failed to delete API key: ' + error.response?.data?.error);
    },
  });

  const testKeyMutation = useMutation(testApiKey, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries('apiKeys');
    },
    onError: (error) => {
      toast.error('API key test failed: ' + error.response?.data?.error);
      queryClient.invalidateQueries('apiKeys');
    },
  });

  const handleSettingChange = (category, setting, value) => {
    if (!localSettings) return;
    
    const newSettings = {
      ...localSettings,
      [category]: {
        ...localSettings[category],
        [setting]: value
      }
    };
    
    setLocalSettings(newSettings);
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    if (localSettings) {
      saveSettingsMutation.mutate(localSettings);
    }
  };

  const handleDeleteKey = (key) => {
    setKeyToDelete(key);
    setDeleteDialogOpen(true);
  };

  const handleEditKey = (key) => {
    setKeyToEdit(key);
    setEditKeyDialogOpen(true);
  };

  const confirmDelete = () => {
    if (keyToDelete) {
      deleteKeyMutation.mutate(keyToDelete.id);
    }
  };

  const handleAddKey = () => {
    createKeyMutation.mutate(newKeyData);
  };

  const handleUpdateKey = () => {
    if (keyToEdit) {
      updateKeyMutation.mutate({
        id: keyToEdit.id,
        name: keyToEdit.name,
        service: keyToEdit.service,
        key_value: keyToEdit.key_value
      });
    }
  };

  const handleTestKey = (keyId) => {
    testKeyMutation.mutate(keyId);
  };

  const formatLastUsed = (lastUsed) => {
    if (!lastUsed) return 'Never';
    const date = new Date(lastUsed);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const settingsSections = [
    {
      title: 'Notifications',
      key: 'notifications',
      icon: <NotificationsIcon />,
      settings: [
        { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
        { key: 'push', label: 'Push Notifications', description: 'Browser push notifications' },
        { key: 'queryAlerts', label: 'Query Alerts', description: 'Alerts for failed or slow queries' },
        { key: 'connectionStatus', label: 'Connection Status', description: 'Notifications for connection changes' },
      ]
    },
    {
      title: 'Appearance',
      key: 'appearance',
      icon: <PaletteIcon />,
      settings: [
        { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme' },
        { key: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing and padding' },
      ]
    },
    {
      title: 'Privacy & Data',
      key: 'privacy',
      icon: <SecurityIcon />,
      settings: [
        { key: 'analytics', label: 'Analytics', description: 'Help improve the product with usage analytics' },
        { key: 'crashReports', label: 'Crash Reports', description: 'Automatically send crash reports' },
        { key: 'shareUsage', label: 'Share Usage Data', description: 'Share anonymized usage patterns' },
      ]
    }
  ];

  if (settingsLoading || !localSettings) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (settingsError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Failed to load settings: {settingsError.message}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Manage your account preferences, API keys, and application settings.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => {
              queryClient.invalidateQueries('settings');
              queryClient.invalidateQueries('apiKeys');
            }}
          >
            Refresh
          </Button>
          {hasUnsavedChanges && (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
              disabled={saveSettingsMutation.isLoading}
            >
              {saveSettingsMutation.isLoading ? <CircularProgress size={20} /> : 'Save Changes'}
            </Button>
          )}
        </Box>
      </Box>

      {hasUnsavedChanges && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          You have unsaved changes. Don't forget to save your settings!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <Grid item xs={12} md={6} key={section.title}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: 'primary.main', mr: 1 }}>
                  {section.icon}
                </Box>
                <Typography variant="h6">
                  {section.title}
                </Typography>
              </Box>
              
              {section.settings.map((setting) => (
                <Box key={setting.key} sx={{ mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={localSettings[section.key]?.[setting.key] || false}
                        onChange={(e) => handleSettingChange(section.key, setting.key, e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">{setting.label}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {setting.description}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}

        {/* API Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ color: 'primary.main', mr: 1 }}>
                <CloudSyncIcon />
              </Box>
              <Typography variant="h6">
                API Configuration
              </Typography>
            </Box>
            
            <TextField
              label="Request Timeout (seconds)"
              type="number"
              value={localSettings.api?.timeout || 30}
              onChange={(e) => handleSettingChange('api', 'timeout', parseInt(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              inputProps={{ min: 5, max: 300 }}
            />
            
            <TextField
              label="Max Retries"
              type="number"
              value={localSettings.api?.retries || 3}
              onChange={(e) => handleSettingChange('api', 'retries', parseInt(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
              size="small"
              inputProps={{ min: 0, max: 10 }}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={localSettings.api?.caching || false}
                  onChange={(e) => handleSettingChange('api', 'caching', e.target.checked)}
                  color="primary"
                />
              }
              label="Enable Response Caching"
            />
          </Paper>
        </Grid>

        {/* Language & Region */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ color: 'primary.main', mr: 1 }}>
                <LanguageIcon />
              </Box>
              <Typography variant="h6">
                Language & Region
              </Typography>
            </Box>
            
            <TextField
              select
              label="Language"
              value={localSettings.appearance?.language || 'en'}
              onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
              fullWidth
              size="small"
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="de">Deutsch</MenuItem>
              <MenuItem value="zh">中文</MenuItem>
            </TextField>
          </Paper>
        </Grid>
      </Grid>

      {/* API Keys Management */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ color: 'primary.main', mr: 1 }}>
              <KeyIcon />
            </Box>
            <Typography variant="h6">
              API Keys Management
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setAddKeyDialogOpen(true)}
          >
            Add New Key
          </Button>
        </Box>
        
        {keysLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : apiKeys.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <KeyIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No API Keys Yet
            </Typography>
            <Typography variant="body2" color="text.disabled" gutterBottom>
              Add API keys to enable advanced functionality and integrations
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setAddKeyDialogOpen(true)}
              sx={{ mt: 2 }}
            >
              Add Your First API Key
            </Button>
          </Box>
        ) : (
          <List>
            {apiKeys.map((key) => (
              <ListItem
                key={key.id}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <ListItemIcon>
                  <KeyIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={key.name}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption">
                        {key.service} • Last used {formatLastUsed(key.lastUsed)}
                      </Typography>
                      <Chip
                        label={key.status}
                        size="small"
                        color={
                          key.status === 'Active' ? 'success' : 
                          key.status === 'Invalid' ? 'error' : 
                          key.status === 'Error' ? 'error' : 'default'
                        }
                        sx={{ height: 20 }}
                      />
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title="Test API Key">
                    <IconButton 
                      size="small" 
                      color="info"
                      onClick={() => handleTestKey(key.id)}
                      disabled={testKeyMutation.isLoading}
                    >
                      <TestIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit API Key">
                    <IconButton 
                      size="small"
                      onClick={() => handleEditKey(key)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete API Key">
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteKey(key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Add API Key Dialog */}
      <Dialog open={addKeyDialogOpen} onClose={() => setAddKeyDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New API Key</DialogTitle>
        <DialogContent>
          <TextField
            label="Key Name"
            value={newKeyData.name}
            onChange={(e) => setNewKeyData(prev => ({ ...prev, name: e.target.value }))}
            fullWidth
            sx={{ mb: 2, mt: 1 }}
            placeholder="e.g., My OpenAI Key"
          />
          <TextField
            select
            label="Service"
            value={newKeyData.service}
            onChange={(e) => setNewKeyData(prev => ({ ...prev, service: e.target.value }))}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="OpenAI">OpenAI</MenuItem>
            <MenuItem value="GitHub">GitHub</MenuItem>
            <MenuItem value="Stripe">Stripe</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="API Key"
            type="password"
            value={newKeyData.key_value}
            onChange={(e) => setNewKeyData(prev => ({ ...prev, key_value: e.target.value }))}
            fullWidth
            placeholder="Enter your API key"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddKeyDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddKey} 
            variant="contained"
            disabled={!newKeyData.name || !newKeyData.service || !newKeyData.key_value || createKeyMutation.isLoading}
          >
            {createKeyMutation.isLoading ? <CircularProgress size={20} /> : 'Add Key'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit API Key Dialog */}
      <Dialog open={editKeyDialogOpen} onClose={() => setEditKeyDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit API Key</DialogTitle>
        <DialogContent>
          {keyToEdit && (
            <>
              <TextField
                label="Key Name"
                value={keyToEdit.name}
                onChange={(e) => setKeyToEdit(prev => ({ ...prev, name: e.target.value }))}
                fullWidth
                sx={{ mb: 2, mt: 1 }}
              />
              <TextField
                select
                label="Service"
                value={keyToEdit.service}
                onChange={(e) => setKeyToEdit(prev => ({ ...prev, service: e.target.value }))}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="OpenAI">OpenAI</MenuItem>
                <MenuItem value="GitHub">GitHub</MenuItem>
                <MenuItem value="Stripe">Stripe</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                label="API Key"
                type="password"
                value={keyToEdit.key_value || ''}
                onChange={(e) => setKeyToEdit(prev => ({ ...prev, key_value: e.target.value }))}
                fullWidth
                placeholder="Enter new API key (leave blank to keep current)"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditKeyDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleUpdateKey} 
            variant="contained"
            disabled={updateKeyMutation.isLoading}
          >
            {updateKeyMutation.isLoading ? <CircularProgress size={20} /> : 'Update Key'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete API Key</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the API key "{keyToDelete?.name}"? 
            This action cannot be undone and may break existing integrations.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            disabled={deleteKeyMutation.isLoading}
          >
            {deleteKeyMutation.isLoading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Settings; 