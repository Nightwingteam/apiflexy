# ApiFlexy 🚀

A universal API management platform by Nightwing Team that allows you to connect to 134+ APIs across 27+ industries using natural language queries and zero-setup HTML integration.

![API Connector AI Dashboard](https://img.shields.io/badge/React-18.x-blue) ![Flask](https://img.shields.io/badge/Flask-2.x-green) ![SQLite](https://img.shields.io/badge/SQLite-3.x-orange) ![Material--UI](https://img.shields.io/badge/Material--UI-5.x-purple)

## 🌐 Live Demo

**🚀 Try ApiFlexy Now:** [https://apiflexy.vercel.app](https://apiflexy.vercel.app)

Experience the full power of ApiFlexy with our live demo. Test API connections, run natural language queries, and explore 134+ pre-configured APIs across 27+ industries.

## ✨ Features

- **🔌 134+ Pre-configured APIs** - Ready-to-use templates for popular services
- **🌍 27+ Industries Supported** - AI/ML, E-commerce, Social Media, Finance, and more
- **🗣️ Natural Language Queries** - Ask questions in plain English
- **⚡ Zero-Setup Integration** - Add to any HTML page with one script tag
- **🔒 Enterprise Security** - Secure credential management and encrypted connections
- **📊 Real-time Analytics** - Monitor API usage and performance
- **🎨 Modern Dashboard** - Beautiful, responsive Material-UI interface

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nightwingteam/apiflexy.git
   cd apiflexy
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   source venv/bin/activate
   python app.py
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```

5. **Access the Application**
   - **🌐 Live Demo**: https://apiflexy.vercel.app
   - Dashboard (Local): http://localhost:3000
   - API Backend (Local): http://localhost:5001

## 🏗️ Project Structure

```
apiflexy/
├── backend/                 # Flask API server
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── venv/              # Python virtual environment
│   └── instance/          # SQLite database (auto-created)
├── frontend/              # React dashboard
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Dashboard pages
│   │   └── App.js        # Main React app
│   ├── public/           # Static assets
│   └── package.json      # Node.js dependencies
├── docs/                 # Documentation
└── README.md            # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///api_connector.db
```

### API Providers

The system comes with 134+ pre-configured API providers. You can add custom providers through the dashboard or by editing the providers configuration.

## 📖 Usage

### 1. Dashboard Interface

Access the main dashboard at `https://apiflexy.vercel.app` (or `http://localhost:3000` for local development) to:
- Browse available API providers
- Create and manage API connections
- Test connections before integration
- View query history and analytics

### 2. Natural Language Queries

Use the Query Interface to ask questions like:
- "Get latest 10 technology news"
- "Show current weather in New York"
- "List trending products on Shopify"

### 3. HTML Integration

Add API data to any website with simple HTML attributes:

```html
<!-- Include the SDK -->
<script src="http://localhost:5001/api-connector-sdk.js"></script>

<!-- Auto-loading content -->
<div data-api-query="Get latest news" data-api-limit="5">
  Loading news...
</div>

<!-- Button-triggered queries -->
<button data-api-action="query" 
        data-api-query="Show weather forecast"
        data-api-target="#weather-results">
  Load Weather
</button>
<div id="weather-results"></div>

<!-- Form-based queries -->
<form data-api-form data-api-target="#search-results">
  <input name="query" placeholder="Ask anything..." required>
  <button type="submit">Search</button>
</form>
<div id="search-results"></div>
```

## 🛠️ Development

### Backend Development

The Flask backend provides RESTful APIs for:
- `/api/providers` - Available API providers
- `/api/connections` - User API connections
- `/api/query` - Natural language query processing
- `/api/history` - Query history
- `/api/test-connection` - Connection testing

### Frontend Development

Built with React 18 and Material-UI 5:
- Modern component architecture
- Responsive design
- Real-time updates
- Comprehensive error handling

### Database

Uses SQLite for development (auto-created). For production, consider PostgreSQL or MySQL.

## 🚀 Deployment

### Development
```bash
# Start both backend and frontend
npm run dev  # If you have a dev script
```

### Production

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy Backend**
   ```bash
   cd backend
   pip install gunicorn
   gunicorn app:app
   ```

3. **Environment Setup**
   - Set `FLASK_ENV=production`
   - Configure proper database (PostgreSQL recommended)
   - Set up reverse proxy (nginx)
   - Enable HTTPS

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

**ApiFlexy License (Non-Commercial Open Source)**

This project is licensed under a custom non-commercial open source license:

✅ **FREE FOR:**
- Personal use
- Educational purposes
- Research projects
- Non-profit organizations
- Open source projects

❌ **REQUIRES PERMISSION FOR:**
- Commercial use
- Integration in commercial products
- Selling or licensing the software
- Commercial derivatives

For commercial licensing and enterprise support, please contact Nightwing Team.

See the [LICENSE](LICENSE) file for complete terms and conditions.

## 🆘 Support

- 📧 Email: Contact@nightwingdigital.co
- 💬 Discord: [Join our community](https://discord.gg/nightwingteam)
- 📖 Documentation: [Full docs](https://github.com/Nightwingteam/apiflexy/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/Nightwingteam/apiflexy/issues)

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- Flask for the lightweight backend framework
- All the API providers that make this platform possible

---

**Made with ❤️ by Nightwing Team**
