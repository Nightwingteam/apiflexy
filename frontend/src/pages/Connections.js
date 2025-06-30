import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../utils/api';

const fetchConnections = async () => {
  const { data } = await api.get('/api/connections');
  return data;
};

const fetchProviders = async () => {
  const { data } = await api.get('/api/providers');
  return data;
};

const fetchProviderCategories = async () => {
  const { data } = await api.get('/api/providers/categories');
  return data;
};

const createConnection = async (connectionData) => {
  const { data } = await api.post('/api/connections', connectionData);
  return data;
};

const deleteConnection = async (id) => {
  const { data } = await api.delete(`/api/connections/${id}`);
  return data;
};

const testConnection = async (connectionData) => {
  const { data } = await api.post('/api/test-connection', connectionData);
  return data;
};

function Connections() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showProviderTemplates, setShowProviderTemplates] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      name: '',
      base_url: '',
      auth_type: 'api_key',
      auth_data: {},
      headers: {},
    },
  });

  const authType = watch('auth_type');

  const { data: connections = [], isLoading } = useQuery('connections', fetchConnections);
  const { data: providers = [] } = useQuery('providers', fetchProviders);
  const { data: providerCategories = {} } = useQuery('providerCategories', fetchProviderCategories);

  const createMutation = useMutation(createConnection, {
    onSuccess: () => {
      queryClient.invalidateQueries('connections');
      toast.success('Connection created successfully!');
      setIsDialogOpen(false);
      reset();
    },
    onError: (error) => {
      toast.error('Failed to create connection: ' + error.response?.data?.error);
    },
  });

  const deleteMutation = useMutation(deleteConnection, {
    onSuccess: () => {
      queryClient.invalidateQueries('connections');
      toast.success('Connection deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete connection');
    },
  });

  const testMutation = useMutation(testConnection, {
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Connection test successful!');
      } else {
        toast.error('Connection test failed: ' + data.error);
      }
    },
    onError: (error) => {
      toast.error('Connection test failed: ' + error.response?.data?.error);
    },
    onSettled: () => {
      setIsTestingConnection(false);
    },
  });

  const onSubmit = (data) => {
    // Parse auth_data based on auth_type
    let authData = {};
    if (data.auth_type === 'api_key') {
      authData = {
        api_key: data.api_key,
        api_key_header: data.api_key_header || 'X-API-Key',
      };
    } else if (data.auth_type === 'bearer') {
      authData = {
        token: data.bearer_token,
      };
    }

    const connectionData = {
      name: data.name,
      base_url: data.base_url,
      auth_type: data.auth_type,
      auth_data: authData,
      headers: {},
    };

    createMutation.mutate(connectionData);
  };

  const handleTestConnection = (data) => {
    setIsTestingConnection(true);
    
    let authData = {};
    if (data.auth_type === 'api_key') {
      authData = {
        api_key: data.api_key,
        api_key_header: data.api_key_header || 'X-API-Key',
      };
    } else if (data.auth_type === 'bearer') {
      authData = {
        token: data.bearer_token,
      };
    }

    const testData = {
      base_url: data.base_url,
      auth_type: data.auth_type,
      auth_data: authData,
      headers: {},
    };

    testMutation.mutate(testData);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this connection?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    
    // Pre-fill form with provider template
    setValue('name', provider.name);
    setValue('base_url', provider.base_url);
    setValue('auth_type', provider.auth_type);
    
    setShowProviderTemplates(false);
  };

  const openNewConnectionDialog = () => {
    reset();
    setSelectedProvider(null);
    setIsDialogOpen(true);
  };

  const getPopularProviders = () => {
    // Get some popular providers for quick access
    const popularKeys = ['github', 'wordpress', 'openweather', 'twitter', 'spotify', 'youtube'];
    return providers.filter(provider => popularKeys.includes(provider.key));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          API Connections
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openNewConnectionDialog}
        >
          Add Connection
        </Button>
      </Box>

      {connections.length === 0 && !isLoading && (
        <Alert severity="info" sx={{ mb: 3 }}>
          No API connections found. Add your first connection to get started!
        </Alert>
      )}

      <Grid container spacing={3}>
        {connections.map((connection) => (
          <Grid item xs={12} md={6} lg={4} key={connection.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {connection.name}
                  </Typography>
                  <Box>
                    <IconButton size="small" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDelete(connection.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {connection.base_url}
                </Typography>
                
                <Chip 
                  label={connection.auth_type.toUpperCase()} 
                  size="small" 
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                
                <Typography variant="caption" display="block" color="text.secondary">
                  Created: {new Date(connection.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Provider Templates Section */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            API Provider Templates
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setShowProviderTemplates(!showProviderTemplates)}
          >
            {showProviderTemplates ? 'Hide Templates' : 'Browse All Providers'}
          </Button>
        </Box>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Choose from 50+ pre-configured API providers or browse by category:
        </Typography>

        {/* Popular Providers Quick Access */}
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Popular Providers
        </Typography>
        <Grid container spacing={2}>
          {getPopularProviders().map((provider) => (
            <Grid item xs={12} sm={6} md={4} key={provider.key}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 4 },
                  border: selectedProvider?.key === provider.key ? '2px solid' : '1px solid',
                  borderColor: selectedProvider?.key === provider.key ? 'primary.main' : 'divider'
                }}
                onClick={() => handleProviderSelect(provider)}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {provider.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {provider.description}
                  </Typography>
                  <Chip 
                    label={provider.auth_type.toUpperCase()} 
                    size="small" 
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* All Providers by Category */}
        {showProviderTemplates && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              All Providers by Category
            </Typography>
            {Object.entries(providerCategories).map(([category, categoryProviders]) => (
              <Accordion key={category}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    {category} ({categoryProviders.length})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {categoryProviders.map((provider) => (
                      <Grid item xs={12} sm={6} md={4} key={provider.key}>
                        <Card 
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 2 },
                            border: selectedProvider?.key === provider.key ? '2px solid' : '1px solid',
                            borderColor: selectedProvider?.key === provider.key ? 'primary.main' : 'divider'
                          }}
                          onClick={() => handleProviderSelect(provider)}
                        >
                          <CardContent>
                            <Typography variant="subtitle1" gutterBottom>
                              {provider.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {provider.description}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                              <Chip 
                                label={provider.auth_type.toUpperCase()} 
                                size="small" 
                                variant="outlined"
                              />
                              <Button 
                                size="small" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleProviderSelect(provider);
                                  setIsDialogOpen(true);
                                }}
                              >
                                Use Template
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>

      {/* Add Connection Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            Add New API Connection
            {selectedProvider && (
              <Chip 
                label={`Using ${selectedProvider.name} template`} 
                color="primary" 
                size="small" 
                sx={{ ml: 2 }}
                onDelete={() => {
                  setSelectedProvider(null);
                  reset();
                }}
              />
            )}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  {...register('name', { required: true })}
                  label="Connection Name"
                  fullWidth
                  placeholder="e.g., My GitHub API"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  {...register('base_url', { required: true })}
                  label="Base URL"
                  fullWidth
                  placeholder="https://api.example.com"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Authentication Type</InputLabel>
                  <Select
                    {...register('auth_type')}
                    value={authType}
                    label="Authentication Type"
                  >
                    <MenuItem value="api_key">API Key</MenuItem>
                    <MenuItem value="bearer">Bearer Token</MenuItem>
                    <MenuItem value="basic">Basic Auth</MenuItem>
                    <MenuItem value="none">No Authentication</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {authType === 'api_key' && (
                <>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      {...register('api_key')}
                      label="API Key"
                      fullWidth
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      {...register('api_key_header')}
                      label="Header Name"
                      fullWidth
                      placeholder="X-API-Key"
                    />
                  </Grid>
                </>
              )}

              {authType === 'bearer' && (
                <Grid item xs={12}>
                  <TextField
                    {...register('bearer_token')}
                    label="Bearer Token"
                    fullWidth
                    type="password"
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmit(handleTestConnection)}
              disabled={isTestingConnection}
            >
              {isTestingConnection ? 'Testing...' : 'Test Connection'}
            </Button>
            <Button type="submit" variant="contained">
              Add Connection
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default Connections; 