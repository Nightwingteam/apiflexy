#!/bin/bash

# GitHub Pages Deployment Script for ApiFlexy
echo "🚀 Deploying ApiFlexy to GitHub Pages..."

# Build the frontend
echo "📦 Building frontend..."
cd frontend
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

cd ..

# Install gh-pages if not installed
if ! npm list -g gh-pages > /dev/null 2>&1; then
    echo "📥 Installing gh-pages..."
    npm install -g gh-pages
fi

# Deploy to gh-pages branch
echo "🌐 Deploying to GitHub Pages..."
npx gh-pages -d frontend/build

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌍 Your site will be available at: https://nightwingteam.github.io/apiflexy"
    echo "⏳ It may take a few minutes to be live."
else
    echo "❌ Deployment failed!"
    exit 1
fi 