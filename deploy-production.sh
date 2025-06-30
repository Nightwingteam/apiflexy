#!/bin/bash
set -e

echo "🚀 Deploying API Connector AI to Production Mode"
echo "=================================================="

# Set production environment variables
export FLASK_ENV=production
export NODE_ENV=production
export FLASK_DEBUG=False

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "README.md" ] || [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    print_error "Please run this script from the api-connector-ai root directory"
    exit 1
fi

print_status "Stopping any existing development servers..."
pkill -f "react-scripts start" 2>/dev/null || true
pkill -f "python.*app.py" 2>/dev/null || true
pkill -f "flask run" 2>/dev/null || true

# Backend Production Setup
echo ""
echo "🔧 Setting up Backend for Production..."
cd backend

print_status "Installing backend dependencies..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt

print_status "Initializing production database..."
python3 -c "
import os
os.environ['FLASK_ENV'] = 'production'
from app import app, db
with app.app_context():
    db.create_all()
    print('Production database initialized successfully')
"

print_status "Starting backend server in production mode..."
export PORT=8000
export HOST=0.0.0.0
nohup ./start-production.sh > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../logs/backend.pid

# Wait for backend to start
sleep 5

# Check if backend is running
if curl -s http://localhost:8000/api/providers > /dev/null; then
    print_status "Backend server started successfully on port 8000"
else
    print_error "Backend server failed to start"
    exit 1
fi

cd ..

# Frontend Production Setup
echo ""
echo "🎨 Building Frontend for Production..."
cd frontend

print_status "Installing frontend dependencies..."
npm install

print_status "Building React application for production..."
./build-production.sh

print_status "Starting frontend server in production mode..."
cd build
export PORT=3000
nohup node server.js > ../../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../../logs/frontend.pid

cd ../..

# Wait for frontend to start
sleep 3

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null; then
    print_status "Frontend server started successfully on port 3000"
else
    print_error "Frontend server failed to start"
    exit 1
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Create production status file
cat > logs/production-status.txt << EOF
API Connector AI - Production Deployment Status
==============================================
Deployment Time: $(date)
Environment: PRODUCTION

Backend:
- Status: Running
- Port: 8000
- PID: $BACKEND_PID
- URL: http://localhost:8000
- Logs: logs/backend.log

Frontend:
- Status: Running  
- Port: 3000
- PID: $FRONTEND_PID
- URL: http://localhost:3000
- Logs: logs/frontend.log

Health Check URLs:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/providers
- Backend Health: http://localhost:8000/

To stop the production servers:
- kill $BACKEND_PID (Backend)
- kill $FRONTEND_PID (Frontend)

Or use: ./stop-production.sh
EOF

echo ""
echo "🎉 Production Deployment Complete!"
echo "=================================="
print_status "Frontend running on: http://localhost:3000"
print_status "Backend API running on: http://localhost:8000"
print_status "View logs: tail -f logs/backend.log logs/frontend.log"
print_status "Status file: logs/production-status.txt"

echo ""
print_warning "IMPORTANT SECURITY NOTES:"
print_warning "1. Change the SECRET_KEY in production"
print_warning "2. Use a production database (PostgreSQL/MySQL)"
print_warning "3. Set up proper SSL/HTTPS"
print_warning "4. Configure firewall rules"
print_warning "5. Set up monitoring and backups"

echo ""
echo "To access your application, open: http://localhost:3000" 