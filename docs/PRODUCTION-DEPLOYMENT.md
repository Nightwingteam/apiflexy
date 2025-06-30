# API Connector AI - Production Deployment Guide

## 🚀 Quick Production Deployment

### Prerequisites
- Python 3.8+ with pip
- Node.js 16+ with npm
- Git
- curl (for health checks)

### One-Command Deployment
```bash
./deploy-production.sh
```

This script will:
- ✅ Stop any existing development servers
- ✅ Set up backend in production mode (port 8000)
- ✅ Build and serve frontend optimized build (port 3000)
- ✅ Initialize production database
- ✅ Start both servers with proper logging
- ✅ Perform health checks

### Access Your Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Health Check**: http://localhost:8000/api/providers

## 🛠 Manual Production Setup

### Backend Production Setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set production environment
export FLASK_ENV=production
export PORT=8000

# Initialize database
python3 -c "
import os
os.environ['FLASK_ENV'] = 'production'
from app import app, db
with app.app_context():
    db.create_all()
"

# Start production server
./start-production.sh
```

### Frontend Production Setup
```bash
cd frontend

# Install dependencies
npm install

# Build for production
./build-production.sh

# Start production server
cd build
node server.js
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env or environment)
```bash
FLASK_ENV=production
SECRET_KEY=your-super-secure-secret-key-here
PORT=8000
HOST=0.0.0.0
DATABASE_URL=sqlite:///production_api_connector.db
```

#### Frontend (environment)
```bash
NODE_ENV=production
REACT_APP_API_URL=http://your-domain.com:8000
PORT=3000
```

### Production Security Settings
The application automatically configures:
- ✅ Debug mode disabled
- ✅ CORS properly configured
- ✅ Production database
- ✅ Secure headers
- ✅ Optimized builds

## 📊 Monitoring & Logs

### Log Files
- Backend: `logs/backend.log`
- Frontend: `logs/frontend.log`
- Status: `logs/production-status.txt`

### View Live Logs
```bash
tail -f logs/backend.log logs/frontend.log
```

### Health Checks
```bash
# Backend health
curl http://localhost:8000/api/providers

# Frontend health
curl http://localhost:3000
```

## 🛑 Stop Production Servers
```bash
./stop-production.sh
```

## 🔄 Update Deployment
```bash
# Pull latest changes
git pull

# Redeploy
./stop-production.sh
./deploy-production.sh
```

## 🌐 Domain Deployment

### For Custom Domain (e.g., your-domain.com)

1. **Update Backend CORS**:
   ```bash
   export CORS_ORIGINS=https://your-domain.com
   ```

2. **Update Frontend API URL**:
   ```bash
   export REACT_APP_API_URL=https://your-domain.com:8000
   ```

3. **Use Reverse Proxy (Nginx)**:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       # Backend API
       location /api/ {
           proxy_pass http://localhost:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## 🔒 Production Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Use production database (PostgreSQL/MySQL)
- [ ] Set up SSL/HTTPS certificates
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerting
- [ ] Configure automated backups
- [ ] Set up log rotation
- [ ] Review and secure API endpoints
- [ ] Set up rate limiting
- [ ] Configure proper CORS origins

## 🐳 Docker Deployment (Optional)

### Backend Dockerfile
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "wsgi:app"]
```

### Frontend Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "build/server.js"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - FLASK_ENV=production
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   lsof -ti:8000 | xargs kill -9  # Kill process on port 8000
   lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
   ```

2. **Permission Denied**:
   ```bash
   chmod +x deploy-production.sh stop-production.sh
   chmod +x backend/start-production.sh
   chmod +x frontend/build-production.sh
   ```

3. **Database Issues**:
   ```bash
   # Reset production database
   rm -f backend/production_api_connector.db
   ./deploy-production.sh
   ```

4. **Build Failures**:
   ```bash
   # Clean and rebuild
   rm -rf frontend/node_modules frontend/build
   cd frontend && npm install && npm run build
   ```

### Check Process Status
```bash
ps aux | grep -E "(gunicorn|node.*server.js)"
```

### Check Ports
```bash
netstat -tlnp | grep -E "(3000|8000)"
```

## 📈 Performance Optimization

### Backend
- Uses Gunicorn with 4 workers
- Request timeout: 120 seconds
- Keep-alive connections
- Max requests per worker: 1000

### Frontend
- Optimized production build
- Static file serving
- Gzip compression
- Source maps disabled

## 🎯 Next Steps

1. Set up a reverse proxy (Nginx/Apache)
2. Configure SSL certificates (Let's Encrypt)
3. Set up monitoring (Prometheus/Grafana)
4. Configure log aggregation (ELK Stack)
5. Set up automated backups
6. Implement CI/CD pipeline

---

**🎉 Your API Connector AI is now running in production mode!**

Access your application at: http://localhost:3000 