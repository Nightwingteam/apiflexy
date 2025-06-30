#!/bin/bash

# Frontend Build Script for Vercel
echo "🏗️  Building ApiFlexy Frontend for Production..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the React app
echo "🔨 Building React app..."
npm run build

echo "✅ Frontend build completed successfully!"
echo "📁 Build output is in the 'build' directory" 