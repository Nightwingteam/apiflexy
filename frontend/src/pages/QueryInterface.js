import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper,
  Chip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Send as SendIcon,
  ExpandMore as ExpandMoreIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../utils/api';
import ReactJsonView from 'react-json-view';

const fetchConnections = async () => {
  const { data } = await api.get('/api/connections');
  return data;
};

const fetchProviders = async () => {
  const { data } = await api.get('/api/providers');
  return data;
};

const processQuery = async (queryData) => {
  const { data } = await api.post('/api/query', queryData);
  return data;
};

function QueryInterface() {
  const [selectedConnection, setSelectedConnection] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: connections = [] } = useQuery('connections', fetchConnections);
  const { data: providers = [] } = useQuery('providers', fetchProviders);

  const queryMutation = useMutation(processQuery, {
    onMutate: () => {
      setIsLoading(true);
      setResults(null);
    },
    onSuccess: (data) => {
      setResults(data);
      if (data.success) {
        toast.success('Query executed successfully!');
      } else {
        toast.error('Query failed: ' + data.error);
      }
    },
    onError: (error) => {
      toast.error('Query failed: ' + error.response?.data?.error);
      setResults({
        success: false,
        error: error.response?.data?.error || 'Unknown error occurred',
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedConnection || !query.trim()) {
      toast.error('Please select a connection and enter a query');
      return;
    }

    queryMutation.mutate({
      connection_id: selectedConnection,
      query: query.trim(),
    });
  };

  const handleExampleQuery = (exampleQuery) => {
    setQuery(exampleQuery);
  };

  const getExampleQueries = () => {
    const selectedConn = connections.find(conn => conn.id === parseInt(selectedConnection));
    if (!selectedConn) return [];

    // Try to find matching provider based on URL
    const baseUrl = selectedConn.base_url.toLowerCase();
    
    // First, look for exact provider match
    for (const provider of providers) {
      const providerUrl = provider.base_url.toLowerCase();
      const providerDomain = providerUrl.replace(/https?:\/\//, '').split('/')[0];
      const connectionDomain = baseUrl.replace(/https?:\/\//, '').split('/')[0];
      
      if (connectionDomain.includes(providerDomain.replace(/\{[^}]+\}/g, '')) || 
          baseUrl.includes(provider.key)) {
        return provider.example_queries || [];
      }
    }
    
    // Fallback to pattern matching
    if (baseUrl.includes('github')) {
      return [
        'Get my repositories',
        'Show the last 10 commits from my main repository',
        'Get user information',
        'List all issues in my repository',
        'Show recent pull requests',
      ];
    } else if (baseUrl.includes('wp-json') || baseUrl.includes('wordpress')) {
      return [
        'Get all posts',
        'Search for posts containing "AI"',
        'Get the latest 5 posts',
        'Show all published pages',
        'Get comments from recent posts',
      ];
    } else if (baseUrl.includes('weather')) {
      return [
        'Get weather for New York',
        'Show temperature in London',
        'Weather forecast for tomorrow',
        'Current conditions in Tokyo',
        'Weekly forecast for San Francisco',
      ];
    } else if (baseUrl.includes('twitter')) {
      return [
        'Get recent tweets',
        'Search for tweets about AI',
        'Get my profile information',
        'Find tweets by username',
      ];
    } else if (baseUrl.includes('spotify')) {
      return [
        'Search for artists named Drake',
        'Find albums by The Beatles',
        'Search for tracks about love',
        'Get my playlists',
      ];
    } else if (baseUrl.includes('youtube')) {
      return [
        'Search for videos about programming',
        'Find channels about cooking',
        'Search for tutorials on React',
        'Get trending videos',
      ];
    } else {
      return [
        'Get all data',
        'Show recent items',
        'List available endpoints',
        'Get user data',
        'Fetch latest updates',
      ];
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Query Interface
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Use natural language to query your connected APIs. Just describe what you want in plain English!
      </Typography>

      {connections.length === 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          No API connections found. Please add a connection first before making queries.
        </Alert>
      )}

      {connections.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Ask Your APIs
                </Typography>
                
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Select API Connection</InputLabel>
                    <Select
                      value={selectedConnection}
                      onChange={(e) => setSelectedConnection(e.target.value)}
                      label="Select API Connection"
                    >
                      {connections.map((connection) => (
                        <MenuItem key={connection.id} value={connection.id}>
                          {connection.name} ({connection.base_url})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="What would you like to know?"
                    placeholder="e.g., Get the last 10 commits from my repository, or Show me all blog posts with 'AI' in the title"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ mb: 2 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    disabled={isLoading || !selectedConnection || !query.trim()}
                    fullWidth
                  >
                    {isLoading ? 'Processing...' : 'Send Query'}
                  </Button>
                </form>

                {/* Example Queries */}
                {selectedConnection && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Example Queries:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {getExampleQueries().map((example, index) => (
                        <Chip
                          key={index}
                          label={example}
                          variant="outlined"
                          size="small"
                          clickable
                          onClick={() => handleExampleQuery(example)}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Results
                </Typography>
                
                {!results && !isLoading && (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Typography variant="body2">
                      Results will appear here after you send a query
                    </Typography>
                  </Box>
                )}

                {isLoading && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                )}

                {results && (
                  <Box>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={results.success ? 'Success' : 'Error'} 
                        color={results.success ? 'success' : 'error'}
                        size="small"
                      />
                      {results.interpretation && (
                        <Chip 
                          label={`${results.interpretation.method} ${results.interpretation.endpoint}`}
                          variant="outlined"
                          size="small"
                        />
                      )}
                    </Box>

                    {results.success && results.data && (
                      <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="subtitle2">Response Data</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                            <ReactJsonView
                              src={results.data}
                              theme="bright:inverted"
                              collapsed={2}
                              displayDataTypes={false}
                              displayObjectSize={false}
                              enableClipboard={true}
                              style={{
                                backgroundColor: '#f5f5f5',
                                padding: '10px',
                                borderRadius: '4px',
                              }}
                            />
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {results.interpretation && (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography variant="subtitle2">Query Interpretation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ fontSize: '0.875rem' }}>
                            <Typography variant="body2" gutterBottom>
                              <strong>Endpoint:</strong> {results.interpretation.endpoint}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Method:</strong> {results.interpretation.method}
                            </Typography>
                            {Object.keys(results.interpretation.params || {}).length > 0 && (
                              <Typography variant="body2" gutterBottom>
                                <strong>Parameters:</strong>
                                <pre style={{ fontSize: '0.75rem', marginTop: '4px' }}>
                                  {JSON.stringify(results.interpretation.params, null, 2)}
                                </pre>
                              </Typography>
                            )}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {!results.success && results.error && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        {results.error}
                      </Alert>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Tips Section */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Tips for Better Queries
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              <strong>Be Specific:</strong> Instead of "get data", try "get the last 10 blog posts"
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Include Numbers:</strong> Specify how many results you want: "show 5 recent commits"
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Use Filters:</strong> Add conditions like "posts containing 'AI'" or "users created after 2023"
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" gutterBottom>
              <strong>Natural Language:</strong> Write as you would ask a person: "What's the weather like in Paris?"
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>API Context:</strong> The AI understands your API type and will suggest appropriate endpoints
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Iteration:</strong> If results aren't what you expected, refine your query and try again
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default QueryInterface; 