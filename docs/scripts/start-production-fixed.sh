#!/bin/bash
set -e

echo "🚀 Starting API Connector AI - Production Mode"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -f "backend/app.py" ]; then
    print_error "Please run this script from the api-connector-ai root directory"
    exit 1
fi

# Navigate to project root if needed
if [ -f "package.json" ]; then
    cd ..
fi

PROJECT_ROOT=$(pwd)
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

print_info "Project root: $PROJECT_ROOT"

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
    print_error "Backend directory not found: $BACKEND_DIR"
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "$FRONTEND_DIR" ]; then
    print_error "Frontend directory not found: $FRONTEND_DIR"
    exit 1
fi

# Stop any existing processes
print_info "Stopping any existing processes..."
pkill -f "python.*app.py" || true
pkill -f "python.*run-production-simple.py" || true
pkill -f "react-scripts" || true
pkill -f "gunicorn" || true

sleep 2

# Start Backend
print_info "Starting Backend Server..."
cd "$BACKEND_DIR"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    print_error "Virtual environment not found. Please run: python -m venv venv"
    exit 1
fi

# Activate virtual environment and start backend
source venv/bin/activate

# Set production environment variables
export FLASK_ENV=production
export FLASK_DEBUG=False
export PORT=8000

# Check if dependencies are installed
if ! python -c "import flask" 2>/dev/null; then
    print_warning "Installing backend dependencies..."
    pip install -r requirements.txt
fi

print_status "Backend dependencies ready"

# Start backend server
print_info "Starting backend on port 8000..."
python run-production-simple.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Check if backend is running
if ! curl -s http://localhost:8000/api/providers > /dev/null; then
    print_error "Backend failed to start or is not responding"
    kill $BACKEND_PID || true
    exit 1
fi

print_status "Backend server started successfully (PID: $BACKEND_PID)"

# Start Frontend
print_info "Starting Frontend Server..."
cd "$FRONTEND_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "Installing frontend dependencies..."
    npm install
fi

# Set frontend environment variables
export PORT=3000
export REACT_APP_API_URL=http://localhost:8000

print_status "Frontend dependencies ready"

# Start frontend server
print_info "Starting frontend on port 3000..."
npm start &
FRONTEND_PID=$!

# Wait for frontend to start
sleep 10

# Check if frontend is running
if ! curl -s http://localhost:3000 > /dev/null; then
    print_warning "Frontend may still be starting up..."
else
    print_status "Frontend server started successfully (PID: $FRONTEND_PID)"
fi

# Display status
echo ""
echo "🎉 API Connector AI Production Setup Complete!"
echo "=============================================="
print_status "Backend API: http://localhost:8000"
print_status "Frontend App: http://localhost:3000"
echo ""
print_info "Backend PID: $BACKEND_PID"
print_info "Frontend PID: $FRONTEND_PID"
echo ""
print_info "To stop the servers, run: ./stop-production.sh"
echo ""

# Test the connection
print_info "Testing API connection..."
if curl -s http://localhost:8000/api/providers | grep -q "name"; then
    print_status "Backend API is responding correctly"
else
    print_warning "Backend API may not be fully ready yet"
fi

# Save PIDs for stopping later
echo "$BACKEND_PID" > backend.pid
echo "$FRONTEND_PID" > frontend.pid

print_status "Production servers are running!"
print_info "Check the logs above for any warnings or errors"

# Keep the script running to show logs
echo ""
print_info "Press Ctrl+C to stop all servers..."
echo ""

# Wait for user interrupt
trap 'echo ""; print_info "Stopping servers..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; rm -f backend.pid frontend.pid; print_status "All servers stopped"; exit 0' INT

# Keep running
while true; do
    sleep 1
done 