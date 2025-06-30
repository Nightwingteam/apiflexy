#!/bin/bash
set -e

echo "Starting API Connector AI in Production Mode..."

# Set production environment
export FLASK_ENV=production
export FLASK_DEBUG=False
export PORT=${PORT:-8000}
export HOST=${HOST:-0.0.0.0}

# Generate a secure secret key if not provided
if [ -z "$SECRET_KEY" ]; then
    export SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')
    echo "Generated new SECRET_KEY for this session"
fi

# Create production database if it doesn't exist
python3 -c "
import os
os.environ['FLASK_ENV'] = 'production'
from app import app, db
with app.app_context():
    db.create_all()
    print('Production database initialized')
"

# Start with Gunicorn for production
echo "Starting production server on $HOST:$PORT"
exec gunicorn --bind $HOST:$PORT --workers 4 --timeout 120 --keepalive 2 --max-requests 1000 --max-requests-jitter 100 wsgi:app 