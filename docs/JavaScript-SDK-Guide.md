# API Connector AI - JavaScript SDK Guide

The JavaScript SDK allows you to easily integrate API data into your existing HTML websites without creating new files or complex setups. Just include one script tag and start making natural language API queries!

## Quick Start

### Method 1: Auto-Initialize (Easiest)

Add the SDK to your HTML page with your API key:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Weather Dashboard</h1>
    
    <!-- Auto-load weather data -->
    <div data-api-query="Get current weather in New York" 
         data-connection-id="weather-connection">
        Loading weather data...
    </div>
    
    <!-- Load the SDK and auto-initialize -->
    <script src="http://localhost:3000/api-connector-sdk.js" 
            data-api-key="your-api-key-here"
            data-base-url="http://localhost:5000"
            data-debug="true"></script>
</body>
</html>
```

### Method 2: Manual Initialize

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>API Data Dashboard</h1>
    
    <button id="fetch-data">Get GitHub Repos</button>
    <div id="results"></div>
    
    <script src="http://localhost:3000/api-connector-sdk.js"></script>
    <script>
        // Initialize the SDK
        const apiConnector = new APIConnectorAI('your-api-key', {
            baseUrl: 'http://localhost:5000',
            debug: true
        });
        
        // Use it programmatically
        document.getElementById('fetch-data').addEventListener('click', async () => {
            try {
                const data = await apiConnector.query('Get my GitHub repositories');
                document.getElementById('results').innerHTML = 
                    `<h3>Found ${data.result.length} repositories:</h3>
                     <ul>${data.result.map(repo => `<li>${repo.name}</li>`).join('')}</ul>`;
            } catch (error) {
                console.error('Error:', error);
            }
        });
    </script>
</body>
</html>
```

## Features Overview

### 🔥 **150+ API Providers Supported**
- **AI & Machine Learning**: OpenAI, DeepSeek, Anthropic, Hugging Face, Stability AI, Perplexity, Groq, Together AI
- **Social Media**: Twitter, Facebook, Instagram, LinkedIn, Discord, Slack, Telegram, WhatsApp
- **Development**: GitHub, GitLab, Bitbucket, Jira, Confluence
- **E-commerce**: Shopify, WooCommerce, Stripe, PayPal, Amazon
- **Cloud Services**: AWS, Google Cloud, Azure, DigitalOcean
- **And 20+ more categories with 150+ total providers!

### 🚀 **Zero Setup Integration**
- No complex configuration files
- No server setup required
- Works with any existing HTML website
- One script tag and you're ready to go

### 🧠 **Natural Language Queries**
- "Get weather in New York"
- "Show my GitHub repositories"
- "Get latest tweets about AI"
- "Find restaurants near me"

## Data Attributes (HTML-First Approach)

### Auto-Loading Data

```html
<!-- Automatically loads and displays data when page loads -->
<div data-api-query="Get current weather in London" 
     data-connection-id="weather-api"
     data-template="Temperature: {{result.main.temp}}°F">
</div>
```

### Interactive Buttons

```html
<!-- Button that fetches data on click -->
<button data-api-action="query" 
        data-api-query="Get my latest GitHub commits"
        data-target="#commit-results">
    Load My Commits
</button>
<div id="commit-results"></div>
```

### Forms

```html
<!-- Form for dynamic queries -->
<form data-api-form data-target="#search-results">
    <input type="text" name="query" placeholder="Enter your query..." required>
    <button type="submit">Search APIs</button>
</form>
<div id="search-results"></div>
```

## Real-World Examples

### 1. Weather Dashboard

