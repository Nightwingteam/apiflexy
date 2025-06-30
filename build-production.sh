#!/bin/bash

# Production Build Script for API Connector AI
# This script builds the frontend for production deployment

echo "🚀 Building API Connector AI for Production..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing frontend dependencies..."
cd frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install frontend dependencies."
    exit 1
fi

echo "🔨 Building frontend for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Frontend build failed."
    exit 1
fi

echo "✅ Frontend build completed successfully!"
echo "📁 Production files are located in: frontend/build/"

cd ..

echo ""
echo "🎉 Production build completed!"
echo ""
echo "📋 Next steps:"
echo "   1. Deploy the frontend/build/ folder to your web server"
echo "   2. Update the backend proxy URL in your production environment"
echo "   3. Configure your web server to serve the React app"
echo "   4. Update the SDK URL in your production environment"
echo ""
echo "💡 For local testing, you can serve the build folder with:"
echo "   npx serve -s frontend/build -l 3000"
echo ""
echo "🔗 Make sure your backend is running on the correct port (5001)" 