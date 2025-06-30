import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  Code as CodeIcon,
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon,
  Language as LanguageIcon,
  Extension as IntegrationIcon,
  Rocket as RocketIcon,
  AutoAwesome as AutoAwesomeIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'react-toastify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const integrationSteps = [
  {
    title: 'Include the SDK Script',
    description: 'Add the API Connector AI SDK script to your HTML page.',
    code: `<script src="http://localhost:5001/api-connector-sdk.js"></script>`,
    explanation: 'This script provides all the functionality needed to connect to your APIs using natural language queries.'
  },
  {
    title: 'Add Data Attributes',
    description: 'Use data attributes to specify your queries and display preferences.',
    code: `<div data-api-query="Get latest 5 technology news" 
     data-api-limit="5" 
     data-api-cache="300">
  Loading news...
</div>`,
    explanation: 'The SDK will automatically replace the content with formatted API data.'
  },
  {
    title: 'Customize Display (Optional)',
    description: 'Add custom CSS classes or templates for styling the results.',
    code: `.api-result {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
  background: #f9f9f9;
}

.api-result h3 {
  color: #1976d2;
  margin-bottom: 8px;
}`,
    explanation: 'Style the automatically generated content to match your website design.'
  },
  {
    title: 'Test and Deploy',
    description: 'Open your page in a browser to see the live API data.',
    code: `<!-- Your complete integration -->
<script src="http://localhost:5001/api-connector-sdk.js"></script>
<div data-api-query="Get weather in New York">Loading...</div>`,
    explanation: 'The data will load automatically when the page opens.'
  }
];

const integrationMethods = [
  {
    name: 'Auto-Loading',
    description: 'Content loads automatically when the page opens',
    useCase: 'Perfect for displaying static content like news, weather, or product listings',
    example: `<div data-api-query="Get latest news from TechCrunch" 
     data-api-limit="10"
     class="news-container">
  <p>Loading latest tech news...</p>
</div>`,
    features: ['Automatic loading', 'Caching support', 'Custom templates', 'Error handling']
  },
  {
    name: 'Button-Triggered',
    description: 'Load content when user clicks a button',
    useCase: 'Great for search functionality or on-demand data loading',
    example: `<button data-api-action="query" 
        data-api-query="Show trending GitHub repositories"
        data-api-target="#github-results"
        class="load-btn">
  Load Trending Repos
</button>
<div id="github-results"></div>`,
    features: ['User-controlled loading', 'Target specific containers', 'Loading states', 'Custom triggers']
  },
  {
    name: 'Form-Based',
    description: 'Allow users to enter custom queries',
    useCase: 'Ideal for search interfaces and dynamic query generation',
    example: `<form data-api-form data-api-target="#search-results">
  <input name="query" 
         placeholder="Ask about weather, news, or anything..." 
         required>
  <button type="submit">Search</button>
</form>
<div id="search-results"></div>`,
    features: ['Dynamic queries', 'User input handling', 'Validation support', 'Real-time results']
  }
];

