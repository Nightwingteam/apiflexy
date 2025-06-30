#!/bin/bash
echo "Stopping API Connector AI Production Servers..."

# Stop servers using process names
pkill -f "gunicorn.*wsgi:app" 2>/dev/null || true
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "python.*app.py" 2>/dev/null || true

# Clean up PID files
rm -f logs/backend.pid logs/frontend.pid 2>/dev/null || true

echo "Production servers stopped successfully"
echo "To restart, run: ./deploy-production.sh" 