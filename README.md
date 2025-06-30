# 🚀 ApiFlexy - AI-Powered API Connector Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://nightwingteam.github.io/apiflexy/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1.1-green.svg)](https://flask.palletsprojects.com/)

## 🌟 Live Demo

**🎉 ApiFlexy is now live and publicly accessible!**

- **🌐 Live Demo**: https://nightwingteam.github.io/apiflexy/ *(Public access - no authentication required)*
- **💻 Local Development**: http://localhost:3000 *(For full backend functionality)*
- **🔧 Backend API**: http://localhost:8000 *(Local development)*

### 📱 Mobile-First Design
ApiFlexy is **100% mobile responsive** with adaptive layouts, touch-friendly interfaces, and optimized performance across all devices.

## ✨ What's New in Latest Release

### 🔥 Critical Fixes Completed
- ✅ **134+ API Providers**: All providers now loading correctly
- ✅ **Python 3.13 Compatible**: Upgraded SQLAlchemy, Flask, and all dependencies
- ✅ **Database Issues Resolved**: Safe table creation with conflict handling
- ✅ **Mobile Responsive**: Complete mobile-first design implementation
- ✅ **Production Ready**: Optimized builds and deployment configuration
- ✅ **Public Deployment**: Now live on GitHub Pages with no authentication barriers

### 🎯 Key Features
- **134+ Pre-configured API Providers** across 15+ categories
- **Natural Language Queries** - Ask questions in plain English
- **Smart API Detection** - Automatically identifies and configures APIs
- **Real-time Testing** - Test connections instantly
- **Mobile-Responsive Design** - Perfect on all screen sizes
- **Professional UI/UX** - Modern Material Design interface

## 🚀 Quick Start

### Option 1: Try Live Demo (Instant Access)
**Visit**: https://nightwingteam.github.io/apiflexy/

No setup required! Explore the interface, browse API providers, and test the UI immediately.

### Option 2: One-Command Local Setup (Full Features)
```bash
git clone https://github.com/Nightwingteam/apiflexy.git
cd apiflexy
./start-phase1.sh
```

### Option 3: Manual Setup
```bash
# Initial setup
./setup.sh

# Backend
cd backend
source venv/bin/activate
python app.py

# Frontend (new terminal)
cd frontend
npm start
```

**Local URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

**📚 Note**: All scripts and detailed documentation are organized in the [`docs/`](docs/) directory.

## 📊 System Status

| Component | Status | URL | Details |
|-----------|--------|-----|---------|
| 🌐 Live Demo | ✅ **PUBLIC** | https://nightwingteam.github.io/apiflexy/ | GitHub Pages, No auth required |
| 🔧 Local Backend | ✅ **READY** | http://localhost:8000 | Flask 3.1.1, Python 3.13 |
| 📡 API Providers | ✅ **134+ Active** | `/api/providers` | All categories working |
| 📱 Mobile UI | ✅ **Optimized** | All breakpoints | Touch-friendly design |
| 🚀 Production Build | ✅ **DEPLOYED** | 570KB gzipped | Optimized performance |

## 🎯 Supported API Categories

ApiFlexy supports **134+ API providers** across these categories:

- 🌐 **Social Media**: Twitter, Facebook, Instagram, LinkedIn, Discord
- ☁️ **Cloud Services**: AWS, Google Cloud, Azure, DigitalOcean  
- 💻 **Developer Tools**: GitHub, GitLab, Jira, Confluence
- 💰 **E-commerce**: Shopify, Stripe, PayPal, Amazon
- 🗞️ **News & Media**: NewsAPI, Reddit, YouTube, Spotify
- 🤖 **AI/ML**: OpenAI, Anthropic, Hugging Face, Stability AI
- 🌤️ **Weather**: OpenWeatherMap, WeatherAPI, AccuWeather
- 📊 **Analytics**: Google Analytics, Mixpanel, Amplitude
- 🎮 **Gaming**: Steam, Riot Games, Twitch
- 🏠 **Real Estate**: Zillow, Realtor.com
- 💼 **Business**: Salesforce, HubSpot, Mailchimp
- 🎵 **Music**: Spotify, Apple Music, SoundCloud
- 📺 **Video**: YouTube, Vimeo, Netflix API
- 🏥 **Health**: Fitbit, Strava, Apple Health
- 🏛️ **Government**: Congress.gov, Regulations.gov