```html
<!DOCTYPE html>
<html>
<head>
    <title>Weather Dashboard</title>
    <style>
        .weather-card {
            background: linear-gradient(135deg, #74b9ff, #0984e3);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <h1>🌤️ Weather Dashboard</h1>
    
    <!-- Multiple cities -->
    <div class="weather-card" 
         data-api-query="Get current weather in New York" 
         data-template="<h3>New York</h3><p>{{result.main.temp}}°F - {{result.weather.0.description}}</p>">
    </div>
    
    <div class="weather-card" 
         data-api-query="Get current weather in London" 
         data-template="<h3>London</h3><p>{{result.main.temp}}°F - {{result.weather.0.description}}</p>">
    </div>
    
    <div class="weather-card" 
         data-api-query="Get current weather in Tokyo" 
         data-template="<h3>Tokyo</h3><p>{{result.main.temp}}°F - {{result.weather.0.description}}</p>">
    </div>
    
    <script src="http://localhost:3000/api-connector-sdk.js" 
            data-api-key="your-api-key"></script>
</body>
</html>
```

### 2. GitHub Portfolio

```html
<!DOCTYPE html>
<html>
<head>
    <title>My GitHub Portfolio</title>
    <style>
        .repo-card {
            border: 1px solid #ddd;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>👨‍💻 My GitHub Projects</h1>
    
    <!-- Auto-load repositories -->
    <div data-api-query="Get my public GitHub repositories" 
         data-template="
         {{#each result}}
         <div class='repo-card'>
             <h3>{{name}}</h3>
             <p>{{description}}</p>
             <p>⭐ {{stargazers_count}} stars | 🍴 {{forks_count}} forks</p>
             <a href='{{html_url}}' target='_blank'>View on GitHub</a>
         </div>
         {{/each}}">
        Loading repositories...
    </div>
    
    <script src="http://localhost:3000/api-connector-sdk.js" 
            data-api-key="your-api-key"></script>
</body>
</html>
```

### 3. E-commerce Product Search

```html
<!DOCTYPE html>
<html>
<head>
    <title>Product Search</title>
</head>
<body>
    <h1>🛍️ Product Search</h1>
    
    <!-- Search form -->
    <form data-api-form data-target="#products">
        <input type="text" name="query" placeholder="Search for products..." required>
        <button type="submit">Search</button>
    </form>
    
    <!-- Results will appear here -->
    <div id="products"></div>
    
    <script src="http://localhost:3000/api-connector-sdk.js" 
            data-api-key="your-api-key"></script>
</body>
</html>
```

### 4. AI Chat Interface

```html
<!DOCTYPE html>
<html>
<head>
    <title>AI Assistant</title>
    <style>
        .chat-container { max-width: 600px; margin: 0 auto; }
        .message { padding: 10px; margin: 5px 0; border-radius: 10px; }
        .user { background: #007bff; color: white; text-align: right; }
        .ai { background: #f8f9fa; border: 1px solid #dee2e6; }
    </style>
</head>
<body>
    <div class="chat-container">
        <h1>🤖 AI Assistant</h1>
        
        <div id="chat-messages"></div>
        
        <form data-api-form data-target="#chat-messages">
            <input type="text" name="query" placeholder="Ask me anything..." required>
            <button type="submit">Send</button>
        </form>
    </div>
    
    <script src="http://localhost:3000/api-connector-sdk.js" 
            data-api-key="your-api-key"></script>
    
    <script>
        // Customize the response rendering for chat
        window.apiConnector.on('querySuccess', ({ query, data }) => {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML += `
                <div class="message user">You: ${query}</div>
                <div class="message ai">AI: ${data.result}</div>
            `;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    </script>
</body>
</html>
```

### 5. Multi-API Dashboard

