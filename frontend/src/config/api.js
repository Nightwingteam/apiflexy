// API Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5001',
    WS_BASE_URL: 'ws://localhost:5001'
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_URL || window.location.origin,
    WS_BASE_URL: process.env.REACT_APP_WS_URL || `ws://${window.location.host}`
  }
};

// Determine current environment
const environment = process.env.NODE_ENV || 'production';

// Export current config
export const API_CONFIG = config[environment];

// API Base URL
export const API_BASE_URL = API_CONFIG.API_BASE_URL;

// WebSocket Base URL
export const WS_BASE_URL = API_CONFIG.WS_BASE_URL;

// Default headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// API endpoints
export const API_ENDPOINTS = {
  CONNECTIONS: '/api/connections',
  PROVIDERS: '/api/providers',
  QUERY: '/api/query',
  HISTORY: '/api/history',
  TEST_CONNECTION: '/api/test-connection',
  PROVIDER_CATEGORIES: '/api/providers/categories',
  SETTINGS: '/api/settings',
  API_KEYS: '/api/api-keys'
};

console.log(`API Configuration loaded for ${environment} environment`);
console.log(`API Base URL: ${API_BASE_URL}`); 