// Mock data for static deployment when backend is not available

export const mockProviders = [
  // AI/ML Providers
  { id: 1, key: 'openai', name: 'OpenAI', category: 'AI/ML', description: 'GPT models and AI services', status: 'active' },
  { id: 2, key: 'anthropic', name: 'Anthropic', category: 'AI/ML', description: 'Claude AI assistant', status: 'active' },
  { id: 3, key: 'huggingface', name: 'Hugging Face', category: 'AI/ML', description: 'ML models and datasets', status: 'active' },
  { id: 4, key: 'stability', name: 'Stability AI', category: 'AI/ML', description: 'Image generation models', status: 'active' },
  
  // Developer Tools
  { id: 5, key: 'github', name: 'GitHub', category: 'Developer Tools', description: 'Git repositories and code management', status: 'active' },
  { id: 6, key: 'gitlab', name: 'GitLab', category: 'Developer Tools', description: 'DevOps platform', status: 'active' },
  { id: 7, key: 'jira', name: 'Jira', category: 'Developer Tools', description: 'Issue tracking and project management', status: 'active' },
  { id: 8, key: 'confluence', name: 'Confluence', category: 'Developer Tools', description: 'Team collaboration and documentation', status: 'active' },
  
  // Cloud Services
  { id: 9, key: 'aws', name: 'Amazon Web Services', category: 'Cloud Services', description: 'Cloud computing platform', status: 'active' },
  { id: 10, key: 'gcp', name: 'Google Cloud Platform', category: 'Cloud Services', description: 'Google cloud services', status: 'active' },
  { id: 11, key: 'azure', name: 'Microsoft Azure', category: 'Cloud Services', description: 'Microsoft cloud platform', status: 'active' },
  { id: 12, key: 'digitalocean', name: 'DigitalOcean', category: 'Cloud Services', description: 'Simple cloud hosting', status: 'active' },
  
  // Social Media
  { id: 13, key: 'twitter', name: 'Twitter/X', category: 'Social Media', description: 'Social media platform', status: 'active' },
  { id: 14, key: 'facebook', name: 'Facebook', category: 'Social Media', description: 'Social networking platform', status: 'active' },
  { id: 15, key: 'instagram', name: 'Instagram', category: 'Social Media', description: 'Photo and video sharing', status: 'active' },
  { id: 16, key: 'linkedin', name: 'LinkedIn', category: 'Social Media', description: 'Professional networking', status: 'active' },
  { id: 17, key: 'discord', name: 'Discord', category: 'Social Media', description: 'Chat and voice communication', status: 'active' },
  
  // E-commerce
  { id: 18, key: 'shopify', name: 'Shopify', category: 'E-commerce', description: 'E-commerce platform', status: 'active' },
  { id: 19, key: 'stripe', name: 'Stripe', category: 'E-commerce', description: 'Payment processing', status: 'active' },
  { id: 20, key: 'paypal', name: 'PayPal', category: 'E-commerce', description: 'Digital payments', status: 'active' },
  { id: 21, key: 'amazon', name: 'Amazon', category: 'E-commerce', description: 'E-commerce and cloud services', status: 'active' },
  
  // News & Media
  { id: 22, key: 'newsapi', name: 'NewsAPI', category: 'News & Media', description: 'News articles and headlines', status: 'active' },
  { id: 23, key: 'reddit', name: 'Reddit', category: 'News & Media', description: 'Social news and discussion', status: 'active' },
  { id: 24, key: 'youtube', name: 'YouTube', category: 'News & Media', description: 'Video sharing platform', status: 'active' },
  { id: 25, key: 'spotify', name: 'Spotify', category: 'News & Media', description: 'Music streaming service', status: 'active' },
  
  // Weather
  { id: 26, key: 'openweathermap', name: 'OpenWeatherMap', category: 'Weather', description: 'Weather data and forecasts', status: 'active' },
  { id: 27, key: 'weatherapi', name: 'WeatherAPI', category: 'Weather', description: 'Real-time weather information', status: 'active' },
  { id: 28, key: 'accuweather', name: 'AccuWeather', category: 'Weather', description: 'Weather forecasting service', status: 'active' },
  
  // Analytics
  { id: 29, key: 'googleanalytics', name: 'Google Analytics', category: 'Analytics', description: 'Web analytics service', status: 'active' },
  { id: 30, key: 'mixpanel', name: 'Mixpanel', category: 'Analytics', description: 'Product analytics platform', status: 'active' },
  { id: 31, key: 'amplitude', name: 'Amplitude', category: 'Analytics', description: 'Digital analytics platform', status: 'active' },
  
  // Gaming
  { id: 32, key: 'steam', name: 'Steam', category: 'Gaming', description: 'Gaming platform and store', status: 'active' },
  { id: 33, key: 'riot', name: 'Riot Games', category: 'Gaming', description: 'Game developer and publisher', status: 'active' },
  { id: 34, key: 'twitch', name: 'Twitch', category: 'Gaming', description: 'Live streaming platform', status: 'active' },
  
  // Real Estate
  { id: 35, key: 'zillow', name: 'Zillow', category: 'Real Estate', description: 'Real estate marketplace', status: 'active' },
  { id: 36, key: 'realtor', name: 'Realtor.com', category: 'Real Estate', description: 'Real estate listings', status: 'active' },
  
  // Business
  { id: 37, key: 'salesforce', name: 'Salesforce', category: 'Business', description: 'CRM and business automation', status: 'active' },
  { id: 38, key: 'hubspot', name: 'HubSpot', category: 'Business', description: 'Marketing and sales platform', status: 'active' },
  { id: 39, key: 'mailchimp', name: 'Mailchimp', category: 'Business', description: 'Email marketing platform', status: 'active' },
  
  // Music
  { id: 40, key: 'applemusic', name: 'Apple Music', category: 'Music', description: 'Music streaming service', status: 'active' },
  { id: 41, key: 'soundcloud', name: 'SoundCloud', category: 'Music', description: 'Audio sharing platform', status: 'active' },
  
  // Video
  { id: 42, key: 'vimeo', name: 'Vimeo', category: 'Video', description: 'Video hosting platform', status: 'active' },
  { id: 43, key: 'netflix', name: 'Netflix', category: 'Video', description: 'Streaming entertainment service', status: 'active' },
  
  // Health
  { id: 44, key: 'fitbit', name: 'Fitbit', category: 'Health', description: 'Fitness tracking platform', status: 'active' },
  { id: 45, key: 'strava', name: 'Strava', category: 'Health', description: 'Fitness and activity tracking', status: 'active' },
  { id: 46, key: 'applehealth', name: 'Apple Health', category: 'Health', description: 'Health and fitness data', status: 'active' },
  
  // Government
  { id: 47, key: 'congress', name: 'Congress.gov', category: 'Government', description: 'U.S. legislative information', status: 'active' },
  { id: 48, key: 'regulations', name: 'Regulations.gov', category: 'Government', description: 'Federal regulatory information', status: 'active' },
];

