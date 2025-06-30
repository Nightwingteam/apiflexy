import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Paper,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  PlayArrow as PlayIcon,
  Code as CodeIcon,
  Api as ApiIcon,
  Extension as IntegrationIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`documentation-tabpanel-${index}`}
      aria-labelledby={`documentation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const quickStartSteps = [
  {
    title: '1. Launch Dashboard',
    description: 'Access the main dashboard to start managing your API connections.',
    code: 'Navigate to /dashboard'
  },
  {
    title: '2. Add API Connection',
    description: 'Choose from 134+ pre-configured API providers or add custom endpoints.',
    code: `{
  "name": "My Weather API",
  "base_url": "https://api.openweathermap.org/data/2.5",
  "auth_type": "api_key",
  "auth_data": {
    "api_key": "your-api-key-here",
    "api_key_header": "appid"
  }
}`
  },
  {
    title: '3. Test Connection',
    description: 'Verify your API connection works before integrating.',
    code: 'Click "Test Connection" button in the dashboard'
  },
  {
    title: '4. Query with Natural Language',
    description: 'Use the Query Interface to ask questions in plain English.',
    code: `Examples:
- "Get current weather in New York"
- "Show latest 10 technology news"
- "List trending products on Shopify"`
  },
  {
    title: '5. Integrate with HTML',
    description: 'Add the SDK script and use data attributes in your HTML.',
    code: `<script src="${window.location.origin}/api-connector-sdk.js"></script>
<div data-api-query="Get weather in NYC">Loading...</div>`
  }
];

const sdkMethods = [
  {
    method: 'Auto-loading',
    description: 'Automatically load and display API data when the page loads.',
    example: `<div data-api-query="Get latest news" data-api-limit="5">
  Loading latest news...
</div>`,
    attributes: [
      'data-api-query: Your natural language query',
      'data-api-limit: Number of results (optional)',
      'data-api-template: Custom template name (optional)',
      'data-api-cache: Cache duration in seconds (optional)'
    ]
  },
  {
    method: 'Button-triggered',
    description: 'Load API data when user clicks a button.',
    example: `<button data-api-action="query" 
        data-api-query="Show trending products"
        data-api-target="#results">
  Load Products
</button>
<div id="results"></div>`,
    attributes: [
      'data-api-action: Set to "query"',
      'data-api-query: Your natural language query',
      'data-api-target: CSS selector for result container',
      'data-api-loading: Custom loading text (optional)'
    ]
  },
  {
    method: 'Form-based',
    description: 'Allow users to enter custom queries through a form.',
    example: `<form data-api-form data-api-target="#search-results">
  <input name="query" placeholder="Ask anything..." required>
  <button type="submit">Search</button>
</form>
<div id="search-results"></div>`,
    attributes: [
      'data-api-form: Enable form-based queries',
      'data-api-target: CSS selector for result container',
      'name="query": Input field name must be "query"',
      'data-api-placeholder: Custom placeholder text (optional)'
    ]
  }
];

const apiCategories = [
  {
    name: 'AI & Machine Learning',
    count: 15,
    providers: ['OpenAI', 'DeepSeek', 'Anthropic', 'Hugging Face', 'Stability AI'],
    description: 'Text generation, image creation, and ML model APIs'
  },
  {
    name: 'Social Media',
    count: 12,
    providers: ['Twitter/X', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok'],
    description: 'Social media platforms and content APIs'
  },
  {
    name: 'E-commerce',
    count: 10,
    providers: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Amazon'],
    description: 'Online store and payment processing APIs'
  },
  {
    name: 'News & Media',
    count: 8,
    providers: ['NewsAPI', 'Guardian', 'Reuters', 'Associated Press'],
    description: 'News aggregation and media content APIs'
  },
  {
    name: 'Weather & Environment',
    count: 6,
    providers: ['OpenWeatherMap', 'AccuWeather', 'WeatherAPI'],
    description: 'Weather forecasts and environmental data'
  },
  {
    name: 'Developer Tools',
    count: 14,
    providers: ['GitHub', 'GitLab', 'Bitbucket', 'Stack Overflow'],
    description: 'Development platforms and coding APIs'
  }
];

function Documentation() {
  const [tabValue, setTabValue] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState('getting-started');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Documentation
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Complete guide to using API Connector AI - from setup to advanced integration techniques.
          </Typography>
        </Box>

        {/* Quick Navigation */}
        <Paper elevation={1} sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Quick Start" icon={<PlayIcon />} />
            <Tab label="SDK Reference" icon={<CodeIcon />} />
            <Tab label="API Categories" icon={<ApiIcon />} />
            <Tab label="Authentication" icon={<SecurityIcon />} />
            <Tab label="Best Practices" icon={<SpeedIcon />} />
          </Tabs>
        </Paper>

        {/* Quick Start Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Quick Start Guide
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Get up and running with API Connector AI in just 5 minutes.
          </Typography>

          <Grid container spacing={3}>
            {quickStartSteps.map((step, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {step.description}
                    </Typography>
                    <Paper elevation={0} sx={{ backgroundColor: 'grey.50' }}>
                      <SyntaxHighlighter
                        language={step.code.includes('{') ? 'json' : 'html'}
                        style={atomOneDark}
                        customStyle={{
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                        }}
                      >
                        {step.code}
                      </SyntaxHighlighter>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* SDK Reference Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            JavaScript SDK Reference
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Complete reference for the API Connector AI JavaScript SDK with all integration methods.
          </Typography>

          <Alert severity="info" sx={{ mb: 4 }}>
            <Typography variant="body2">
              <strong>SDK URL:</strong> {window.location.origin}/api-connector-sdk.js
              <br />
              Include this script in your HTML before using any data attributes.
            </Typography>
          </Alert>

          {sdkMethods.map((method, index) => (
            <Accordion
              key={index}
              expanded={expandedAccordion === `sdk-${index}`}
              onChange={handleAccordionChange(`sdk-${index}`)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {method.method}
                  </Typography>
                  <Chip
                    label="Method"
                    size="small"
                    color="primary"
                    sx={{ ml: 2 }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {method.description}
                </Typography>
                
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Example:
                </Typography>
                <Paper elevation={0} sx={{ backgroundColor: 'grey.50', mb: 3 }}>
                  <SyntaxHighlighter
                    language="html"
                    style={atomOneDark}
                    customStyle={{
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {method.example}
                  </SyntaxHighlighter>
                </Paper>

                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Attributes:
                </Typography>
                <List dense>
                  {method.attributes.map((attr, attrIndex) => (
                    <ListItem key={attrIndex} sx={{ pl: 0 }}>
                      <ListItemIcon>
                        <CheckIcon color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={attr} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        {/* API Categories Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            API Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Explore our 134+ pre-configured API providers across 27+ industries.
          </Typography>

          <Grid container spacing={3}>
            {apiCategories.map((category, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                        {category.name}
                      </Typography>
                      <Chip
                        label={`${category.count} APIs`}
                        color="primary"
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {category.description}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Popular Providers:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {category.providers.map((provider, providerIndex) => (
                        <Chip
                          key={providerIndex}
                          label={provider}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<ApiIcon />}>
                      View All APIs
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Authentication Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Authentication Methods
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Learn about supported authentication methods and how to configure them securely.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    API Key Authentication
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Most common authentication method using API keys in headers or query parameters.
                  </Typography>
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneDark}
                    customStyle={{
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {`{
  "auth_type": "api_key",
  "auth_data": {
    "api_key": "your-api-key",
    "api_key_header": "X-API-Key"
  }
}`}
                  </SyntaxHighlighter>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Bearer Token Authentication
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    OAuth and JWT token-based authentication for secure API access.
                  </Typography>
                  <SyntaxHighlighter
                    language="json"
                    style={atomOneDark}
                    customStyle={{
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {`{
  "auth_type": "bearer",
  "auth_data": {
    "token": "your-bearer-token"
  }
}`}
                  </SyntaxHighlighter>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Alert severity="warning" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>Security Note:</strong> Always keep your API keys secure. Never expose them in client-side code or public repositories.
            </Typography>
          </Alert>
        </TabPanel>

        {/* Best Practices Tab */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Best Practices
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Tips and recommendations for optimal performance and security.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Performance Optimization
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Use caching with data-api-cache attribute to reduce API calls" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Limit results with data-api-limit to improve loading times" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Use specific queries instead of broad requests" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Implement error handling for failed API requests" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Security Guidelines
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Store API keys securely on the server side" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Use HTTPS for all API communications" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Regularly rotate API keys and tokens" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                      <ListItemText primary="Monitor API usage and set up alerts for unusual activity" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Quick Links */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Need More Help?
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<IntegrationIcon />}
              href="/integration"
            >
              Integration Guide
            </Button>
            <Button
              variant="outlined"
              startIcon={<ApiIcon />}
              href="/explorer"
            >
              API Explorer
            </Button>
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              href="/dashboard"
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Documentation; 