```html
<!DOCTYPE html>
<html>
<head>
    <title>Multi-API Dashboard</title>
    <style>
        .dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .widget { padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
    </style>
</head>
<body>
    <h1>📊 Multi-API Dashboard</h1>
    
    <div class="dashboard">
        <!-- Weather Widget -->
        <div class="widget">
            <h3>🌤️ Weather</h3>
            <div data-api-query="Get current weather in San Francisco"></div>
        </div>
        
        <!-- GitHub Widget -->
        <div class="widget">
            <h3>🐙 GitHub</h3>
            <div data-api-query="Get my GitHub profile stats"></div>
        </div>
        
        <!-- News Widget -->
        <div class="widget">
            <h3>📰 Latest News</h3>
            <div data-api-query="Get latest technology news"></div>
        </div>
        
        <!-- Crypto Widget -->
        <div class="widget">
            <h3>₿ Crypto Prices</h3>
            <div data-api-query="Get Bitcoin price"></div>
        </div>
    </div>
    
    <script src="http://localhost:3000/api-connector-sdk.js" 
            data-api-key="your-api-key"></script>
</body>
</html>
```

## Advanced Usage

### Programmatic API

```javascript
// Initialize
const api = new APIConnectorAI('your-api-key', {
    baseUrl: 'http://localhost:5000',
    debug: true,
    cacheExpiry: 600000 // 10 minutes
});

// Make queries
const weatherData = await api.query('Get weather in Paris');
const repos = await api.query('Show my GitHub repositories');
const news = await api.query('Get latest AI news');

// Get available connections
const connections = await api.getConnections();

// Get available providers
const providers = await api.getProviders('AI & Machine Learning');

// Event handling
api.on('querySuccess', ({ query, data }) => {
    console.log(`Query "${query}" succeeded:`, data);
});

api.on('queryError', ({ query, error }) => {
    console.error(`Query "${query}" failed:`, error);
});

// Cache management
api.clearCache();
api.setCacheExpiry(300000); // 5 minutes
```

### Custom Templates

Use Handlebars-style templates for custom data rendering:

```html
<div data-api-query="Get my GitHub repositories" 
     data-template="
     <h3>My Repositories ({{result.length}})</h3>
     {{#each result}}
     <div class='repo'>
         <h4>{{name}}</h4>
         <p>{{description}}</p>
         <span>⭐{{stargazers_count}}</span>
         <span>📝{{language}}</span>
     </div>
     {{/each}}">
</div>
```

## Setup Your API Connections

Before using the SDK, you need to set up your API connections in the API Connector AI platform:

1. **Visit the Platform**: Go to `http://localhost:3000`
2. **Add Connections**: Navigate to "Connections" page
3. **Choose Provider**: Select from 150+ available providers (GitHub, OpenAI, Weather APIs, etc.)
4. **Add Credentials**: Enter your API keys and configure endpoints
5. **Test Connection**: Verify everything works
6. **Use in SDK**: Reference your connection ID in the SDK

## Supported Data Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `data-api-query` | Natural language query | `"Get weather in NYC"` |
| `data-connection-id` | Specific connection to use | `"my-weather-api"` |
| `data-template` | Custom template for rendering | `"Temp: {{result.temp}}°F"` |
| `data-auto-load` | Auto-load on page load | `"true"` (default) or `"false"` |
| `data-api-action` | Button action type | `"query"` |
| `data-target` | Target element selector | `"#results"` |
| `data-api-form` | Mark form for API queries | Just add attribute |

## Error Handling

The SDK automatically handles errors and displays user-friendly messages:

```html
<!-- This will show an error message if the API fails -->
<div data-api-query="Invalid query that will fail">
    This will be replaced with error message if query fails
</div>
```

You can also handle errors programmatically:

```javascript
api.on('queryError', ({ query, error }) => {
    // Custom error handling
    alert(`Failed to execute: ${query}. Error: ${error.message}`);
});
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## Next Steps

1. **Set up your API connections** in the main platform
2. **Copy the SDK script tag** to your HTML pages
3. **Add data attributes** to elements where you want API data
4. **Customize with templates** for perfect data presentation
5. **Deploy to production** by updating the base URL

## Need Help?

- Check the main platform at `http://localhost:3000`
- View your API connections and test queries
- Browse the 150+ supported API providers
- See real-time query history and debug information

The JavaScript SDK makes it incredibly easy to bring API data into your existing websites without any complex setup or new file creation! 