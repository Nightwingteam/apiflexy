# API Connector AI - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Quick Setup

1. **Clone and Setup**
   ```bash
   # Run the setup script
   ./setup.sh
   ```

2. **Configure Environment (Optional)**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env and add your OpenAI API key for enhanced AI features
   ```

3. **Start the Application**
   
   **Option A: Use start scripts**
   ```bash
   # Terminal 1: Start backend
   ./start-backend.sh
   
   # Terminal 2: Start frontend
   ./start-frontend.sh
   ```
   
   **Option B: Manual start**
   ```bash
   # Terminal 1: Backend
   cd backend
   source venv/bin/activate
   python app.py
   
   # Terminal 2: Frontend
   cd frontend
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 First Steps

### 1. Add Your First API Connection
1. Go to **API Connections** page
2. Click **Add Connection**
3. **Choose from 50+ templates** or add custom API:
   - Browse popular providers (GitHub, Twitter, Spotify, etc.)
   - Browse by category (Social Media, E-commerce, Weather, etc.)
   - Or manually enter API details
4. Fill in your credentials:
   - **API Key**, **Bearer Token**, or **Basic Auth**
   - The template pre-fills URLs and settings

### 2. Test Your Connection
1. Before saving, click **Test Connection**
2. Ensure the test passes before proceeding

### 3. Start Querying
1. Go to **Query Interface**
2. Select your API connection
3. Ask in natural language:
   - "Get my repositories"
   - "Show the last 10 commits"
   - "Get weather for New York"
   - "List all blog posts with 'AI' in the title"

## 📋 Supported APIs (50+)

### Social Media & Communication
- **Twitter API** - tweets, users, search
- **Facebook Graph API** - pages, posts, insights
- **Instagram API** - media, profiles
- **LinkedIn API** - profiles, companies
- **Discord API** - servers, channels, messages
- **Slack API** - workspaces, channels

### Development & Code
- **GitHub API** - repositories, commits, issues
- **GitLab API** - projects, repositories
- **Bitbucket API** - repositories, pipelines
- **Jira API** - issues, projects
- **Confluence API** - pages, spaces

### E-commerce & Finance
- **Shopify API** - stores, products
- **WooCommerce API** - products, orders
- **Stripe API** - payments, billing
- **PayPal API** - payments
- **Coinbase API** - cryptocurrency

### Content Management
- **WordPress API** - posts, pages, media
- **Drupal API** - content, entities
- **Contentful API** - headless CMS
- **Strapi API** - headless CMS

### Weather & Location
- **OpenWeatherMap** - weather, forecasts
- **WeatherAPI** - weather data
- **Mapbox API** - maps, geocoding
- **Google Maps API** - maps services

### Media & Entertainment
- **Spotify API** - music, playlists
- **YouTube API** - videos, channels
- **Twitch API** - streaming platform

### Productivity & Collaboration
- **Zoom API** - video conferencing
- **Microsoft Graph** - Office 365
- **Google Workspace** - G Suite
- **Trello API** - project management
- **Asana API** - team collaboration

### Cloud Services
- **AWS API Gateway** - cloud services
- **Google Cloud API** - GCP resources
- **Azure API** - cloud resources
- **DigitalOcean API** - cloud services

### And many more in categories:
- Analytics & Monitoring
- Database & Storage
- Email & Messaging
- News & Information
- AI & Machine Learning

## 🆘 Troubleshooting

### Backend Issues
- **Port 5000 in use**: Change port in `backend/app.py`
- **Module not found**: Ensure virtual environment is activated
- **Database errors**: Delete `backend/api_connector.db` to reset

### Frontend Issues
- **Port 3000 in use**: React will offer an alternative port
- **npm install fails**: Try deleting `node_modules` and running `npm install` again
- **Proxy errors**: Ensure backend is running on port 5000

### Connection Issues
- **Test connection fails**: Check your API credentials and URL
- **CORS errors**: Ensure backend is running and accessible
- **Rate limiting**: Some APIs have rate limits - wait and try again

## 🔑 Environment Variables

Create `backend/.env` with these optional variables:

```bash
# Flask Configuration
SECRET_KEY=your-super-secret-key-here
FLASK_ENV=development

# OpenAI Configuration (Optional - for enhanced AI query processing)
OPENAI_API_KEY=your-openai-api-key-here

# Database Configuration
DATABASE_URL=sqlite:///api_connector.db
```

## 💡 Tips

1. **Start Simple**: Begin with public APIs that don't require authentication
2. **Read API Docs**: Understanding your API's endpoints helps with better queries
3. **Use Specific Language**: Instead of "get data", try "get the last 5 users"
4. **Check History**: Review past queries to learn what works best
5. **Experiment**: The AI learns your API patterns over time

## 🚀 Advanced Usage

### Custom Headers
Add custom headers in the connection setup for APIs that require special headers.

### OpenAI Integration
Add your OpenAI API key to enable enhanced natural language processing for complex queries.

### Multiple Environments
Use different `.env` files for development, staging, and production environments.

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Review the query history for patterns
3. Test your API connection independently
4. Ensure all dependencies are properly installed

Happy API connecting! 🎉 