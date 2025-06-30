#!/bin/bash
set -e

echo "Building API Connector AI Frontend for Production..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf build/

# Set production environment
export NODE_ENV=production
export GENERATE_SOURCEMAP=false
export INLINE_RUNTIME_CHUNK=false

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the project
echo "Building React application..."
npm run build

# Create production-ready build
echo "Optimizing build..."

# Remove development files
find build/ -name "*.map" -delete 2>/dev/null || true

# Create a simple server for serving the build
cat > build/server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname)));

// Serve the React app for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Frontend server running on port ${port}`);
});
EOF

echo "Production build completed successfully!"
echo "Build output is in the 'build' directory"
echo "To serve the build, run: node build/server.js" 