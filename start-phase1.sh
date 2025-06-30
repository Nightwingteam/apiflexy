#!/bin/bash

# ApiFlexy Phase 1 - Complete Startup Script
echo "🚀 Starting ApiFlexy Phase 1..."

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Kill any existing processes on the ports we need
echo "🧹 Cleaning up existing processes..."
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start backend
echo "🔧 Starting backend on port 8000..."
cd backend
if [ ! -d "venv" ]; then
    echo "❌ Error: Backend virtual environment not found. Please run setup first."
    exit 1
fi

source venv/bin/activate
export FLASK_ENV=development
export PORT=8000
python app.py &
BACKEND_PID=$!
echo "✅ Backend started with PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Test backend
if curl -s http://localhost:8000/api/providers > /dev/null; then
    echo "✅ Backend is responding correctly"
else
    echo "❌ Backend failed to start properly"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend on port 3000..."
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "✅ Frontend started with PID: $FRONTEND_PID"

# Wait for frontend to start
sleep 5

echo ""
echo "🎉 ApiFlexy Phase 1 is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📊 API Providers: 134+ available"
echo ""
echo "To stop the application:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user to stop
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true; exit 0" INT

# Keep script running
wait 