export const mockConnections = [
  {
    id: 1,
    name: 'OpenAI GPT-4',
    base_url: 'https://api.openai.com/v1',
    auth_type: 'bearer',
    created_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: 2,
    name: 'GitHub API',
    base_url: 'https://api.github.com',
    auth_type: 'bearer',
    created_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: 3,
    name: 'Weather API',
    base_url: 'https://api.openweathermap.org/data/2.5',
    auth_type: 'api_key',
    created_at: new Date().toISOString(),
    is_active: true
  }
];

export const mockHistory = [
  {
    id: 1,
    user_query: 'Get current weather in New York',
    interpreted_query: '{"endpoint": "/weather", "params": {"q": "New York"}}',
    api_endpoint: 'https://api.openweathermap.org/data/2.5/weather',
    status: 'success',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
  },
  {
    id: 2,
    user_query: 'List my GitHub repositories',
    interpreted_query: '{"endpoint": "/user/repos", "params": {}}',
    api_endpoint: 'https://api.github.com/user/repos',
    status: 'success',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
  },
  {
    id: 3,
    user_query: 'Generate a creative story',
    interpreted_query: '{"endpoint": "/chat/completions", "params": {"model": "gpt-4"}}',
    api_endpoint: 'https://api.openai.com/v1/chat/completions',
    status: 'success',
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
  },
  {
    id: 4,
    user_query: 'Get trending topics',
    interpreted_query: '{"endpoint": "/trending", "params": {}}',
    api_endpoint: 'https://api.twitter.com/2/trends',
    status: 'error',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
  }
];

export const isBackendAvailable = async () => {
  try {
    const response = await fetch(`${window.location.origin}/api/providers`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const getMockData = () => ({
  providers: mockProviders,
  connections: mockConnections,
  history: mockHistory
}); 