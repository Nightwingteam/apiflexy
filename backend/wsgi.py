#!/usr/bin/env python3
"""
WSGI entry point for production deployment
"""
import os
from app import app

# Set production environment
os.environ['FLASK_ENV'] = 'production'

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=False) 