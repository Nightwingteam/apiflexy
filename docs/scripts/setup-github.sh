#!/bin/bash
set -e

echo "🚀 Setting up ApiFlexy for GitHub - Nightwing Team"
echo "=================================================="

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
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the api-connector-ai root directory"
    exit 1
fi

print_info "Initializing Git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    print_status "Git repository initialized"
else
    print_status "Git repository already exists"
fi

# Create comprehensive .gitignore
print_info "Creating comprehensive .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
build/
dist/
*/build/
*/dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/
*/venv/
*/ENV/

# Database
*.db
*.sqlite
*.sqlite3
instance/
*/instance/

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temporary folders
tmp/
temp/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Production deployment files
*.tar.gz
*.zip

# Local development files
.local
local/

# Flask session files
flask_session/

# Backup files
*.bak
*.backup
EOF

print_status ".gitignore created with comprehensive rules"

# Stage all files
print_info "Staging all files for commit..."
git add .

# Check if there are any changes to commit
if git diff --cached --quiet; then
    print_warning "No changes to commit"
else
    # Create initial commit
    print_info "Creating initial commit..."
    git commit -m "🚀 Initial commit: ApiFlexy - Universal API Management Platform by Nightwing Team

Features:
- 134+ pre-configured APIs across 27+ industries
- Natural language query processing
- Zero-setup HTML integration
- Modern React dashboard with Material-UI
- Flask backend with SQLite database
- Real-time analytics and monitoring
- Enterprise security features
- Production-ready deployment scripts

This is a complete, production-ready API management platform that allows
users to connect to various APIs using natural language queries and
integrate them into any HTML page with simple attributes.

Built by Nightwing Team with ❤️"

    print_status "Initial commit created"
fi

# Add remote origin
print_info "Setting up remote repository..."
if git remote get-url origin >/dev/null 2>&1; then
    print_warning "Remote origin already exists, updating..."
    git remote set-url origin https://github.com/nightwingteam/apiflexy.git
else
    git remote add origin https://github.com/nightwingteam/apiflexy.git
fi

print_status "Remote origin set to: https://github.com/nightwingteam/apiflexy.git"

# Set main branch
print_info "Setting up main branch..."
git branch -M main
print_status "Main branch configured"

echo ""
echo "🎉 Repository setup complete!"
echo "================================"
echo ""
print_info "Next steps to push to GitHub:"
echo ""
echo "1. Make sure you're logged into GitHub CLI or have SSH keys set up"
echo "2. Create the repository on GitHub (if not already created):"
echo "   - Go to https://github.com/nightwingteam"
echo "   - Click 'New repository'"
echo "   - Name: apiflexy"
echo "   - Description: Universal API Management Platform"
echo "   - Set to Public"
echo "   - DON'T initialize with README (we already have one)"
echo ""
echo "3. Push to GitHub:"
echo "   git push -u origin main"
echo ""
print_status "Ready to push to GitHub! 🚀"
echo ""
print_warning "If you get authentication errors, you may need to:"
echo "   - Set up a Personal Access Token"
echo "   - Or use GitHub CLI: gh auth login"
echo "   - Or set up SSH keys"
echo ""
print_info "Repository URL: https://github.com/nightwingteam/apiflexy" 