const platformExamples = [
  {
    name: 'WordPress',
    description: 'Add API data to WordPress posts, pages, or widgets',
    code: `<!-- In WordPress post/page editor or widget -->
<script src="http://localhost:5001/api-connector-sdk.js"></script>

<!-- Display latest posts from your connected CMS -->
<div data-api-query="Get latest 5 blog posts" class="wp-api-content">
  Loading content...
</div>

<!-- Add to theme's functions.php to enqueue globally -->
function enqueue_api_connector() {
    wp_enqueue_script('api-connector', 
        'http://localhost:5001/api-connector-sdk.js', 
        array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_api_connector');`,
    tips: [
      'Add the script to your theme header or use wp_enqueue_script',
      'Use WordPress shortcodes to wrap API queries',
      'Consider caching for better performance',
      'Test in staging environment first'
    ]
  },
  {
    name: 'React/Next.js',
    description: 'Integrate with React applications and Next.js projects',
    code: `// Add to your React component
import { useEffect } from 'react';

function APIComponent() {
  useEffect(() => {
    // Load SDK dynamically
    const script = document.createElement('script');
    script.src = 'http://localhost:5001/api-connector-sdk.js';
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div data-api-query="Get weather in San Francisco" 
           data-api-cache="600">
        Loading weather data...
      </div>
    </div>
  );
}

// Or in Next.js pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="http://localhost:5001/api-connector-sdk.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`,
    tips: [
      'Load SDK in useEffect or _document.js',
      'Use ref callbacks for dynamic content',
      'Implement proper cleanup',
      'Handle SSR considerations'
    ]
  },
  {
    name: 'Static HTML',
    description: 'Perfect for static websites and landing pages',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website with API Data</title>
    <style>
        .api-container { 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .api-result { 
            border: 1px solid #ddd; 
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 5px; 
        }
    </style>
</head>
<body>
    <div class="api-container">
        <h1>Welcome to My Site</h1>
        
        <!-- Auto-loading content -->
        <div data-api-query="Get latest cryptocurrency prices" 
             data-api-limit="10" 
             class="crypto-prices">
            Loading crypto prices...
        </div>
        
        <!-- Interactive search -->
        <h2>Search Anything</h2>
        <form data-api-form data-api-target="#results">
            <input name="query" placeholder="Ask about weather, news, etc.">
            <button type="submit">Search</button>
        </form>
        <div id="results"></div>
    </div>
    
    <!-- Load SDK last for better performance -->
    <script src="http://localhost:5001/api-connector-sdk.js"></script>
</body>
</html>`,
    tips: [
      'Load SDK script before closing body tag',
      'Use semantic HTML structure',
      'Add loading indicators',
      'Implement responsive design'
    ]
  }
];

const advancedFeatures = [
  {
    feature: 'Custom Templates',
    description: 'Create custom display templates for your API data',
    example: `<!-- Define a custom template -->
<template id="news-template">
    <article class="news-item">
        <h3>{{title}}</h3>
        <p class="meta">{{publishedAt}} | {{source}}</p>
        <p>{{description}}</p>
        <a href="{{url}}" target="_blank">Read More</a>
    </article>
</template>

<!-- Use the template -->
<div data-api-query="Get latest tech news" 
     data-api-template="news-template">
    Loading news...
</div>`
  },
  {
    feature: 'Error Handling',
    description: 'Handle API errors gracefully with custom error messages',
    example: `<div data-api-query="Get weather data" 
     data-api-error="Sorry, weather data is currently unavailable"
     data-api-retry="true">
    Loading weather...
</div>

<!-- Global error handler -->
<script>
window.addEventListener('api-connector-error', function(event) {
    console.log('API Error:', event.detail);
    // Handle error globally
});
</script>`
  },
  {
    feature: 'Real-time Updates',
    description: 'Automatically refresh data at specified intervals',
    example: `<div data-api-query="Get stock prices" 
     data-api-refresh="30"
     data-api-cache="0">
    Loading live stock data...
</div>

<!-- Refresh every 30 seconds -->`
  },
  {
    feature: 'Conditional Loading',
    description: 'Load different content based on conditions',
    example: `<div data-api-query="Get weather in {{userLocation}}" 
     data-api-condition="userLocation"
     data-api-fallback="Get weather in New York">
    Loading weather for your location...
</div>`
  }
];

function Integration() {
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Integration Guide
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Learn how to integrate API Connector AI into any website with our zero-setup JavaScript SDK. 
            Works with WordPress, React, static HTML, and any web framework.
          </Typography>
        </Box>

        {/* Quick Start Steps */}
        <Paper elevation={1} sx={{ mb: 6, p: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            <RocketIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Quick Start (5 Minutes)
          </Typography>
          
          <Stepper activeStep={activeStep} orientation="vertical">
            {integrationSteps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  
                  <Paper elevation={0} sx={{ backgroundColor: 'grey.50', position: 'relative' }}>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(step.code)}
                      sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                    <SyntaxHighlighter
                      language={step.code.includes('<') ? 'html' : 'css'}
                      style={atomOneDark}
                      customStyle={{
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        paddingTop: '40px',
                      }}
                    >
                      {step.code}
                    </SyntaxHighlighter>
                  </Paper>
                  
                  <Typography variant="body2" sx={{ mt: 2, mb: 2, fontStyle: 'italic' }}>
                    💡 {step.explanation}
                  </Typography>

                  <Box sx={{ mb: 1 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={index === integrationSteps.length - 1}
                      >
                        {index === integrationSteps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {activeStep === integrationSteps.length && (
            <Paper square elevation={0} sx={{ p: 3, backgroundColor: 'success.light', color: 'success.contrastText' }}>
              <Typography variant="h6" gutterBottom>
                🎉 Integration Complete!
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                You've successfully integrated API Connector AI into your website. Your API data should now be loading automatically.
              </Typography>
              <Button onClick={handleReset} variant="contained" color="inherit">
                Start Over
              </Button>
            </Paper>
          )}
        </Paper>

        {/* Integration Methods */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          <IntegrationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Integration Methods
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {integrationMethods.map((method, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {method.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {method.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
                    Use Case: {method.useCase}
                  </Typography>
                  
                  <Paper elevation={0} sx={{ backgroundColor: 'grey.50', position: 'relative', mb: 2 }}>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(method.example)}
                      sx={{ position: 'absolute', top: 4, right: 4, zIndex: 1 }}
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                    <SyntaxHighlighter
                      language="html"
                      style={atomOneDark}
                      customStyle={{
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        paddingTop: '35px',
                      }}
                    >
                      {method.example}
                    </SyntaxHighlighter>
                  </Paper>

                  <Typography variant="subtitle2" gutterBottom>
                    Features:
                  </Typography>
                  <List dense>
                    {method.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ py: 0, pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={feature} 
                          primaryTypographyProps={{ fontSize: '0.875rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Platform-Specific Examples */}
        <Paper elevation={1} sx={{ mb: 6 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="WordPress" icon={<LanguageIcon />} />
            <Tab label="React/Next.js" icon={<CodeIcon />} />
            <Tab label="Static HTML" icon={<LanguageIcon />} />
          </Tabs>

          {platformExamples.map((platform, index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {platform.name} Integration
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {platform.description}
              </Typography>

              <Paper elevation={0} sx={{ backgroundColor: 'grey.50', position: 'relative', mb: 3 }}>
                <IconButton
                  size="small"
                  onClick={() => copyToClipboard(platform.code)}
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                  color="primary"
                >
                  <CopyIcon />
                </IconButton>
                <SyntaxHighlighter
                  language={platform.name === 'React/Next.js' ? 'javascript' : 'html'}
                  style={atomOneDark}
                  customStyle={{
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    paddingTop: '40px',
                  }}
                >
                  {platform.code}
                </SyntaxHighlighter>
              </Paper>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                💡 Tips & Best Practices:
              </Typography>
              <List>
                {platform.tips.map((tip, tipIndex) => (
                  <ListItem key={tipIndex}>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          ))}
        </Paper>

        {/* Advanced Features */}
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Advanced Features
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {advancedFeatures.map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {item.feature}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {item.description}
                  </Typography>
                  
                  <Paper elevation={0} sx={{ backgroundColor: 'grey.50' }}>
                    <SyntaxHighlighter
                      language="html"
                      style={atomOneDark}
                      customStyle={{
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                      }}
                    >
                      {item.example}
                    </SyntaxHighlighter>
                  </Paper>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Performance & Security */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Performance Tips
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Enable caching with data-api-cache attribute" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Use data-api-limit to control response size" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Load SDK script at the end of body tag" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Implement lazy loading for below-fold content" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Security Best Practices
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="API keys are stored securely on the server" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="All API requests are proxied through our backend" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Enable CORS protection for production" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><CheckIcon color="success" /></ListItemIcon>
                    <ListItemText primary="Sanitize all displayed content automatically" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Ready to integrate? 
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Start by setting up your API connections in the dashboard, then follow the integration steps above.
          </Typography>
          <Button 
            variant="contained" 
            href="/dashboard"
            startIcon={<SettingsIcon />}
          >
            Go to Dashboard
          </Button>
        </Alert>
      </Box>
    </Container>
  );
}

export default Integration; 