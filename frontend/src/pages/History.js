import React, { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Alert,
  Pagination,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import axios from 'axios';
import ReactJsonView from 'react-json-view';

const fetchHistory = async () => {
  const { data } = await axios.get('/api/history');
  return data;
};

const fetchConnections = async () => {
  const { data } = await axios.get('/api/connections');
  return data;
};

function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: history = [], isLoading: historyLoading } = useQuery('history', fetchHistory);
  const { data: connections = [] } = useQuery('connections', fetchConnections);

  // Create a map of connection IDs to names for easy lookup
  const connectionMap = connections.reduce((acc, conn) => {
    acc[conn.id] = conn.name;
    return acc;
  }, {});

  // Filter history based on search term
  const filteredHistory = history.filter(item =>
    item.user_query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.api_endpoint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate results
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <ErrorIcon />;
      default:
        return <AccessTimeIcon />;
    }
  };

  if (historyLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography>Loading history...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Query History
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View all your previous API queries, their results, and execution details.
      </Typography>

      {/* Search and Stats */}
      <Grid container spacing={3} sx={{ mt: 2, mb: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search queries or endpoints..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">{history.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Total Queries
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {filteredHistory.length === 0 && !historyLoading && (
        <Alert severity="info">
          {searchTerm ? 'No queries match your search criteria.' : 'No query history found. Start making queries to see them here!'}
        </Alert>
      )}

      {/* History Items */}
      <Box sx={{ mb: 3 }}>
        {paginatedHistory.map((item) => (
          <Card key={item.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.user_query}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip
                      icon={getStatusIcon(item.status)}
                      label={item.status.toUpperCase()}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {connectionMap[item.api_connection_id] || 'Unknown Connection'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      •
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {format(new Date(item.created_at), 'MMM dd, yyyy HH:mm')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.api_endpoint}
                  </Typography>
                </Box>
              </Box>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle2">View Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {/* Query Interpretation */}
                    {item.interpreted_query && (
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle2" gutterBottom>
                          Query Interpretation
                        </Typography>
                        <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
                          <ReactJsonView
                            src={JSON.parse(item.interpreted_query)}
                            theme="bright:inverted"
                            collapsed={1}
                            displayDataTypes={false}
                            displayObjectSize={false}
                            enableClipboard={false}
                            style={{ fontSize: '0.75rem' }}
                          />
                        </Box>
                      </Grid>
                    )}

                    {/* Response Data or Error */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        {item.status === 'success' ? 'Response Data' : 'Error Details'}
                      </Typography>
                      <Box sx={{ bgcolor: 'background.default', p: 2, borderRadius: 1, maxHeight: 300, overflow: 'auto' }}>
                        {item.status === 'success' ? (
                          <ReactJsonView
                            src={JSON.parse(item.response_data)}
                            theme="bright:inverted"
                            collapsed={2}
                            displayDataTypes={false}
                            displayObjectSize={false}
                            enableClipboard={true}
                            style={{ fontSize: '0.75rem' }}
                          />
                        ) : (
                          <Typography variant="body2" color="error.main">
                            {item.response_data}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Usage Statistics */}
      {history.length > 0 && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Usage Statistics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main">
                  {history.filter(h => h.status === 'success').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successful Queries
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="error.main">
                  {history.filter(h => h.status === 'error').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Failed Queries
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">
                  {Math.round((history.filter(h => h.status === 'success').length / history.length) * 100)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Success Rate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
}

export default History; 