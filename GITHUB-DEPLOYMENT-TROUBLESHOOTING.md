# 🔧 GitHub Deployment Troubleshooting Guide

## 🚨 Common Issues and Solutions

### Issue 1: GitHub Actions Workflow Failing

**Symptoms:**
- Actions tab shows failed workflows
- Red X marks on commits
- Deployment not updating

**Solutions:**

#### Quick Fix:
```bash
# Run the automated fix script
./fix-github-deployment.sh
```

#### Manual Fix:
```bash
# 1. Clean rebuild
cd frontend
rm -rf build node_modules
npm install
npm run build

# 2. Manual deployment
cd ..
npx gh-pages -d frontend/build
```

### Issue 2: GitHub Pages Not Enabled

**Symptoms:**
- 404 error on GitHub Pages URL
- "There isn't a GitHub Pages site here" message

**Solutions:**

1. **Enable via GitHub Web Interface:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Set Source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Click Save

2. **Enable via Command Line:**
```bash
# Enable GitHub Pages
gh api repos/:owner/:repo/pages -X POST --field source='{"branch":"gh-pages"}'
```

### Issue 3: Permission Errors

**Symptoms:**
- "Permission denied" errors
- "Must have admin rights" messages

**Solutions:**

1. **Check Repository Permissions:**
   - Ensure you have admin or write access
   - Check if organization has restrictions

2. **Update Workflow Permissions:**
   - Go to repository Settings > Actions > General
   - Set "Workflow permissions" to "Read and write permissions"

### Issue 4: Build Failures

**Symptoms:**
- Build step fails in Actions
- npm install errors
- Compilation errors

**Solutions:**

1. **Clean Dependencies:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

2. **Check Node Version:**
```bash
# Ensure Node.js 16+ is installed
node --version
npm --version
```

3. **Fix Build Issues:**
```bash
# Test build locally
npm run build

# Check for errors and fix them
npm test
```

### Issue 5: Deployment Not Updating

**Symptoms:**
- Site shows old content
- Changes not reflected on live site

**Solutions:**

1. **Force Refresh:**
```bash
# Force deploy with clean cache
npx gh-pages -d frontend/build --dotfiles --dest . --force-orphan
```

2. **Check Branch:**
```bash
# Verify gh-pages branch exists and has content
git branch -a
git checkout gh-pages
ls -la
git checkout main
```

3. **Clear Browser Cache:**
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Clear browser cache
   - Try incognito/private mode

## 🛠️ Automated Fix Script

Use the provided script to automatically fix most issues:

```bash
# Make executable
chmod +x fix-github-deployment.sh

# Run the fix
./fix-github-deployment.sh
```

## 📋 Manual Deployment Steps

If all else fails, use manual deployment:

```bash
# 1. Build the project
cd frontend
npm run build
cd ..

# 2. Deploy manually
npx gh-pages -d frontend/build

# 3. Check deployment
curl -I https://nightwingteam.github.io/apiflexy/
```

## 🔍 Debugging Commands

```bash
# Check git status
git status
git log --oneline -5

# Check remote configuration
git remote -v

# Check GitHub Pages status
curl -s "https://api.github.com/repos/nightwingteam/apiflexy/pages"

# Check workflow runs
curl -s "https://api.github.com/repos/nightwingteam/apiflexy/actions/runs?per_page=5"

# Test site accessibility
curl -I https://nightwingteam.github.io/apiflexy/
```

## 🆘 If Nothing Works

1. **Repository Settings Check:**
   - Go to GitHub.com → Your Repository → Settings
   - Check "Pages" section is properly configured
   - Verify "Actions" are enabled

2. **Contact Support:**
   - Create an issue in the repository
   - Include error messages and screenshots
   - Mention what troubleshooting steps you've tried

3. **Alternative Deployment:**
   - Consider using Netlify or Vercel as alternatives
   - Both offer simple drag-and-drop deployment

## ✅ Success Indicators

Your deployment is working when:
- ✅ https://nightwingteam.github.io/apiflexy/ returns HTTP 200
- ✅ Site loads without errors
- ✅ Content matches your latest changes
- ✅ GitHub Actions show green checkmarks

---

**🎯 Quick Test:** Visit https://nightwingteam.github.io/apiflexy/ - if it loads, your deployment is working! 