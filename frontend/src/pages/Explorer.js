import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Alert,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterAlt as FilterIcon,
  Api as ApiIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Launch as LaunchIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  ExpandMore as ExpandMoreIcon,
  Category as CategoryIcon,
  NewReleases as NewIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import api from '../utils/api';
import { mockProviders } from '../utils/mockData';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Check if we're on GitHub Pages (static hosting)
const isStaticDeployment = window.location.hostname.includes('github.io') || 
                          !window.location.hostname.includes('localhost');

const fetchProviders = async () => {
  if (isStaticDeployment) {
    return mockProviders;
  }
  try {
    const { data } = await api.get('/api/providers');
    return data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return mockProviders;
  }
};

const fetchProviderCategories = async () => {
  if (isStaticDeployment) {
    // Generate categories from mock data
    const categories = mockProviders.reduce((acc, provider) => {
      const category = provider.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    return categories;
  }
  try {
    const { data } = await api.get('/api/providers/categories');
    return data;
  } catch (error) {
    console.warn('Backend not available, generating categories from mock data');
    const categories = mockProviders.reduce((acc, provider) => {
      const category = provider.category || 'Other';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    return categories;
  }
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function Explorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [tabValue, setTabValue] = useState(0);

  const { data: providers = [], isLoading: providersLoading } = useQuery('providers', fetchProviders);
  const { data: categories = {} } = useQuery('providerCategories', fetchProviderCategories);

  // Filter providers based on search and category
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group providers by category for better organization
  const providersByCategory = filteredProviders.reduce((acc, provider) => {
    const category = provider.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(provider);
    return acc;
  }, {});

  const handleProviderClick = (provider) => {
    setSelectedProvider(provider);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProvider(null);
  };

  const toggleFavorite = (providerId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(providerId)) {
      newFavorites.delete(providerId);
    } else {
      newFavorites.add(providerId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteProviders', JSON.stringify([...newFavorites]));
  };

  // Load favorites from localStorage on component mount
  React.useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProviders');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getProviderStatusColor = (provider) => {
    if (provider.is_new) return 'secondary';
    if (provider.is_popular) return 'primary';
    return 'default';
  };

  const getProviderStatusLabel = (provider) => {
    if (provider.is_new) return 'New';
    if (provider.is_popular) return 'Popular';
    return 'Active';
  };

  const generateConnectionExample = (provider) => {
    return `{
  "name": "${provider.name} Connection",
  "base_url": "${provider.base_url}",
  "auth_type": "${provider.auth_type}",
  "auth_data": {
    ${provider.auth_type === 'api_key' ? 
      `"api_key": "your-${provider.name.toLowerCase().replace(/\s+/g, '-')}-api-key",
    "api_key_header": "${provider.auth_config?.api_key_header || 'Authorization'}"` :
      `"token": "your-${provider.name.toLowerCase().replace(/\s+/g, '-')}-token"`
    }
  }
}`;
  };

  const generateQueryExamples = (provider) => {
    const examples = {
      'AI & Machine Learning': [
        'Generate a creative story about space exploration',
        'Translate this text to Spanish',
        'Create an image of a sunset over mountains'
      ],
      'Social Media': [
        'Get my latest tweets',
        'Show trending hashtags',
        'List my Instagram posts from last week'
      ],
      'E-commerce': [
        'Show bestselling products',
        'Get order status for order #12345',
        'List products in electronics category'
      ],
      'News & Media': [
        'Get latest technology news',
        'Show breaking news headlines',
        'Find articles about climate change'
      ],
      'Weather & Environment': [
        'Get current weather in New York',
        'Show 7-day forecast for London',
        'What\'s the air quality in Los Angeles?'
      ],
      'Developer Tools': [
        'Show my GitHub repositories',
        'Get latest commits for project X',
        'List open issues in my repo'
      ]
    };
    return examples[provider.category] || [
      `Get data from ${provider.name}`,
      `Show latest information from ${provider.name}`,
      `Search ${provider.name} for specific content`
    ];
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            API Explorer
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
            Discover and explore our comprehensive collection of 134+ API providers across 27+ industries. 
            Find the perfect APIs for your project.
          </Typography>
          
          <Alert severity="info" sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="body2">
              <strong>New to API Connector AI?</strong> Each API provider comes pre-configured with templates, 
              authentication, and natural language query examples. Just add your credentials and start querying!
            </Typography>
          </Alert>
        </Box>

        {/* Search and Filter Controls */}
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search APIs by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter by Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Filter by Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  startAdornment={<FilterIcon sx={{ mr: 1, color: 'action.active' }} />}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {Object.keys(categories).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category} ({categories[category]})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                <strong>{filteredProviders.length}</strong> APIs found
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Navigation Tabs */}
        <Paper elevation={1} sx={{ mb: 4 }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="All APIs" icon={<ApiIcon />} />
            <Tab label="By Category" icon={<CategoryIcon />} />
            <Tab label={`Favorites (${favorites.size})`} icon={<StarIcon />} />
          </Tabs>
        </Paper>

        {/* All APIs Tab */}
        <TabPanel value={tabValue} index={0}>
          {providersLoading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6">Loading API providers...</Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredProviders.map((provider) => (
                <Grid item xs={12} sm={6} lg={4} key={provider.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      }
                    }}
                    onClick={() => handleProviderClick(provider)}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                          {provider.name}
                        </Typography>
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(provider.id);
                          }}
                          sx={{ minWidth: 'auto', p: 0.5 }}
                        >
                          {favorites.has(provider.id) ? (
                            <StarIcon color="primary" />
                          ) : (
                            <StarBorderIcon />
                          )}
                        </Button>
                      </Box>
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip 
                          label={provider.category} 
                          size="small" 
                          variant="outlined" 
                        />
                        <Chip 
                          label={getProviderStatusLabel(provider)}
                          size="small"
                          color={getProviderStatusColor(provider)}
                          icon={provider.is_new ? <NewIcon /> : provider.is_popular ? <VerifiedIcon /> : <CheckIcon />}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {provider.description || `Connect to ${provider.name} API with pre-configured templates and natural language queries.`}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <SecurityIcon fontSize="small" color="action" />
                        <Typography variant="caption">
                          Auth: {provider.auth_type === 'api_key' ? 'API Key' : 'Bearer Token'}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SpeedIcon fontSize="small" color="action" />
                        <Typography variant="caption">
                          Rate Limit: {provider.rate_limit || 'Standard'}
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Button 
                        size="small" 
                        startIcon={<InfoIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProviderClick(provider);
                        }}
                      >
                        Details
                      </Button>
                      <Button 
                        size="small" 
                        startIcon={<LaunchIcon />}
                        href="/connections"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Connect
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* By Category Tab */}
        <TabPanel value={tabValue} index={1}>
          {Object.entries(providersByCategory).map(([category, categoryProviders]) => (
            <Accordion key={category} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                    {category}
                  </Typography>
                  <Badge badgeContent={categoryProviders.length} color="primary" sx={{ mr: 2 }} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {categoryProviders.map((provider) => (
                    <Grid item xs={12} sm={6} md={4} key={provider.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { boxShadow: 2 }
                        }}
                        onClick={() => handleProviderClick(provider)}
                      >
                        <CardContent sx={{ pb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {provider.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {provider.auth_type === 'api_key' ? 'API Key Auth' : 'Token Auth'}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* Favorites Tab */}
        <TabPanel value={tabValue} index={2}>
          {favorites.size === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <StarBorderIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No favorites yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click the star icon on any API to add it to your favorites.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {providers
                .filter(provider => favorites.has(provider.id))
                .map((provider) => (
                  <Grid item xs={12} sm={6} lg={4} key={provider.id}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 4 }
                      }}
                      onClick={() => handleProviderClick(provider)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                            {provider.name}
                          </Typography>
                          <StarIcon color="primary" />
                        </Box>
                        <Chip label={provider.category} size="small" variant="outlined" sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary">
                          {provider.description || `Connect to ${provider.name} API`}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" href="/connections">Connect Now</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </TabPanel>

        {/* Provider Detail Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { minHeight: '70vh' }
          }}
        >
          {selectedProvider && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {selectedProvider.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip label={selectedProvider.category} size="small" />
                      <Chip 
                        label={getProviderStatusLabel(selectedProvider)}
                        size="small"
                        color={getProviderStatusColor(selectedProvider)}
                      />
                    </Box>
                  </Box>
                  <Button
                    onClick={() => toggleFavorite(selectedProvider.id)}
                    startIcon={favorites.has(selectedProvider.id) ? <StarIcon /> : <StarBorderIcon />}
                  >
                    {favorites.has(selectedProvider.id) ? 'Favorited' : 'Add to Favorites'}
                  </Button>
                </Box>
              </DialogTitle>
              
              <DialogContent>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedProvider.description || `Connect to ${selectedProvider.name} API with pre-configured templates and natural language queries.`}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Connection Configuration
                </Typography>
                <Paper elevation={0} sx={{ backgroundColor: 'grey.50', mb: 3 }}>
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneDark}
                    customStyle={{
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {generateConnectionExample(selectedProvider)}
                  </SyntaxHighlighter>
                </Paper>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Natural Language Query Examples
                </Typography>
                <List>
                  {generateQueryExamples(selectedProvider).map((example, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CodeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`"${example}"`}
                        primaryTypographyProps={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                  API Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Base URL:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {selectedProvider.base_url}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Authentication:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {selectedProvider.auth_type === 'api_key' ? 'API Key' : 'Bearer Token'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Rate Limit:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {selectedProvider.rate_limit || 'Standard limits apply'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Documentation:</strong>
                    </Typography>
                    <Button 
                      size="small" 
                      href={selectedProvider.docs_url || '#'}
                      target="_blank"
                      disabled={!selectedProvider.docs_url}
                    >
                      View Docs
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
              
              <DialogActions>
                <Button onClick={handleCloseDialog}>Close</Button>
                <Button 
                  variant="contained" 
                  href="/connections"
                  startIcon={<LaunchIcon />}
                >
                  Connect This API
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
}

export default Explorer; 