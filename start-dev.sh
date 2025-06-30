#!/bin/bash

echo "🚀 Starting API Connector AI Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python v3.8 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Backend setup
echo "🔧 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
echo "📦 Installing Python dependencies..."
source venv/bin/activate
pip install -r requirements.txt

echo "✅ Backend setup complete"
echo ""

# Frontend setup
echo "🔧 Setting up frontend..."
cd ../frontend

# Install npm dependencies
echo "📦 Installing Node.js dependencies..."
npm install

echo "✅ Frontend setup complete"
echo ""

echo "🎉 Setup complete! Starting development servers..."
echo ""
echo "Backend will run on: http://localhost:5001"
echo "Frontend will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
cd ../backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

cd ../frontend
npm start &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 