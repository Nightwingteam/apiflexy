#!/bin/bash
set -e

echo "🚀 Pushing ApiFlexy to GitHub - nightwingteam/apiflexy"
echo "======================================================"

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

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_error "Git repository not initialized. Run ./setup-github.sh first"
    exit 1
fi

# Check if remote is set
if ! git remote get-url origin >/dev/null 2>&1; then
    print_error "Remote origin not set. Run ./setup-github.sh first"
    exit 1
fi

print_info "Current repository status:"
git status --short

echo ""
print_info "Remote repository: $(git remote get-url origin)"
print_info "Current branch: $(git branch --show-current)"

echo ""
print_warning "⚠️  IMPORTANT: Make sure you have created the repository on GitHub first!"
echo "   1. Go to https://github.com/nightwingteam"
echo "   2. Click 'New repository'"
echo "   3. Repository name: apiflexy"
echo "   4. Description: Universal API Management Platform by Nightwing Team"
echo "   5. Set to Public"
echo "   6. DON'T initialize with README, .gitignore, or license"
echo ""

read -p "Have you created the repository on GitHub? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Please create the repository on GitHub first, then run this script again."
    exit 0
fi

echo ""
print_info "Attempting to push to GitHub..."

# Try to push
if git push -u origin main; then
    print_status "Successfully pushed to GitHub! 🎉"
    echo ""
    echo "🎉 ApiFlexy is now live on GitHub!"
    echo "=================================="
    echo ""
    print_info "Repository URL: https://github.com/nightwingteam/apiflexy"
    print_info "Clone URL: git clone https://github.com/nightwingteam/apiflexy.git"
    echo ""
    print_status "What's included in this push:"
    echo "  ✓ Complete React frontend with Material-UI"
    echo "  ✓ Flask backend with 134+ API providers"
    echo "  ✓ Production deployment scripts"
    echo "  ✓ Comprehensive documentation"
    echo "  ✓ MIT License for Nightwing Team"
    echo "  ✓ Professional README with setup instructions"
    echo "  ✓ Zero-setup HTML integration SDK"
    echo ""
    print_info "Next steps:"
    echo "  1. Visit: https://github.com/nightwingteam/apiflexy"
    echo "  2. Add repository description and topics"
    echo "  3. Configure repository settings"
    echo "  4. Set up GitHub Pages (optional)"
    echo "  5. Add collaborators if needed"
    echo ""
    print_status "🚀 ApiFlexy is ready for the world!"
    
else
    print_error "Failed to push to GitHub"
    echo ""
    print_warning "Common solutions:"
    echo ""
    echo "1. Authentication issues:"
    echo "   - Set up Personal Access Token:"
    echo "     git remote set-url origin https://YOUR_TOKEN@github.com/nightwingteam/apiflexy.git"
    echo ""
    echo "2. Use GitHub CLI:"
    echo "   gh auth login"
    echo "   git push -u origin main"
    echo ""
    echo "3. Use SSH (if you have SSH keys set up):"
    echo "   git remote set-url origin git@github.com:nightwingteam/apiflexy.git"
    echo "   git push -u origin main"
    echo ""
    echo "4. Manual push with credentials:"
    echo "   git push -u origin main"
    echo "   (Enter your GitHub username and Personal Access Token when prompted)"
    echo ""
    print_info "Repository is ready to push - just need to resolve authentication"
    exit 1
fi 