## 💡 How It Works

1. **🔍 Discover**: Browse 134+ pre-configured API providers
2. **🔗 Connect**: Add your API credentials securely  
3. **💬 Query**: Ask questions in natural language
4. **🤖 AI Processing**: ApiFlexy interprets your query intelligently
5. **📊 Results**: Get formatted data instantly

### Example Queries
- *"Get the weather in New York"*
- *"Show me trending tweets about AI"*
- *"List my GitHub repositories"*
- *"Find restaurants near me"*
- *"Get Bitcoin price"*

## 🛠️ Technical Stack

### Frontend
- **React 18** with hooks and modern patterns
- **Material-UI (MUI)** for professional design
- **Axios** for API communication
- **React Query** for data management
- **Responsive Design** for all devices

### Backend  
- **Flask 3.1.1** with Python 3.13 support
- **SQLAlchemy 2.0.41** for database management
- **SQLite** for local development
- **CORS** enabled for frontend communication
- **RESTful API** design

## 📱 Mobile Experience

ApiFlexy features a **complete mobile-responsive design**:

- **📱 Mobile Layout**: Dedicated mobile navigation with drawer
- **👆 Touch-Friendly**: Optimized button sizes and interactions  
- **📊 Responsive Tables**: Horizontal scroll on small screens
- **🎨 Adaptive UI**: Typography and spacing scale perfectly
- **⚡ Performance**: Optimized loading and rendering

## 🔧 Development

### Prerequisites
- Python 3.13+
- Node.js 16+
- npm or yarn

### Local Development
```bash
# Install dependencies
cd backend && pip install -r requirements.txt
cd ../frontend && npm install

# Start development servers
./start-phase1.sh
```

### Building for Production
```bash
cd frontend
npm run build
```

## 🚀 Deployment

### GitHub Pages (Current)
The live demo is automatically deployed to GitHub Pages via GitHub Actions.

**Live URL**: https://nightwingteam.github.io/apiflexy/

### Manual Deployment
```bash
# Deploy to GitHub Pages (symlinked script)
./deploy-github-pages.sh

# Or use the full path
./docs/scripts/deploy-github-pages.sh
```

### Alternative Deployments
- **Netlify**: Static frontend deployment
- **Railway**: Modern cloud deployment
- **Docker**: Containerized deployment
- **Self-hosted**: Any static hosting service

**📚 All Scripts**: Complete automation scripts are available in [`docs/scripts/`](docs/scripts/)

## 📋 API Documentation

### Core Endpoints
- `GET /api/providers` - List all API providers (134+)
- `GET /api/providers/categories` - Providers by category
- `POST /api/connections` - Create API connection
- `POST /api/query` - Process natural language query
- `GET /api/history` - Query history
- `POST /api/test-connection` - Test API connection

### Example Response
```json
{
  "providers": 134,
  "categories": 15,
  "status": "operational",
  "version": "1.0.0"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📚 Documentation

All documentation has been organized in the [`docs/`](docs/) directory:

- **[📚 Complete Documentation Index](docs/README.md)** - All guides and documentation
- **[🚀 Quickstart Guide](docs/QUICKSTART.md)** - Get started in 5 minutes
- **[🛠️ Deployment Guides](docs/)** - Multiple deployment options
- **[🤝 Contributing](docs/CONTRIBUTING.md)** - How to contribute
- **[⚖️ Commercial License](docs/COMMERCIAL-LICENSE.md)** - Licensing information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **🌐 Live Demo**: https://nightwingteam.github.io/apiflexy/
- **🐛 Issues**: [GitHub Issues](https://github.com/Nightwingteam/apiflexy/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/Nightwingteam/apiflexy/discussions)
- **📧 Contact**: Contact@nightwingdigital.co

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Nightwingteam/apiflexy&type=Date)](https://star-history.com/#Nightwingteam/apiflexy&Date)

---

**Made with ❤️ by the ApiFlexy Team**

*Transform your API interactions with the power of AI - now live and publicly accessible!*

**🌍 Try it now**: https://nightwingteam.github.io/apiflexy/
