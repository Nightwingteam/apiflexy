#!/bin/bash

# GitHub Deployment Fix Script
echo "🔧 Fixing GitHub deployment issues..."

# 1. Check current repository status
echo "📋 Checking repository status..."
git status

# 2. Ensure we're on the main branch
echo "🌿 Ensuring we're on main branch..."
git checkout main
git pull origin main

# 3. Clean build and deploy
echo "🧹 Clean build and deploy..."
cd frontend
rm -rf build node_modules package-lock.json
npm install
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

cd ..

# 4. Deploy to GitHub Pages using gh-pages
echo "🚀 Deploying to GitHub Pages..."

# Install gh-pages if not installed
if ! command -v gh-pages &> /dev/null; then
    echo "📥 Installing gh-pages..."
    npm install -g gh-pages
fi

# Deploy
npx gh-pages -d frontend/build --dotfiles

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🌍 Site available at: https://nightwingteam.github.io/apiflexy/"
else
    echo "❌ Deployment failed!"
    echo "🔧 Trying alternative deployment method..."
    
    # Alternative: Force push to gh-pages branch
    git checkout --orphan gh-pages-temp
    git rm -rf .
    cp -r frontend/build/* .
    cp frontend/build/.* . 2>/dev/null || true
    git add .
    git commit -m "Deploy to GitHub Pages"
    git branch -D gh-pages 2>/dev/null || true
    git branch -m gh-pages
    git push -f origin gh-pages
    git checkout main
    
    echo "✅ Alternative deployment completed!"
fi

# 5. Commit any changes to main
echo "💾 Committing changes to main..."
git add .
git commit -m "Fix deployment: Update build and configuration" || echo "No changes to commit"
git push origin main

echo "🎉 GitHub deployment fix completed!"
echo "🌐 Check your site at: https://nightwingteam.github.io/apiflexy/" 